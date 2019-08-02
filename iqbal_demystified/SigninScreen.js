import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
// import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'

// import RegisterPage from './RegisterPage'

// import ForgotPasswordPage from './ForgotPasswordPage'

// for formatting
// import './TabView1.css';

// var $ = require('jquery')
// window.jQuery = $

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

// const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

// const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

class Signin extends React.Component {

	constructor(props) {
		super(props)
		this.state ={

			errorMessage: '',
			username: '',
			password: '',
		  signinConfirmation: ""

		}

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({ 
		headerTitle: 'Sign In',
		 headerTintColor: 'red',
		 headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
	})

	login() {
		if(this.state.username != "" && this.state.password != "") {
			this.try_login(this.state.username, this.state.password);
		} else {
			       	Alert.alert("A username and password must be present");
			       	// this.setState({errorMessage : "A username and password must be present"});
		}       // else if user or password are empty ends
	}      // function login ends

	async try_login (inputUsername, inputPassword) {
	var that = this;
  	try{
	    // $.ajax({
	fetch(
	      // url: 'https://www.icanmakemyownapp.com/iqbal/v3/login.php',
	      'https://www.icanmakemyownapp.com/iqbal/v3/login.php',{
	      // type: 'POST',
	      method: 'POST',
	      // dataType: 'text',
		headers: {
		    // 'Content-Type': 'text/plain',
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
	      // data: {username: inputUsername, password: inputPassword},
		body: "username=" + that.state.username.trim() + "&password=" + that.state.password.trim()
		}).then(async function(data){ 
		data.text().then(async function(data) {

	      // success: (data, status, username, message) => {
	        console.log("data");
	        console.log(data);
	        if (data == "done")     {
	      		console.log("Successfully Logged in");
						that.setState({errorMessage : "Successfully Logged in"});
						that.setState({signinConfirmation: data})
						
						/*

						that.props.history.push({
						pathname: '/',
						state: { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation }
						})
						
						*/
						
						console.log("navigating to home with following parameters")
						console.log("that.state.signinConfirmation")
						console.log(that.state.signinConfirmation)


AsyncStorage.setItem(USERNAME, that.state.username);
AsyncStorage.setItem(PASSWORD, that.state.password);
AsyncStorage.setItem(MESSAGE, that.state.signinConfirmation);
						that.props.navigation.navigate('Home', { profileUsername: that.state.username, profilePassword: that.state.password, profileSigninConfirmation: that.state.signinConfirmation });
	        }
	        else {
						// this.setState({errorMessage : data});
						Alert.alert(data);
	        }
		
		});	// data.text().then ends
		})       // then async func ends
	      // }	// success function ends
	// 		})	// ajax call ends

		}	// try ends
		catch(err){
			// this.setState({errorMessage : "API call not successful"});
	   		Alert.alert("inside catch err");
	    		Alert.alert(err);
    }	// catch ends
	}	// async try_login ends

	handleChangeUsername(event) {
		this.setState({username: event.target.value})
	}

	handleChangePassword(event) {
		this.setState({password: event.target.value})
	}

	// handleSubmit
	handleSubmit(event) {
		this.login()
		event.preventDefault()
	}

	onSubmitRegister = () => {
		/*
		this.props.history.push({
			pathname: 'RegisterPage'
		})
		*/
		this.props.navigation.navigate('Register');
		
	}

	onSubmitForgot = () => {
		/*
		this.props.history.push({
			pathname: 'ForgotPasswordPage'
		})
		*/
		this.props.navigation.navigate('ForgotPassword');
		
	}
	componentDidMount() {
		// window.scrollTo(0, 0)
	}

	render() {
/*

			<div class="text-center">
				<h1>Sign In</h1>
				<form onSubmit={this.handleSubmit}>

				  <label>
				    Username:
				    <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
				  </label>
				  <p></p>

				  <label>
				    Password:
				    <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
				  </label>
				  <p></p>

				  <input type="submit" value="SIGN IN" />
				</form>

				<p onClick={() => this.onSubmitForgot()}>
					I Forgot My Password!
				</p>

				<p onClick={() => this.onSubmitRegister()}>
					Do not have an account? {"\n"}
					Register Here
				</p>
				{this.state.errorMessage}
			</div>


*/
		return (
			<View>
				{/*
				<Text style={styles.EnglishTitle}>
					SIGN IN
				</Text>
				*/}
				<View style={styles.RenderedView}>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='username'
				  style={{height: 40}}
				  placeholder="Username"
				  onChangeText={(text) => this.setState({username: text})}
				/>
				</View>

				<View style={styles.RenderedView}>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='password'
				  secureTextEntry={true}
				  style={{height: 40}}
				  placeholder="Password"
				  onChangeText={(text) => this.setState({password: text})}
				/>
				</View>

				<Button onPress={this.handleSubmit} title='SIGN IN'/>
				<TouchableHighlight onPress={() => this.onSubmitForgot()}>					
					<View style={styles.RenderedView}>
					<Text style={styles.BottomLines}>
						I Forgot My Password!
					</Text>
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
		)
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  RenderedText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  MainContainer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
  }, 
  UrduTitle : {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
  },
  EnglishTitle : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
   
  },
  BottomLines : {
    textAlign: 'center',
    fontSize: 15, 
    fontWeight: 'bold',
    color: 'blue',
   
  }
  
})

export default Signin
