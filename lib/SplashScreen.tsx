import {Platform} from 'react-native';
import {NativeModules} from 'react-native';
const AndroidSplashScreen = NativeModules.SplashScreen;
import RNBootSplash from 'react-native-bootsplash';

const SplashScreen = {
  hide: () => {
    if (Platform.OS === 'android') {
      AndroidSplashScreen.hide();
    } else {
      RNBootSplash.hide();
    }
  },
};
export {SplashScreen};
