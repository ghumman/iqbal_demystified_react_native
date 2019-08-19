import React from "react";
import {
  TouchableHighlight,
  Alert,
  Button,
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

// following are books in second tab - Farsi 1
import farsi1Book1 from "./assets/android_app_assets/book_rumuz_ae_bekhudi_persian_6.jpg";
import farsi1Book2 from "./assets/android_app_assets/book_asrar_ae_khudi_persian_5.jpg";
import farsi1Book3 from "./assets/android_app_assets/book_payam_ae_hijaz_persian_7.jpg";
import farsi1Book4 from "./assets/android_app_assets/book_zabur_ae_ajam_persian_8.jpg";

class Farsi1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinConfirmation: "",
      username: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "Farsi (1)",
    headerTitle: "farsi"
  };

  onSubmit = bookNumber => {
    const { navigate } = this.props.navigation;

    console.log("You are inside onSubmit Going to ListPoem");
    // Alert.alert('You are inside onSubmit Going to ListPoem');
    // Alert.alert('Value of this.state.username');
    console.log("Value of this.state.username");
    const localUsername = "test2";
    // Alert.alert(localUsername);
    console.log(localUsername);
    console.log("Value of this.state.signinConfirmation");
    console.log(this.state.signinConfirmation);
    navigate("ListPoem", {
      detailBook: bookNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password
    });
  };

  componentDidMount() {
    try {
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
    } catch (e) {
      // Alert.alert("Inside catch");
      console.log("Inside catch");
      console.log("Error");
      console.log(e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 1,
                justifyContent: "space-around"
              }}
            >
              <TouchableHighlight
                style={styles.HighlightProperties}
                onPress={() => this.onSubmit("List_006")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi1Book1}
                />
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.HighlightProperties}
                onPress={() => this.onSubmit("List_005")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi1Book2}
                />
              </TouchableHighlight>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 1,
                justifyContent: "space-around"
              }}
            >
              <TouchableHighlight
                style={styles.HighlightProperties}
                onPress={() => this.onSubmit("List_007")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi1Book3}
                />
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.HighlightProperties}
                onPress={() => this.onSubmit("List_008")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi1Book4}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HighlightProperties: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    margin: 10
  },
  RowSpace: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    margin: 15
  },

  RowImage: {
    flex: 1
  }
});

export default Farsi1;
