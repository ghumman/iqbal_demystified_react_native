import React from 'react'
import {TextInput, Image, ScrollView, Linking, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';

import qs from 'qs';

// import StaticContentService from './StaticContentServiceYaml'

// for formatting
// import './TabView1.css';

import iconIis from './assets/android_app_assets/iqbal_com_pk.png';
import iconAcademy from './assets/android_app_assets/iap.png';


// import PoemPage from './PoemPage';

// var  YAML = require('yaml');

const FONT = "Normal";
const TEXT = "Urdu";

var radio_props_font = [
  {label: 'Normal', value: 'Normal' },
  {label: 'Nafees', value: 'Nafees' },
  {label: 'Kasheeda', value: 'Kasheeda' },
  {label: 'Fajer', value: 'Fajer' }
];

var radio_props_text = [
  {label: 'Urdu', value: 'Urdu' },
  {label: 'Roman English', value: 'Roman' }
];

class ContributeIntroductionScreen extends React.Component {

	constructor(props) {
	  super(props);
 				


	  this.state = {

	    username: "",
	    password: "",
	    signinConfirmation: "",
	    font: "Normal",
	    text: "Urdu",
	    fontIndex: -1,
	    textIndex: -1,
	    emailText: "",
	    height: 40,
	    emailText: "",
	    isFocused: false,

	    fontIndexReady: false, 
	    textIndexReady: false,
		}
	}

	static navigationOptions = ({ navigation }) => ({ 
		headerTitle: 'Contribute!',
		 headerTintColor: 'red',
		 headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
	})

 onDidFocusCustomFunction = () => {
    console.log("Inside onDidFocusCustomFunction")

    try {
    AsyncStorage.getItem(FONT)
      .then(res => {
        if (res !== null) {
		console.log("res is not equal to null: ")
		console.log(res)
		this.setState({font: res});
		switch(res) { 
		case 'Normal': 
			console.log("case is Normal")
			this.setState({fontIndex: 0})
			break;
		case 'Nafees': 
			console.log("case is Nafees")
			this.setState({fontIndex: 1})
			break;
		case 'Kasheeda': 
			console.log("case is Kasheeda")
			this.setState({fontIndex: 2})
			break;
		case 'Fajer': 
			console.log("case is Fajer")
			this.setState({fontIndex: 3})
			break;

		}
	console.log("this.state.fontIndex")
	console.log(this.state.fontIndex)
	this.setState({fontIndexReady: true})
        } else {
	  console.log("res: ")
	  console.log(res)

	this.setState({font: "Normal"})
	this.setState({fontIndex: 0})
	this.setState({fontIndexReady: true})

        }
      })
	}catch (err) { 
	  console.log("err: ")
	  console.log(err)
	this.setState({font: "Normal"});
	}

    AsyncStorage.getItem(TEXT)
      .then(res => {
        if (res !== null) {
	  console.log("res is not null: ")
	  console.log(res)
	  this.setState({text: res});
		switch(res) { 
		case 'Urdu': 
			this.setState({textIndex: 0})
			break;
		case 'Roman': 
			this.setState({textIndex: 1})
			break;
		}
	console.log("this.state.textIndex")
	console.log(this.state.textIndex)
	this.setState({textIndexReady: true})
        } else {
	  console.log("res: ")
	  console.log(res)

	this.setState({text: "Urdu"})
	this.setState({textIndex: 0})
	this.setState({textIndexReady: true})
        }
      })
}

		componentDidMount() {
			// window.scrollTo(0, 0)
      // retrive the data
	   		try {


				this.onDidFocusCustomFunction();			

				this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
				this.setState({username: this.props.navigation.getParam('profileUsername')});
				this.setState({password: this.props.navigation.getParam('profilePassword')});
				this.setState({emailText: "Asalamualikum, I want to add the Introduction of the Poem: " + this.props.navigation.getParam('poemTitle') + '\n\n\n'});
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
  updateSize = (height) => {
	      this.setState({
		            height
		          });
	    }
 handleFocus = () => this.setState({isFocused: true})

 handleBlur = () => this.setState({isFocused: false})


 sendEmailFunction() {
	 				console.log("Inside sendEmailFunciton")
	 				this.sendEmail(
					    'admin@ghummantech.com',
					    'Iqbal Demystified App - User Email',
					    this.state.emailText
				).then(() => {
					    console.log('Our email successful provided to device mail ');
				})}					

 async sendEmail(to, subject, body, options = {}) {

	 console.log("Inside sendEmail")
	    const cc = ""
	    const bcc = ""

	 console.log("Before url = mailto...")
	    let url = `mailto:${to}`;

	 console.log("Before const query")
	const query = qs.stringify({
		        subject: subject,
		        body: body,
		        cc: cc,
		        bcc: bcc
		    });

	    if (query.length) {
		            url += `?${query}`;
		        }

    console.log("Before canOpen = await Linking...")
    const canOpen = await Linking.canOpenURL(url);

	    if (!canOpen) {
		            throw new Error('Provided URL can not be handled');
		        }
    	console.log("Before return Linking...")

	    return Linking.openURL(url);
}


	render() {
		    const {emailText, height} = this.state;

		    let newStyle = {
			          height, 
			    	    backgroundColor: '#ffffff',
			      paddingLeft: 15,
			      paddingRight: 15,
					                    borderBottomColor: this.state.isFocused
					                        ? 'black'
					                        : 'red',
					                    borderBottomWidth: 1,
			    	   
			        }

		let signinTag
		var infoText = "Developer:\n\nAhmed Ghumman\n\n"
		// var infoText2 = "\n\nFor suggestions and reporting bugs: admin@ghummantech.com\n\nSpecial thanks to Iqbal Demystified Android App Developers:\n\nAZEEM GHUMMAN\n\nFAIZAN KHAN\n\nاخلاص عمل مانگ نيا گان کہن سے\n'!شاہاں چہ عجب گر بنوازند گدا را'\n\nMay Allah give them reward for making the code open source."
		var infoText2 = "\n\nSpecial thanks to Iqbal Demystified Android App Developers:\n\nAZEEM GHUMMAN\n\nFAIZAN KHAN\n\nاخلاص عمل مانگ نيا گان کہن سے\n'!شاہاں چہ عجب گر بنوازند گدا را'\n\nMay Allah give them reward for making the code open source."

		var infoTextTokens = infoText.split('\n').map((item, key) => {
			  return <Text style={styles.RenderedText} key={key}>{item}</Text>
		})
		var infoTextTokens2 = infoText2.split('\n').map((item, key) => {
			  return <Text style={styles.RenderedText} key={key}>{item}</Text>
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
	var showFontRadioForm
	if (this.state.fontIndexReady)
		showFontRadioForm = <RadioForm
		  radio_props={radio_props_font}
		  initial= {this.state.fontIndex}
		  onPress={(value) => AsyncStorage.setItem(FONT, value)}
		/>
	else 
		showFontRadioForm = null;
			
	var showTextRadioForm
	if (this.state.textIndexReady)
		showTextRadioForm = <RadioForm
		  radio_props={radio_props_text}
		  initial={this.state.textIndex}
		  onPress={(value) => {AsyncStorage.setItem(TEXT, value)}}
		/>
	else 
		showTextRadioForm = null;

		return (
			<View>
				<ScrollView>
				{/*
				<Text style={styles.EnglishTitle}>Settings</Text>	
				*/}
				<Text style={styles.RenderedText}>Submit Your Contribution!</Text>

				<Text style={{color: 'black'}}>If you have any suggestions, feel free to share with us. We would really appreciate your help. Visit our Facebook Page to see how you can help this project.</Text>

			<TextInput
			      onFocus={this.handleFocus}
			      onBlur={this.handleBlur}
			      placeholder="Message..."
			      onChangeText={(emailText) => this.setState({emailText})}
			      style={[newStyle]}
			      editable={true}
			      multiline={true}
			      value={emailText}
			      onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
			    />

				<Text style={{color: 'green'}}>Note:</Text>
				<Text style={{color: 'green'}}>If your introduction is selected, it will be included in the next update of the app and you will be given credit for that introduction.</Text>
				<Text></Text>
				<Text style={{color: 'green'}}>It will also be featured on our Facebook Page!</Text>
				<View style={styles.RenderedTextFeedbackView}>
				<TouchableHighlight onPress={() =>this.sendEmailFunction()}>
					<Text style={styles.RenderedTextFeedback}>
						SUBMIT
					</Text>
		
				</TouchableHighlight>
				</View>
    


				</ScrollView>

			</View>
		)	// return ends
	}	// render function ends
}	// class ends

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  RenderedView: {
    // height: 44,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  RenderedTextFeedbackView: {
    backgroundColor: 'gray',
    padding: 10,
  },
  RenderedTextFeedback: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    // height: 44,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',

  },

  RenderedText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    // height: 44,
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
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
  ImageView: {
    // flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain'
    justifyContent: 'center',
    alignItems: 'center',


  },
  WebsiteTitle : {
    textAlign: 'center',
    fontSize: 20, 
    // fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
   
  }
  
})

export default ContributeIntroductionScreen
