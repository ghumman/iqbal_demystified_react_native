import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import BookmarksPoemScreen from './BookmarksPoemScreen';
import BookmarksSherScreen from './BookmarksSherScreen';


const BookmarksNavigator = createBottomTabNavigator({
  POEMS: BookmarksPoemScreen,
  SHERS: BookmarksSherScreen
});



export default BookmarksNavigator;
