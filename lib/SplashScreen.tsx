/* eslint-disable @typescript-eslint/no-var-requires */
import {Platform} from 'react-native';
import {NativeModules} from 'react-native';
const AndroidSplashScreen = NativeModules.SplashScreen;

const SplashScreen = {
  hide: () => {
    if (Platform.OS === 'android') {
      AndroidSplashScreen.hide();
    }
    if (Platform.OS === 'ios') {
      const RNBootSplash = require('react-native-bootsplash');
      RNBootSplash.hide();
    }
  },
};
export {SplashScreen};
