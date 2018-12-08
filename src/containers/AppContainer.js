import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Main from './Main';
import Activity from './Activity';

const TabNavigator = createBottomTabNavigator({
  Main: Main,
  Activity: Activity
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
