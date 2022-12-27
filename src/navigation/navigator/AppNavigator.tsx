/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackComponent} from '../stack/MainStack';
import {Theme, useTheme} from '@theme';
import RNBootSplash from "react-native-bootsplash";
import {AuthStackComponent} from '../stack/AuthStack';
import {getTokenUserFromStore} from '@redux';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_ROUTE} from '../route';
const Stack = createStackNavigator();
//main stack app
const NavigationApp = React.forwardRef((props, ref: any) => {
  const dataTheme: {theme: Theme;} = useTheme() as any;
  const token = useSelector(getTokenUserFromStore);

  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 300});
  }, []);


  const renderStackApp = () => {
    return (
      <Stack.Navigator>
        {token ? (
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
    <NavigationContainer theme={dataTheme.theme} ref={ref}>
      {renderStackApp()}
    </NavigationContainer>
  );
});


export {NavigationApp};
