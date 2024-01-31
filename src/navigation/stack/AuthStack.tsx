import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList, ROUTER_AUTH_STACK, SCREEN_ROUTE} from '../route';
import {LoginScreen} from '@screens';

const AuthStack = createStackNavigator<RootStackParamList>();

const AuthStackComponent = memo(() => {
  return (
    <AuthStack.Navigator
      initialRouteName={SCREEN_ROUTE.MAIN_STACK}
      screenOptions={{
        headerShown: false,
      }}
    >
      {ROUTER_AUTH_STACK.map(it => {
        return (
          <AuthStack.Screen name={it.key} component={it.route} key={it.key} />
        );
      })}
    </AuthStack.Navigator>
  );
});

export {AuthStackComponent};
