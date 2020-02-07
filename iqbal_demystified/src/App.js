// This is the first file which is reached and it sets all navigators
import React from "react";
import { Platform, View, Text } from "react-native";
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import SplashScreen from "./screens/Misc/SplashScreen"; // splash screen, used only for android
import HomeScreen from "./screens/Home/HomeScreen"; // screen after splash
import ListPoemScreen from "./screens/Poetry/ListPoemScreen"; // this page opens when a book icon is clicked, shows poems
import PoemScreen from "./screens/Poetry/PoemScreen"; // it opens when poem is clicked, shows a particular poem
import ContributeIntroductionScreen from "./screens/Intro/ContributeIntroductionScreen"; // for contributing introduction

// screens for creating user account
import SigninScreen from "./screens/Account/SigninScreen";
import RegisterScreen from "./screens/Account/RegisterScreen";
import ChangePasswordScreen from "./screens/Account/ChangePasswordScreen";
import ForgotPasswordScreen from "./screens/Account/ForgotPasswordScreen";
import ProfileScreen from "./screens/Account/ProfileScreen";

// Audio
import DownloadAudiosScreen from "./screens/Audio/DownloadAudiosScreen";

// screen with settings and information
import InfoScreen from "./screens/Intro/InfoScreen";

// screen for search engine
import SearchScreen from "./screens/Search/SearchScreen";

// navigators
import TabNavigator from "./screens/BooksCollection/TabScreen"; // shows book tabs like urdu/farsi
import SherNavigator from "./screens/Poetry/SherTabsScreen"; // shows sher and word meanings discussion
import BookmarksNavigator from "./screens/Bookmarks/BookmarksTabsScreen"; // shows bookmarked poems and shers
import DiscussionNavigator from "./screens/Discussion/DiscussionTabsScreen"; // shows recent, popular and my poems tabs

const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    ListPoem: ListPoemScreen,
    TabFunction: {
      screen: TabNavigator,
      navigationOptions: {
        headerTitle: "Books",
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center"
        }
      }
    },
    SherTabs: {
      screen: SherNavigator,
      navigationOptions: {
        title: "Title set by App.js"
      }
    },

    BookmarksTabs: {
      screen: BookmarksNavigator,
      navigationOptions: {
        headerTitle: "Bookmarks",
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center"
        }
      }
    },

    DiscussionTabs: {
      screen: DiscussionNavigator,
      navigationOptions: {
        headerTitle: "Discussion",
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center"
        }
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
    ContributeIntroduction: ContributeIntroductionScreen,
    Search: SearchScreen
  },
  { initialRouteName: Platform.OS === "ios" ? "Home" : "Splash" }
); // if ios, first screen is Home else Splash

// main app container
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    // following removes bottom yellow banner showing warnings
    console.disableYellowBox = true;
    return <AppContainer />;
  }
}

export default App;
