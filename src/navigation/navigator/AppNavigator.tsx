/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackComponent} from '../stack/MainStack';
import {Theme, useTheme} from '@theme';
import SplashScreen from 'react-native-splash-screen';
import {AuthStackComponent} from '../stack/AuthStack';
import {getTokenUserFromStore} from '@redux';
import {useSelector} from 'react-redux';

//main stack app
const NavigationApp = React.forwardRef((props, ref: any) => {
  const dataTheme: {theme: Theme;} = useTheme();
  const token = useSelector(getTokenUserFromStore);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const renderStackApp = () => {
    if (token) {
      return <AuthStackComponent />;
    } else {
      return (
        <MainStackComponent />
      );
    }
  };
  return (
    <NavigationContainer theme={dataTheme.theme} ref={ref}>
      {renderStackApp()}
    </NavigationContainer>
  );
});


export {NavigationApp};
