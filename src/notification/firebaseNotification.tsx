import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {useEffect} from 'react';
import {LogApp} from '@utils';
import notifee from '@notifee/react-native';

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
      getFCMToken();
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  const getFCMToken = async () => {
    const a = await messaging().getToken();
    LogApp("FCM TOKEN->>>>", {a});
  };

  useEffect(() => {
    if(Platform.OS === 'android'){
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        LogApp({remoteMessage});
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
          },
        });
      });
      return unsubscribe;
    }
  }, []);

  return null;
};
