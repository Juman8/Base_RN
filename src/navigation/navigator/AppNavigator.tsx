/* eslint-disable @typescript-eslint/no-explicit-any */
import {SplashScreen} from '@lib';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getTokenUserFromStore} from '@redux';
import {useTheme} from '@theme';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';
import {SCREEN_ROUTE} from '../route';
import {AuthStackComponent} from '../stack/AuthStack';
import {MainStackComponent} from '../stack/MainStack';
const Stack = createStackNavigator();
//main stack app
const NavigationApp = React.forwardRef((props, ref: any) => {
  const dataTheme = useTheme() as any;
  const token = useSelector(getTokenUserFromStore);

  const renderStackApp = () => {
    return (
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen
            name={SCREEN_ROUTE.AUTH_STACK}
            component={AuthStackComponent}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={SCREEN_ROUTE.MAIN_ROOT}
            component={MainStackComponent}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer
      theme={dataTheme.theme}
      ref={ref}
      onReady={() => {
        setTimeout(() => {
          RNBootSplash.hide();
          SplashScreen.hide();
        }, 800);
      }}
    >
      {renderStackApp()}
    </NavigationContainer>
  );
});

export {NavigationApp};
