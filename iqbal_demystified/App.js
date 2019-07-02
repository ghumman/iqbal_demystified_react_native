// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './HomeScreen';
import ListPoemScreen from './ListPoemScreen';
import PoemScreen from './PoemScreen';
import DetailsScreen from './DetailsScreen';

import SigninScreen from './SigninScreen';
import RegisterScreen from './RegisterScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ProfileScreen from './ProfileScreen';
import InfoScreen from './InfoScreen';

import TabNavigator from './TabScreen';
import SherNavigator from './SherTabsScreen';
import DiscussionNavigator from './DiscussionTabsScreen';



const AppNavigator = createStackNavigator(
    {
    Home: HomeScreen,
    ListPoem: ListPoemScreen,
    TabFunction: TabNavigator,
    SherTabs: SherNavigator,
    DiscussionTabs: DiscussionNavigator,
    Poem: PoemScreen,
    Signin: SigninScreen,
    Register: RegisterScreen,
    ChangePassword: ChangePasswordScreen,
    ForgotPassword: ForgotPasswordScreen,
    Profile: ProfileScreen,
    Info: InfoScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
    // initialRouteName: "Details"
  }
);

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
