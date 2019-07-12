import React from 'react'
import {ScrollView,  Image,TextInput, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';

// for formatting
// import './TabView1.css';

// import Divider from '@material-ui/core/Divider';

var RNFS = require('react-native-fs');
var  YAML = require('yaml');

class PoemPage extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
		  username: "",
		  password: "",
		  signinConfirmation: "",

		  listId: "List_001",
		  poemList: [],
		  poemNameUrdu: "",
		  poemNameEnglish: "",
		  poemText: [],
		  poemTextNew: [],
		  poemObjects: []
		}
	}

  onSubmit = (sherNumber) => {
	  this.props.navigation.navigate('SherTabs', {detailSher: sherNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});
	/*
	  this.props.history.push({
		    pathname: '/SherPage',
		    state: { detailSher: sherNumber , profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
	  })
	*/
	}

	getPoem () {


    	var that = this;

	this.setState({poemText: []});

       that.readBookmarks().then(function(result)	{
	
		
		console.log("result");
		console.log(result);

		for (i=0; i<((result.length-1)/5); i++ ) {
			console.log("Inside for loop for putting result")
		
			that.state.poemText.push({'id': result[i * 5], 'textUrdu1': result[(i*5)+1], 'textUrdu2': result[(i*5)+2], 'textEnglish1': result[(i*5)+3], 'textEnglish2': result[(i*5)+4]})
		}


    that.setState({poemTextNew: that.state.poemText});
	

	})

	}
	
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
			result.splice(index, 5);
		}

		console.log("result");
		console.log(result);
		
		var newData = result.join('@');

		console.log("newData");
		console.log(newData);

		var path = RNFS.DocumentDirectoryPath + '/test14.txt';

		// var sherNumberComma = sherNumber + ',';


		// write the file
		RNFS.writeFile(path, newData, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  	
			that.getPoem();
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });

			

	}
	else{
		var path = RNFS.DocumentDirectoryPath + '/test14.txt';

		// var sherNumberComma = sherNumber + ',';
		var sherAt = sher.id + '@' + sher.sherContent[0].text[0] + '@' + sher.sherContent[0].text[1] + '@' + sher.sherContent[1].text[0] + '@' + sher.sherContent[1].text[1] + '@';


		// write the file
		RNFS.appendFile(path, sherAt, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  	that.getPoem();
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });
		
		
	}
	})


  }

	async readBookmarks() { 

		const path = RNFS.DocumentDirectoryPath + '/test14.txt';
		try {
			const yamlFile = await RNFS.readFile(path, "utf8")
			var partsOfStr = yamlFile.split('@');
			return partsOfStr;
		}
		catch(e) {
			return "";
		}

	}

	componentDidMount() {
	 	try {

			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});

			this.getPoem();
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
	/*
		var item3 = this.state.poemTextNew.map( (item, index) =>
			<p key={item.index} onClick={() => this.onSubmit(item.id)}> {item.sherContent[0].text[0]}<br/>{item.sherContent[0].text[1]}<br/>{item.sherContent[1].text[0]}<br/>{item.sherContent[1].text[1]}</p>
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
	*/
/*

			<div>
			<div class="text-right">
				{signinTag}
			</div>
			<div class="tabTitle">


				<p>
					{this.state.poemNameUrdu}
				</p>

				<p>
					{this.state.poemNameEnglish}
				</p>
			</div>

				<div class="text-center listPoemPageText">
				{item3}
				</div>
			</div>
*/
/*
		var itemScroll = this.state.poemTextNew.map( (item, index) =>
          		<View style={{flex: 1, flexDirection: "row", alignItems: 'flex-start'}}><View  style={{flex: 0.2, justifyContent: 'center', }}><Image source={star} style={{width: 30, height: 30}} /></View><View style={{flex: 0.8}}><View style={styles.RenderedView} ><TouchableHighlight  onPress={() => this.onSubmit(item.id)}><View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View></View>
			
		);
*/
		var that = this
		var itemScroll = this.state.poemTextNew.map( function (item, index) {
			
				return <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}><View  style={{justifyContent: 'center',alignItems: 'center' }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{justifyContent: 'space-between'}}><View style={styles.RenderedView} ><TouchableHighlight  onPress={() => that.onSubmit(item.id)}><View><View><Text style={styles.RenderedText}>{item.textUrdu1}</Text></View><View><Text style={styles.RenderedText}>{item.textUrdu2}</Text></View><View><Text style={styles.RenderedText}>{item.textEnglish1}</Text></View><View><Text style={styles.RenderedText}>{item.textEnglish2}</Text></View></View></TouchableHighlight></View></View></View>
			
		});


		var testItem = this.state.poemTextNew.map( (item, index) =>
          		<View style={{flexDirection: "row",}}><View  style={{justifyContent: 'center', }}><Image source={starNotLiked} style={{width: 30, height: 30}} /></View><View style={{}}><Text>Hello</Text></View></View>
			
		);

		return (
      <View style={styles.MainContainer}>
			<View>
                                <Text style={styles.UrduTitle}>

					Bookmarked Shers
                                </Text>
			</View>
			
			<ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
				{itemScroll}
				{/*{testItem}*/}
			</ScrollView>

{/*
        <FlatList
          data={
		this.state.poemTextNew
          }
          // renderItem={({item}) => <View><Text style={styles.item} onClick={() => this.onSubmit(item)}>{item.sherContent[0].text[0]}</Text><Text>{item.sherContent[0].text[1]}</Text><Text>{item.sherContent[1].text[0]}</Text><Text>{item.sherContent[1].text[1]}</Text>}
          // renderItem={({item}) => <View ><Image resizeMode='cover' style={styles.StarImage} source={star}/><TouchableHighlight onPress={() => this.onSubmit(item)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View>}

          // renderItem={({item}) => <View ><Image style={styles.StarImage} source={star}/><TouchableHighlight onPress={() => this.onSubmit(item)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View>}
          renderItem={({item}) => <View style={{flexDirection: "row"}}><View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}><Image source={star} style={{width: 30, height: 30}} /></View><View style={{flex: 5}}><TouchableHighlight onPress={() => this.onSubmit(item)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>

}
        />
*/}

	</View>


		)
	}	// render function ends

}	// class ends


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  StarImage: {

    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
    // resizeMode: 'contain',

  },
  RenderedView: {
    // height: 44,
    // borderBottomRadius: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
  },

  RenderedText: {
    // flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
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
   
  }
  
})

export default PoemPage
