import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainNavigator from './Main';
import Activity from './Activity';

class Live extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Live</Text>
      </View>
    );
  }
}
class Cloud extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Cloud</Text>
      </View>
    );
  }
}
class Community extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Community</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Main: MainNavigator,
    Activity: Activity,
    Live: Live,
    Cloud: Cloud,
    Community: Community
  },
  {
    initialRouteName: "Main",
    order: ['Main', 'Activity', 'Live', 'Cloud', 'Community'],
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Main') {
          iconName = `newspaper-o`;
        } else if (routeName === 'Activity') {
          iconName = `book`;
        } else if (routeName === 'Live') {
          iconName = `eye`;
        } else if (routeName === 'Cloud') {
          iconName = `cloud`;
        } else if (routeName === 'Community') {
          iconName = `cube`;
        } 
        
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 22} color={tintColor} />;
      },
    }),

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
