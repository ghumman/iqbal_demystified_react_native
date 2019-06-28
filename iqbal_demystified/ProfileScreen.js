import React from 'react'
import StaticContentService from './StaticContentServiceYaml'

// for formatting
import './TabView1.css';

import PoemPage from './PoemPage';

import ReactTable from 'react-table'
import 'react-table/react-table.css'

var $ = require('jquery')
window.jQuery = $

var  YAML = require('yaml');

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

			      	    dropdownState: 'discussion'

			          };
		this.dropChange = this.dropChange.bind(this);

		  	}
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
		  window.scrollTo(0, 0)

	      this.get_leader_board()	      
	      // retrive the data
		   		try {
		  console.log(this.state.leaderBoardTextOddWord)
	  				this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
	  				this.setState({username: this.props.location.state.profileUsername});
	  				this.setState({password: this.props.location.state.profilePassword});
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

	  changePassword = () => {
	  	this.props.history.push({
	  		pathname: '/ChangePasswordPage',
			state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})

	  }

	  signOut = () => {
	  	this.props.history.push({
	  		pathname: '/',
			state: { profileSigninConfirmation : "", profileUsername : "", profilePassword: ""}
	  	})

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
			           try{

					                   $.ajax({
								                           url: 'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',
								                           type: 'GET',
								                           dataType: 'text',
								                           success: (data) => {    
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
																							                                                   this.state.leaderBoardTextEvenDiscussionName.push({"name" : leaderBoardTextEvenLocal[i]});
																							                                                   this.state.leaderBoardTextOddDiscussionName.push({"points": leaderBoardTextOddLocal[i]});
																							                                                   this.state.leaderBoardTextDiscussionConcat.push({"name" : leaderBoardTextEvenLocal[i], "points": leaderBoardTextOddLocal[i]});
																							                                           }
																	                                           else {
																							                                                   leaderBoardTextEvenWordLocal.push(leaderBoardTextEvenLocal[i]);
																							                                                   leaderBoardTextOddWordLocal.push(leaderBoardTextOddLocal[i]);
																							                                                   this.state.leaderBoardTextEvenWordName.push({"name": leaderBoardTextEvenLocal[i]});
																							                                                   this.state.leaderBoardTextOddWordName.push({"points": leaderBoardTextOddLocal[i]});
																							                                                   this.state.leaderBoardTextWordConcat.push({"name" : leaderBoardTextEvenLocal[i], "points": leaderBoardTextOddLocal[i]});
																							                                           }
	        }


					   this.setState({leaderBoardText: leaderBoardTextLocal})
					   this.setState({leaderBoardTextEven: leaderBoardTextEvenLocal})
					   this.setState({leaderBoardTextOdd: leaderBoardTextOddLocal})
					   this.setState({leaderBoardTextEvenDiscussion: leaderBoardTextEvenDiscussionLocal})
					   this.setState({leaderBoardTextOddDiscussion: leaderBoardTextOddDiscussionLocal})
					   this.setState({leaderBoardTextEvenWord: leaderBoardTextEvenWordLocal})
					   this.setState({leaderBoardTextOddWord: leaderBoardTextOddWordLocal})
					   // this.setState({leaderBoardTextDiscussionConcat: [leaderBoardTextEvenDiscussionLocal,leaderBoardTextOddDiscussionLocal]})

												   
	} // success finishes 
}) 
																									           }catch(err){
																										                   alert("inside catch err");
																												                   alert(err);
																														                   this.message = err;
																																           }
																																						           console.log("messageSher sent to send sher message function");
        // console.log(this.messageSher);
												                                   console.log("ajax: this.state.leaderBoardTextEvenDiscussion");
												                                   console.log(this.state.leaderBoardTextEvenDiscussion);

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

					/*	
				const data = [{
					    name: 'Tanner Linsley',
					    age: 26,
					    friend: {
						          name: 'Jason Maurer',
						          age: 23,
						        }
					  }
						    ]
				 
				  const columns = [{
					      Header: 'Name',
					      accessor: 'name' // String-based value accessors!
					    }, {
						        Header: 'Age',
						        accessor: 'age',
						        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
						      }, {
							          id: 'friendName', // Required because our accessor is not a string
							          Header: 'Friend Name',
							          accessor: d => d.friend.name // Custom value accessors!
							        }, {
									    Header: props => <span>Friend Age</span>, // Custom header components!
									    accessor: 'friend.age'
									  }]

									  */
				var itemOddWord = this.state.leaderBoardTextOddWord.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					<li key={item}> {item}</li>
					// txt => <p>{txt}</p>	
				);

				var itemEvenWord = this.state.leaderBoardTextEvenWord.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					<li key={item}> {item}</li>
					// txt => <p>{txt}</p>	
				);

				var itemOddDiscussion = this.state.leaderBoardTextOddDiscussion.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					<li key={item}> {item}</li>
					// txt => <p>{txt}</p>	
				);

				var itemEvenDiscussion = this.state.leaderBoardTextEvenDiscussion.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					<li key={item}> {item}</li>
					// txt => <p>{txt}</p>	
				);

				var itemEvenDiscussionName = this.state.leaderBoardTextEvenDiscussionName.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					<li key={item}> {item.name}</li>
					// txt => <p>{txt}</p>	
				);

				const columns = [{
					    Header: 'Leaderboard Name',
					    accessor: 'name' // String-based value accessors!
					  }, {
					    Header: 'Points',
					    accessor: 'points' // String-based value accessors!
					  }]
