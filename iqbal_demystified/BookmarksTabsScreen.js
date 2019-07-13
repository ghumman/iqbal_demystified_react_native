import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import BookmarksPoemScreen from './BookmarksPoemScreen';
import BookmarksSherScreen from './BookmarksSherScreen';


const BookmarksNavigator = createBottomTabNavigator({
  POEMS: BookmarksPoemScreen,
  SHERS: BookmarksSherScreen
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



export default BookmarksNavigator;
