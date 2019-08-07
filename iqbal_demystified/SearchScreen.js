import React from 'react'
import {Image, Platform, ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';


// for formatting
// import './TabView1.css';

// import Button from 'react-bootstrap/Button';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


// import PoemPage from './PoemPage';

var RNFS = require('react-native-fs');
var  YAML = require('yaml');

var radio_props = [
  {label: 'Title', value: 'title' },
  {label: 'Text', value: 'text' }
];


class SearchPage extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {

	    username: "",
	    password: "",
	    signinConfirmation: "",

	    searchText: "",
	    selectedOption: "title",

	    inputBoxClicked: false,

	    pictures: [],
	    listId: "List_001",
	    poemList: [],
	    sherList: [],
	    poemListName: [],
	    bookName: [],
	    bookNameUrdu: "",
	    bookNameEnglish: "",
	    bookSections: [],
	    onePoem: "",
	    poemText: [],
	    poemObjects: [], 
	    messageResults: "Results",


    }
		this.handleSearchText = this.handleSearchText.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleOptionChange = this.handleOptionChange.bind(this);

	}

	static navigationOptions = ({ navigation }) => ({ 
		headerTitle: 'Allama Iqbal Search Engine',
		 headerTintColor: 'red',
		 headerTitleStyle: {
		       fontWeight: 'bold',
		       fontSize: 10, 
		       textAlign: 'center',
		 },
	})


	handleAlphabet(alphabetValue) {
		console.log("alphabetValue: ")
		console.log(alphabetValue)
		if (alphabetValue != "Back")
			this.setState({searchText: this.state.searchText + alphabetValue})
		else

			this.setState({searchText: this.state.searchText.substr(0, this.state.searchText.length-1)})

	}

	handleInputClicked() {
		console.log("Input box is clicked: ")
		this.setState({inputBoxClicked: true})
	}

	handleOptionChange(changeEvent) {
		this.setState({selectedOption: changeEvent.target.value})
	}

	handleSearchText(event) {
		this.setState({searchText: event.target.value})
	}

	// handleSubmit
	handleSubmit(event) {

		this.setState({inputBoxClicked: false})

		console.log("SEARCH is pressed")
		console.log("You searched for: ")
		console.log(this.state.searchText)

		console.log("Option selected is: ")
		console.log(this.state.selectedOption)
		// event.preventDefault()

		if (this.state.searchText.trim() != "") {
			if (this.state.selectedOption == 'title'){

				console.log("going to getPoemListSearch")
				this.getPoemListSearch(this.state.searchText.trim())
			}
			else if (this.state.selectedOption == 'text'){

				console.log("going to getPoemSearch")
				this.getPoemSearch(this.state.searchText.trim())
			}
		}

		else {
			Alert.alert("Search Field can not be empty")
		}
	}

  starTogglingSher = (sher) => {

	var that = this;


       this.readBookmarksSher().then(function(result)	{
	
		
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
		  that.handleSubmit();
			

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
		
		  that.handleSubmit();

	}
	})


  }

	async readBookmarksSher() { 

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

                        // let bookName = that.props.navigation.getParam('detailBook');
		  	// console.log("In listPoemScreen.js inside starToggling if");
                        // that.getPoemListSearch(poem.id);
			that.handleSubmit();
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
                        // let bookName = that.props.navigation.getParam('detailBook');
		  	// console.log("In listPoemScreen.js inside starToggling else");
                        // that.getPoemListSearch(poem.id);
			that.handleSubmit();
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

  getPoemListSearch (listId) {

    var that = this;
    this.setState({messageResults: "Searching..."})
    that.setState({poemList : [] })
    StaticContentService.getPoemListSearch(listId).then(function(response){
	    console.log("Reseponse");
	    console.log(response);
    	that.readBookmarks().then(function(result)	{
	    console.log("Result");
	    console.log(result);
	  for (var i=0; i<response.poems.length; i++) {
		if (result.includes(response.poems[i].id)) {
			response.poems[i].star = true;
			console.log("star added")
		}
		else	{
			response.poems[i].star = false;
			console.log("star not added")
		}
	  }



	    that.setState({poemList : response.poems })
	    console.log("poemList");
	    console.log(that.state.poemList);
    	    that.setState({messageResults: "No Results Found"})
    })
    })

  }


  getPoemSearch (poemId) {
   
    var that = this;

    this.setState({messageResults: "Searching..."})
    that.setState({sherList : [] })

    // var response = StaticContentService.getPoemSearch(poemId)
    StaticContentService.getPoemSearch(poemId).then(function(response){
	    console.log("Reseponse");
	    console.log(response);
    	that.readBookmarksSher().then(function(result)	{
	    console.log("Result");
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

	    response.sher.map(el => {
				el.sherContent[0].text = el.sherContent[0].text.split('|')
				console.log(el.sherContent[0].text)
				try{
					el.sherContent[1].text = el.sherContent[1].text.split('|')
					console.log(el.sherContent[1].text)
				}
				catch(err)
				{
					el.sherContent.push({"text": ["#translation missing", "#translation missing"]})
					console.log(el.sherContent[1].text)
				}
				try{
					el.sherContent[2].text = el.sherContent[2].text.split('|')
				}
				catch(err)
				{
					el.sherContent.push({"text": ["#translation missing", "#translation missing"]})
					console.log(el.sherContent[2].text)
				}
				return el.sherContent = el.sherContent
	    })
	    console.log("Reseponse");
	    console.log(response);

	    that.setState({sherList : response.sher })
    	    that.setState({messageResults: "No Results Found"})
    })
    })
	}

	onSubmitPoem = (poemNumber) => {
	  console.log("Value of poemNumber: ");
	  console.log(poemNumber);
	  this.props.navigation.navigate('Poem', {detailPoem: poemNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});
	  /*
	  this.props.history.push({
		    pathname: '/PoemPage',
		    state: { detailPoem: poemNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
	  })
	  */
	}

	onSubmitSher = (sherNumber) => {
	  this.props.navigation.navigate('SherTabs', {detailSher: sherNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});

	  /*
	  this.props.history.push({
		pathname: '/SherPage',
		state: { detailSher: sherNumber,  profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password  }
	  })
	  */
	}

/*
	componentDidUpdate(prevProps, prevState) {

		  console.log("this.state.poemList")
		  console.log(this.state.poemList)

		  console.log("this.state.sherList")
		  console.log(this.state.sherList)

	}
*/

  componentDidMount() {
	  	// window.scrollTo(0, 0)
    // retrive the data
 		try {
			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});
			/*
			this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
			this.setState({username: this.props.location.state.profileUsername});
			this.setState({password: this.props.location.state.profilePassword});
			*/
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
		var items = this.state.bookSections.map((item, key) =>
			<Text key={item.sectionName}>{item.sectionName}</Text>
		);
		var items2 = items.map((item, key) =>
			<Text key={item.text}>{item.text}</Text>
		);

		var item3 = this.state.poemText.map( (item) =>
			<Text key={item.index} onPress={() => this.onSubmit(item.id)}> {item.text}: {item.id}</Text>
		);

		var itemsPoemOrSher = []
		var lenghtPoem = this.state.poemList.length
		var lenghtSher = this.state.sherList.length
		if (this.state.selectedOption  === "title") {
					if (this.state.poemList.length != 0) {
					
						var that = this;
						var itemsPoemOrSher = this.state.poemList.map( function (item, index) {
					// var itemsPoemOrSher = this.state.poemList.map((item, key) =>
          		 		if (item.star) {
						return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><Text style={styles.RenderedText} key={item.id} onPress={() =>that.onSubmitPoem(item.id)}>{item.poemName[0].text}</Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitPoem(item.id)}> {item.poemName[1].text} </Text></View></View>
						// return <View style={styles.RenderedView}><Text style={styles.RenderedText} key={item.id} onPress={() =>this.onSubmitPoem(item.id)}>{item.poemName[0].text}</Text><Text style={styles.RenderedText} onPress={() =>this.onSubmitPoem(item.id)}> {item.poemName[1].text} </Text></View>
					}
					else {
						return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><Text style={styles.RenderedText} key={item.id} onPress={() =>that.onSubmitPoem(item.id)}>{item.poemName[0].text}</Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitPoem(item.id)}> {item.poemName[1].text} </Text></View></View>
					}
		
					});
					}
					else {
					var itemsPoemOrSher = <View style={{alignItems: 'center', justifyContent: 'center'}}><Text style={{padding: 10, fontSize: 18}}>{this.state.messageResults}</Text></View>
					}

		}
		else {
			if (this.state.sherList.length != 0){
				var that = this;
				var itemsPoemOrSher = this.state.sherList.map( function (item, index) {
				// var itemsPoemOrSher = this.state.sherList.map((item, key) =>
          		 	if (item.star) {
					
					// return <View style={styles.RenderedView}><Text style={styles.RenderedText} key={item.id} onPress={() =>this.onSubmitSher(item.id)}> {item.sherContent[0].text[0]}</Text><Text style={styles.RenderedText} onPress={() =>this.onSubmitSher(item.id)}>{item.sherContent[0].text[1]} </Text><Text style={styles.RenderedText} onPress={() =>this.onSubmitSher(item.id)}> {item.sherContent[1].text[0]} </Text><Text style={styles.RenderedText} onPress={() =>this.onSubmitSher(item.id)}>{item.sherContent[1].text[1]}</Text></View>

					return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starTogglingSher(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><Text style={styles.RenderedText} key={item.id} onPress={() =>that.onSubmitSher(item.id)}> {item.sherContent[0].text[0]}</Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitSher(item.id)}>{item.sherContent[0].text[1]} </Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitSher(item.id)}> {item.sherContent[1].text[0]} </Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitSher(item.id)}>{item.sherContent[1].text[1]}</Text></View></View>
				}
				else {
					return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starTogglingSher(item)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><Text style={styles.RenderedText} key={item.id} onPress={() =>that.onSubmitSher(item.id)}> {item.sherContent[0].text[0]}</Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitSher(item.id)}>{item.sherContent[0].text[1]} </Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitSher(item.id)}> {item.sherContent[1].text[0]} </Text><Text style={styles.RenderedText} onPress={() =>that.onSubmitSher(item.id)}>{item.sherContent[1].text[1]}</Text></View></View>
						
				}
				});
			}
			else {
				var itemsPoemOrSher = <View style={{alignItems: 'center', justifyContent: 'center'}}><Text style={{padding: 10,  fontSize: 18}}>{this.state.messageResults}</Text></View>
			}
		}

		var aVar = this.state.bookSections.length;
		console.log("hello world");
		console.log(this.state.bookSections);
		var stationsArr = []
		for (var i = 0; i < this.state.bookSections.length; i++) {
	    stationsArr.push(
	    	<Text >
	    		{this.data}
	    	</Text>
     	)
		}
		/*
		let signinTag
		var signinMessageLocal = ""
		if (this.state.signinConfirmation  === "done") {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase()
		  signinTag = <Button type="Button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} />
		}
		else {
			signinMessageLocal = "Sign In"
		  signinTag = <Button  onPress={() => this.signMeIn()}> {signinMessageLocal} />
		}
		*/

		let keyboardTag
		if (this.state.inputBoxClicked  === true) {
  		keyboardTag = <View><View style={styles.container}><View style={styles.button}><Button  onPress={() => this.handleAlphabet("Back")} title='->'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ح")} title='ح'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("چ")} title='چ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ج")} title='ج'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ث")} title='ث'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ٹ")} title='ٹ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ت")} title='ت'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("پ")} title='پ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ب")} title='ب'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ا")} title='ا'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("آ")} title='آ'/></View></View><View style={styles.container}><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ص")} title='ص'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ش")} title='ش'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("س")} title='س'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ژ")} title='ژ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ز")} title='ز'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ڑ")} title='ڑ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ر")} title='ر'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ز")} title='ز'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ڈ")} title='ڈ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("د")} title='د'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("خ")} title='خ'/></View></View><View style={styles.container}><View style={styles.button}><Button  onPress={() => this.handleAlphabet("م")} title='م'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ل")} title='ل'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("گ")} title='گ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ک")} title='ک'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ق")} title='ق'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ف")} title='ف'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("غ")} title='غ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ع")} title='ع'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ظ")} title='ظ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ط")} title='ط'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ض")} title='ض'/></View></View><View style={styles.container}><View style={styles.button}><Button  onPress={() => this.handleAlphabet(" ")} title='Space'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ے")} title='ے'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ي")} title='ي'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ء")} title='ء'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ھ")} title='ھ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ہ")} title='ہ'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("و")} title='و'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ں")} title='ں'/></View><View style={styles.button}><Button  onPress={() => this.handleAlphabet("ن")} title='ن'/></View></View></View>

				{/*</View>
				<Text></Text>
				<View>*/}
{/*<View style={styles.button}><Button  onPress={() => this.handleAlphabet("خ")} title='خ'/></View>
				  <Button  onPress={() => this.handleAlphabet("ض")} title='ض'/>
				  <Button  onPress={() => this.handleAlphabet("ص")} title='ص'/>
				  <Button  onPress={() => this.handleAlphabet("ش")} title='ش'/>
				  <Button  onPress={() => this.handleAlphabet("س")} title='س'/>
				  <Button  onPress={() => this.handleAlphabet("ژ")} title='ژ'/>
				  <Button  onPress={() => this.handleAlphabet("ز")} title='ز'/>
				  <Button  onPress={() => this.handleAlphabet("ڑ")} title='ڑ'/>
				  <Button  onPress={() => this.handleAlphabet("ر")} title='ر'/>
				  <Button  onPress={() => this.handleAlphabet("ذ")} title='ذ'/>
				  <Button  onPress={() => this.handleAlphabet("ڈ")} title='ڈ'/>
				  <Button  onPress={() => this.handleAlphabet("د")} title='د'/>
*/}
				{/*</View>
				<Text></Text>
				<View>*/}
{/*
				  <Button  onPress={() => this.handleAlphabet("ں")} title='ں'/>
				  <Button  onPress={() => this.handleAlphabet("ن")} title='ن'/>
				  <Button  onPress={() => this.handleAlphabet("م")} title='م'/>
				  <Button  onPress={() => this.handleAlphabet("ل")} title='ل'/>
				  <Button  onPress={() => this.handleAlphabet("گ")} title='گ'/>
				  <Button  onPress={() => this.handleAlphabet("ک")} title='ک'/>
				  <Button  onPress={() => this.handleAlphabet("ق")} title='ق'/>
				  <Button  onPress={() => this.handleAlphabet("ف")} title='ف'/>
				  <Button  onPress={() => this.handleAlphabet("غ")} title='غ'/>
				  <Button  onPress={() => this.handleAlphabet("ع")} title='ع'/>
				  <Button  onPress={() => this.handleAlphabet("ظ")} title='ظ'/>
				  <Button  onPress={() => this.handleAlphabet("ط")} title='ط'/>
*/}
				{/*</View>
				<Text></Text>
				<View>*/}
{/*
				  <Button  onPress={() => this.handleAlphabet(" ")} title='Space'/>
				  <Button  onPress={() => this.handleAlphabet("ے")} title='ے'/>
				  <Button  onPress={() => this.handleAlphabet("ي")} title='ي'/>
				  <Button  onPress={() => this.handleAlphabet("ء")} title='ء'/>
				  <Button  onPress={() => this.handleAlphabet("ھ")} title='ھ'/>
				  <Button  onPress={() => this.handleAlphabet("ہ")} title='ہ'/>
				  <Button  onPress={() => this.handleAlphabet("و")} title='و'/>
				</View>
*/}
				{/*
				<ButtonToolbar class="text-center">
				  <Button variant="primary" onPress={() => this.handleAlphabet("Back")} class="text-center">->/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("خ")}>خ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ح")}>ح/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("چ")}>چ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ج")}>ج/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ث")}>ث/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ٹ")}>ٹ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ت")}>ت/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("پ")}>پ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ب")}>ب/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ا")}>ا/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("آ")}>آ/>
				</ButtonToolbar>

				<ButtonToolbar>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ض")}>ض/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ص")}>ص/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ش")}>ش/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("س")}>س/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ژ")}>ژ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ز")}>ز/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ڑ")}>ڑ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ر")}>ر/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ذ")}>ذ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ڈ")}>ڈ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("د")}>د/>
				</ButtonToolbar>

				<ButtonToolbar>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ں")}>ں/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ن")}>ن/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("م")}>م/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ل")}>ل/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("گ")}>گ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ک")}>ک/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ق")}>ق/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ف")}>ف/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("غ")}>غ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ع")}>ع/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ظ")}>ظ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ط")}>ط/>
				</ButtonToolbar>

				<ButtonToolbar>

				  <Button variant="primary" onPress={() => this.handleAlphabet(" ")}>Space/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ے")}>ے/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ي")}>ي/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ء")}>ء/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ھ")}>ھ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("ہ")}>ہ/>
				  <Button variant="primary" onPress={() => this.handleAlphabet("و")}>و/>

				</ButtonToolbar>
				*/}

		}
		else {
			// signinMessageLocal = "Sign In"
	  	keyboardTag = <Text></Text>
		}
