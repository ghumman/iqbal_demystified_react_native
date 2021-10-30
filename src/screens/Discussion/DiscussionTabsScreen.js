import {
  createMaterialTopTabNavigator} from "react-navigation";

import DiscussionRecentScreen from "./DiscussionRecentScreen";
import DiscussionPopularScreen from "./DiscussionPopularScreen";
import DiscussionMyPoemsScreen from "./DiscussionMyPoemsScreen";

const DiscussionNavigator = createMaterialTopTabNavigator(
  {
    Recent: DiscussionRecentScreen,
    Popular: DiscussionPopularScreen,
    MyPoems: DiscussionMyPoemsScreen
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
        fontSize: 14,
        fontWeight: "bold"
      },
      indicatorStyle: {
        borderBottomColor: "black",
        borderBottomWidth: 2
      }
    }
  }
);

export default DiscussionNavigator;
