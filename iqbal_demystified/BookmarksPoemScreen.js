import React from "react";
import { ScrollView, Image,  TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';

// import Divider from '@material-ui/core/Divider';
// import { Divider } from 'react-native-elements';

// import StaticContentService from './StaticContentServiceYamlTest2';
// import StaticContentService from './StaticContentServiceYamlTest';
import StaticContentService from './StaticContentServiceYaml';

import AsyncStorage from '@react-native-community/async-storage';

var RNFS = require('react-native-fs');
var  YAML = require('yaml');

const FONT = "Normal";
const TEXT = "Urdu";

class ListPoemScreen extends React.Component {
        constructor(props) {
    super(props);   
    this.state = {  
                
                        // following three are normally passed to every page
            username: "hello",
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
            poemTextFinal: [],
            poemObjects: [],

	    font: "Normal",
	    text: "Urdu",

    }   // this.state ends
        }       // constructor ends

  starToggling = (poem) => {

	var that = this;


       this.readBookmarks().then(function(result)	{
	
		
		console.log("result");
		console.log(result);

	// create a path you want to write to
	// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
	// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable


       
	if (result.includes(poem.id)){
		console.log("poem is in the file")
		var index = result.indexOf(poem.id);
		if (index > -1)	{
			result.splice(index, 3);
		}

		console.log("result");
		console.log(result);
		
		var newData = result.join('@');

		console.log("newData");
		console.log(newData);

		var path = RNFS.DocumentDirectoryPath + '/bookmarked-poems.yaml';



		// write the file
		RNFS.writeFile(path, newData, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');

                        that.getPoemList();
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });

			

	}
	else{

		console.log("poem is not in the file")
		var path = RNFS.DocumentDirectoryPath + '/bookmarked-poems.yaml';

		// var sherNumberComma = sherNumber + ',';
		var sherNumberComma = poem.id + '@' + poem.textUrdu + '@' + poem.textEnglish + '@';


		// write the file
		RNFS.appendFile(path, sherNumberComma, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
                        that.getPoemList();
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });
		
		
	}
	})


  }

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
	// Alert.alert('inside componentDidMount')
	console.log('inside componentDidMount')
        // retrive the data
                try {

			this.onDidFocusCustomFunction();

			console.log('value of this.props.navigation.getParam(profileSigninConfirmation)')
			console.log(this.props.navigation.getParam('profileSigninConfirmation'))
                        this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
	console.log('setState signin confirmation passed')
                        this.setState({username: this.props.navigation.getParam('profileUsername')});
	console.log('setState username passed')
                        this.setState({password: this.props.navigation.getParam('profilePassword')});
	console.log('setState password passed')
                        // let bookName = this.props.navigation.getParam('detailBook');
	// console.log('setState bookName passed')
                        this.getPoemList();
	// console.log('setState getPoemList passed')
                }
                catch(e) {
                        // Alert.alert("Inside catch");
                        console.log("Inside catch");
                        console.log("Error");
                        console.log(e);
                }
        }

	getPoemList() {

	this.setState({poemText: []});
		
		// Alert.alert('bookName reaceived is {bookname}')
		// console.log('Inside getPoemList')
		// console.log('bookName reaceived is {listId}')
		// Alert.alert(bookname)
		// console.log(listId)


    var that = this;

    	// console.log("response: ");
    	//console.log(response);
		
    // var yamlObject = YAML.parse(response)
        
    // console.log("yamlObject : ")
    // console.log(yamlObject)


		// that.setState({poemList: yamlObject.sections});
    

    // console.log("that.state.poemList : ")
    // console.log(that.state.poemList);

    // that.setState({poemListName: that.state.poemList.poems});

    // console.log("that.state.poemListName : ")
    // console.log(that.state.poemListName);

    // console.log("yamlObject.name.text[0]")
    // console.log(yamlObject.name[0].text)


    // console.log("checkValueVar");

    // var checkValueVar = [];

    // console.log("Value of yamlObject.sections.length");
    // console.log(yamlObject.sections.length);

    // console.log("Value of yamlObject.sections[0].sectionName.length");
    // console.log(yamlObject.sections[0].sectionName.length);



       that.readBookmarks().then(function(result)	{
		console.log("result");
		console.log(result);
		
		// var set = new Set(result);

		for (i=0; i<((result.length-1)/3); i++ ) {
			console.log("Inside for loop for putting result")
		
			that.state.poemText.push({'id': result[i * 3], 'textUrdu': result[(i*3)+1], 'textEnglish': result[(i*3)+2]})
		}
			


    that.setState({poemTextFinal: that.state.poemText});

	console.log("that.setState.poemTextFinal")
	console.log(that.setState.poemTextFinal)



		
	})

	}

        onSubmit = (poemNumber) => {

          console.log("Value of poemNumber: ");
          console.log(poemNumber);
          if (poemNumber != 0)
          {
	  this.props.navigation.navigate('Poem', {detailPoem: poemNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});
          /*        this.props.history.push({
                            pathname: '/PoemPage',
                            state: { detailPoem: poemNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
                  })
	*/
          }
        }

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


					return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => that.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.textUrdu}</Text></View><View><Text style={fontFamilyTextVariable}>{item.textEnglish}</Text></View></View></TouchableHighlight></View></View>
			

}

  render() {


    var item3 = this.state.poemText.map( (item) => 
                        <Text key={item.index} onClick={() => this.onSubmit(item.id)}> {item.textUrdu}</Text> 
                );

		var that = this
/*
		var itemScroll = this.state.poemText.map( function (item, index) {
			
          		 if (item.id != 0 ) {
				if (item.star)
					return <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}><View  style={{justifyContent: 'center',alignItems: 'center' }}><TouchableHighlight onPress={() =>that.starToggling(item.id)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{justifyContent: 'space-between'}}><View style={styles.RenderedView} ><TouchableHighlight onPress={() => that.onSubmit(item.id)}><Text style={styles.RenderedText}>{item.textUrdu}</Text></TouchableHighlight></View></View></View>
				else
					return <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}><View  style={{justifyContent: 'center',alignItems: 'center' }}><TouchableHighlight onPress={() =>that.starToggling(item.id)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{justifyContent: 'space-between'}}><View style={styles.RenderedView} ><TouchableHighlight  onPress={() => that.onSubmit(item.id)}><Text style={styles.RenderedText}>{item.textUrdu}</Text></TouchableHighlight></View></View></View>
			
			}
			else 
				return <Text style={styles.RenderedText}>{item.textUrdu}</Text>
			
		});
*/
    return (
      <View style={styles.MainContainer}>
			<View>
                                <Text style={styles.UrduTitle}>
                                        Bookmarked Poems
                                </Text>
			</View>
			{/*
			<ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
				{itemScroll}
			</ScrollView>
			*/}

				{/*
                                <Text > {item3}
                                </Text>
				*/}
        <FlatList
          data={
		this.state.poemTextFinal
          }
          // renderItem={({item}) => <TouchableHighlight onPress={() => this.onSubmit(item.id)}><Text style={styles.RenderedText}>{item.text}</Text></TouchableHighlight>}
          renderItem={this.renderItem}        />



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
/*
  RenderedText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
*/

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

  RenderedTextNormal: {
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextNafees: {
    // fontFamily: 'NafeesNastaleeq',
    fontFamily: 'Nafees Nastaleeq v1.02',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextKasheeda: {
    // fontFamily: 'JameelNooriKasheeda',
    fontFamily: 'Jameel Noori Kasheeda',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextFajer: {
    // fontFamily: 'FajerNooriNastalique',
    fontFamily: 'Fajer Noori Nastalique 15-12-2006',
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
  EnglishTitle : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
   
  }
  
})


export default ListPoemScreen;
