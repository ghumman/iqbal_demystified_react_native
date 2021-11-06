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
const sharedConstants = require("../../shared/Constants");

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMessage: ""
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = ({ }) => ({
    headerTitle: "Forgot Password",
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
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onSubmitSignin = () => {
    this.props.navigation.navigate("Signin");
  };

  // handleSubmit
  handleSubmit(event) {
    var that = this;
    if (this.state.email.trim() != "") {
      try {
        fetch(sharedConstants.BACKEND_URL + "forgot-password.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: { email: this.state.email },
          body: "email=" + that.state.email
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data.trim() == "email sent") {
              Alert.alert(
                "Email sent with the new password. Please check your email."
              );

              that.props.navigation.navigate("Signin");
            } // if data.trim == email sent ends
            else if (data.trim() == "email not found") {
              Alert.alert(
                "Could not found email in our system, please double check email address or create a new account."
              );
            } // elese if ends
          }); // data.text().then ends
        }); // then async func ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      } // catch ends
    } // if email not empty ends
    else {
      Alert.alert("Email can not be empty");
    }
    event.preventDefault();
  }

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
            autoCompleteType="email"
            style={{ height: 40 }}
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
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
            <Button color="black" onPress={this.handleSubmit} title="RESET MY PASSWORD" />
          </View>
        </View>

        <TouchableHighlight onPress={() => this.onSubmitSignin()}>
          <Text style={styles.BottomLines}>
            Already Registered?{"\n"}
            Login Here
          </Text>
        </TouchableHighlight>
      </View>
    ); // return ends
  } // render ends
} // class ends

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

export default ForgotPassword;
