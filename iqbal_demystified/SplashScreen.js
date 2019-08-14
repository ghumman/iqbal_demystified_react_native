import React from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  Button,
  View,
  Text,
  Image,
  Platform,
  StyleSheet
} from "react-native";
import {
  NavigationEvents,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import logo from "./assets/ic_launcher.png";

export default class HomeScreen extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.TopArea}>
          <Text style={styles.TopText}> Iqbal Demystified </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image style={styles.Image} source={logo} />
        </View>
        <View style={styles.BottomArea}>
          <Text style={styles.BottomText}>
            {" "}
            Created by International Iqbal Society{" "}
          </Text>
        </View>
      </View>
    );
  }
}

// Styling
const styles = StyleSheet.create({
  TopArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  TopText: {
    textAlign: "center",
    fontFamily: "Times New Roman",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  },
  BottomArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  BottomText: {
    textAlign: "center",
    fontFamily: "Times New Roman",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  },
  Image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
