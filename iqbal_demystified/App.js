// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
// import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import ListPoemScreen from './ListPoemScreen';
import PoemScreen from './PoemScreen';
import DetailsScreen from './DetailsScreen';

import SigninScreen from './SigninScreen';
import RegisterScreen from './RegisterScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import DownloadAudiosScreen from './DownloadAudiosScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ProfileScreen from './ProfileScreen';
import InfoScreen from './InfoScreen';
import SearchScreen from './SearchScreen';

import TabNavigator from './TabScreen';
import SherNavigator from './SherTabsScreen';
import BookmarksNavigator from './BookmarksTabsScreen';
import DiscussionNavigator from './DiscussionTabsScreen';



const AppNavigator = createStackNavigator(
    {
    Splash: {
	  screen: SplashScreen, 
	  navigationOptions: {
		  header: null,
		}
    } ,
    Home: {
	  screen: HomeScreen,
	  navigationOptions: {
		  header: null,
		}
    } ,
    ListPoem: ListPoemScreen,
    TabFunction: {
	    screen: TabNavigator,
	  navigationOptions: {
		  headerTitle: "Books",
		  headerTintColor: 'red',
		  headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
		}
    },
    SherTabs:  { 
	    screen: SherNavigator,
	  navigationOptions: {
		  title: "Title set by App.js",
		}
    },

    BookmarksTabs: {
	    screen: BookmarksNavigator,
	  navigationOptions: {
		  headerTitle: "BookMarks",
		  headerTintColor: 'red',
		  headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
		}
    }, 

    DiscussionTabs: {
	    screen: DiscussionNavigator,
	  navigationOptions: {
		  headerTitle: "Discussion",
		  headerTintColor: 'red',
		  headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
		}
    },
    Poem: PoemScreen,
    Signin: SigninScreen,
    Register: RegisterScreen,
    ChangePassword: ChangePasswordScreen,
    DownloadAudios: DownloadAudiosScreen,
    ForgotPassword: ForgotPasswordScreen,
    Profile: ProfileScreen,
    Info: InfoScreen,
    Search: SearchScreen,
    Details: DetailsScreen
  },
  {
    // initialRouteName: "Home"
    initialRouteName: "Splash"
    // initialRouteName: "Details"
  }
);

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <AppContainer />;
  }
}

export default App;
