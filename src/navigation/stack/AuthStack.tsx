import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_ROUTE} from '../route';
import {LoginScreen} from '@screens';
import {RootStackParamList} from '../RootStackParamList';

const AuthStack = createStackNavigator<RootStackParamList>();

const AuthStackComponent = memo(() => {
  return (
    <AuthStack.Navigator
      initialRouteName={SCREEN_ROUTE.MAIN_STACK}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={SCREEN_ROUTE.LOGIN} component={LoginScreen} />
    </AuthStack.Navigator>
  );
});

export {AuthStackComponent};
