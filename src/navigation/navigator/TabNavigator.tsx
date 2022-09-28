import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';

import {CustomTabBar} from './CustomTab';

import {ROUTER_BOTTOM_TAB} from '@navigation';
export {SCREEN_ROUTE} from '../route';
export {TabNavigator};

const Tab = createBottomTabNavigator();

const TabNavigator = memo(function () {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {ROUTER_BOTTOM_TAB.map((it, index) => {
        return (
          <Tab.Screen name={it.key} component={it.route} key={it.key} />
        )
      })}
    </Tab.Navigator>
  );
});


