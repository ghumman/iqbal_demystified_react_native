import React from "react";
import {Platform,  ScrollView, Image,  TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';

import AsyncStorage from '@react-native-community/async-storage';

// import Divider from '@material-ui/core/Divider';
// import { Divider } from 'react-native-elements';

// import StaticContentService from './StaticContentServiceYamlTest2';
// import StaticContentService from './StaticContentServiceYamlTest';
import StaticContentService from './StaticContentServiceYaml';

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

	static navigationOptions = ({ navigation }) => ({ 
		headerTitle: navigation.state.params.title || '',
		 headerTintColor: 'red',
		 headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 20, 
		       textAlign: 'center',
		 },
	})
		/*
   static navigationOptions = {
	         // headerTitle: this.state.bookNameUrdu,
	         headerTitle: 'this.state.bookNameUrdu',
		 headerTintColor: 'red',
		 headerTitleStyle: {
		       fontWeight: 'bold',*/
		       /*fontSize: 20, 
		       textAlign:'center',
			   },
    };
    */

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

                        let bookName = that.props.navigation.getParam('detailBook');
		  	console.log("In listPoemScreen.js inside starToggling if");
                        that.getPoemList(bookName);
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
                        let bookName = that.props.navigation.getParam('detailBook');
		  	console.log("In listPoemScreen.js inside starToggling else");
                        that.getPoemList(bookName);
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
	  console.log("res: ")
	  console.log(res)
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
	  console.log("res: ")
	  console.log(res)
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
                        let bookName = this.props.navigation.getParam('detailBook');
	console.log('setState bookName passed')
                        this.getPoemList(bookName);
	console.log('setState getPoemList passed')
                }
                catch(e) {
                        // Alert.alert("Inside catch");
                        console.log("Inside catch");
                        console.log("Error");
                        console.log(e);
                }
        }

	getPoemList(listId) {

	this.setState({poemText: []});
		
		// Alert.alert('bookName reaceived is {bookname}')
		console.log('Inside getPoemList')
		console.log('bookName reaceived is {listId}')
		// Alert.alert(bookname)
		console.log(listId)

    // var response = StaticContentService.getPoemList(listId).then(function(result)){

    var that = this;
    StaticContentService.getPoemList(listId).then(function(response){

    	console.log("response: ");
    	console.log(response);
		
    var yamlObject = YAML.parse(response)
        
    console.log("yamlObject : ")
    console.log(yamlObject)


		that.setState({poemList: yamlObject.sections});
    

    console.log("that.state.poemList : ")
    console.log(that.state.poemList);

    that.setState({poemListName: that.state.poemList.poems});

    console.log("that.state.poemListName : ")
    console.log(that.state.poemListName);

    console.log("yamlObject.name.text[0]")
    console.log(yamlObject.name[0].text)


    console.log("checkValueVar");

    var checkValueVar = [];

    console.log("Value of yamlObject.sections.length");
    console.log(yamlObject.sections.length);

    console.log("Value of yamlObject.sections[0].sectionName.length");
    console.log(yamlObject.sections[0].sectionName.length);



       that.readBookmarks().then(function(result)	{
		console.log("result");
		console.log(result);
		
		var set = new Set(result);

    for (var i=0; i<yamlObject.sections.length; i++) {
        try {
                if (yamlObject.sections[i].sectionName[0]) {
                        console.log(" sectionName exists" );
                        // for (var j=0; j<yamlObject.sections[i].sectionName.length; j++)
                        that.state.poemText.push({"textUrdu" : yamlObject.sections[i].sectionName[0].text, "textEnglish" : yamlObject.sections[i].sectionName[1].text, "id" : '0'});
                                        }
                }
        catch(e) {
                if (yamlObject.sections[i].poems[0].poemName[0]) {
                        console.log(" poems[0].poemName[0] exists" );
                        for (var j=0; j<yamlObject.sections[i].poems.length; j++){
                                // for (var k=0; k<yamlObject.sections[i].poems[j].poemName.length; k++) {

				// if (result.includes(yamlObject.sections[i].poems[j].id))
				if (set.has(yamlObject.sections[i].poems[j].id)){
                                                        that.state.poemText.push({"textUrdu" : yamlObject.sections[i].poems[j].poemName[0].text, "textEnglish" : yamlObject.sections[i].poems[j].poemName[1].text, "id" : yamlObject.sections[i].poems[j].id, "star": true})
				}
				else
                                                        that.state.poemText.push({"textUrdu" : yamlObject.sections[i].poems[j].poemName[0].text, "textEnglish" : yamlObject.sections[i].poems[j].poemName[1].text, "id" : yamlObject.sections[i].poems[j].id, "star": false})
                                                        // that.state.poemText.push({"text" : yamlObject.sections[i].poems[j].poemName[k].text, "id" : yamlObject.sections[i].poems[j].id, "star": false})
	
				// }
                                                that.setState({poemObject: yamlObject.sections[i].poems[j]})
                                        }
                                }       // if yamlObject.... ends
                        }       // catch ends
                }       // for ends

    // console.log("that.state.poemText.length")
    // console.log(that.state.poemText.length)

	
		

	// 	console.log("that.state.poemText.length");
	// 	console.log(that.state.poemText.length);

/*
	  for (var i=0; i<that.state.poemText.length; i++) {

		  try {
			console.log("that.state.poemText.id[" + i + "]")
			console.log(that.state.poemText[i].id)
			if (that.state.poemText[i].id != 0) {
				if (result.includes(that.state.poemText[i].id))
                                        that.state.poemText.push({"star" : true})
				else
                                        that.state.poemText.push({"star" : false})
			}
		  }
			catch(e) {
		    console.log("catch caught an error");
			}
	  }
*/

    console.log("that.state.poemText")
    console.log(that.state.poemText)


    console.log("Value of poemObject: ");
    console.log(that.state.poemObject);

    console.log("checkValueVar");
    console.log(checkValueVar);
    console.log("yamlObject.sections[0].sectionName[0].text");
    console.log(yamlObject.sections[0].sectionName[0].text);

/*
    try {
                  that.state.bookName = yamlObject.sections[0].sectionName.map((item, key) =>
                        <li key={item.text}>{item.text}</li>
                  )
    }
    catch(e) {
            console.log("caught error");
    }
    console.log("bookName: ");
    console.log(that.state.bookName);
*/

    that.setState({bookNameUrdu: yamlObject.name[0].text});
    that.setState({bookNameEnglish: yamlObject.name[1].text});
    that.setState({poemTextFinal: that.state.poemText});


    that.props.navigation.setParams({ title: that.state.bookNameUrdu })

    // that.setState({bookSections: yamlObject.sections});

    console.log("bookNameUrdu: ");
    // console.log(that.state.bookNameUrdu + "");
    console.log(yamlObject.name[0].text);
    console.log("bookNameEnglish: ");
    // console.log(that.state.bookNameEnglish + "");
    console.log(yamlObject.name[1].text);

    console.log("yamlObject.sections[1].poems[0].poemName[0].text: ");
    console.log(yamlObject.sections[1].poems[0].poemName[0].text);

    // that.setState({onePoem: yamlObject.sections[1].poems[0].poemName[0].text});

    

	});

    // console.log("response.name: ");
    // console.log(response.default);

    // var yamlObject = YAML.parse(response)
        
    // console.log("yamlObject : ")
    // console.log(yamlObject)

		
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

	// var fontFamilyTextVariable = styles.RenderedTextNormal;
	// var fontFamilyTextVariable = styles.RenderedTextNafees;
	// var fontFamilyTextVariable = styles.RenderedTextKasheeda;
	// var fontFamilyTextVariable = styles.RenderedTextFajer;


          		 if (item.id != 0 ) {
				if (item.star)
					return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => that.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.textUrdu}</Text></View><View><Text style={fontFamilyTextVariable}>{item.textEnglish}</Text></View></View></TouchableHighlight></View></View>
				else
					return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight onPress={() => that.onSubmit(item.id)}><View><View><Text style={fontFamilyTextVariable}>{item.textUrdu}</Text></View><View><Text style={fontFamilyTextVariable}>{item.textEnglish}</Text></View></View></TouchableHighlight></View></View>
			
			}
			else 
				// return <View><Text style={fontFamilyTextVariable}>{item.textUrdu}</Text><Text style={fontFamilyTextVariable}>{item.textEnglish}</Text></View>
				return <View style={{backgroundColor: '#C0C0C0'}}><Text style={{fontSize: 14, padding: 10}}>{item.textUrdu}</Text><Text style={{fontSize: 14, padding: 10}}>{item.textEnglish}</Text></View>

}


  render() {
	var fontFamilyTitleVariable;
	switch(this.state.font) {
		case 'Normal': 
			fontFamilyTitleVariable = styles.UrduTitleNormal;
			break;
		case 'Nafees': 
			fontFamilyTitleVariable = styles.UrduTitleNafees;
			break;
		case 'Kasheeda': 
			fontFamilyTitleVariable = styles.UrduTitleKasheeda;
			break;
		case 'Fajer': 
			fontFamilyTitleVariable = styles.UrduTitleFajer;
			break;
	}
// var fontFamilyTitleVariable = styles.UrduTitleNafees;
// var fontFamilyTitleVariable = styles.UrduTitleNormal;
// var fontFamilyTitleVariable = styles.UrduTitleKasheeda;
// var fontFamilyTitleVariable = styles.UrduTitleFajer;

    var item3 = this.state.poemText.map( (item) => 
                        <Text key={item.index} onClick={() => this.onSubmit(item.id)}> {item.textUrdu}</Text> 
                );

		var that = this

    return (
      <View style={styles.MainContainer}>
	    		{/*
	    		<View><Text style={{fontFamily: 'Jameel Noori Kasheeda'}}>اخلاص عمل مانگ نيا گان کہن س</Text></View>
	    		<View><Text style={{fontFamily: 'Jameel Noori Nastaleeq'}}>اخلاص عمل مانگ نيا گان کہن س</Text></View>
	    		<View><Text style={{fontFamily: 'asunaskh'}}>اخلاص عمل مانگ نيا گان کہن س</Text></View>
	    		<View><Text style={{fontFamily: 'Fajer Noori Nastalique 15-12-2006'}}>اخلاص عمل مانگ نيا گان کہن س</Text></View>
	    		<View><Text style={{fontFamily: 'Nafees Nastaleeq v1.02'}}>اخلاص عمل مانگ نيا گان کہن س</Text></View>
	    		<View><Text style={{fontFamily: 'Pak Nastaleeq (Beta Release)'}}>اخلاص عمل مانگ نيا گان کہن س</Text></View>
	    		<View><Text >اخلاص عمل مانگ نيا گان کہن س</Text></View>
			*/}
	    		{/*
			<View>
                                <Text style={fontFamilyTitleVariable}>
                                        {this.state.bookNameUrdu}
                                </Text>
			</View>
			<View>
                                <Text style={fontFamilyTitleVariable}>
                                        {this.state.bookNameEnglish}
                                </Text>
			</View>
			*/}
        <FlatList
          data={
		this.state.poemTextFinal
          }
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
    // fontFamily: 'Nafees Nastaleeq v1.02',
    fontFamily: Platform.OS === 'ios' ? 'NafeesNastaleeq' : 'Nafees Nastaleeq v1.02',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextKasheeda: {
    // fontFamily: 'JameelNooriKasheeda',
    // fontFamily: 'Jameel Noori Kasheeda',
    fontFamily: Platform.OS === 'ios' ? 'JameelNooriKasheeda' : 'Jameel Noori Kasheeda',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextFajer: {
    // fontFamily: 'FajerNooriNastalique',
    // fontFamily: 'Fajer Noori Nastalique 15-12-2006',
    fontFamily: Platform.OS === 'ios' ? 'FajerNooriNastalique' : 'Fajer Noori Nastalique 15-12-2006',
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
    // fontFamily: 'nastaleeq',
    // fontFamily: 'NotoNastaliqUrdu-Regular',
    // fontFamily: 'NafeesNastaleeq',
    // fontFamily: 'FajerNooriNastalique',
    // fontFamily: 'JameelNooriKasheeda',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    // color: 'blue',
  },

  UrduTitleNormal: { 
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    // color: 'blue',
  },

  UrduTitleNafees: { 
    // fontFamily: 'NafeesNastaleeq',
    fontFamily: Platform.OS === 'ios' ? 'NafeesNastaleeq' : 'Nafees Nastaleeq v1.02',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    // color: 'blue',
  },

  UrduTitleKasheeda: { 
    // fontFamily: 'JameelNooriKasheeda',
    fontFamily: Platform.OS === 'ios' ? 'JameelNooriKasheeda' : 'Jameel Noori Kasheeda',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    // color: 'blue',
  },
  
  UrduTitleFajer: { 
    // fontFamily: 'FajerNooriNastalique',
    fontFamily: Platform.OS === 'ios' ? 'FajerNooriNastalique' : 'Fajer Noori Nastalique 15-12-2006',
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    // color: 'blue',
  },

  EnglishTitle : {
    textAlign: 'center',
    // fontFamily: 'NafeesNastaleeq',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
    // color: 'blue',
   
  }
  
})


export default ListPoemScreen;
