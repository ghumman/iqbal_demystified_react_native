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

	getPoem (listId) {

		console.log("listId: " + listId);

    	var that = this;
	  // var response = StaticContentService.getPoem(listId);
	  StaticContentService.getPoem(listId).then(function(response){

	  console.log("response: ");
	  console.log(response);


	  var yamlObject = YAML.parse(response)
	  // this.poemList = yamlObject
	  // this.setState({poemList: yamlObject.name});
	    //
	  console.log("yamlObject : ")
	  console.log(yamlObject)
	
	console.log("yamlObject.sher")
	console.log(yamlObject.sher)

	console.log("yamlObject.sher.length")
	console.log(yamlObject.sher.length)

       that.read_bookmarks().then(function(result)	{
	
		
		console.log("result");
		console.log(result);
	
	  for (var i=0; i<yamlObject.sher.length; i++) {

		  try {
			if (result.includes(yamlObject.sher[i].id))
				yamlObject.sher[i].star = true;
			else
				yamlObject.sher[i].star = false;
		  }
			catch(e) {
		    console.log("catch caught an error");
			}
	  }


	console.log("yamlObject.sher")
	console.log(yamlObject.sher)

        let newArr = [yamlObject.sher]
        console.log("Value of newArr")
        console.log(newArr)

	console.log("newArr[0].length");
	console.log(newArr[0].length);


        console.log("Value of newArr")
        console.log(newArr)

        // console.log("newArr.sherContent[0].text")
        // console.log(yamlObject.sher[0].sherContent[0].text)

          yamlObject.sher.map(el => {
	     try{
		    el.sherContent[0].text = el.sherContent[0].text.split('|')
		    console.log(el.sherContent[0].text)
	    }catch (err) {
		    		console.log("zero catch")
	    }
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) { 
		    		console.log("first catch")
				el.sherContent.push({"text": ["#translation missing", "#translation missing"]})

				console.log(el.sherContent[1].text)
	  }
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {
		    		console.log("second catch")
				el.sherContent.push({"text": ["#translation missing", "#translation missing"]})
				console.log(el.sherContent[2].text)
	    
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
            poemTextNew: newArr[0]
        })
		/*
	  for (var i=0; i<yamlObject.sher.length; i++) {

		  try {
		  	for (var j=0; j<yamlObject.sher[i].sherContent.length; j++){
					that.state.poemText.push({"text" : yamlObject.sher[i].sherContent[j].text[0], "id" : yamlObject.sher[i].id});
					that.state.poemText.push({"text" : yamlObject.sher[i].sherContent[j].text[1], "id" : yamlObject.sher[i].id});
				}
		  }
			catch(e) {
		    console.log("catch caught an error");
			}
	  }
	  	*/
	  that.setState({poemNameUrdu: yamlObject.heading[0].text});
	  that.setState({poemNameEnglish: yamlObject.heading[1].text});

	  console.log("poemNameUrdu: ");
	  console.log(yamlObject.heading[0].text);
	  console.log("poemNameEnglish: ");
	  console.log(yamlObject.heading[1].text);
	});
	})

	}
	
  // async testing_rnfs(){
  testing_rnfs = (sherNumber) => {

	var that = this;


       this.read_bookmarks().then(function(result)	{
	
		
		console.log("result");
		console.log(result);

	// console.log("testing_rnfs");
	// create a path you want to write to
	// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
	// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable


       
	if (result.includes(sherNumber)){
		var index = result.indexOf(sherNumber);
		if (index > -1)	{
			result.splice(index, 1);
		}

		console.log("result");
		console.log(result);
		
		var newData = result.join(',');

		console.log("newData");
		console.log(newData);

		var path = RNFS.DocumentDirectoryPath + '/test3.txt';

		// var sherNumberComma = sherNumber + ',';


		// write the file
		RNFS.writeFile(path, newData, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });

		  let poemName = that.props.navigation.getParam('detailPoem');
		  console.log("In poempage.js inside testingRNFS if");
		  that.getPoem(poemName);
			

	}
	else{
		var path = RNFS.DocumentDirectoryPath + '/test3.txt';

		var sherNumberComma = sherNumber + ',';


		// write the file
		RNFS.appendFile(path, sherNumberComma, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });
		
		
		  let poemName = that.props.navigation.getParam('detailPoem');
		  console.log("In poempage.js inside testingRNFS else");
		  that.getPoem(poemName);
	}
	})


  }

	async read_bookmarks() { 

		const path = RNFS.DocumentDirectoryPath + '/test3.txt';
		const yamlFile = await RNFS.readFile(path, "utf8")
		var partsOfStr = yamlFile.split(',');
		return partsOfStr;

	}

	componentDidMount() {
		// testing RNFS
		// this.testing_rnfs();
		// window.scrollTo(0, 0)
	  // retrive the data
	 	try {

			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});

			let poemName = this.props.navigation.getParam('detailPoem');
			console.log("In poempage.js inside componentdidmount");
			this.getPoem(poemName);
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
			
          		 if (item.star) 
				return <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}><View  style={{justifyContent: 'center',alignItems: 'center' }}><TouchableHighlight onPress={() =>that.testing_rnfs(item.id)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{justifyContent: 'space-between'}}><View style={styles.RenderedView} ><TouchableHighlight  onPress={() => that.onSubmit(item.id)}><View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View></View>
			else 
          			return <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}><View  style={{justifyContent: 'center',alignItems: 'center' }}><TouchableHighlight onPress={() =>that.testing_rnfs(item.id)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{justifyContent: 'space-between'}}><View style={styles.RenderedView} ><TouchableHighlight  onPress={() => that.onSubmit(item.id)}><View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View></View>
			
		});


		var testItem = this.state.poemTextNew.map( (item, index) =>
          		<View style={{flexDirection: "row",}}><View  style={{justifyContent: 'center', }}><Image source={starNotLiked} style={{width: 30, height: 30}} /></View><View style={{}}><Text>Hello</Text></View></View>
			
		);

		return (
      <View style={styles.MainContainer}>
			<View>
                                <Text style={styles.UrduTitle}>
					{this.state.poemNameUrdu}

                                </Text>
			</View>
			<View>
                                <Text style={styles.EnglishTitle}>
					{this.state.poemNameEnglish}
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
          // renderItem={({item}) => <View><Text style={styles.item} onClick={() => this.onSubmit(item.id)}>{item.sherContent[0].text[0]}</Text><Text>{item.sherContent[0].text[1]}</Text><Text>{item.sherContent[1].text[0]}</Text><Text>{item.sherContent[1].text[1]}</Text>}
          // renderItem={({item}) => <View ><Image resizeMode='cover' style={styles.StarImage} source={star}/><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View>}

          // renderItem={({item}) => <View ><Image style={styles.StarImage} source={star}/><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View>}
          renderItem={({item}) => <View style={{flexDirection: "row"}}><View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}><Image source={star} style={{width: 30, height: 30}} /></View><View style={{flex: 5}}><TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>

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
