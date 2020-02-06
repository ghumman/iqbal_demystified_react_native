import React from "react";
import {
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  View,
  Text
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      currentPassword: "",
      newPassword1: "",
      newPassword2: "",
      newPassword: "",
      errorMessage: ""
    };

    this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(
      this
    );
    this.handleChangeNewPassword1 = this.handleChangeNewPassword1.bind(this);
    this.handleChangeNewPassword2 = this.handleChangeNewPassword2.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Change Password",
    headerTintColor: "red",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  // handlechange
  handleChangeCurrentPassword(event) {
    this.setState({ currentPassword: event.target.value });
  }

  handleChangeNewPassword1(event) {
    this.setState({ newPassword1: event.target.value });
  }

  handleChangeNewPassword2(event) {
    this.setState({ newPassword2: event.target.value });
  }

  onSubmitSignin = () => {
    this.props.navigation.navigate("Signin");
  };

  // handleSubmit
  handleSubmit(event) {
    var that = this;
    event.preventDefault();
    console.log("Inside Change Password: inside handleSubmit");
    console.log("this.state.username");
    console.log(this.state.username);

    console.log("this.state.password");
    console.log(this.state.password);

    console.log("this.state.currentPassword");
    console.log(this.state.currentPassword);

    console.log("this.state.newPassword1");
    console.log(this.state.newPassword1);

    console.log("this.state.newPassword2");
    console.log(this.state.newPassword2);

    if (
      this.state.currentPassword != "" &&
      this.state.newPassword1 != "" &&
      this.state.newPassword2 != ""
    ) {
      if (this.state.newPassword1.trim() == this.state.newPassword2.trim()) {
        this.setState({ newPassword: this.state.newPassword1 });
        try {
          console.log(
            "Inside try inside chnagepasswordscreen inside trying to change password"
          );
          fetch(
            "https://www.icanmakemyownapp.com/iqbal/v3/change-password.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body:
                "username=" +
                that.state.username.trim() +
                "&old_password=" +
                that.state.currentPassword.trim() +
                "&new_password=" +
                that.state.newPassword1.trim()
            }
          ).then(async function(data) {
            data.text().then(async function(data) {
              console.log("data");
              console.log(data);
              if (data.trim() == "done") {
                Alert.alert("Password Successfully Changed");
                console.log("Password Successfully Changed");

                that.setState({ signinConfirmation: data });
                that.setState({ password: that.state.newPassword });

                AsyncStorage.setItem(USERNAME, that.state.username);
                AsyncStorage.setItem(PASSWORD, that.state.password);
                AsyncStorage.setItem(MESSAGE, that.state.signinConfirmation);
                that.props.navigation.navigate("Home", {
                  profileUsername: that.state.username,
                  profilePassword: that.state.password,
                  profileSigninConfirmation: that.state.signinConfirmation
                });
              } // if data is equal to done ends
              else {
                Alert.alert("Unable to register your account:" + data);
              }
            }); // data.text().then ends
          }); // then async func ends
        } catch (err) {
          // try ends
          console.log(
            "Inside catch err inside ChangePasswordScreen inside trying to change password, err: "
          );
          console.log(err);
          Alert.alert("inside catch err");
          Alert.alert(err);
        } // catch finishes
      } // if passwords are same ends
      else {
        // passwords are not same
        Alert.alert("Passwords do not match");
      } // if email not empty ends
    } // if fields  are not empty ends
    else {
      Alert.alert("All fields are required");
    }
  }

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
      console.log("Inside catch");
      console.log("Not signed in or just started the app");

      this.setState({ signinConfirmation: "not signed in" });
      this.setState({ username: "" });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            secureTextEntry={true}
            style={{ height: 40 }}
            placeholder="Current Password"
            onChangeText={text => this.setState({ currentPassword: text })}
          />
        </View>
        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            secureTextEntry={true}
            style={{ height: 40 }}
            placeholder="New Password"
            onChangeText={text => this.setState({ newPassword1: text })}
          />
        </View>
        <View style={styles.RenderedView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            secureTextEntry={true}
            style={{ height: 40 }}
            placeholder="New Password(again)"
            onChangeText={text => this.setState({ newPassword2: text })}
          />
        </View>

        <Button onPress={this.handleSubmit} title="CHANGE PASSWORD!" />
        <TouchableHighlight onPress={() => this.onSubmitSignin()}>
          <Text style={styles.BottomLines}>
            Already Registered?{"\n"}
            Login Here
          </Text>
        </TouchableHighlight>
      </View>
    ); // return ends
  } // render function ends
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
    color: "blue"
  }
});

export default ChangePassword;
