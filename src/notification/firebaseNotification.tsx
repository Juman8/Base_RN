import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {useEffect} from 'react';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export const FirebaseNotification = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken();
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  const getFCMToken = async () => {
    const a = await messaging().getToken();
    console.log({a});
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log({remoteMessage});
    });

    return unsubscribe;
  }, []);

  return null;
};
