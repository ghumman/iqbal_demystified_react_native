import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'
// import Tabs from './Tabs'

import AsyncStorage from '@react-native-community/async-storage';

// for formatting
// import './TabView1.css';

// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

// import PoemPage from './PoemPage';

var RNFS = require('react-native-fs');
var YAML = require('yaml')

const FONT = "Normal";
const TEXT = "Urdu";

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
	    key: 'home',
		  font: "Normal",
		  text: "Urdu",

        }

    }

   static navigationOptions = {
        title: 'My Poems',
    };

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
	var that = this;
        // var response = StaticContentService.getRecentSher(sherRecentList)
        StaticContentService.getRecentSher(sherRecentList).then(function(response){
		console.log("Back from Static Content Service.sherRecentList call, response: ")
		console.log(response)
        let newArr = [response.sher]
        console.log("Value of newArr inside getRecentSher inside then function responseafter newArr = response.sher")
        console.log(newArr)
        // console.log("newArr.sherContent[0].text")
        // console.log(response.sher[0].sherContent[0].text)

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

        console.log("Value of newArr")
        console.log(newArr)

        console.log("Value of newArr[0]")
        console.log(newArr[0])

        console.log("Value of newArr[1]")
        console.log(newArr[1])

        console.log("Value of newArr.length")
        console.log(newArr[0].length)

        that.setState({
            recentData: newArr[0]
        })
	})	// then func response ends

    }
    ////////////////////////////////////////////////////////////////////
    //	Recent Function Ends
    ///////////////////////////////////////////////////////////////////

	async readBookmarks() { 

		const path = RNFS.DocumentDirectoryPath + '/bookmarked-poems.yaml';
		try {
			const yamlFile = await RNFS.readFile(path, "utf8")
			var partsOfStr = yamlFile.split('@');
			return partsOfStr;
		}
		catch(e) {
			return "";
		}

	}

    ////////////////////////////////////////////////////////////////////
    //	Popular Function Starts
    ///////////////////////////////////////////////////////////////////

    async getSherPopularListFromServer() {
	
    	var that = this;

        that.readBookmarks().then(function(result)	{
		console.log("result.length")
		console.log(result.length)
		var bookmarksPoemList = []
		for (i=0; i<(result.length - 1); i+=3) { 
			console.log("result[x]");
			console.log(result[i]);
			bookmarksPoemList.push(result[i])
	} 	// end of for loop

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

		    var dataArrayPopular = data.split(',')
		    console.log("dataArrayPopular")
		    console.log(dataArrayPopular)
		
		    var poemDataArray = []
		    for (j=0; j<dataArrayPopular.length - 1;j++) { 
			if (bookmarksPoemList.includes(dataArrayPopular[j].slice(0, dataArrayPopular[j].length-4)))
		    		poemDataArray.push(dataArrayPopular[j])
				
		    }

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
                    console.log("following is recent data");
                    console.log(data);

		    var dataArrayRecent = data.split(',')
		    console.log("dataArrayRecent")
		    console.log(dataArrayRecent)


		    for (j=0; j<dataArrayRecent.length - 1;j++) { 
			// include the element from recent list only if sliced version meaning xxx_yyy is present inside bookmarksPoemList.yaml file but it is not already added from popular list
			if ((bookmarksPoemList.includes(dataArrayRecent[j].slice(0, dataArrayRecent[j].length-4))) && (!poemDataArray.includes(dataArrayRecent[j])))
			
		    		poemDataArray.push(dataArrayRecent[j])
				
		    }



		    console.log("poemDataArray")
		    console.log(poemDataArray)
		    
		    var poemDataArrayString = poemDataArray.toString()	

		    console.log("poemDataArrayString")
		    console.log(poemDataArrayString)

		    poemDataArrayString += "," 

		    console.log("poemDataArrayString after comma")
		    console.log(poemDataArrayString)

                    that.getPopularSher(poemDataArrayString);


                    // that.getRecentSher(data);

                 	})	// then async function ends
                 	})	// then async function ends
                // } // success function ends
            // }); // ajax call ends
        } catch (err) {
            Alert.alert("inside catch err");
            Alert.alert(err);
            this.message = err;
        }
		
		
		    
		    


		  	})       // then function data ends
		  	})       // then function data ends
                // } // success function ends
            // }); // ajax call ends
        } catch (err) {
            Alert.alert("inside catch err");
            Alert.alert(err);
            this.message = err;
        }

	})	//  readBookmarks.then function ends

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

 onDidFocusCustomFunction = () => {
    console.log("Inside onDidFocusCustomFunction")

    AsyncStorage.getItem(FONT)
      .then(res => {
        if (res !== null) {
	  console.log("res is not equal to null: ")
	  console.log(res)
	this.setState({font: res});
        } else {
	  console.log("res: ")
	  console.log(res)
	this.setState({font: res});
        }
      })

    AsyncStorage.getItem(TEXT)
      .then(res => {
        if (res !== null) {
	  console.log("res is not null: ")
	  console.log(res)
	  this.setState({text: res});
        } else {
	  console.log("res: ")
	  console.log(res)
	  this.setState({text: res});
        }
      })
}

    componentDidMount() {
	    // window.scrollTo(0, 0)
        // retrive the data
        try {
			this.onDidFocusCustomFunction();

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

            // this.getSherRecentListFromServer()
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
renderItem = ({item}) => {

	var that = this;
	var fontFamilyTextVariable;
	console.log("this.state.font")
	console.log(this.state.font)
	switch(this.state.font) {
		case 'Normal': 
			fontFamilyTextVariable = styles.RenderedTextNormal;
			break;
		case 'Nafees': 
			fontFamilyTextVariable = styles.RenderedTextNafees;
			break;
		case 'Kasheeda': 
			fontFamilyTextVariable = styles.RenderedTextKasheeda;
			break;
		case 'Fajer': 
			fontFamilyTextVariable = styles.RenderedTextFajer;
			break;
	}
		if (that.state.text == 'Urdu') {
          		return  <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView}><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>
		}
		else if (that.state.text == 'Roman'){
          		return  <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView}><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>
		}

}

    render() {


            return (
		<View>
        <FlatList
          data={
		this.state.popularData
          }
          // renderItem={({item}) => <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView}><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>}
	  renderItem={this.renderItem}
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

  RenderedTextNormal: {
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextNafees: {
    fontFamily: 'NafeesNastaleeq',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextKasheeda: {
    fontFamily: 'JameelNooriKasheeda',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextFajer: {
    fontFamily: 'FajerNooriNastalique',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
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
  UrduTitleNormal: { 
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
  },

  UrduTitleNafees: { 
    fontFamily: 'NafeesNastaleeq',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
  },

  UrduTitleKasheeda: { 
    fontFamily: 'JameelNooriKasheeda',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
  },
  
  UrduTitleFajer: { 
    fontFamily: 'FajerNooriNastalique',
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

})

// return <h1>I got following message : {this.props.location.state.detail}</h1>
export default CommentsPage
