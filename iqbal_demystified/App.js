// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './HomeScreen';
import ListPoemScreen from './ListPoemScreen';
import DetailsScreen from './DetailsScreen';

import TabNavigator from './TabScreen'



const AppNavigator = createStackNavigator(
    {
    Home: HomeScreen,
    ListPoem: ListPoemScreen,
    TabFunction: TabNavigator,
    // Poem: PoemScreen,
    // Sher: SherScreen,
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
