import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation";
import MainContent from './MainContent';
import Account from './Account';
import Search from './Search';
import Detail from './MainContent/Detail';

const MainNavigator = createStackNavigator(
  {
    MainContent: {
      screen: MainContent,
      // path: 'dApp/:main'
    },
    Account: {
      screen: Account,
      navigationOptions: () => ({
        title: `Account`,
      }),

    },
    Search: {
      screen: Search,
      navigationOptions: () => ({
        title: `Search`,
      }),
    },
    Detail: {
      screen: Detail,
      navigationOptions: () => ({
        title: `详情`,
      }),
    }
  },
  {
    initialRouteName: "MainContent",
    defaultNavigationOptions: {
      gesturesEnabled: true,
      headerStyle: {
        backgroundColor: '#2a5caa'
      }
    },
    mode: "card",
    headerMode: "float",
    headerTransitionPreset: "uikit",

  }
);

MainNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default MainNavigator;