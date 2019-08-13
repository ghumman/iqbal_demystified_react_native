import React from 'react';
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";

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

	static navigationOptions = ({ navigation }) => ({ 
		headerTitle: 'Forgot Password',
		headerTintColor: 'red',
		headerTitleStyle: {
		  fontWeight: 'bold',
		  fontSize: 20, 
		  textAlign: 'center',
		},
	})


	// handlechange
	handleChangeEmail(event) {
		this.setState({email: event.target.value})
	}

	onSubmitSignin = () => {
		this.props.navigation.navigate('Signin');
	}

	// handleSubmit
	handleSubmit(event) {
	var that = this;
  	if(this.state.email.trim() != "") {
			try{
				fetch(

					'https://www.icanmakemyownapp.com/iqbal/v3/forgot-password.php',{
        		method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: {email: this.state.email},
						body: "email=" + that.state.email
						}).then(async function(data){ 
							data.text().then(async function(data) {
								console.log("data");
								console.log(data);
								if (data.trim() == "email sent")	{
									console.log(data);
									Alert.alert("Email sent with the new password. Please check your email.");
									
									that.props.navigation.navigate('Signin');
								}	// if data.trim == email sent ends
								else if (data.trim() == "email not found"){
									Alert.alert("Could not found email in our system, please double check email address or create a new account.");
								}	// elese if ends
							});	// data.text().then ends
						})       // then async func ends
					}
			catch(err){
				Alert.alert("inside catch err");
				Alert.alert(err);
			}	// catch ends
		}	// if email not empty ends
		else {
			console.log("Email can not be empty");
			Alert.alert("Email can not be empty");
		}
		event.preventDefault()
	}

	render() {
		return (
			<View>
				<View style={styles.RenderedView}>
					<TextInput
						autoCapitalize= 'none'
						autoCorrect= {false}
						autoCompleteType='email'
						style={{height: 40}}
						placeholder="Email" onChangeText={(text) => this.setState({email: text})}
					/>
				</View>
				<Button onPress={this.handleSubmit} title='RESET MY PASSWORD'/>
				<TouchableHighlight onPress={() => this.onSubmitSignin()}>					
					<Text style={styles.BottomLines}>
						Already Registered?{"\n"}
						Login Here
					</Text>
		
				</TouchableHighlight>
			</View>
		)	// return ends
	}	// render ends
}	// class ends

const styles = StyleSheet.create({
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  BottomLines : {
    textAlign: 'center',
    fontSize: 15, 
    fontWeight: 'bold',
    color: 'blue',
   
  }
  
})

export default ForgotPassword
