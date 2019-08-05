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
		      title: "Title set by SherTabsScreen.js",
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

SherNavigator.navigationOptions = ({ navigation }) => {
	  // const { routeName } = navigation.state.routes[navigation.state.index];
	 // const {routeName} = this.props.navigation.getParam('poemTitle');
	 // const {routeName} = navigation.getParam('username');
	 // const {routeName} = this.props.navigation.dangerouslyGetParent().getParam('username')
	
	// const {routeName} = navigation.state.params.profileUsername;
	// const {routeName} = navigation.getParam("profileUsername");
	// const {routeName} = "Hello world" 
	// console.log("username from SherTabsScreen:");
	// console.log(routeName);

	// const headerTitle = routeName;
	// const headerTitle = "Page1";
	
	const headerTitle = navigation.getParam("poemTitle");
	    if (headerTitle != null) {
		    return {
			headerTitle,
			 headerTintColor: 'red',
			 headerTitleStyle: {
			       fontWeight: 'bold',
			       fontSize: 20, 
			       textAlign: 'center',
			 },
		    };
	    } else {
		    return {
			 headerTitle: "Discussion",
			 headerTintColor: 'red',
			 headerTitleStyle: {
			       fontWeight: 'bold',
			       fontSize: 20, 
			       textAlign: 'center',
			 },
		    };

	    }
	};



export default SherNavigator;
