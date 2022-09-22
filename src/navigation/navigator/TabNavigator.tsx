import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomTabBar } from './CustomTab';

import { Home } from '@screens';
import { SCREEN_ROUTE } from '@navigation';
export { SCREEN_ROUTE } from '../route';

const Tab = createBottomTabNavigator();

const TabNavigator = memo(function () {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={SCREEN_ROUTE.HOME_PAGE} component={Home} />
      <Tab.Screen name={SCREEN_ROUTE.TRADE_PAGE} component={Home} />
      <Tab.Screen name={SCREEN_ROUTE.MAIN_PAGE} component={Home} />
      <Tab.Screen name={SCREEN_ROUTE.DISCOVER_PAGE} component={Home} />
      <Tab.Screen name={SCREEN_ROUTE.ACCOUNT_PAGE} component={Home} />
    </Tab.Navigator>
  );
});

export { TabNavigator };