const concatData = [this.state.leaderBoardTextEvenDiscussionName, this.state.leaderBoardTextOddDiscussionName]

const data = [{
	    name: 'Tanner Linsley'}]

	var myTable = "" 
	
	if (this.state.dropdownState === 'discussion') {
		myTable = <ReactTable data={this.state.leaderBoardTextDiscussionConcat} columns={columns} />
	}
	else {
		myTable = <ReactTable data={this.state.leaderBoardTextWordConcat} columns={columns} />
	}
				return (
					<div>

						
						
					
			<div class="text-right">
	  {signinTag}
			</div>
       	   <h1 class="text-center">My Profile</h1>
						<div class="text-center">
					        <p>Now you can write comments!</p>
					        <p>You can also vote to others' comments!</p>
					        <p>More profile features coming soon!</p>

						
						<button onClick={() => this.changePassword()} > CHANGE PASSWORD </button>	
						
						<button onClick={() => this.signOut()} > SIGN OUT </button>	
						</div>
					{/*data={this.state.leaderBoardTextEvenDiscussionName, this.state.leaderBoardTextOddDiscussionName}*/}
					{/*
					<ReactTable
					
					    data={this.state.leaderBoardTextWordConcat}
					    columns={columns}
					  />
					  */}
					<p>
					<select value={this.state.dropdownState} onChange={this.dropChange}>
					  <option selected value="discussion">Discussion</option>
					  <option value="word">Word Meanings</option>
					</select>
					</p>

					{myTable}

					{/*
					<p>Value of itemEvenDiscussion: </p>
					{itemEvenDiscussion}

					<p>Value of itemOddDiscussion: </p>
					{itemOddDiscussion}

					<p>Value of itemEvenWord: </p>
					{itemEvenWord}

					<p>Value of itemOddWord: </p>
					{itemOddWord}
					*/}

					{/*

				<ReactTable
					
					    data={this.state.leaderBoardTextEvenDiscussion}
					    columns={this.state.leaderBoardTextOddDiscussion}
					  />
					  */}

					{/*{item1}*/}
					
					   {/*
					   <table>
					        <tr><th>Leaderboard</th><th> <!-- <div>
						  <b-dropdown id="ddown1" text="Select Contribution Type" class="m-md-2">
						      <b-dropdown-item v-on:click="show_discussion_leader()">Discussions</b-dropdown-item>
						          <b-dropdown-item v-on:click="show_word_leader()">Word Meanings</b-dropdown-item>
							    </b-dropdown>
							    </div> -->
							    <select v-model="selected" @change="show_leader()">
					  <option value="discussion">Discussion</option>
					  <option value="word-meanings">Word Meanings</option>
					</select>
					        </th> <!-- <th>{{dropdownText}}</th> --> </tr>
					        <tr><th>Name</th> <th>Points</th></tr>
					        </br></br>

					  <tr class="columns" v-for="(leader_entry,index) in leaderBoardTextEvenDiscussion" >
					        <!-- <td v-if="selectBoard == 0">{{leaderBorardTextEvenDiscussion[index]}}</td> <td v-if="selectBoard == 0">{{leaderBoardTextOddDiscussion[index]}}</td> -->
					        <td v-show="selectBoard == 0">{{leader_entry}}</td> <td v-show="selectBoard == 0">{{leaderBoardTextOddDiscussion[index]}}</td>
					        <td v-show="selectBoard == 1">{{leaderBoardTextEvenWord[index]}}</td> <td v-show="selectBoard == 1">{{leaderBoardTextOddWord[index]}}</td>
					  </tr>

					   </table>
					   */}
					{/*
					<ReactTable
					    data={item1}
					    columns={item3}
					  />
					  */}



						{/*

					        <router-link :to="{ name: 'ChangePasswordPage', query: {messageFromSigninPage:profileSigninMessage}}"><button>CHANGE PASSWORD</button></router-link>


					        <button v-on:click="sign_out()">SIGN OUT</button></br></br>
						*/}

					</div>
				)
			}
}

		      // return <h1>I got following message : {this.props.location.state.detail}</h1>
export default ProfilePage
