import React from 'react'
import {Image, ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import AsyncStorage from '@react-native-community/async-storage';

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';

// import Tabs from './Tabs'

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

  starToggling = (sher) => {

	var that = this;


       this.readBookmarks().then(function(result)	{
	
		
		console.log("result");
		console.log(result);

	// create a path you want to write to
	// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
	// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable


       
	if (result.includes(sher.id)){
		var index = result.indexOf(sher.id);
		if (index > -1)	{
			result.splice(index, 7);
		}

		console.log("result");
		console.log(result);
		
		var newData = result.join('@');

		console.log("newData");
		console.log(newData);

		var path = RNFS.DocumentDirectoryPath + '/bookmarked-shers.txt';

		// var sherNumberComma = sherNumber + ',';


		// write the file
		RNFS.writeFile(path, newData, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });

		  // let poemName = that.props.navigation.getParam('detailPoem');
		  // console.log("In poempage.js inside starToggling if");
		  // that.getPoem(poemName);
            	  that.getSherPopularListFromServer()
			

	}
	else{
		var path = RNFS.DocumentDirectoryPath + '/bookmarked-shers.txt';

		// var sherNumberComma = sherNumber + ',';
		var sherAt = sher.id + '@' + sher.sherContent[0].text[0] + '@' + sher.sherContent[0].text[1] + '@' + sher.sherContent[1].text[0] + '@' + sher.sherContent[1].text[1] + '@' + sher.sherContent[2].text[0] + '@' + sher.sherContent[2].text[1] + '@';


		// write the file
		RNFS.appendFile(path, sherAt, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });
		
		
		  // let poemName = that.props.navigation.getParam('detailPoem');
		  // console.log("In poempage.js inside starToggling else");
		  // that.getPoem(poemName);
	
            	  that.getSherPopularListFromServer()
	}
	})


  }

	async readBookmarks() { 

		const path = RNFS.DocumentDirectoryPath + '/bookmarked-shers.txt';
		try {
			const yamlFile = await RNFS.readFile(path, "utf8")
			var partsOfStr = yamlFile.split('@');
			return partsOfStr;
		}
		catch(e) {
			return "";
		}

	}
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


       that.readBookmarks().then(function(result)	{
		
		console.log("result");
		console.log(result);
	
	  for (var i=0; i<response.sher.length; i++) {

		  try {
			if (result.includes(response.sher[i].id))
				response.sher[i].star = true;
			else
				response.sher[i].star = false;
		  }
			catch(e) {
		    console.log("catch caught an error");
			}
	  }
	
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
	})	// readBookmark . then ends
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
	  // console.log("res: ")
	  // console.log(res)
	this.setState({font: "Normal"});
        }
      })

    AsyncStorage.getItem(TEXT)
      .then(res => {
        if (res !== null) {
	  console.log("res is not null: ")
	  console.log(res)
	  this.setState({text: res});
        } else {
	  // console.log("res: ")
	  // console.log(res)
	  this.setState({text: "Urdu"});
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
	/*
		if (that.state.text == 'Urdu') {
          		return  <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView}><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>
		}
		else if (that.state.text == 'Roman') {
          		return  <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView}><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>
		}
	*/

          if (item.star) {
		if (that.state.text == 'Urdu') {
          		return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>
		}
		else if (that.state.text == 'Roman') {
          		return  <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>
		}
	}
	else {
		if (that.state.text == 'Urdu') {
          		return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[0].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>
		}
		else if (that.state.text == 'Roman') {
          		return  <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[2].text[1]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[0]}</Text></View><View><Text style={fontFamilyTextVariable}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>
		}

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
