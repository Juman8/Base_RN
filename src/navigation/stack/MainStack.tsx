import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList, SCREEN_ROUTE} from '../route';
import {TabNavigator} from '../navigator/TabNavigator';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackComponent = memo(() => {
  return (
    <MainStack.Navigator
      initialRouteName={SCREEN_ROUTE.MAIN_STACK}
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        name={SCREEN_ROUTE.MAIN_STACK}
        component={TabNavigator}
      />
    </MainStack.Navigator>
  );
});

export {MainStackComponent};
