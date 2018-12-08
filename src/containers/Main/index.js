import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation";
import Account from './Account';
import Search from './Search';

export class MainContent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>MainContent</Text>
      </View>
    );
  }
}
const MainNavigator = createStackNavigator({
  MainContent: {
    screen: MainContent
  },
  Account: {
    screen: Account
  },
  Search: {
    screen: Search
  }
});

export default MainNavigator;