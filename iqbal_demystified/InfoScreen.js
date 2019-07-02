import React from 'react'
import {Linking, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
// import StaticContentService from './StaticContentServiceYaml'

// for formatting
// import './TabView1.css';


// import PoemPage from './PoemPage';

// var  YAML = require('yaml');

class InfoPage extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {

	    username: "",
	    password: "",
	    signinConfirmation: ""
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

			catch(e) {
				console.log("Inside catch");
			}
    }

/*
		signMeIn = () => {

		  if (this.state.username == "") {
		  	this.props.history.push({
			    pathname: '/RegisterPage',
			    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
		  	})
		  }

	  }
*/

	render() {

		let signinTag
		var infoText = "Developer:\n\nAhmed Ghumman\n\n"
		var infoText2 = "\n\nFor suggestions and reporting bugs: admin@ghummantech.com\n\nSpecial thanks to Iqbal Demystified Android App Developers:\n\nAZEEM GHUMMAN\n\nFAIZAN KHAN\n\nاخلاص عمل مانگ نيا گان کہن سے\n'!شاہاں چہ عجب گر بنوازند گدا را'\n\nMay Allah give them reward for making the code open source."

		var infoTextTokens = infoText.split('\n').map((item, key) => {
			  return <Text key={key}>{item}</Text>
		})
		var infoTextTokens2 = infoText2.split('\n').map((item, key) => {
			  return <Text key={key}>{item}</Text>
		})

/*

		var signinMessageLocal = ""
		if (this.state.signinConfirmation  === "done") {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase()
		  signinTag = <button type="button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>
		}
		else {
			signinMessageLocal = "Sign In"
		  signinTag = <button type="button" class="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>
		}
*/
/*

			<div class="text-center">
				<div class="text-right">
				{signinTag}
				</div>
				<div>
				{infoTextTokens}
				</div>
				<a href="https://ghummantech.com"> https://ghummantech.com </a>
				<div class="sherPageText">
				{infoTextTokens2}
				</div>
			</div>

*/

		return (
			<View>
				{infoTextTokens} 
				<Text onPress={() => Linking.openURL('https://ghummantech.com')}> GHUMMAN TECH </Text>
				{infoTextTokens2}

			</View>
		)	// return ends
	}	// render function ends
}	// class ends

export default InfoPage
