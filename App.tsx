/* eslint-disable @typescript-eslint/no-explicit-any */
import {AppText, GlobalService, GlobalUI} from '@components';
import {NavigationApp, NavigationUtils} from '@navigation';
import {persistor, store} from '@redux';
import {
  Box,
  Colors,
  ENUM_COLORS,
  ENUM_SPACING_ALIAS,
  ThemeProvider,
} from '@theme';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet} from 'react-native';
import codePush, {DownloadProgress} from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {FirebaseNotification} from './src/notification/firebaseNotification';
import {initI18n} from './src/translations';

initI18n();

const options = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

function App() {
  const [isUpdating, setUpdating] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const rotation = useSharedValue(0);

  const codePushFunction = useCallback(() => {
    codePush
      .sync(
        options,
        (status: codePush.SyncStatus) => {
          switch (status) {
            case codePush.SyncStatus.SYNC_IN_PROGRESS: {
              setUpdating(false);
              break;
            }
            case codePush.SyncStatus.INSTALLING_UPDATE: {
              setDownloading(true);
              break;
            }
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
              setSyncMessage('Checking for update.');
              break;
            case codePush.SyncStatus.UP_TO_DATE:
              setUpdating(false);
              break;
            case codePush.SyncStatus.UPDATE_IGNORED:
              setUpdating(false);
              break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
              setUpdating(false);
              break;
            case codePush.SyncStatus.UNKNOWN_ERROR:
              setUpdating(false);
              break;
          }
        },
        (progress: DownloadProgress) => {
          const {totalBytes, receivedBytes} = progress;
          let currentProgress = Math.ceil(receivedBytes / totalBytes) * 100;
          currentProgress = currentProgress > 100 ? 100 : currentProgress;
          rotation.value = currentProgress;
        },
      )
      .finally(() => {
        setUpdating(false);
      });
  }, [rotation]);

  useEffect(() => {
    codePushFunction();
  }, [codePushFunction]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${rotation.value}%`,
    };
  });

  const renderAppContent = (): JSX.Element => {
    if (isUpdating) {
      return (
        <Box style={styleApp.viewUpdate}>
          {!downloading ? (
            <ActivityIndicator size={'small'} color={Colors.blue} />
          ) : (
            <Box width="100%" paddingHorizontal={ENUM_SPACING_ALIAS.PIXEL_24}>
              <Animated.View style={[styleApp.txtDownload, animatedStyle]} />
            </Box>
          )}
          <AppText
            marginTop={ENUM_SPACING_ALIAS.PIXEL_4}
            color={ENUM_COLORS.textColor}
          >
            {syncMessage || 'Checking for update...'}
          </AppText>
        </Box>
      );
    } else {
      return (
        <NavigationApp
          ref={(navigatorRef: any) => {
            NavigationUtils.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeAreaView style={styleApp.container} edges={['right', 'left']}>
          <ThemeProvider>
            <PersistGate loading={null} persistor={persistor}>
              {renderAppContent()}
              <GlobalUI ref={GlobalService.globalUIRef} />
              <FlashMessage
                style={styleApp.messageNotify}
                position="top"
                floating={true}
                hideStatusBar={false}
              />
              <FirebaseNotification />
            </PersistGate>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styleApp = StyleSheet.create({
  messageNotify: {
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
  },
  container: {
    flex: 1,
  },
  viewUpdate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    backgroundColor: 'white',
  },
  txtDownload: {
    height: 5,
    backgroundColor: Colors.blue,
    borderRadius: 5 / 2,
    opacity: 0.6,
  },
});

export default codePush(options)(App);
