import React from 'react'
import {Image, Platform, ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import Moment from 'moment';

// import Tabs from './Tabs';

// for formatting
// import './TabView1.css';

// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

// import Divider from '@material-ui/core/Divider';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import iconUpVote from './assets/android_app_assets/vote_up_unselected.png';
import iconDownVote from './assets/android_app_assets/vote_down_unselected.png';

var RNFS = require('react-native-fs');
var  YAML = require('yaml');

// var $ = require('jquery');
// window.jQuery = $

class SherPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
	    username: "",
	    password: "",
	    signinConfirmation: "",

    	listId: "List_001",
    	    sherId: "",
	    sherText: [],
	    wordText: [],
	    poemText: [],
	    sherObjects: [],
	    sherGeneralDiscussionServerResponse: [],
	    sherDiscussionDetail: [],
	    wordDiscussionDetail: [],
	    mySelectedWord: "",
	    mySelectedId: "1",
	    
	    userMessageSher: "",
	    userMessageWord: "",

            key: 'home'
    }
		this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
		this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

		this.handleSubmitSher = this.handleSubmitSher.bind(this);
		this.handleSubmitWord = this.handleSubmitWord.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({ 
        	title: 'Word Meanings',
		headerTitle: navigation.state.params.title || '',
		 headerTintColor: 'red',
		 headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
	})


	handleUserMessageSher(event) {
		this.setState({userMessageSher: event.target.value})
	}

	handleUserMessageWord(event) {
		this.setState({userMessageWord: event.target.value})
	}


	handleSubmitSher(event) {
	console.log("username: ")
	console.log(this.state.username)
	console.log("password: ")
	console.log(this.state.password)
		this.send_sher_message()
		event.preventDefault()
	}

	handleSubmitWord(event) {

	console.log("Inside handleSubmitWord");


	console.log("Going to send_word_message");
		this.send_word_message()
		event.preventDefault()
	}

async send_sher_message(){
	console.log("Inside send_sher_message");
	console.log("username: ")
	console.log(this.state.username)
	console.log("password: ")
	console.log(this.state.password)

	var that = this;

	// do not try pushing comment if message is empty
	if (this.state.userMessageSher.trim() != ""){
	
	// if user is not signed in, ask user to sign in
	if ((this.state.username.trim() != "") && (this.state.password.trim() != "")) {
	
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
			'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "general", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageSher},
		 	// body: [{sher: this.state.sherId, discussion_type: "general", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageSher}]
		 	body: "sher=" + that.state.sherId + "&discussion_type=general&username=" + that.state.username + "&password=" + that.state.password + "&comment_text=" + that.state.userMessageSher
		}).then(async function(data){ 
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				console.log("Inside then async func")
				that.getSherGeneralDiscussion(that.state.sherId);	
	

                 	})	// success function ends
		// });	// ajax call ends

	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	

	// console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
	}	// if not logged in empty
	else{

		Alert.alert("Please login first to add comments.");
	}
	}	// if message is empty ends
	
	else {
		Alert.alert("Comments can not be empty");
	}
}

