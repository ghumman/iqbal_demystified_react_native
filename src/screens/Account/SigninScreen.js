import React from "react";
import {
  TextInput,
  Button,
  TouchableHighlight,
  StyleSheet,
  Alert,
  View,
  Text
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const sharedConstants = require("../../shared/Constants");

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      username: "",
      password: "",
      signinConfirmation: ""
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = ({ }) => ({
    headerTitle: "Sign In",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  login() {
    if (this.state.username != "" && this.state.password != "") {
      this.try_login();
    } else {
      Alert.alert("A username and password must be present");
    } // else if user or password are empty ends
  } // function login ends

  async try_login() {
    var that = this;
    try {
      fetch(sharedConstants.BACKEND_URL + "login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
          "username=" +
          that.state.username.trim() +
          "&password=" +
          that.state.password.trim()
      }).then(async function (data) {
        data.text().then(async function (data) {
          if (data == "done") {
            that.setState({ errorMessage: "Successfully Logged in" });
            that.setState({ signinConfirmation: data });

            AsyncStorage.setItem(USERNAME, that.state.username);
            AsyncStorage.setItem(PASSWORD, that.state.password);
            AsyncStorage.setItem(MESSAGE, "done");
            that.props.navigation.navigate("Home", {
              profileUsername: that.state.username,
              profilePassword: that.state.password,
              profileSigninConfirmation: "done"
            });
          } else {
            Alert.alert(data);
          }
        }); // data.text().then ends
      }); // then async func ends
    } catch (err) {
      // try ends
      Alert.alert("inside catch err");
      Alert.alert(err);
    } // catch ends
  } // async try_login ends

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  // handleSubmit
  handleSubmit(event) {
    this.login();
    event.preventDefault();
  }

  onSubmitRegister = () => {
    this.props.navigation.navigate("Register");
  };

  onSubmitForgot = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="username"
            style={{ height: 40 }}
            placeholder="Username"
            onChangeText={text => this.setState({ username: text })}
          />
        </View>

        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            secureTextEntry={true}
            style={{ height: 40 }}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <Button color="black" onPress={this.handleSubmit} title="SIGN IN" />
          </View>
        </View>


        <TouchableHighlight onPress={() => this.onSubmitForgot()}>
          <View style={styles.RenderedView}>
            <Text style={styles.BottomLines}>I Forgot My Password!</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onSubmitRegister()}>
          <View style={styles.RenderedView}>
            <Text style={styles.BottomLines}>
              Do not have an account? {"\n"}
              Register Here
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  BottomLines: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "black"
  }
});

export default Signin;
