import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";

// import SigninPage from './SigninPage'

// var $ = require('jquery')
// window.jQuery = $

class ForgotPassword extends React.Component {

	constructor(props) {
		super(props)
		this.state ={

			email: '',
			errorMessage: ''

		}

		this.handleChangeEmail = this.handleChangeEmail.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handlechange
	handleChangeEmail(event) {
		this.setState({email: event.target.value})
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
  	if(this.state.email.trim() != "") {
			try{
				// $.ajax({
				fetch(

					// url: 'https://www.icanmakemyownapp.com/iqbal/v3/forgot-password.php',
					'https://www.icanmakemyownapp.com/iqbal/v3/forgot-password.php',{
        	// type: 'POST',
        	method: 'POST',
         	// dataType: 'text',
		headers: {
		    // 'Content-Type': 'text/plain',
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
		// data: {email: this.state.email},
		data: {email: this.state.email},
		body: "email=" + that.state.email
         	// success: (data) => {	// success funciton starts
		}).then(async function(data){ 
		data.text().then(async function(data) {
						console.log("data");
						console.log(data);
						if (data.trim() == "email sent")	{
							// $("#statusMessage").text("Email sent.");
							console.log(data);
							Alert.alert("Email sent with the new password. Please check your email.");
							// this.setState({errorMessage : "Email sent with the new password. Please check your email."});

							
							that.props.navigation.navigate('Signin');
							/*
							this.props.history.push({
								pathname: 'SigninPage',
								state: {none: 'none'}
							})	// this.props.history.push ends
							*/

						}	// if data.trim == email sent ends
						else if (data.trim() == "email not found"){
							Alert.alert("Could not found email in our system, please double check email address or create a new account.");
							// this.setState({errorMessage : "Could not found email in our system, please double check email address or create a new account."});
						}	// elese if ends
		});	// data.text().then ends
		})       // then async func ends
         	// }	// success function ends
		// 		});	// ajax call ends

			}
			catch(err){
				Alert.alert("inside catch err");
				Alert.alert(err);
				// this.setState({errorMessage : err});
			}	// catch ends
		}	// if email not empty ends
		else {
			console.log("Email can not be empty");
			Alert.alert("Email can not be empty");
			// this.setState({errorMessage: "Email can not be empty"})
		}
		event.preventDefault()
	}
	componentDidMount() {
		// window.scrollTo(0, 0)
	}

	render() {
/*


			<div class="text-center">
      	<h1>FORGOT PASSWORD</h1>
				<form onSubmit={this.handleSubmit}>
				  <label>
				    Email:
				    <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
				  </label>
				  <p></p>
				  <input type="submit" value="RESET MY PASSWORD!" />
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
					FORGOT PASSWORD
				</Text>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='email'
				  style={{height: 40}}
				  placeholder="Email" onChangeText={(text) => this.setState({email: text})}
				/>
				<Button onPress={this.handleSubmit} title='RESET MY PASSWORD'/>
				<TouchableHighlight onPress={() => this.onSubmitSignin()}>					
					<Text>
						Already Registered?{"\n"}
						Login Here
					</Text>
		
				</TouchableHighlight>
			</View>
		)	// return ends
	}	// render ends
}	// class ends

export default ForgotPassword