/*


			<div>
			<div class="text-right">
	  		{signinTag}
			</div>

			<div class="text-center">
			<div class="tab2Text">
				<p>Allama Iqbal Search Engine</p>
				<form onSubmit={this.handleSubmit}>
    			<div className="radio">
			      <label>
			        <input type="radio" value="title"
	              checked={this.state.selectedOption === 'title'}
	              onChange={this.handleOptionChange} />
			        Title
			      </label>
			    </div>

			    <div className="radio">
			      <label>
			        <input type="radio" value="text"
	              checked={this.state.selectedOption === 'text'}
	              onChange={this.handleOptionChange} />
			        Text
			      </label>
			    </div>


				  <label>
				    Search Text:
				    <input type="text" class="sherPageText" value={this.state.searchText} onChange={this.handleSearchText} onPress={() => this.handleInputClicked()}/>
				  </label>

					<p></p>
		  		<input type="submit" value="SEARCH" />
				</form>
			</div>
			<div class="sherPageText text-center">
			
				{keyboardTag}
			</div>
				<p class="tab2Text">Search Results</p>
			<div class="sherPageText">

				{itemsPoemOrSher}
			</div>
			</div>

			</div>
*/
		return (
			<View style={{flex: 1}}>
				{/*
				<Text style={styles.EnglishTitle}>Allama Iqbal Search Engine</Text>*/}
     <View style={{flex: 1}}>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({selectedOption:value})}}
        />
      </View>

			<View style={styles.RenderedView}>
				<TextInput
				  style={{height: 40}}
				  placeholder="Search Text..."
				  onFocus={() => this.handleInputClicked()}
				  onChangeText={(text) => this.setState({searchText: text})}
				  value= {this.state.searchText}
				/>
			
			
			</View>
				<Button onPress={this.handleSubmit} title='SEARCH'/>
			<View style={{flex: 5}}>

			<ScrollView>
				{keyboardTag}
				{itemsPoemOrSher}
			</ScrollView>
			</View>
	</View>
		)	// return ends
	}	// render function ends
}	// class ends


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },

  RenderedView: {
    // height: 44,
    flex: 0.5, 
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
    padding: 3,
   
  },

  button: {
    // backgroundColor: 'green',
    // flex: 2,
    // borderRadius: 10,
    borderRadius: Platform.OS === 'ios' ? 10 : 0,
    // borderWidth: 1,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    // width: '40%',
    height: 40
  },
  
})


export default SearchPage
