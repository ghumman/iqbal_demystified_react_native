import React from 'react'
import { TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
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
		this.send_sher_message()
		event.preventDefault()
	}

	handleSubmitWord(event) {
		this.send_word_message()
		event.preventDefault()
	}

async send_sher_message(){
	console.log("Inside send_sher_message");

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
            'Content-Type': 'text/plain',
        },
		 	// data: {sher: this.state.sherId, discussion_type: "general", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageSher},
		 	body: {sher: this.state.sherId, discussion_type: "general", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageSher}
		}).then(function(data){ 
                 	// success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				this.getSherGeneralDiscussion(this.state.sherId);	
	

                 	})	// success function ends
		// });	// ajax call ends

	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}
	

	// console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
	}	// if not logged in empty
	else{

		alert("Please login first to add comments.");
	}
	}	// if message is empty ends
	
	else {
		alert("Comments can not be empty");
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
		/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.state.sherId, discussion_type: "word-meanings", username: this.state.username, password: this.state.password, comment_text: this.state.userMessageWord, word_position: this.state.mySelectedId+1},
                 	success: (data) => {	// success funciton starts

				console.log("data");
				console.log(data);
				this.getSherWordDiscussion(this.state.sherId);
	
                 	}	// success function ends
		});	// ajax call ends
		*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);

	}	// if not logged in empty
	else{

		alert("Please login first to add comments.");
	}
	}	// if message is empty ends
	
	else {
		alert("Comments can not be empty");
	}

}


	onSubmit = (sherNumber) => {
	  this.props.history.push({
		    pathname: '/SherPage',
		    state: { detailSher: sherNumber,  profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password  }
	  })
	}

  async getSherGeneralDiscussion(sherName) {
    try{
	/*
	     $.ajax({
       url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
	     type: 'POST',
	     dataType: 'text',
	     data: {sher: sherName, discussion_type: "general"},
	     success: (data) => {    // success funciton starts
	        var sherArray = sherName.split("_");

          // const yamlFile = require('!raw-loader!./assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');

          const path = RNFS.MainBundlePath + '/assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml';
	  const yamlFile = RNFS.readFile(path, "utf8");

          console.log("After calling yamlFiles");
          console.log("Value of yamlFile");
          console.log(yamlFile);

          var sherIndex = sherArray[2] - 1;
          var yamlObject = YAML.parse(yamlFile.default);

          console.log("this is the sher text");
          console.log(yamlObject.sher[sherIndex].sherContent[0].text);

          var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

          var sherTextLocal = sherTextTemp.split('|');
          this.setState({sherText : sherTextLocal});

          console.log("this.state.sherText");
          console.log(this.state.sherText);

	        var wordTextLocal = this.state.sherText[0].split(" ").concat(this.state.sherText[1].split(" "));
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
      	  this.setState({wordText: wordTextLocal});


      	  // this.sherText = yamlObject.sher[sherIndex].sherContent[0].text;
      	  var poemTextLocal = yamlObject.heading[0].text;
      	  var sherGeneralDiscussionServerResponseLocal = data;

      	  console.log("poemTextLocal: ");
      	  console.log(poemTextLocal);

      	  console.log("sherGeneralDiscussionServerResponseLocal");
      	  console.log(sherGeneralDiscussionServerResponseLocal);

      	  this.setState({poemText: poemTextLocal});
      	  this.setState({sherGeneralDiscussionServerResponse : sherGeneralDiscussionServerResponseLocal});

          this.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);
      	}       // success function ends
      })     // ajax call ends
	*/

    }catch(err){
    	alert("inside catch err");
    	alert(err);
    	this.message = err;
    }
  } // async getSherGeneralDiscussion ends


  getSherDiscussion(sherGeneralDiscussionServerResponse) {
    var response = StaticContentService.getSherDiscussion(sherGeneralDiscussionServerResponse)

    var sherDiscussionDetailLocal = JSON.parse(response)

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
    this.setState({sherDiscussionDetail : sherDiscussionDetailLocal })
 	}


  async getSherWordDiscussion( sherName ) {
    try{
/*
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
			  type: 'POST',
			  dataType: 'text',
			 	// data: {sher: this.$route.query.sherId, discussion_type: "word-meanings"},
			 	data: {sher: sherName, discussion_type: "word-meanings"},
			  success: (data) => {    // success funciton starts

				  var sherWordDiscussionServerResponse = data;
				  console.log("sherWordDiscussionServerResponse");
				  console.log(sherWordDiscussionServerResponse);

				  this.getWordDiscussion(sherWordDiscussionServerResponse);

		  	}       // success function ends
		 	});     // ajax call ends
*/
    }  // try ends
    catch(err){
			alert("inside catch err");
     	alert(err);
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
			// this.getSherGeneralDiscussion(sherName);
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
/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherWordDiscussion(this.state.sherId);	
				else if (data == "vote already registered") {
					alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
				}
	

                 	}	// success function ends
		});	// ajax call ends
