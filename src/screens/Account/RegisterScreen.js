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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinConfirmation: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
      errorMessage: "",
      password: ""
    };

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword1 = this.handleChangePassword1.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = ({ }) => ({
    headerTitle: "Register",
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

  // handlechange
  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword1(event) {
    this.setState({ password1: event.target.value });
  }

  handleChangePassword2(event) {
    this.setState({ password2: event.target.value });
  }

  onSubmitSignin = () => {
    this.props.navigation.navigate("Signin");
  };

  // handleSubmit
  handleSubmit(event) {
    var that = this;

    if (this.state.password1.trim() == this.state.password2.trim()) {
      this.setState({ password: this.state.password1 });
      try {
        fetch(sharedConstants.BACKEND_URL + "create-account.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "first_name=" +
            that.state.firstName.trim() +
            "&last_name=" +
            that.state.lastName.trim() +
            "&username=" +
            that.state.username.trim() +
            "&password=" +
            that.state.password1.trim() +
            "&email=" +
            that.state.email.trim()
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (
              data.trim() ==
              "Your account has been created! Please check your email and activate your account by clicking on a link that we have sent you in the email. Don't forget to check in your Junk folder."
            ) {
              Alert.alert(data);
              that.setState({ signinConfirmation: "done" });

              AsyncStorage.setItem(USERNAME, that.state.username);
              AsyncStorage.setItem(PASSWORD, that.state.password1);
              AsyncStorage.setItem(MESSAGE, "done");
              that.props.navigation.navigate("Home", {
                profileUsername: that.state.username,
                profilePassword: that.state.password1,
                profileSigninConfirmation: "done"
              });
            } // if data.trim... ends
            // else if account not registered
            else {
              Alert.alert("Unable to register your account:" + data);
            }
          }); // data.text().then ends
        }); // then async func ends
      } catch (err) {
        // try ends
        Alert.alert("inside catch err");
        Alert.alert(err);
      } // catch ends
    } // if both passwords are same end
    else {
      Alert.alert("Passwords are not same");
    }
    event.preventDefault();
  } // handleSubmit(event) ends

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
            autoCompleteType="name"
            style={{ height: 40 }}
            placeholder="First Name"
            onChangeText={text => this.setState({ firstName: text })}
          />
        </View>

        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="name"
            style={{ height: 40 }}
            placeholder="Last Name"
            onChangeText={text => this.setState({ lastName: text })}
          />
        </View>

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
            autoCompleteType="email"
            style={{ height: 40 }}
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
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
            onChangeText={text => this.setState({ password1: text })}
          />
        </View>

        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            style={{ height: 40 }}
            placeholder="Password (again)"
            onChangeText={text => this.setState({ password2: text })}
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
            <Button color="black" onPress={this.handleSubmit} title="REGISTER" />
          </View>
        </View>
        <View>
          <TouchableHighlight onPress={() => this.onSubmitSignin()}>
            <Text style={styles.BottomLines}>
              Already Registered?{"\n"}
              Login Here
          </Text>
          </TouchableHighlight>
        </View>
      </View>
    ); // return ends
  } // render function ends
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

export default Register;
