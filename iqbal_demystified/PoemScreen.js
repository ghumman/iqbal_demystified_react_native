import React from 'react'
import {ImageBackground, ScrollView,  Image,TextInput, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';

import iconAddSound from './assets/android_app_assets/audio_player_add_sound.png';
import iconBackward from './assets/android_app_assets/audio_player_backward.png';
import iconForward from './assets/android_app_assets/audio_player_forward.png';
import iconPause from './assets/android_app_assets/audio_player_pause.png';
import iconPlay from './assets/android_app_assets/audio_player_play.png';

// for formatting
// import './TabView1.css';

// import Divider from '@material-ui/core/Divider';

import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob'



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
		  poemObjects: [],
		
		  paused: true,
		  duration: 0.0,
		  currentTime: 0.0,

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

       that.readBookmarks().then(function(result)	{
	
		
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
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });

		  let poemName = that.props.navigation.getParam('detailPoem');
		  console.log("In poempage.js inside starToggling if");
		  that.getPoem(poemName);
			

	}
	else{
		var path = RNFS.DocumentDirectoryPath + '/test14.txt';

		// var sherNumberComma = sherNumber + ',';
		var sherAt = sher.id + '@' + sher.sherContent[0].text[0] + '@' + sher.sherContent[0].text[1] + '@' + sher.sherContent[1].text[0] + '@' + sher.sherContent[1].text[1] + '@';


		// write the file
		RNFS.appendFile(path, sherAt, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });
		
		
		  let poemName = that.props.navigation.getParam('detailPoem');
		  console.log("In poempage.js inside starToggling else");
		  that.getPoem(poemName);
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

soundForward = () => {

}

soundBackward = () => {


} 
// playTrack = () => {
playTrack(){
		console.log("Inside playTrack");
		// var that = this;
		let localSong = RNFS.CachesDirectoryPath + '/song-name.mp3';
RNFS.downloadFile('http://www.iqbal.com.pk/mp3/Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3', localSong).then(() => {
  let song = new Sound(localSong, '', (error) =>  {
    song.play();
  });
});

		{/*
		return <Video source={{uri: "http://www.iqbal.com.pk/mp3/Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3"}}   // Can be a URL or a local file.
		       ref={(ref) => {
			 this.player = ref
		       }}                                      // Store reference
		       onBuffer={this.onBuffer}                // Callback when remote video is buffering
		       onError={this.videoError} />
		*/}

}

    onLoad = (data) => {
      this.setState({ duration: data.duration });
    }

    onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
    }

    onEnd = () => {
      this.setState({ paused: true });
      this.video.seek(0);
    }

    getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    };	

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
				return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight  onPress={() => that.onSubmit(item.id)}><View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>
			else 
          			return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2}}><TouchableHighlight onPress={() =>that.starToggling(item)} ><Image resizeMode='cover' source={starNotLiked} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight  onPress={() => that.onSubmit(item.id)}><View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight></View></View>
			
		});


		var testItem = this.state.poemTextNew.map( (item, index) =>
          		<View style={{flexDirection: "row",}}><View  style={{justifyContent: 'center', }}><Image source={starNotLiked} style={{width: 30, height: 30}} /></View><View style={{}}><Text>Hello</Text></View></View>
			
		);


		var soundIcon;
		if (this.state.paused)
			soundIcon = <Image style={styles.RowImage} resizeMode="contain" source={iconPlay}/>
		else
			soundIcon = <Image style={styles.RowImage} resizeMode="contain" source={iconPause}/>

      const flexCompleted = Math.round(this.getCurrentTimePercentage() * 100);
      const flexRemaining = Math.round((1 - this.getCurrentTimePercentage()) * 100); 

		return (
      <View style={styles.MainContainer}>

		<Video source={{uri: "http://www.iqbal.com.pk/mp3/Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3"}}   // Can be a URL or a local file.
		       ref={(ref) => {
			 this.player = ref
		       }}                                      // Store reference
		       onBuffer={this.onBuffer}                // Callback when remote video is buffering
		       paused={this.state.paused}
		       onLoad={this.onLoad}
		       onProgress={this.onProgress}
		       onEnd={this.onEnd}
		       onError={this.videoError} />


			<View style={{flex: 0.1}}>
                                <Text style={styles.UrduTitle}>
					{this.state.poemNameUrdu}

                                </Text>
			</View>
			<View style={{flex: 0.1}}>
                                <Text style={styles.EnglishTitle}>
					{this.state.poemNameEnglish}
                                </Text>
			</View>
			
			<View style={{flex: 1}}>
			<ScrollView contentContainerStyle={{alignItems: 'center'}}>
				{itemScroll}
				{/*{testItem}*/}
			</ScrollView>
			</View>
		
		
			<View style={{flex: 0.2, flexDirection: 'row',borderWidth: 0.5, borderColor: 'black'}}>
				<TouchableHighlight  style={styles.HighlightProperties}  onPress={() => this.soundBackward()}>
					<Image style={styles.RowImage} resizeMode="contain" source={iconBackward}/>
				</TouchableHighlight>
				<TouchableHighlight  style={styles.HighlightProperties}  onPress={() => {this.setState({paused: !this.state.paused})}}>
				{soundIcon}
		{/*<Video source={{uri: "http://www.iqbal.com.pk/mp3/Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3"}}   // Can be a URL or a local file.
		       ref={(ref) => {
			 this.player = ref
		       }}                                      // Store reference
		       onBuffer={this.onBuffer}                // Callback when remote video is buffering
		       audioOnly={true}
		       poster='./assets/android_app_assets/audio_player_play.png'
		       onError={this.videoError} />
			*/}
				</TouchableHighlight>
				<TouchableHighlight  style={styles.HighlightProperties}  onPress={() => this.soundForward()}>
					<Image style={styles.RowImage} resizeMode="contain" source={iconForward}/>
				</TouchableHighlight>
				{/*
				<TouchableHighlight  style={styles.HighlightProperties}>
					
					<Text>{flexRemaining}:{flexCompleted}</Text>					

				</TouchableHighlight>
				*/}
				
			</View>
			<View style={styles.controls}>
			    <View style={styles.progress}>
			    	<View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
			    	<View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
			    </View>
			 </View>

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
   alignItems: 'stretch',
   justifyContent: 'center'
  }, 
  UrduTitle : {
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
   
  },

backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  HighlightProperties: {
    flex: 1,
    overflow: 'hidden', 
    alignItems: 'center', 
    margin: 1
},

  RowImage: {
    flex: 1,
  },

      controls: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center'
      },
      progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        marginLeft: 10
      },

      innerProgressCompleted: {
        height: 10,
        backgroundColor: '#f1a91b',
      },

      innerProgressRemaining: {
        height: 10,
        backgroundColor: '#2C2C2C',
      }

  
})

export default PoemPage
