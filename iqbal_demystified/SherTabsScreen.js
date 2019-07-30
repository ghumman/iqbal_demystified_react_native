import React from "react";
import { View, Text } from "react-native";
// import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import SherDiscussionScreen from './SherDiscussionScreen';
import SherWordScreen from './SherWordScreen';


// const SherNavigator = createBottomTabNavigator({
const SherNavigator = createMaterialTopTabNavigator({
  SherDiscussion: SherDiscussionScreen,
  SherWordMeanings: SherWordScreen
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
    fontSize: 14,
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



export default SherNavigator;
