import React from "react";
import { View, Text } from "react-native";
// import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import DiscussionRecentScreen from './DiscussionRecentScreen';
import DiscussionPopularScreen from './DiscussionPopularScreen';
import DiscussionMyPoemsScreen from './DiscussionMyPoemsScreen';


// const DiscussionNavigator = createBottomTabNavigator({
const DiscussionNavigator = createMaterialTopTabNavigator({
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
					            // backgroundColor: '#633689',
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
		    }
/*
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
}
*/
);



export default DiscussionNavigator;
