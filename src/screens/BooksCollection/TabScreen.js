import React from "react";
import { View, Text } from "react-native";
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Urdu from "./Urdu";
import Farsi1 from "./Farsi1";
import Farsi2 from "./Farsi2";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Urdu: Urdu,
    Farsi1: Farsi1,
    Farsi2: Farsi2
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white"
      },
      labelStyle: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
      },
      indicatorStyle: {
        borderBottomColor: "black",
        borderBottomWidth: 2
      }
    }
  }
);

export default TabNavigator;
