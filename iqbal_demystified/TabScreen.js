import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import Urdu from './Urdu';
import Farsi1 from './Farsi1';
import Farsi2 from './Farsi2';


const TabNavigator = createBottomTabNavigator({
  Urdu: Urdu,
  Farsi1: Farsi1,
  Farsi2: Farsi2
});

// const TabFunction = createAppContainer(TabNavigator);


export default TabNavigator;
