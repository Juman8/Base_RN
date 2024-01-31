import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import {Platform} from 'react-native';

export const connectGoogle = () => {
  Settings.setAppID('795517932266591');
  Settings.initializeSDK();

  GoogleSignin.configure({
    scopes: ['email'],
    webClientId:
      Platform.OS === 'ios'
        ? '1088461325077-fkpp2414e4m4qoknuao01ogabptucebi.apps.googleusercontent.com'
        : '1088461325077-c5jp32o3lulvs96322db779mtk5ekp32.apps.googleusercontent.com',
  });
};
