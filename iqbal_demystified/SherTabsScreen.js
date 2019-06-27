import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import SherDiscussionScreen from './SherDiscussionScreen';
import SherWordScreen from './SherWordScreen';


const SherNavigator = createBottomTabNavigator({
  SherDiscussion: SherDiscussionScreen,
  SherWord: SherWordScreen
});



export default SherNavigator;
