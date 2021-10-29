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

// following are books in second tab - Farsi 2
import farsi2Book1 from "../../assets/android_app_assets/book_javed_nama_persian_9.jpg";
import farsi2Book2 from "../../assets/android_app_assets/book_pas_cheh_bayad_kard_persian_10.jpg";
import farsi2Book3 from "../../assets/android_app_assets/book_armaghan_ae_hijaz_persian_11.jpg";

class Farsi2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinConfirmation: "",
      username: "",
      password: ""
    };
  }

  
  static navigationOptions = {
    title: "فارسی(۲)"
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
                onPress={() => this.onSubmit("List_009")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi2Book1}
                />
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.HighlightProperties}
                onPress={() => this.onSubmit("List_010")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi2Book2}
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
                onPress={() => this.onSubmit("List_011")}
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="contain"
                  source={farsi2Book3}
                />
              </TouchableHighlight>
              <View style={{ flex: 1 }}></View>
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

export default Farsi2;
