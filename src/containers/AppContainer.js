import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MainNavigator from './Main';
import Activity from './Activity';

const TabNavigator = createBottomTabNavigator(
  {
    Main: MainNavigator,
    Activity: Activity
  },
  {
    initialRouteName: "Main",
    order: ["Main", "Activity"],
    tabBarOptions: {
      activeTintColor: '#2a5caa',
      activeBackgroundColor: '#fffef9',
      inactiveTintColor: 'grey',
      inactiveBackgroundColor: '#fffef9'
    },
    stype: {

    },
    labelStyle: {

    },
    tabStyle: {

    },
    safeAreaInset: { bottom: 'always', top: 'never' }
  }
);

const AppContainer = createAppContainer(TabNavigator);



export default AppContainer;
