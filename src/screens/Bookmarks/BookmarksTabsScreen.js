import {
  createMaterialTopTabNavigator} from "react-navigation";

import BookmarksPoemScreen from "./BookmarksPoemScreen";
import BookmarksSherScreen from "./BookmarksSherScreen";

const BookmarksNavigator = createMaterialTopTabNavigator(
  {
    POEMS: BookmarksPoemScreen,
    SHERS: BookmarksSherScreen
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'green',
    },
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

BookmarksNavigator.navigationOptions = ({ }) => {
    return {
      headerTitle: "Bookmarks",
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
};

export default BookmarksNavigator;
