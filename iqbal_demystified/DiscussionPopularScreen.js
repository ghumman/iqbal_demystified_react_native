import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'
// import Tabs from './Tabs'

// for formatting
// import './TabView1.css';

// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

// import PoemPage from './PoemPage';

var YAML = require('yaml')

// var $ = require('jquery')
// window.jQuery = $

class CommentsPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signinConfirmation: "",

            listId: "List_001",
            sherText: [],
            wordText: [],
            poemText: [],
            sherObjects: [],
            sherGeneralDiscussionServerResponse: [],
            sherDiscussionDetail: [],
            wordDiscussionDetail: [],

            recentData: [],
            popularData: [],

            testString: "",
	    key: 'home'

        }

    }

    onSubmit = (sherNumber) => {
	  this.props.navigation.navigate('SherTabs', {detailSher: sherNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});
/*
        this.props.history.push({
            pathname: '/SherPage',
            state: {
                detailSher: sherNumber,
                profileSigninConfirmation: this.state.signinConfirmation,
                profileUsername: this.state.username,
                profilePassword: this.state.password
            }
*/
    }


    ////////////////////////////////////////////////////////////////////
    //	Recent Function starts
    ///////////////////////////////////////////////////////////////////

    async getSherRecentListFromServer() {
	var that = this;
        try {
            // $.ajax({
		fetch(
                // url: 'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent',
                'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent',{
                // type: 'GET',
                method: 'GET',
                // dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        }
		}).then(async function(data){ 
		data.text().then(async function(data) {
                // success: (data) => { // success funciton starts
                    console.log("data");
                    console.log(data);
                    that.getRecentSher(data);

                 	})	// then async function ends
                 	})	// then async function ends
                // } // success function ends
            // }); // ajax call ends
        } catch (err) {
            Alert.alert("inside catch err");
            Alert.alert(err);
            this.message = err;
        }

    }

    getRecentSher(sherRecentList) {
        var response = StaticContentService.getRecentSher(sherRecentList)
        let newArr = [response.sher]
        console.log("Value of newArr which is response.sher")
        console.log(newArr)
        console.log("newArr.sherContent[0].text")
        console.log(response.sher[0].sherContent[0].text)
/*
        response.sher.map(el => {
	    try {
            el.sherContent[0].text = el.sherContent[0].text.split('|')
            console.log(el.sherContent[0].text)
	    } catch (err) {

		console.log("Inside catch 0, err: ")
		console.log(err)
		}
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) {

		console.log("Inside catch 1, err: ")
		console.log(err)
		}
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {

		console.log("Inside catch 2, err: ")
		console.log(err)
		}
            return el.sherContent = el.sherContent
        })

        console.log("Value of newArr")
        console.log(newArr)

        console.log("Value of newArr[0]")
        console.log(newArr[0])

        console.log("Value of newArr[1]")
        console.log(newArr[1])

        console.log("Value of newArr.length")
        console.log(newArr[0].length)

        this.setState({
            recentData: newArr[0]
        })
*/

    }
    ////////////////////////////////////////////////////////////////////
    //	Recent Function Ends
    ///////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    //	Popular Function Starts
    ///////////////////////////////////////////////////////////////////

    async getSherPopularListFromServer() {
	var that = this;
        try {
            // var element = this;
            // $.ajax({
			fetch(
                // url: 'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=popular',
                'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=popular',{
                // type: 'GET',
                method: 'GET',
                // dataType: 'text',
			headers: {
            // 'Content-Type': 'text/plain',
	    'Content-Type': 'application/x-www-form-urlencoded'
        }
			}).then(function(data){
		data.text().then(async function(data) {

                // success: (data) => { // success funciton starts
                    console.log("data");
                    console.log(data);
                    that.getPopularSher(data);

		  	})       // then function data ends
		  	})       // then function data ends
                // } // success function ends
            // }); // ajax call ends
        } catch (err) {
            Alert.alert("inside catch err");
            Alert.alert(err);
            this.message = err;
        }

    }

    getPopularSher(sherPopularList) {
	var that = this;
        // var response = StaticContentService.getRecentSher(sherPopularList)
        StaticContentService.getRecentSher(sherPopularList).then(function(response){
        let newArrPopular = [response.sher]
        console.log("Value of newArrPopular")
        console.log(newArrPopular)
        console.log("I am at this point")

        response.sher.map(el => {
            el.sherContent[0].text = el.sherContent[0].text.split('|')
            console.log(el.sherContent[0].text)
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) {
	    	el.sherContent.push({"text": ["#translation missing", "#translation missing"]})

	    }
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {

	    	el.sherContent.push({"text": ["#translation missing", "#translation missing"]})
	    }
            return el.sherContent = el.sherContent
        })

        that.setState({
            popularData: newArrPopular[0]
        })
	})	// then func response ends
	
    }

    ////////////////////////////////////////////////////////////////////
    //	Popular Function Ends
    ///////////////////////////////////////////////////////////////////


