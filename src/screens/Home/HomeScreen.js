import React from "react";
import {
  TouchableHighlight,
  View,
  Image,
  StyleSheet} from "react-native";
import { createMaterialTopTabNavigator, NavigationEvents } from "react-navigation";

// used for reading and writing application wide variables
import AsyncStorage from "@react-native-community/async-storage";

// used for reading/writing file system
var RNFS = require("react-native-fs");

// initializing
const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

// iqbal logo

// 6 main logos on main page
import iconSignIn from "../../assets/android_app_assets/icon_signed_in_resized_350.png";
import iconSignOut from "../../assets/android_app_assets/icon_signed_out_resized_350.png";
import iconBest from "../../assets/android_app_assets/icon_best_resized_350.png";
import iconBookmarks from "../../assets/android_app_assets/icon_bookmark_resized_350.png";
import iconDiscussion from "../../assets/android_app_assets/icon_discussion_resized_350.png";
import iconSearch from "../../assets/android_app_assets/icon_search_resized_350.png";
import iconInfo from "../../assets/android_app_assets/icon_info_resized_350.png";

import Urdu from "./Urdu";
import Farsi1 from "./Farsi1";
import Farsi2 from "./Farsi2";


const TabNavigator = createMaterialTopTabNavigator(
  {
    Urdu: Urdu,
    Farsi1: Farsi1,
    Farsi2: Farsi2
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "grey",
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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",
      gotoPage: ""
    };
  }

  onDidFocusCustomFunction = () => {
    AsyncStorage.getItem(USERNAME).then(res => {
      if (res !== null) {
        this.setState({ username: res });
      } else {
        this.setState({ username: res });
      }
    });

    AsyncStorage.getItem(PASSWORD).then(res => {
      if (res !== null) {
        this.setState({ password: res });
      } else {
        this.setState({ password: res });
      }
    });

    AsyncStorage.getItem(MESSAGE).then(res => {
      this.setState({ signinConfirmation: res });
      if (res != "done") {
        // console.log("Profile Signin Confirmation message is not done ")

        this.setState({ signinConfirmation: "not signed in" });
        this.setState({ username: "" });
        this.setState({ gotoPage: "Register" });
      } else {
        // console.log("You're signed in and profileSigninConfirmation message is done");
        this.setState({ gotoPage: "Profile" });
      }
    });
  };

  // if pageName is Intikhab go to ListPoem, becuase Intikhab is similar to ListPoem
  // else go to particular page like Register/Profile, BookmarksTabs, DiscussionTabs, Search or Info
  onSubmit = pageName => {
    if (pageName === "Intikhab") {
      this.props.navigation.navigate("ListPoem", {
        detailBook: "List_Editor_Pick",
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password
      });
    } else {
      this.props.navigation.navigate(pageName, {
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password
      });
    }
  };

  componentDidMount() {
    // first thing when app starts is to make Iqbal-Demystified folder, so that we can put .mp3, txt and yaml files in it.
    RNFS.mkdir(RNFS.DocumentDirectoryPath + "/Iqbal-Demystified").then(function (
    ) {
      // console.log("Iqbal-Demystified directory exists now");
    });
    try {
      // gets AsyncStorage username, passowrd, message and sets gotoPage to either Register or Profile
      this.onDidFocusCustomFunction();

      // following code is inherited from React, where username, encrypted password and signinconfirmation message used to get transfer through url and used to pass to every single page.
      this.setState({
        signinConfirmation: this.props.navigation.getParam(
          "profileSigninConfirmation"
        )
      });
      this.setState({
        username: this.props.navigation.getParam("profileUsername")
      });
      this.setState({
        password: this.props.navigation.getParam("profilePassword")
      });

      if (this.state.signinConfirmation != "done") {
        // console.log("Profile Signin Confirmation message is not done ")
        this.setState({ signinConfirmation: "not signed in" });
        this.setState({ username: "" });
        this.setState({ gotoPage: "Register" });
      } else {
        // console.log("You're signed in and profileSigninConfirmation message is done");
        this.setState({ gotoPage: "Profile" });
      }
    } catch (e) {
      // try ends
      // console.log("Inside catch")
      // console.log("Not signed in or just started the app");
      this.setState({ signinConfirmation: "not signed in" });
      this.setState({ username: "" });
      this.setState({ gotoPage: "RegisterPage" });
    }
  }

  userIcon = () => {
    try {

      if (this.state.username.length > 0)
        return iconSignIn;
      else
        return iconSignOut;
    }
    catch {
      return iconSignOut
    }
  }

  static router = TabNavigator.router;

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*
	  Following runs the onDidFocus... when user comes to home page
	  after going to other pages and check if the user is still logged
	  in or not.
	*/}
        <NavigationEvents onDidFocus={() => this.onDidFocusCustomFunction()} />

        <View style={{ flex: 4 }}>
          <TabNavigator navigation={this.props.navigation} />
        </View>


        <View style={{ flex: 2 }}>
          {/*first row of logos*/}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-around"
            }}
          >
            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit(this.state.gotoPage)}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={this.userIcon()}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit("Intikhab")}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconBest}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit("BookmarksTabs")}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconBookmarks}
              />
            </TouchableHighlight>
          </View>

          {/* second row of logos */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-around"
            }}
          >
            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit("DiscussionTabs")}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconDiscussion}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit("Search")}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconSearch}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit("Info")}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconInfo}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  BookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    borderWidth: 0.5,
    borderColor: "gray",
    height: 150,
    width: 300,
    borderRadius: 5,
    margin: 5
  },
  ImageIconStyle: {
    padding: 20,
    margin: 20,
    height: 120,
    width: 120,
    resizeMode: "stretch"
  },
  TextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 10
  },
  SeparatorLine: {
    backgroundColor: "#fff",
    width: 5,
    height: 120
  },
  Image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  RowImage: {
    flex: 1
  },
  HighlightProperties: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    margin: 10
  }
});
