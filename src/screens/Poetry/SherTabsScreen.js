import {
  createMaterialTopTabNavigator} from "react-navigation";

import SherDiscussionScreen from "./SherDiscussionScreen";
import SherWordScreen from "./SherWordScreen";

const SherNavigator = createMaterialTopTabNavigator(
  {
    SherDiscussion: SherDiscussionScreen,
    SherWordMeanings: SherWordScreen
  },
  {
    tabBarPosition: "top",
    title: "Title set by SherTabsScreen.js",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "green",
      inactiveTintColor: "lightgreen",
      style: {
        backgroundColor: "white"
      },
      labelStyle: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
      },
      indicatorStyle: {
        borderBottomColor: "black",
        borderBottomWidth: 2
      }
    }
  }
);

SherNavigator.navigationOptions = ({ navigation }) => {
  const headerTitle = navigation.getParam("poemTitle");
  if (headerTitle != null) {
    return {
      headerTitle,
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
      }
    };
  } else {
    return {
      headerTitle: "Discussion",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
      }
    };
  }
};

export default SherNavigator;
