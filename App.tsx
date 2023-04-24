import {AppText, GlobalService, GlobalUI} from '@components';
import {NavigationApp, NavigationUtils} from '@navigation';
import {persistor, store} from '@redux';
import {Box, Colors, ThemeProvider} from '@theme';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet} from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import codePush, {DownloadProgress} from "react-native-code-push";
import FlashMessage from 'react-native-flash-message';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {initI18n} from './src/translations';

initI18n();

const options = {
  // updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

function App() {

  const [isUpdating, setUpdating] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const rotation = useSharedValue(0);

  const codePushFunction = () => {
    codePush.sync(options, (status: codePush.SyncStatus) => {
      switch (status) {
        case codePush.SyncStatus.SYNC_IN_PROGRESS: {
          setUpdating(false);
          break;
        }
        case codePush.SyncStatus.INSTALLING_UPDATE: {
          // RNBootSplash.hide();
          setDownloading(true);
          break;
        }
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          setSyncMessage("Checking for update.");
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
        // default:
        //   setUpdating(false);
        //   break;
      }
    }, (progress: DownloadProgress) => {
      const {totalBytes, receivedBytes} = progress;
      let currentProgress = Math.ceil(receivedBytes / totalBytes) * 100;
      currentProgress = currentProgress > 100 ? 100 : currentProgress;
      rotation.value = currentProgress;
    }, () => {
    }).finally(() => {
      setUpdating(false);
    });
  };

  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 5000});
    codePushFunction();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${rotation.value}%`,
    };
  });

  const AppContent = () => {
    if (isUpdating) {
      return (
        <Box style={styleApp.viewUpdate}>
          {!downloading ? <ActivityIndicator size={"small"} color={Colors.blue} /> :
            <Box style={{width: '100%', paddingHorizontal: 50}}>
              <Animated.View
                style={[{
                  height: 5, backgroundColor: Colors.blue, borderRadius: 5 / 2,
                  opacity: 0.6
                }, animatedStyle]}
              />
            </Box>}
          <AppText style={{color: '#000', marginTop: 15}}>
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
              <AppContent />
              <GlobalUI ref={GlobalService.globalUIRef} />
              <FlashMessage
                style={styleApp.messageNoti}
                position="top"
                floating={true}
                hideStatusBar={false}
              />
            </PersistGate>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>

    </Provider>
  );
}

const styleApp = StyleSheet.create({
  messageNoti: {
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
  },
  container: {
    flex: 1,
  },
  viewUpdate: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 80, backgroundColor: 'white'}

});


export default codePush(options)(App);
