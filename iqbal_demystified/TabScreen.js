import React from "react";
import { View, Text } from "react-native";
// import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


import Urdu from './Urdu';
import Farsi1 from './Farsi1';
import Farsi2 from './Farsi2';


// const TabNavigator = createBottomTabNavigator({
const TabNavigator = createMaterialTopTabNavigator({
	Urdu: Urdu,
  	Farsi1: Farsi1,
  	Farsi2: Farsi2
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
    // marginBottom: 20, 
   
  },
  tabStyle: {
    width: 100,
  },
  style: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
}
*/
);

// const TabFunction = createAppContainer(TabNavigator);


export default TabNavigator;
