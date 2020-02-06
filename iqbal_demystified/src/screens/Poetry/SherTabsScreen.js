import React from 'react';
import { View, Text } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import SherDiscussionScreen from './SherDiscussionScreen';
import SherWordScreen from './SherWordScreen';

const SherNavigator = createMaterialTopTabNavigator(
  {
    SherDiscussion: SherDiscussionScreen,
    SherWordMeanings: SherWordScreen,
  },
  {
    tabBarPosition: 'top',
    title: 'Title set by SherTabsScreen.js',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: 'gray',
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
);

SherNavigator.navigationOptions = ({ navigation }) => {
  const headerTitle = navigation.getParam('poemTitle');
  if (headerTitle != null) {
    return {
      headerTitle,
      headerTintColor: 'red',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
      },
    };
  }
  return {
    headerTitle: 'Discussion',
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  };
};

export default SherNavigator;
