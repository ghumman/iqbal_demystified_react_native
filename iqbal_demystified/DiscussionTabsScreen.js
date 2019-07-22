import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import DiscussionRecentScreen from './DiscussionRecentScreen';
import DiscussionPopularScreen from './DiscussionPopularScreen';
import DiscussionMyPoemsScreen from './DiscussionMyPoemsScreen';


const DiscussionNavigator = createBottomTabNavigator({
  Recent: DiscussionRecentScreen,
  Popular: DiscussionPopularScreen,
  MyPoems: DiscussionMyPoemsScreen,
}, 
{
tabBarOptions: {
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20, 
   
  },
  style: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}
});



export default DiscussionNavigator;
