import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

// import SigninPage from './SigninPage'

// for formatting
// import './TabView1.css';

// var $ = require('jquery')
// window.jQuery = $

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

class ChangePassword extends React.Component {

	constructor(props) {
		super(props)
		this.state ={

			username: '',
			password: '',
			signinConfirmation: "",

			currentPassword: '',
			newPassword1: '',
			newPassword2: '',
			newPassword: '',
			errorMessage: ''

		}

		this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(this);
		this.handleChangeNewPassword1 = this.handleChangeNewPassword1.bind(this);
		this.handleChangeNewPassword2 = this.handleChangeNewPassword2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handlechange
	handleChangeCurrentPassword(event) {
		this.setState({currentPassword: event.target.value})
	}

	handleChangeNewPassword1(event) {
		this.setState({newPassword1: event.target.value})
	}

	handleChangeNewPassword2(event) {
		this.setState({newPassword2: event.target.value})
	}

	onSubmitSignin = () => {

		/*
		this.props.history.push({
			pathname: 'SigninPage',
			state: {none: 'none'}
		})
		*/
		this.props.navigation.navigate('Signin');

	}






	// handleSubmit
	handleSubmit(event) {
		var that = this; 
		event.preventDefault()
		console.log("Inside Change Password: inside handleSubmit")
		console.log("this.state.username")
		console.log(this.state.username)

		console.log("this.state.password")
		console.log(this.state.password)

		console.log("this.state.currentPassword")
		console.log(this.state.currentPassword)

		console.log("this.state.newPassword1")
		console.log(this.state.newPassword1)
	
		console.log("this.state.newPassword2")
		console.log(this.state.newPassword2)

  	if(this.state.currentPassword != "" && this.state.newPassword1 != "" && this.state.newPassword2 != "") {
			if (this.state.newPassword1.trim() == this.state.newPassword2.trim()){
				this.setState({newPassword: this.state.newPassword1})
			
				try{
					console.log("Inside try inside chnagepasswordscreen inside trying to change password")
					// $.ajax({
					fetch(
						// url: 'https://www.icanmakemyownapp.com/iqbal/v3/change-password.php',
						'https://www.icanmakemyownapp.com/iqbal/v3/change-password.php',{
    				// type: 'POST',
    				method: 'POST',
     				// dataType: 'text',
				headers: {
				    // 'Content-Type': 'text/plain',
				    'Content-Type': 'application/x-www-form-urlencoded'
				},
		 				// data: {username: this.state.username, old_password: this.state.currentPassword, new_password: this.state.newPassword},
						body: "username=" + that.state.username.trim() + "&old_password=" + that.state.currentPassword.trim() + "&new_password=" + that.state.newPassword1.trim()

     				// success: (data) => {	// success funciton starts
				}).then(async function(data){ 
				data.text().then(async function(data) {
							console.log("data");
							console.log(data);
							if (data.trim() == "done")	{
								Alert.alert("Password Successfully Changed");
								console.log("Password Successfully Changed");
								// this.setState({errorMessage : "Password Successfully Changed"});
								that.setState({signinConfirmation: data})
								that.setState({password: that.state.newPassword})

						/*
		    				this.props.history.push({
    	    					pathname: '/',
    	    					state: { profileUsername: this.state.username, profilePassword: this.state.newPassword, profileSigninConfirmation: this.state.signinConfirmation }
		    				})
						*/
					
AsyncStorage.setItem(USERNAME, that.state.username);
AsyncStorage.setItem(PASSWORD, that.state.password);
AsyncStorage.setItem(MESSAGE, that.state.signinConfirmation);
						that.props.navigation.navigate('Home', { profileUsername: that.state.username, profilePassword: that.state.password, profileSigninConfirmation: that.state.signinConfirmation });

							}	// if data is equal to done ends
							else {
								Alert.alert("Unable to register your account:" + data);
								// this.setState({errorMessage : "Unable to register your account:" + data});
							}

				});	// data.text().then ends
				})       // then async func ends
     				// }	// success function ends
				// 	});	// ajax call ends

				}	// try ends
				catch(err){
					console.log("Inside catch err inside ChangePasswordScreen inside trying to change password, err: ")
					console.log(err)
					Alert.alert("inside catch err");
					Alert.alert(err);
					// this.setState({errorMessage : err});
				}	// catch finishes
			}	// if passwords are same ends
			else {	// passwords are not same

				Alert.alert("Passwords do not match");
				// this.setState({errorMessage : "Passwords do not match"});

			}	// if email not empty ends
		}	// if fields  are not empty ends

		else {
    	Alert.alert("All fields are required");
			// this.setState({errorMessage: "All fields are required"})
		}
	}

	componentDidMount() {
		// window.scrollTo(0, 0)
	  // retrive the data
		try {
			/*
	  		this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
	  		this.setState({username: this.props.location.state.profileUsername});
	  		this.setState({password: this.props.location.state.profilePassword});
			*/

                        this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
                        this.setState({username: this.props.navigation.getParam('profileUsername')});
                        this.setState({password: this.props.navigation.getParam('profilePassword')});
		}

		catch (e) {

			console.log("Inside catch")
			console.log("Not signed in or just started the app");

			this.setState({signinConfirmation: 'not signed in'});
			this.setState({username: ''});
		}
	}


	render() {
			/*
			<div class="text-center">
				<h1>CHANGE PASSWORD</h1>
				<form onSubmit={this.handleSubmit}>

				  <label>
				    Current Password:
				    <input type="text" value={this.state.currentPassword} onChange={this.handleChangeCurrentPassword} />
				  </label>
					<p></p>

				  <label>
				    New Password:
				    <input type="text" value={this.state.newPassword1} onChange={this.handleChangeNewPassword1} />
				  </label>
					<p></p>

				  <label>
				    New Password(again):
				    <input type="text" value={this.state.newPassword2} onChange={this.handleChangeNewPassword2} />
				  </label>
					<p></p>

				  <input type="submit" value="CHANGE PASSWORD!" />
				</form>
				<p onClick={() => this.onSubmitSignin()}>

					Already Registered?{"\n"}
					Login Here

				</p>

				<p>
					{this.state.errorMessage}
				</p>
			</div>
			*/
		return (
			<View>
				<Text>
					CHANGE PASSWORD
				</Text>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='password'
				  secureTextEntry={true}
				  style={{height: 40}}
				  placeholder="Current Password"
				  onChangeText={(text) => this.setState({currentPassword: text})}
				/>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='password'
				  secureTextEntry={true}
				  style={{height: 40}}
				  placeholder="New Password"
				  onChangeText={(text) => this.setState({newPassword1: text})}
				/>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='password'
				  secureTextEntry={true}
				  style={{height: 40}}
				  placeholder="New Password(again)"
				  onChangeText={(text) => this.setState({newPassword2: text})}
				/>

				<Button onPress={this.handleSubmit} title='CHANGE PASSWORD!'/>
				<TouchableHighlight onPress={() => this.onSubmitSignin()}>					
					<Text>
						Already Registered?{"\n"}
						Login Here
					</Text>
		
				</TouchableHighlight>
			</View>
		)	// return ends
	}	// render function ends
}	// class ends

export default ChangePassword
