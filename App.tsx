import React, {useEffect} from 'react';
import {persistor, store} from '@redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationApp, NavigationUtils} from '@navigation';
import {initI18n} from './src/translations';
import {ThemeProvider} from '@theme';
import {Platform, StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GlobalService, GlobalUI} from '@components';
import {Provider} from 'react-redux';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import codePush from "react-native-code-push";
import {getStatusBarHeight} from 'react-native-status-bar-height';

initI18n();

const options = {
  // updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
}; 

function App() {
  useEffect(() => {
    codePush.sync(options);
    alert("THao XẤUC Trai"); 
  }, [])
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

export default codePush(options)(App);