// send_word_message(messageWord){
async send_word_message(){
	console.log("Inside send_word_message")

	console.log("sending message using body: sher= + that.state.sherId + &discussion_type=word-meanings&username= + that.state.username + &password= + that.state.password + &comment_text= + that.state.userMessageSher + &word_position= + that.state.mySelectedId")

	console.log("this.state.sherId: ")
	console.log(this.state.sherId )

	console.log("this.state.username: ")
	console.log(this.state.username  )

	console.log("this.state.pasword: ")
	console.log(this.state.password  )

	console.log("this.state.userMessage: ")
	console.log(this.state.userMessageWord  )

	console.log("this.state.mySelectedId: ")
	console.log(this.state.mySelectedId  )

	// console.log("messageWord sent to send word message function");
	// console.log(this.messageWord);
	// do not try pushing comment if message is empty
	var that = this;
	if (this.state.userMessageWord.trim() != ""){
	
	// if user is not signed in, ask user to sign in
	if ((this.state.username.trim() != "") && (this.state.password.trim() != "")) {
	
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
			'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageWord, word_position: this.state.mySelectedId+1},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageWord, word_position: this.state.mySelectedId+1}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&username=" + that.state.username + "&password=" + that.state.password + "&comment_text=" + that.state.userMessageWord + "&word_position=" + that.state.mySelectedId
			}).then(async function(data){
                 	// success: (data) => {	// success funciton starts

				console.log("data");
				console.log(data);
				that.getSherWordDiscussion(that.state.sherId);
	
                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);

	}	// if not logged in empty
	else{

		Alert.alert("Please login first to add comments.");
	}
	}	// if message is empty ends
	
	else {
		Alert.alert("Comments can not be empty");
	}

}


	onSubmit = (sherNumber) => {
	  this.props.history.push({
		    pathname: '/SherPage',
		    state: { detailSher: sherNumber,  profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password  }
	  })
	}

  async getSherGeneralDiscussion(sherName) {
    var that = this;
    try{
	console.log("sherName: ")
	console.log(sherName)
	var localData = { sher: sherName, discussion_type: "general"}
	     // $.ajax({
	     fetch(
       // url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
       	     'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',{
	     // type: 'POST',
	     method: 'POST',
	     // dataType: 'text',
	    		headers: {
            // 'Content-Type': 'text/plain',
            // 'Content-Type': 'application/json'
	    'Content-Type': 'application/x-www-form-urlencoded'

            },
	     // data: {sher: sherName, discussion_type: "general"},
	     // body: JSON.stringify({ sher: sherName, discussion_type: "general"})
	     body: "sher=" + sherName + "&discussion_type=general"
	     // body: localData
	     }).then(async function(data){
	     // success: (data) => {    // success funciton starts
		// data = data.text();

		// console.log("data: ")
		// console.log(data)
		// console.log("data.text(): ")
		// console.log(data.json())

		data.json().then(async function(data) {

		console.log("data: ")
		console.log(data)


		// console.log("data.json(): ")
		// console.log(data.json())
	        var sherArray = sherName.split("_");

		var path = "";
		var yamlFile = "";

          // const yamlFile = require('!raw-loader!./assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');

	if (Platform.OS == 'ios'){
          path = RNFS.MainBundlePath + '/assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml';
	  yamlFile = await RNFS.readFile(path, "utf8");
	}
	else if (Platform.OS == 'android'){
          path = 'poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml';
	  yamlFile = await RNFS.readFileAssets(path, "utf8");
	}

          console.log("After calling yamlFiles");
          console.log("Value of yamlFile");
          console.log(yamlFile);

          var sherIndex = sherArray[2] - 1;
          var yamlObject = YAML.parse(yamlFile);

          console.log("this is the sher text");
          console.log(yamlObject.sher[sherIndex].sherContent[0].text);

          var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

          var sherTextLocal = sherTextTemp.split('|');
          that.setState({sherText : sherTextLocal});

          console.log("that.state.sherText");
          console.log(that.state.sherText);

	        var wordTextLocal = that.state.sherText[0].split(" ").concat(that.state.sherText[1].split(" "));
	        var ii;
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log("Original array: ")
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            for (ii=0; ii<wordTextLocal.length;ii++)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             	                  console.log(wordTextLocal[ii]);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	for (ii=0; ii<wordTextLocal.length; ii++){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (wordTextLocal[ii] == "" || wordTextLocal[ii] == " " || wordTextLocal[ii] == "،"){
			                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               wordTextLocal.splice(ii,1);                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ii--;
              	 console.log("inside if Value of wordTextLocal[ii]");
              	 console.log(ii);
              	 console.log(wordTextLocal[ii]);
          	}
            	else {
            		console.log("inside else before replace Value of wordTextLocal[ii]");
                console.log(ii);
              	console.log(wordTextLocal[ii]);

			          wordTextLocal[ii] = wordTextLocal[ii].replace(/[|&!;$%@"<>()+,]/g, "");
              	console.log("inside else Value of wordTextLocal[ii]")
          			console.log(ii);
          			console.log(wordTextLocal[ii]);

            	}  // else ends

          } // for wordTextLocal.... ends
          console.log("wordTextLocal.length");
          console.log(wordTextLocal.length);
          for (ii=0; ii<wordTextLocal.length;ii++)
          	console.log(wordTextLocal[ii]);

	        if (wordTextLocal[6] == "")
            console.log("Empty string");
          else if (wordTextLocal[6] == " ")
            console.log("Space string");
          else {
            console.log("Neither empty nor space: ");
		        console.log(wordTextLocal[6]);
	        }

      	  // make wordTextLocal equal to this.state.wordText
      	  that.setState({wordText: wordTextLocal});


      	  // this.sherText = yamlObject.sher[sherIndex].sherContent[0].text;
      	  var poemTextLocal = yamlObject.heading[0].text;
      	  var sherGeneralDiscussionServerResponseLocal = data;

      	  console.log("poemTextLocal: ");
      	  console.log(poemTextLocal);

      	  console.log("sherGeneralDiscussionServerResponseLocal");
      	  console.log(sherGeneralDiscussionServerResponseLocal);

      	  that.setState({poemText: poemTextLocal});
      	  that.setState({sherGeneralDiscussionServerResponse : sherGeneralDiscussionServerResponseLocal});

    	  that.props.navigation.setParams({ title: that.state.poemText })

          that.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);
	});	// data.json().then ends
      	})       // success function ends
      // })     // ajax call ends

    }catch(err){
    	Alert.alert("inside catch err");
    	Alert.alert(err);
    	that.message = err;
    }
  } // async getSherGeneralDiscussion ends


  getSherDiscussion(sherGeneralDiscussionServerResponse) {
	var that = this;
    // var response = StaticContentService.getSherDiscussion(sherGeneralDiscussionServerResponse)
    StaticContentService.getSherDiscussion(sherGeneralDiscussionServerResponse).then(function(response){

    // var sherDiscussionDetailLocal = JSON.parse(response)
    // var sherDiscussionDetailLocal = JSON.parse(sherGeneralDiscussionServerResponse)
    var sherDiscussionDetailLocal = sherGeneralDiscussionServerResponse

    console.log("Value of sherDiscussionDetailLocal:")
    console.log(sherDiscussionDetailLocal)
    console.log("Value of sherDiscussionDetailLocal.length:")
    console.log(sherDiscussionDetailLocal.length)

    for (var i=0; i<sherDiscussionDetailLocal.length; i++){

    	console.log("Value of sherDiscussionDetailLocal[i].data:")
      console.log(sherDiscussionDetailLocal[i].text)
      console.log(decodeURI(sherDiscussionDetailLocal[i].text))

      sherDiscussionDetailLocal[i].text = decodeURI(sherDiscussionDetailLocal[i].text)

      console.log("Value of sherDiscussionDetailLocal[i].data:")
      console.log(sherDiscussionDetailLocal[i].text)

    }
    that.setState({sherDiscussionDetail : sherDiscussionDetailLocal })

	})	// .then(func res) ends

 	}


  async getSherWordDiscussion( sherName ) {
    var that = this;
    try{
			// $.ajax({
			fetch(
				// url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
				'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',{
			  // type: 'POST',
			  method: 'POST',
			  // dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
			 	// data: {sher: sherName, discussion_type: "word-meanings"},
			 	// body: {sher: sherName, discussion_type: "word-meanings"}
	     body: "sher=" + sherName + "&discussion_type=word-meanings"
			}).then(async function(data){
			  // success: (data) => {    // success funciton starts
		data.json().then(async function(data) {
				
		console.log("data: ")
		console.log(data)


				  var sherWordDiscussionServerResponse = data;
				  console.log("sherWordDiscussionServerResponse");
				  console.log(sherWordDiscussionServerResponse);

				  that.getWordDiscussion(sherWordDiscussionServerResponse);
			
	});	// data.json().then ends

		  	})       // success function ends
		 	// });     // ajax call ends
    }  // try ends
    catch(err){
			Alert.alert("inside catch err");
     	Alert.alert(err);
      // this.message = err;
  	}  // catch ends
	}

	getWordDiscussion(sherWordDiscussionServerResponse) {
    // var wordDiscussionDetailLocal = JSON.parse(sherWordDiscussionServerResponse)
    var wordDiscussionDetailLocal = sherWordDiscussionServerResponse;
    console.log("wordDiscussionDetailLocal");
    console.log(wordDiscussionDetailLocal);

    for (var i=0; i<wordDiscussionDetailLocal.length; i++){

      console.log(wordDiscussionDetailLocal[i].text)
      console.log(decodeURI(wordDiscussionDetailLocal[i].text))
    	wordDiscussionDetailLocal[i].text = decodeURI(wordDiscussionDetailLocal[i].text);

    }
	console.log("Before setState")
   	this.setState({wordDiscussionDetail : wordDiscussionDetailLocal});
	console.log("After setState")

	}

  componentDidMount() {
	  // window.scrollTo(0, 0)
    // retrive the data
   	try {
			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});
			this.setState({sherId: this.props.navigation.getParam('detailSher')});

			let sherName = this.props.navigation.getParam('detailSher');
  		console.log("In poempage.js inside componentdidmount");
  		console.log("sherName: ");
  		console.log(sherName);
			this.getSherGeneralDiscussion(sherName);
			this.getSherWordDiscussion(sherName);
		}  // try ends
	  catch (e) {
			console.log("Inside catch");
	  } // catch ends
	} // componentDidMount ends

  signMeIn = () => {

	  if (this.state.username == "") {
	  	this.props.history.push({
		    pathname: '/RegisterPage',
		    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
	  }
  }

	///////////////////////////////////////////////////////////
	//	Vote Like Word
	///////////////////////////////////////////////////////////

    vote_like_word_arrow(comment_general_id) {

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;
	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=1&is_cancel=0"
			}).then(async function(data){
			data.text().then(async function(data) {
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered"){
					Alert.alert("Vote registered.");
					that.getSherWordDiscussion(that.state.sherId);	
				}
				else if (data == "vote already registered") {
					// Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
					
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=1"
		}).then(async function(data){ 
		data.text().then(async function(data) {

                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle_word(idx);
					Alert.alert("Vote removed.");
					that.getSherWordDiscussion(that.state.sherId);	
				}
				else if (data == "invalid is_cancel value") {
					Alert.alert("You have not liked or disliked it yet.");
				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }

    vote_like_word(comment_general_id) {

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;
	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=1&is_cancel=0"
			}).then(async function(data){
			data.text().then(async function(data) {
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					that.getSherWordDiscussion(that.state.sherId);	
				else if (data == "vote already registered") {
					Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }

	///////////////////////////////////////////////////////////
	//	Vote Dislike Word
	///////////////////////////////////////////////////////////

    vote_dislike_word_arrow(comment_general_id){


	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;

	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=0"
		}).then(function(data){ 
		data.text().then(async function(data) {
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered") {
					Alert.alert("Vote registered.");
					that.getSherWordDiscussion(that.state.sherId);	
				}
				else if (data == "vote already registered"){
					// Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
					
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=1"
		}).then(async function(data){ 
		data.text().then(async function(data) {

                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle_word(idx);
					Alert.alert("Vote removed.");
					that.getSherWordDiscussion(that.state.sherId);	
				}
				else if (data == "invalid is_cancel value") {
					Alert.alert("You have not liked or disliked it yet.");
				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}


				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }
    vote_dislike_word(comment_general_id){


	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;

	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=0"
		}).then(function(data){ 
		data.text().then(async function(data) {
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					that.getSherWordDiscussion(that.state.sherId);	
				else if (data == "vote already registered"){
					Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
					

				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }

	///////////////////////////////////////////////////////////
	//	Vote Unregister Word
	///////////////////////////////////////////////////////////

    vote_unregister_word(comment_general_id) {

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;

	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
		 	// body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1}
		 	body: "sher=" + that.state.sherId + "&discussion_type=word-meanings&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=1"
		}).then(async function(data){ 
		data.text().then(async function(data) {

                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle_word(idx);
					that.getSherWordDiscussion(that.state.sherId);	
					Alert.alert("Your vote is removed");
				}
				else if (data == "invalid is_cancel value") {
					Alert.alert("You have not liked or disliked it yet.");
				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }


	///////////////////////////////////////////////////////////
	//	Vote Like General
	///////////////////////////////////////////////////////////
	
    vote_like(comment_general_id) {
	

	console.log("Inside vote_like")


	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;

	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({ fetch(
		localTestString = "sher=002_001_001&discussion_type=general&comment_id=319&username=agent3&password=agent&is_like=1&is_cancel=0"
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
			// type: 'POST',
			method: 'POST',
			// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
			// data: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0},
			// body: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0}
		 	body: "sher=" + that.state.sherId + "&discussion_type=general&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=1&is_cancel=0"
			// body: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0}
		}).then(async function(data){ 

		data.text().then(async function(data) {
			// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					that.getSherGeneralDiscussion(that.state.sherId);	
				else if (data == "vote already registered") {
					Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
				}
		});	// data.text.then.func ends
	

			})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }

	
	///////////////////////////////////////////////////////////
	//	Vote Dislike General
	///////////////////////////////////////////////////////////
		
    vote_dislike(comment_general_id){

	console.log("Inside vote_dislike")

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;

	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php', {
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0},
		 	// body: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0}
		 	body: "sher=" + that.state.sherId + "&discussion_type=general&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=0"
		}).then(async function(data){ 

		data.text().then(async function(data) {
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					that.getSherGeneralDiscussion(that.state.sherId);	
				else if (data == "vote already registered"){
					Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle(idx);
					

				}
	
		
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
    }

	///////////////////////////////////////////////////////////
	//	Vote Unregister General
	///////////////////////////////////////////////////////////
		

    vote_unregister(comment_general_id) {

	console.log("Inside vote_unregister")

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	var that = this;

	if (this.state.username != ""){
	try{
		// var element = this;
		// $.ajax({
		fetch(
			// url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			'https://icanmakemyownapp.com/iqbal/v3/vote.php',{
                	// type: 'POST',
                	method: 'POST',
                 	// dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        },
		 	// data: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
		 	// body: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1}
		 	body: "sher=" + that.state.sherId + "&discussion_type=general&comment_id=" + comment_general_id + "&username=" + that.state.username + "&password=" + that.state.password + "&is_like=0&is_cancel=1"
		}).then(async function(data){ 

		data.text().then(async function(data) {
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle(idx);
					that.getSherGeneralDiscussion(that.state.sherId);	
					Alert.alert("Your vote is removed");
				}
				else if (data == "invalid is_cancel value") {
					Alert.alert("You have not liked or disliked it yet.");
				}
	
		});	// data.text.then.func ends

                 	})	// success function ends
		// });	// ajax call ends
	}catch(err){
		Alert.alert("inside catch err");
		Alert.alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		Alert.alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
    }

  selectedWord(wordText, wordId) {
	this.setState({mySelectedWord: wordText})
	this.setState({mySelectedId: (wordId + 1)})
	console.log("Value of mySelectedWord")
	console.log(this.state.mySelectedWord)
	console.log("Value of mySelectedId")
	console.log(this.state.mySelectedId)
  }

		chooseColor() {
			   return {
    					borderColor: 'red',
				}
		}

	render() {


		Moment.locale('en');

		var item4 = this.state.sherText.map( (item, index) =>
			<Text key={item.index}> {item}</Text>
			/*<p key={item.index}> {item}</p>*/
		);
/*
		var item5 = this.state.wordText.map( (item, index) =>
			<span key={item.index}><button type="button" class="btn btn-primary"onClick={() => this.selectedWord(item, index)}> {item} </button>  </span>
		);
*/
		    const viewStylesNotSelected = {
    					borderColor: 'black',
    					borderWidth: 1,
			        };
		    const viewStylesSelected = {
    					borderColor: 'red',
    					borderWidth: 2,
			        };

		    const textStylesNotSelected = {
    					color: 'black',
    					fontWeight: 'normal',
			        };
		    const textStylesSelected = {
    					color: 'red',
    					fontWeight: 'bold',
			        };
/*
		var item5 = this.state.wordText.map( (item, index) =>
			<View style={[styles.button, colorStyles]}><TouchableHighlight key={item.index} onPress={() => this.selectedWord(item, index)}><Text style={styles.buttonText}>{item}</Text></TouchableHighlight></View>
		);
*/
		var that = this;
		var item5 = this.state.wordText.map( function(item, index) 
			{
			if (parseInt(that.state.mySelectedId) == (index+ 1))
				return <View style={[styles.button, viewStylesSelected]}><TouchableHighlight key={item.index} onPress={() => that.selectedWord(item, index)}><Text style={[styles.buttonText, textStylesSelected]}>{item}</Text></TouchableHighlight></View>
			else
				return <View style={[styles.button, viewStylesNotSelected]}><TouchableHighlight key={item.index} onPress={() => that.selectedWord(item, index)}><Text style={[styles.buttonText, textStylesNotSelected]}>{item}</Text></TouchableHighlight></View>
			})
			

/*

			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/><br/> <button type="button" class="btn btn-primary px-2"onClick={() => this.vote_like(item.id)}> LIKE </button> <span class="px-2">SCORE: {item.score}</span><button type="button" class="btn btn-primary"onClick={() => this.vote_dislike(item.id)} >DISLIKE</button><p></p><button type="button" class="btn btn-primary"onClick={() => this.vote_unregister(item.id)} >UNREGISTER</button></p><Divider/></div>
			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/> {item.islike} <button type="button" class="btn btn-primary" onClick={() => this.vote_like({item.id})}>LIKE</button> SCORE: {item.score} <button type="button" class="btn btn-primary" onClick={() => this.vote_like({item.id})}>DISLIKE</button> </p><Divider/></div>

*/
		
/*

		var item6 = this.state.sherDiscussionDetail.map( (item, index) =>
	  <View><Text>{item.username}</Text><View></View><View><Text>{item.timestamp}</Text></View><View><Text>{item.text}</Text></View><View><Button onPress={this.vote_like(item.id)} title='LIKE'/></View><View><Text>SCORE: {item.score}</Text></View><View><Button onPress={this.vote_dislike(item.id)} title='DISLIKE'/></View><View><Text></Text></View><View><Button onPress={this.vote_unregister(item.id)} title='UNREGISTER'/></View></View>
			<View> <View><Text> {item.username}</Text></View> <View><Text>  {item.timestamp}</Text> </View><View><Text>{item.text}</Text></View> <View><Button onPress=this.vote_like(item.id)} title='LIKE'/></View><View><Text>SCORE: {item.score}</Text></View><View><Button onPress={this.vote_dislike(item.id)} title='DISLIKE'/></View><View></View><View><Button onPress={this.vote_unregister(item.id)} title='UNREGISTER'/></View></View>
		);
*/


/*
		var item6 = this.state.sherDiscussionDetail.map( (item, index) =>
	  <View key={item.id}><Text>{item.username}</Text><View></View><View><Text>{item.timestamp}</Text></View><View><Text>{item.text}</Text></View><TouchableHighlight onPress={() => this.vote_like(item.id)}><View><Button title='LIKE'/></View></TouchableHighlight><View><Text>SCORE: {item.score}</Text></View><View><Button onPress={this.vote_dislike(item.id)} title='DISLIKE'/></View><View><Text></Text></View><View><Button onPress={this.vote_unregister(item.id)} title='UNREGISTER'/></View></View>
		);
*/



		var item6 = this.state.sherDiscussionDetail.map( (item, index) =>
	  <View key={item.id}><Text>{item.username}</Text><View></View><View><Text>{item.timestamp}</Text></View><View><Text>{item.text}</Text></View><View><Button onPress={() => this.vote_like(item.id)} title='LIKE'/></View><View><Text>SCORE: {item.score}</Text></View><View><Button onPress={() => this.vote_dislike(item.id)} title='DISLIKE'/></View><View><Text></Text></View><View><Button onPress={() => this.vote_unregister(item.id)} title='UNREGISTER'/></View></View>
		);
		
/*
		var item7 = this.state.wordDiscussionDetail.map( (item, index) =>
			{
				if ((item.wordposition-1) == this.state.mySelectedId)
				return (
			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/><br/> <button type="button" class="btn btn-primary"onClick={() => this.vote_like_word(item.id)}> LIKE </button><span class="px-2"> SCORE: {item.score}</span><button type="button" class="btn btn-primary"onClick={() => this.vote_dislike_word(item.id)} >DISLIKE</button><p></p><button type="button" class="btn btn-primary"onClick={() => this.vote_unregister_word(item.id)} >UNREGISTER</button></p></div>
		)}
		)
*/

		var item7 = this.state.wordDiscussionDetail.map( (item, index) =>
			{
				// if ((item.wordposition-1) == this.state.mySelectedId)
				/*
				if ((item.wordposition) == this.state.mySelectedId)
				return (
	  <View key={item.id} style={styles.RenderedItem6View}><View style={styles.NavBar}><Text>{item.username}</Text><Text>{Moment(item.timestamp).format('MMM DD, YYYY')}</Text></View><View><Text style={styles.CommentsText}>{item.text}</Text></View><View style={styles.NavBar}><Button onPress={() => this.vote_like_word(item.id)} title='LIKE'/><Text>SCORE: {item.score}</Text><Button onPress={() => this.vote_dislike_word(item.id)} title='DISLIKE'/></View><View><Text></Text></View><View><Button onPress={() => this.vote_unregister_word(item.id)} title='UNREGISTER'/></View></View>
		)
				*/

				if ((item.wordposition) == this.state.mySelectedId)
				return (
	 <View style={{flex:1, flexDirection: 'row'}}><View style={{flex: 0.1, flexDirection: 'column'}}><View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><TouchableHighlight onPress={() =>this.vote_like_word_arrow(item.id)} ><Image resizeMode='stretch' style={{height: 30, width: 30}}  source={iconUpVote}/></TouchableHighlight></View><View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 24, fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{item.score}</Text></View><View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><TouchableHighlight onPress={() =>this.vote_dislike_word_arrow(item.id)} ><Image resizeMode='stretch' style={{height: 30, width: 30}} source={iconDownVote}/></TouchableHighlight></View></View><View key={item.id} style={[styles.RenderedItem6View, styles.flexPoint8]}><View style={styles.NavBar}><Text>{item.username}</Text><Text>{Moment(item.timestamp).format('MMM DD, YYYY')}</Text></View><View><Text style={styles.CommentsText}>{item.text}</Text></View></View></View>
		)
			}
		)

  	let signinTag
	var signinMessageLocal = ""
	if (this.state.signinConfirmation  === "done") {
		signinMessageLocal = this.state.username.charAt(0).toUpperCase()
	  signinTag = <button type="button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>
	}
	else {
		signinMessageLocal = "Sign In"
	  signinTag = <button type="button" class="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>
	}

/*
			<div>
			<div class="text-right">
			   {signinTag}
			</div>
			<div class="tabTitle">
				 {this.state.poemText}
			</div>
		<div class="sherPageText">
		<Tabs
			id="controlled-tab-example"
			activeKey={this.state.key}
			onSelect={key => this.setState({ key })}
			class="nav-tabs"
		>
	  		<Tab class= "sherPageText" eventKey="home"  title="DISCUSSION">
			       {item4}
			       {item6}


				<form onSubmit={this.handleSubmitSher}>

					<label>
				    		Comments:
				  	</label>
	   			 	<p></p>

				    	<textarea  type="text" rows="5" value={this.state.userMessageSher} onChange={this.handleUserMessageSher} ></textarea>

				  	<p></p>


				  	<input type="submit" value="SUBMIT" />
				</form>
			</Tab>

			<Tab class="sherPageText" eventKey="profile"  title="WORD MEANING">
			       {item5}
	    			<p></p>

	    			Selected Word: {this.state.mySelectedWord}
	    			<p></p>
			       {item7}
				<form onSubmit={this.handleSubmitWord}>
					<label>
				    		Comments:
				  	</label>
	   			 	<p></p>
				    	<textarea  type="text" rows="5" value={this.state.userMessageWord} onChange={this.handleUserMessageWord} ></textarea>
				  	<p></p>

				  	<input type="submit" value="SUBMIT" />
				</form>
			</Tab>
         </Tabs>
	 </div>
			</div>
*/
    return (
		<View style={{flex:1}}>
		<View style={styles.FirstSection}>
			<ScrollView>
	    		{/*
			<View  style={styles.RenderedView}>
				<Text style={styles.UrduTitle}>
					{this.state.poemText}
				</Text>
			</View>
			*/}

			<View style={styles.container}>
			       {item5}
			</View>
	    {/*
			<View style={styles.container}>
	    			<Text >
					Selected Word: 
				</Text>
				
				<View style={styles.buttonSelected}>
	    				<Text style={{justifyContent: 'center', textAlign: 'center', flex: 1, marginTop: 5, fontSize:15, fontWeight: 'bold'}}>
						{this.state.mySelectedWord}
					</Text>
				</View>
			</View>
		*/}
			</ScrollView>
		</View>
		<View style={styles.SecondSection}>
			<ScrollView>
			
			<View>

			       {item7}
			</View>

			</ScrollView>
		</View>


		<View style={{flex: 1}}>
			<View>
				<Text>
					Comments:
				</Text>
			</View>
			<View>
				<TextInput
				  style={{height: 40}}
				  placeholder="Comments..."
				  onChangeText={(text) => this.setState({userMessageWord: text})}
				/>
			
			{/*onChangeText={this.handleUserMessageSher}*/}
			
			</View>
				<Button onPress={this.handleSubmitWord} title='SUBMIT'/>
		</View>

		</View>
		
		);// return ends
	}  // render function ends
} // class ends



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    // backgroundColor: 'green',
    // flex: 2,
    // justifyContent: 'space-between',
    // flexDirection: 'row-reverse',
    padding: 5,
    borderRadius: 10,
    // borderColor: 'red',
    // width: '40%',
    // height: 40, 
    padding: 10,
	
  },


  buttonText : { 
    // textAlign: 'center', 
    textAlign: 'right', 
    textAlignVertical: 'center',
    fontSize: 18,
  },
  FirstSection: {
    flex: 2,
    borderWidth: 1,
  },
  SecondSection: {
    flex: 4,
    borderWidth: 1,
  },
  buttonSelected: {
    backgroundColor: 'red',
    // flex: 2,
    borderRadius: 10,
    borderWidth: 1,
    width: '25%',
    height: 40
  },
  RenderedView: {
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
  CommentsText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  flexPoint8: {
   flex: 0.8,
  },
  RenderedItem6View: {
   backgroundColor: 'skyblue',
   margin: 20,
   borderRadius: 10,
   borderWidth: 1,
  },
    NavBar: {
        // height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

  MainContainer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
  }, 

  UrduTitle : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    padding: 5,
    margin: 5,
  },

  EnglishTitle : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
  },

  MainScrollView: {
   flex: 3,
   borderWidth: 1,
  },
  WordButtons: {
   backgroundColor: '#00aeef',
   borderColor: 'red',
   borderWidth: 5,
   borderRadius: 15    
  },
  
})

export default SherPage
