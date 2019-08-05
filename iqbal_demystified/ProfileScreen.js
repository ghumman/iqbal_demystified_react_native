import React from 'react'
import {Picker, ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import AsyncStorage from '@react-native-community/async-storage';

// for formatting
// import './TabView1.css';

// import PoemPage from './PoemPage';

// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

// var $ = require('jquery')
// window.jQuery = $

var  YAML = require('yaml');

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

class ProfilePage extends React.Component {


	  constructor(props) {
		   // let  YAML = require('yamljs');
		      super(props);
		      this.state = {

			      	    username: "",
			      	    password: "", 
			            signinConfirmation: "",

			            pictures: [],
			      	    listId: "List_001",
			      	    poemList: [],
			      	    poemListName: [],
			      	    bookName: [],
			      	    bookNameUrdu: "",
				    bookNameEnglish: "",
				    bookSections: [],
				    onePoem: "",
				    poemText: [],
				    poemObjects: [],

			      	    leaderBoardText: [],
			      	    leaderBoardTextEven: [], 
			      	    leaderBoardTextOdd: [], 
			      	    leaderBoardTextEvenDiscussion: [], 
			      	    leaderBoardTextEvenDiscussionName: [], 
			      	    leaderBoardTextOddDiscussion: [],
			      	    leaderBoardTextOddDiscussionName: [],
			      	    leaderBoardTextDiscussionConcat: [],
			      	    leaderBoardTextEvenWord: [], 
			      	    leaderBoardTextEvenWordName: [], 
			      	    leaderBoardTextOddWord: [],
			      	    leaderBoardTextOddWordName: [],
			      	    leaderBoardTextWordConcat: [],

			      	    dropdownState: 'discussion',

			          };
		this.dropChange = this.dropChange.bind(this);

		  	}

   static navigationOptions = {
	       title: 'My Profile',
	       headerStyle: {
		         },
			     	 headerTintColor: 'red',
			         headerTitleStyle: {
				       fontWeight: 'bold',
	   			       fontSize: 20, 
	   			       textAlign:'center',
				           },
    };
	
  dropChange(event) {
	      this.setState({dropdownState: event.target.value});
	    }

	componentDidUpdate(prevProps, prevState) {
		
		  console.log("this.state.leaderBoardText")
		  console.log(this.state.leaderBoardText)

		  console.log("this.state.leaderBoardTextEven")
		  console.log(this.state.leaderBoardTextEven)

		  console.log("this.state.leaderBoardTextEvenDiscussion")
		  console.log(this.state.leaderBoardTextEvenDiscussion)

		  console.log("this.state.leaderBoardTextOddDiscussion")
		  console.log(this.state.leaderBoardTextOddDiscussion)

		  console.log("this.state.leaderBoardTextEvenWord")
		  console.log(this.state.leaderBoardTextEvenWord)

		  console.log("this.state.leaderBoardTextOddWord")
		  console.log(this.state.leaderBoardTextOddWord)


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

	      				this.get_leader_board()	      
		  			console.log(this.state.leaderBoardTextOddWord)
		  		}

				catch(e) {
					console.log("Inside catch");
				}

		    // this.getPoemList("List_001");
		      // fetch("https://api.example.com/items")
		      // fetch("http://icanmakemyownapp.com/iqbal/v3/get-list-of-lists.php", { mode: 'no-cors'})
		      // fetch('/get-list-of-lists.php')
		      // fetch('https://randomuser.me/api/?results=500')
		     /*
		      fetch('/get-list.php?listId=List_001', {
		      	method: 'get',
			headers: {'Content-Type':'application/text'},
		      })
		        .then(res => {
				return res.text()
			}).then((responseJson) => {
				// console.log(responseJson);
				this.setState({pictures: responseJson});
			})
			*/
		    }

	  signMeIn = () => {

		  if (this.state.username == "") {
		  	this.props.history.push({
			    pathname: '/RegisterPage',
			    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
		  	})
		  }

	  }

	  myDownloads = () => {
		console.log("this.state.username")
		console.log(this.state.username)

		console.log("this.state.password")
		console.log(this.state.password)
		this.props.navigation.navigate('DownloadAudios', { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation });

	  }

	  changePassword = () => {
		console.log("this.state.username")
		console.log(this.state.username)

		console.log("this.state.password")
		console.log(this.state.password)
		/*
	  	this.props.history.push({
	  		pathname: '/ChangePasswordPage',
			state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
		*/
		this.props.navigation.navigate('ChangePassword', { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation });

	  }

	  signOut = () => {
		/*
		
	  	this.props.history.push({
	  		pathname: '/',
			state: { profileSigninConfirmation : "", profileUsername : "", profilePassword: ""}
	  	})
		*/
AsyncStorage.removeItem(USERNAME);
AsyncStorage.removeItem(PASSWORD);
AsyncStorage.removeItem(MESSAGE);
	console.log("All store variables are removed");

		this.props.navigation.navigate('Home', { profileUsername: "", profilePassword: "", profileSigninConfirmation: "" });

	  }


   async get_leader_board() {

	var leaderBoardTextLocal = []
	var leaderBoardTextEvenLocal = []
	var leaderBoardTextOddLocal = [] 
	var leaderBoardTextEvenDiscussionLocal = []
	var leaderBoardTextOddDiscussionLocal = []
	var leaderBoardTextEvenWordLocal = []
	var leaderBoardTextOddWordLocal = []

	           console.log("Inside get_leaser_board")
		var that = this;
			           try{

					                   // $.ajax({
							fetch(
							// url: 'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',
							'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',{
								                           // type: 'GET',
								                           method: 'GET',
								                           // dataType: 'text',
							headers: {
							    // 'Content-Type': 'text/plain',
							    'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then(async function(data){ 
							data.text().then(async function(data) {
								                           // success: (data) => {    
												                                   console.log("data");
												                                   console.log(data);

												                                   // this.state.leaderBoardText = data.split(",");
												                                   leaderBoardTextLocal = data.split(",");
												                                   // console.log("ajax: this.state.leaderBoardText");
												                                   // console.log(this.state.leaderBoardText);
												                                   // this.state.leaderBoardText.splice(-1,1);
												                                   leaderBoardTextLocal.splice(-1,1);
												                                   // console.log("ajax: this.state.leaderBoardText");
												                                   // console.log(this.state.leaderBoardText);
												                                   for (var i = 0; i < leaderBoardTextLocal.length; i++) {
																	                                           if(i % 2 === 0) { 
																							                                                   leaderBoardTextEvenLocal.push(leaderBoardTextLocal[i]);
																							                                           }
																	                                           else {
																							                                                   leaderBoardTextOddLocal.push(leaderBoardTextLocal[i]);
																							                                           }
																	                                   }
												                                   for (var i = 0; i < leaderBoardTextEvenLocal.length; i++) {
																	                                           if(i < 10 ) { 
																							                                                   leaderBoardTextEvenDiscussionLocal.push(leaderBoardTextEvenLocal[i]);
																							                                                   leaderBoardTextOddDiscussionLocal.push(leaderBoardTextOddLocal[i]);
																							                                                   that.state.leaderBoardTextEvenDiscussionName.push({"name" : leaderBoardTextEvenLocal[i]});
																							                                                   that.state.leaderBoardTextOddDiscussionName.push({"points": leaderBoardTextOddLocal[i]});
																							                                                   that.state.leaderBoardTextDiscussionConcat.push({"name" : leaderBoardTextEvenLocal[i], "points": leaderBoardTextOddLocal[i]});
																							                                           }
																	                                           else {
																							                                                   leaderBoardTextEvenWordLocal.push(leaderBoardTextEvenLocal[i]);
																							                                                   leaderBoardTextOddWordLocal.push(leaderBoardTextOddLocal[i]);
																							                                                   that.state.leaderBoardTextEvenWordName.push({"name": leaderBoardTextEvenLocal[i]});
																							                                                   that.state.leaderBoardTextOddWordName.push({"points": leaderBoardTextOddLocal[i]});
																							                                                   that.state.leaderBoardTextWordConcat.push({"name" : leaderBoardTextEvenLocal[i], "points": leaderBoardTextOddLocal[i]});
																							                                           }
	        }


					   that.setState({leaderBoardText: leaderBoardTextLocal})
					   that.setState({leaderBoardTextEven: leaderBoardTextEvenLocal})
					   that.setState({leaderBoardTextOdd: leaderBoardTextOddLocal})
					   that.setState({leaderBoardTextEvenDiscussion: leaderBoardTextEvenDiscussionLocal})
					   that.setState({leaderBoardTextOddDiscussion: leaderBoardTextOddDiscussionLocal})
					   that.setState({leaderBoardTextEvenWord: leaderBoardTextEvenWordLocal})
					   that.setState({leaderBoardTextOddWord: leaderBoardTextOddWordLocal})
					   // this.setState({leaderBoardTextDiscussionConcat: [leaderBoardTextEvenDiscussionLocal,leaderBoardTextOddDiscussionLocal]})

												   
	});	// data.text().then ends
      	})       // then async func ends
	// } // success finishes 
// }) 
																									           }catch(err){
																										                   Alert.alert("inside catch err");
																												                   Alert.alert(err);
																														                   // this.message = err;
																																           }
																																						           console.log("messageSher sent to send sher message function");
        // console.log(this.messageSher);
												                                   console.log("ajax: that.state.leaderBoardTextEvenDiscussion");
												                                   console.log(that.state.leaderBoardTextEvenDiscussion);

	    }



			render() {




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

				var itemOddWord = this.state.leaderBoardTextOddWord.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemEvenWord = this.state.leaderBoardTextEvenWord.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemOddDiscussion = this.state.leaderBoardTextOddDiscussion.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemEvenDiscussion = this.state.leaderBoardTextEvenDiscussion.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemEvenDiscussionName = this.state.leaderBoardTextEvenDiscussionName.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item.name}</li>
					<Text key={item}> {item.name}</Text>
					// txt => <p>{txt}</p>	
				);

				const columns = [{
					    Header: 'Leaderboard Name',
					    accessor: 'name' // String-based value accessors!
					  }, {
					    Header: 'Points',
					    accessor: 'points' // String-based value accessors!
					  }]
				const tableHeader = ['Leaderboard Name', 'Points']
const concatData = [this.state.leaderBoardTextEvenDiscussionName, this.state.leaderBoardTextOddDiscussionName]

	var myTable = "" 
	
	if (this.state.dropdownState === 'discussion') {
	myTable = 
        <Table>
 <Row data={tableHeader} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
<TableWrapper style={styles.wrapper}>
		

            <Col data={itemEvenDiscussion} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
            <Col data={itemOddDiscussion} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
</TableWrapper>
        </Table>
	}
	else {
	myTable = 
        <Table>
 <Row data={tableHeader} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
<TableWrapper style={styles.wrapper}>

            <Col data={itemEvenWord} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
            <Col data={itemOddWord} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
</TableWrapper>
        </Table>
	}



const state = this.state;
				return (
			<View style={{flex: 1}}>
			<View style={{flex: 0.6}}>
					{/*<Text style={styles.EnglishTitle}>My Profile</Text>*/}
				<View style={styles.UsernameView}>
					<View style={styles.UsernameViewInner}>
						<Text style={styles.Username}>{this.state.username}</Text>
					</View>
				</View>
				
					        <Text style={styles.Message}>Now you can write comments!</Text>
					        <Text style={styles.Message}>You can also vote to others' comments!</Text>
					        <Text style={styles.Message}>More profile features coming soon!</Text>

					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', padding: 1}}>
					<View>	
						<Button onPress={() => this.myDownloads()}  title='MY DOWNLOADS' />	
					</View>	
					<View>	
						<Button onPress={() => this.changePassword()}  title='CHANGE PASSWORD' />	
					</View>	
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 1}}>
						
						<Button onPress={() => this.signOut()} title= 'SIGN OUT' />	
					</View>
			   </View>

			   <View style={{flex: 1}}>
						{/*<View style={{borderColor:'red',borderBottomWidth:1,brderTopWidth:1}}>*/}
						<View>

						<Picker 
						  selectedValue={this.state.dropdownState}
						  // style={{height: 50, width: 100}}
						  onValueChange={(itemValue, itemIndex) =>
						    this.setState({dropdownState: itemValue})
						  }>
						<Picker.Item label="Discussion" value="discussion" />
						<Picker.Item label="Word Meanings" value="word" />
						</Picker>
						</View>
				</View>
				<View style={{flex: 1}}>
					<ScrollView>
						{myTable}
					</ScrollView>
				</View>

				


				</View>

				)
			}
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 28,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' },

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
  Message: {
    textAlign: 'center'
  },
  UsernameView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderWidth:4
  },
  UsernameViewInner: {
    borderWidth:2,
    borderRadius: 4,
    borderColor: '#d6d7da',
  },
  Username : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    
  },

  EnglishTitle : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
  }

});
		      // return <h1>I got following message : {this.props.location.state.detail}</h1>

export default ProfilePage
