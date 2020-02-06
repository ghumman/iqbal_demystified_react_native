import React from 'react';
import { View, Text } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import DiscussionRecentScreen from './DiscussionRecentScreen';
import DiscussionPopularScreen from './DiscussionPopularScreen';
import DiscussionMyPoemsScreen from './DiscussionMyPoemsScreen';

const DiscussionNavigator = createMaterialTopTabNavigator(
  {
    Recent: DiscussionRecentScreen,
    Popular: DiscussionPopularScreen,
    MyPoems: DiscussionMyPoemsScreen,
  },
  {
    tabBarPosition: 'top',
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
        fontSize: 14,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
);

export default DiscussionNavigator;