/*
    componentDidUpdate(prevProps, prevState) {

        console.log("this.state.recentData")
        console.log(this.state.recentData)
    }
*/

    componentDidMount() {
	    // window.scrollTo(0, 0)
        // retrive the data
        try {

/*
            this.setState({
                signinConfirmation: this.props.location.state.profileSigninConfirmation
            });
            this.setState({
                username: this.props.location.state.profileUsername
            });
            this.setState({
                password: this.props.location.state.profilePassword
            });
*/

			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});

            // this.getSherRecentListFromServer()
	    console.log("passed setState going to getSherPopularListFromServer")
            this.getSherPopularListFromServer()
            console.log("In poempage.js inside componentdidmount");

        } catch (e) {

            console.log("Inside catch componentDidMount");

        }
    }

/*
    signMeIn = () => {

        if (this.state.username == "") {
            this.props.history.push({
                pathname: '/RegisterPage',
                state: {
                    profileSigninConfirmation: this.state.signinConfirmation,
                    profileUsername: this.state.username,
                    profilePassword: this.state.password
                }
            })
        }

    }

    testFunc = () => {
        this.setState({
            testString: "hello"
        })
    }

*/
    render() {
/*
            var itemsRecent = this.state.recentData.map((item, index) =>
                <
                span key = {
                    item.index
                }
                onClick = {
                    () => this.onSubmit(item.id)
                } > {
                    item.sherContent[0].text[0]
                } < br / > {
                    item.sherContent[0].text[1]
                } < br / > {
                    item.sherContent[1].text[0]
                } < br / > {
                    item.sherContent[1].text[1]
                } < br / > < br / > < /span>
            );

            var itemsPopular = this.state.popularData.map((item, index) =>
                <
                span key = {
                    item.index
                }
                onClick = {
                    () => this.onSubmit(item.id)
                } > {
                    item.sherContent[0].text[0]
                } < br / > {
                    item.sherContent[0].text[1]
                } < br / > {
                    item.sherContent[1].text[0]
                } < br / > {
                    item.sherContent[1].text[1]
                } < br / > < br / > < /span>
            );

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
*/
/*

              <div >
		<div class="text-right">
                {signinTag}
		</div>

		<div class="tabTitle">
		<Tabs
			id="controlled-tab-example"
			activeKey={this.state.key}
			onSelect={key => this.setState({ key })}
			class="nav-tabs"
		>
			<Tab eventKey="home"  title="RECENT">
                    {itemsRecent}
		    	</Tab>
			<Tab eventKey="profile"  title="POPULAR">
                    {itemsPopular}
		    	</Tab>
                  </Tabs>
	       </div>
              </div>
*/


            return (
		<View>
        <FlatList
          data={
		this.state.popularData
          }
          renderItem={({item}) => <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View><View><Text style={styles.item}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.item}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.item}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.item}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>}
        />
		</View>

            )
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

// return <h1>I got following message : {this.props.location.state.detail}</h1>
export default CommentsPage
