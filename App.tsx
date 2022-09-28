import React from 'react';
import {persistor, store} from '@redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationApp, NavigationUtils} from '@navigation';
import {initI18n} from './src/translations';
import {ThemeProvider} from '@theme';
import {Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import FlashMessage from 'react-native-flash-message';
import {GlobalService, GlobalUI} from '@components';
import {Provider} from 'react-redux';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

initI18n();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeAreaView style={styleApp.container} edges={['right', 'left']}>
          <ThemeProvider>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationApp
                ref={(navigatorRef: any) => {
                  NavigationUtils.setTopLevelNavigator(navigatorRef);
                }}
              />
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
});

export default App;
