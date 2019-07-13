import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import SherDiscussionScreen from './SherDiscussionScreen';
import SherWordScreen from './SherWordScreen';


const SherNavigator = createBottomTabNavigator({
  SherDiscussion: SherDiscussionScreen,
  SherWordMeanings: SherWordScreen
  }, 
  {
tabBarOptions: {
  labelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20, 
   
  },
  style: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}
});



export default SherNavigator;
