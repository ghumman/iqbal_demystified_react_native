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
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray",
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

export default BookmarksNavigator;