*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
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
/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherWordDiscussion(this.state.sherId);	
				else if (data == "vote already registered"){
					alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle_word(idx);
					

				}
	

                 	}	// success function ends
		});	// ajax call ends
*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
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
/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.state.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle_word(idx);
					this.getSherWordDiscussion(this.state.sherId);	
					alert("Your vote is removed");
				}
				else if (data == "invalid is_cancel value") {
					alert("You have not liked or disliked it yet.");
				}
	

                 	}	// success function ends
		});	// ajax call ends
*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }


	///////////////////////////////////////////////////////////
	//	Vote Like General
	///////////////////////////////////////////////////////////
	
    vote_like(comment_general_id) {


	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	if (this.state.username != ""){
	try{
		// var element = this;
/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
			type: 'POST',
			dataType: 'text',
			data: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:1, is_cancel:0},
			success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherGeneralDiscussion(this.state.sherId);	
				else if (data == "vote already registered") {
					alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle(idx);
				}
	

			}	// success function ends
		});	// ajax call ends
*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	// console.log(this.messageSher);
    }

	
	///////////////////////////////////////////////////////////
	//	Vote Dislike General
	///////////////////////////////////////////////////////////
		
    vote_dislike(comment_general_id){

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	if (this.state.username != ""){
	try{
		// var element = this;
/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherGeneralDiscussion(this.state.sherId);	
				else if (data == "vote already registered"){
					alert("Vote is already registerd. Unregister vote first and then you can revote");
					// this.toggle(idx);
					

				}
	

                 	}	// success function ends
		});	// ajax call ends
*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
    }

	///////////////////////////////////////////////////////////
	//	Vote Unregister General
	///////////////////////////////////////////////////////////
		

    vote_unregister(comment_general_id) {

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	if (this.state.username != ""){
	try{
		// var element = this;
/*
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.state.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.state.username, password: this.state.password, is_like:0, is_cancel:1},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					// this.toggle(idx);
					this.getSherGeneralDiscussion(this.state.sherId);	
					alert("Your vote is removed");
				}
				else if (data == "invalid is_cancel value") {
					alert("You have not liked or disliked it yet.");
				}
	

                 	}	// success function ends
		});	// ajax call ends
*/
	}catch(err){
		alert("inside catch err");
		alert(err);
		// this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
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
			<p key={item.index}> {item}</p>
		);

		var item5 = this.state.wordText.map( (item, index) =>
			<span key={item.index}><button type="button" class="btn btn-primary"onClick={() => this.selectedWord(item, index)}> {item} </button>  </span>
			/*<span key={item.index}> {item}: {index}</span>*/
		);

		var item6 = this.state.sherDiscussionDetail.map( (item, index) =>
			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/><br/> <button type="button" class="btn btn-primary px-2"onClick={() => this.vote_like(item.id)}> LIKE </button> <span class="px-2">SCORE: {item.score}</span><button type="button" class="btn btn-primary"onClick={() => this.vote_dislike(item.id)} >DISLIKE</button><p></p><button type="button" class="btn btn-primary"onClick={() => this.vote_unregister(item.id)} >UNREGISTER</button></p><Divider/></div>
			/*<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/> {item.islike} <button type="button" class="btn btn-primary" onClick={() => this.vote_like({item.id})}>LIKE</button> SCORE: {item.score} <button type="button" class="btn btn-primary" onClick={() => this.vote_like({item.id})}>DISLIKE</button> </p><Divider/></div>*/
		);


		var item7 = this.state.wordDiscussionDetail.map( (item, index) =>
			{
				// console.log("this.state.mySelectedId")
				// console.log(this.state.mySelectedId)
				// console.log("item.wordposition")
				// console.log(item.wordposition)
				if ((item.wordposition-1) == this.state.mySelectedId)
				return (
			<div key={item.id}> <div  class="float-left"><p> {item.username}</p></div> <div class="float-right"><p>  {item.timestamp}</p> </div><br/> <p>{item.text}<br/><br/> <button type="button" class="btn btn-primary"onClick={() => this.vote_like_word(item.id)}> LIKE </button><span class="px-2"> SCORE: {item.score}</span><button type="button" class="btn btn-primary"onClick={() => this.vote_dislike_word(item.id)} >DISLIKE</button><p></p><button type="button" class="btn btn-primary"onClick={() => this.vote_unregister_word(item.id)} >UNREGISTER</button></p><Divider/></div>
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
		</View>
		
		);// return ends
	}  // render function ends
} // class ends

export default SherPage
