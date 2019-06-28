import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'
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
	    mySelectedId: "-99",
	    
	    userMessageSher: "",
	    userMessageWord: "",

            key: 'home'
    }
		this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
		this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

		this.handleSubmitSher = this.handleSubmitSher.bind(this);
		this.handleSubmitWord = this.handleSubmitWord.bind(this);
	}

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
	// console.log("messageWord sent to send word message function");
	// console.log(this.messageWord);
	// do not try pushing comment if message is empty
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
            'Content-Type': 'text/plain',
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageWord, word_position: this.state.mySelectedId+1},
		 	body: {sher: this.state.sherId, discussion_type: "word-meanings", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageWord, word_position: this.state.mySelectedId+1}
			}).then(function(data){
                 	// success: (data) => {	// success funciton starts

				console.log("data");
				console.log(data);
				this.getSherWordDiscussion(this.state.sherId);
	
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

          // const yamlFile = require('!raw-loader!./assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');

          const path = RNFS.MainBundlePath + '/assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml';
	  const yamlFile = await RNFS.readFile(path, "utf8");

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
    try{
			// $.ajax({
			fetch(
				// url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
				'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',{
			  // type: 'POST',
			  method: 'POST',
			  // dataType: 'text',
			headers: {
            'Content-Type': 'text/plain',
        },
			 	// data: {sher: sherName, discussion_type: "word-meanings"},
			 	body: {sher: sherName, discussion_type: "word-meanings"}
			}).then(function(data){
			  // success: (data) => {    // success funciton starts

				  var sherWordDiscussionServerResponse = data;
				  console.log("sherWordDiscussionServerResponse");
				  console.log(sherWordDiscussionServerResponse);

				  this.getWordDiscussion(sherWordDiscussionServerResponse);

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
    var wordDiscussionDetailLocal = JSON.parse(sherWordDiscussionServerResponse)
    console.log("wordDiscussionDetailLocal");
    console.log(wordDiscussionDetailLocal);

    for (var i=0; i<wordDiscussionDetailLocal.length; i++){

    	wordDiscussionDetailLocal[i].text = decodeURI(wordDiscussionDetailLocal[i].text);

    }
   	this.setState({wordDiscussionDetail : wordDiscussionDetailLocal});

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
			// this.getSherWordDiscussion(sherName);
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

    vote_like_word(comment_general_id) {

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

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
            'Content-Type': 'text/plain',
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0},
		 	body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0}
			}).then(function(data){
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherWordDiscussion(this.state.sherId);	
				else if (data == "vote already registered") {
					Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
				}
	

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

    vote_dislike_word(comment_general_id){


	console.log("Value of comment_general_id");
	console.log(comment_general_id);


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
            'Content-Type': 'text/plain',
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0},
		 	body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0}
		}).then(function(data){ 
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherWordDiscussion(this.state.sherId);	
				else if (data == "vote already registered"){
					Alert.alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
					

				}
	

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
            'Content-Type': 'text/plain',
        },
		 	// data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
		 	body: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1}
		}).then(function(data){ 
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle_word(idx);
					this.getSherWordDiscussion(this.state.sherId);	
					Alert.alert("Your vote is removed");
				}
				else if (data == "invalid is_cancel value") {
					Alert.alert("You have not liked or disliked it yet.");
				}
	

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
	this.setState({mySelectedId: wordId})
	console.log("Value of mySelectedWord")
	console.log(this.state.mySelectedWord)
	console.log("Value of mySelectedId")
	console.log(this.state.mySelectedId)
  }

	render() {
		var item4 = this.state.sherText.map( (item, index) =>
			<Text key={item.index}> {item}</Text>
			/*<p key={item.index}> {item}</p>*/
		);

		var item5 = this.state.wordText.map( (item, index) =>
			<span key={item.index}><button type="button" class="btn btn-primary"onClick={() => this.selectedWord(item, index)}> {item} </button>  </span>
			/*<span key={item.index}> {item}: {index}</span>*/
		);
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
		


		var item7 = this.state.wordDiscussionDetail.map( (item, index) =>
			{
				// console.log("this.state.mySelectedId")
				// console.log(this.state.mySelectedId)
				// console.log("item.wordposition")
				// console.log(item.wordposition)
				if ((item.wordposition-1) == this.state.mySelectedId)
				return (
			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/><br/> <button type="button" class="btn btn-primary"onClick={() => this.vote_like_word(item.id)}> LIKE </button><span class="px-2"> SCORE: {item.score}</span><button type="button" class="btn btn-primary"onClick={() => this.vote_dislike_word(item.id)} >DISLIKE</button><p></p><button type="button" class="btn btn-primary"onClick={() => this.vote_unregister_word(item.id)} >UNREGISTER</button></p></div>
				/*
				return (
			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/><br/> <button type="button" class="btn btn-primary"onClick={() => this.vote_like_word(item.id)}> LIKE </button><span class="px-2"> SCORE: {item.score}</span><button type="button" class="btn btn-primary"onClick={() => this.vote_dislike_word(item.id)} >DISLIKE</button><p></p><button type="button" class="btn btn-primary"onClick={() => this.vote_unregister_word(item.id)} >UNREGISTER</button></p><Divider/></div>
				*/
			/*<p key={item.id}> {item.id}: {item.islike} : {item.score} : {item.text} : {item.timestamp} : {item.username} : {item.wordposition}</p>*/
		)}
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
		<View>
			<View>
				<Text>
				 {this.state.poemText}
				</Text>
			</View>
			<ScrollView>
			<View>	
			       {item4}
			       {item6}
			</View>

	{/*

        <FlatList
          data={
		this.state.sherDiscussionDetail
          }
	  renderItem={({item}) => <View><Text>{item.username}</Text><View></View><View><Text>{item.timestamp}</Text></View><View><Text>{item.text}</Text></View><View><Button onPress={this.vote_like(item.id)} title='LIKE'/></View><View><Text>SCORE: {item.score}</Text></View><View><Button onPress={this.vote_dislike(item.id)} title='DISLIKE'/></View><View><Text></Text></View><View><Button onPress={this.vote_unregister(item.id)} title='UNREGISTER'/></View></View>}
	/>

	*/}

			<View>
				<Text>
					Comments:
				</Text>
			</View>
			<View>
				<TextInput
				  style={{height: 40}}
				  placeholder="Comments..."
				  onChangeText={(text) => this.setState({userMessageSher: text})}
				/>
			
			{/*onChangeText={this.handleUserMessageSher}*/}
			
			</View>
				<Button onPress={this.handleSubmitSher} title='SUBMIT'/>
			<View>
				<Text>

				</Text>
				
			</View>
			</ScrollView>

		</View>
		
		);// return ends
	}  // render function ends
} // class ends

export default SherPage
