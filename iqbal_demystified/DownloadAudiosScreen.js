import React from 'react'
import {Modal, Linking, ImageBackground, ScrollView,  Image,TextInput, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import starLiked from './assets/android_app_assets/star_liked.png';
import starNotLiked from './assets/android_app_assets/star_not_liked.png';

import iconBackward from './assets/android_app_assets/audio_player_backward.png';
import iconForward from './assets/android_app_assets/audio_player_forward.png';
import iconPause from './assets/android_app_assets/audio_player_pause.png';
import iconPlay from './assets/android_app_assets/audio_player_play.png';
import iconGarbage from './assets/android_app_assets/garbage_icon.png';

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
		  poemNumber: "",
		  poemList: [],
		  poemAudioUrl: "",
		  poemNameUrdu: "",
		  poemNameEnglish: "",
		  poemText: [],
		  poemTextNew: [],
		  poemObjects: [],
		
		  paused: true,
		  duration: 0.0,
		  currentTime: 0.0,
		
		  showAudioBox: true,
		  isDownloadDone: false, 
		  modalVisible: false,
		  progressDownloadPercent: 0.0,
	
		  downloadedData: [],
		  downloadedDataFinal: [],

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
	
	that.setState({poemAudioUrl:  yamlObject.audioUrl});
	console.log("that.state.poemAudioUrl")
	console.log(that.state.poemAudioUrl)
	
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

		  let poemName = that.props.navigation.getParam('detailPoem');
		  console.log("In poempage.js inside starToggling if");
		  that.getPoem(poemName);
			

	}
	else{
		var path = RNFS.DocumentDirectoryPath + '/bookmarked-shers.txt';

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

	componentDidMount() {
	  // retrive the data
	 	try {

			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});
			this.readDirectory();

			// this.setState({poemNumber: this.props.navigation.getParam('detailPoem')});

			// let poemName = this.props.navigation.getParam('detailPoem');
			// console.log("In poempage.js inside componentdidmount");
			// this.getPoem(poemName);
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
	if (!this.state.paused)	{
		if ((this.state.duration - this.state.currentTime) > 6)
			this.player.seek(this.state.currentTime + 5);
		else
			this.player.seek(0);
	}
	/*
	console.log("this.state.duration")
	console.log(this.state.duration)
	console.log("this.state.currentTime")
	console.log(this.state.currentTime)
	*/
}

soundBackward = () => {
	if (!this.state.paused)	{
		this.player.seek(this.state.currentTime -  5);
	}
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
      // this.player.seek(0);
      this.setState({ paused: true });
    }

    getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    };	

    resumeIfUrlPresent() {
    // resumeIfUrlPresent = ()  => {
	if (this.state.poemAudioUrl != "")
		this.setState({paused: !this.state.paused})
	else {
		Alert.alert(
  'Upload a Recording!',
  'We need your recording of this poem. Please upload an audio recording on SoundCloud and share with us on our Facebook Page. If your recording is selected, we will include it in the next version of the app!',
  [
    {
      text: 'CANCEL',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'GO TO SOUNDCLOUD', onPress: () => Linking.openURL('https://soundcloud.com')},
  ],
  {cancelable: true},
);
	}
     }

videoSelection(audioFile) {
	console.log("Inside videoSelection");
	console.log("audioFile: ", audioFile)
	return <View><Text>Hello</Text></View>

}

onDownloadAudio(audioFile) {

	console.log("Inside onDownloadAudio")

	let path = RNFS.DocumentDirectoryPath + '/Iqbal-Demystified/' + audioFile;

		return this.videoSelection(audioFile);
       	// this.setState({ isDownloadDone: true })
	// this.setState({paused: !this.state.paused})
	console.log("isDonwloadDone set to true and paused is toggled")
}

onCheckFileExists() {
	// let path = '${RNFS.DocumentDirectoryPath}/001_001.mp3'
	// let path = './001_001.mp3'
	// let path = '001_001.mp3'
	// let path = 'Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3'
	// let path = RNFS.DocumentDirectoryPath + '/001_001';
	// let path = RNFS.DocumentDirectoryPath + '/001_001.mp3';
	let path = RNFS.DocumentDirectoryPath + '/Iqbal-Demystified/' + this.state.poemNumber + '.mp3';
	// RNFS.exists('RNFS.DocumentDirectoryPath/001_001.mp3')
	RNFS.exists(path)
    .then( (exists) => {
        if (exists) {
            console.log("BLAH EXISTS");
        } else {
            console.log("BLAH DOES NOT EXIST");
        }
    });

}

videoError() {
	console.log("Inside videoError")
}


readDirectory() { 
	
	var that = this;
	that.state.downloadedData = []

	// read the directory and give me stats like total number of files and names of files
	// RNFS.readDir(RNFS.DocumentDirectoryPath/Iqbal-Demystified/) 
	// path = $(RNFS.DocumentDirectoryPath)/Iqbal-Demystified
	RNFS.readDir(RNFS.DocumentDirectoryPath + '/Iqbal-Demystified') 
	// RNFS.readDir(path) 
	  .then((result) => {
	    console.log('GOT RESULT', result);
	    console.log('result.length', result.length)
			// that.state.downloadedData.push({"audioFile" : result[i].name});
	var previousResult = result;	

       that.readDownloadedAudioFile().then(function(result1){
	    for (i=0; i < previousResult.length; i++){
		if (previousResult[i].isFile()){
			console.log('prevousResult[i].name', previousResult[i].name);	
		console.log("result1");
		console.log(result1);
		
		console.log("previousResult");
		console.log(previousResult);


		try {
			if (result1.includes(previousResult[i].name))	{
				console.log("found the mp3 file inside saved yaml file")
				var index = result1.indexOf(previousResult[i].name);
				that.state.downloadedData.push({"audioFile": previousResult[i].name,  "urduTitle" : result1[index+1], "englishTitle" : result1[index+2]});
			}
			else {
				console.log("printing this line means, we have mp3 file in Iqbal-demystified directory but it is not saved in downloaded-audio.yaml file")
				that.state.downloadedData.push({"audioFile": previousResult[i].name,  "urduTitle" : "#missing title", "englishTitle" : "#missing translation" });
			}

		}catch(e) { 
			console.log("Inside catch, error: ")
			console.log(e)
		}
		}	// if the selected file in the directory isFile ends
	    }	// for loop for all the files inside Iqbal-Demystified folder ends

    		that.setState({downloadedDataFinal: that.state.downloadedData});

		console.log("that.setState.downloadedData")
		console.log(that.setState.downloadedData)

		console.log("that.setState.downloadedDataFinal")
		console.log(that.setState.downloadedDataFinal)

	})	// readDownloadedAudioFile.then ends

	  })	// RNFS.readDir.then ends

	// put names in array after removing file extention .mp3
	
	// Open yaml poem files one by one inside array 

	// fetch the Urdu title and English title

}

  readFromDownloadedAudioFile = (poem) => {

	var that = this;


       this.readDownloadedAudioFile().then(function(result)	{
	
		
		console.log("result");
		console.log(result);

	if (result.includes(poem)){
		console.log("poem is in the file")
		/*
		var index = result.indexOf(poem);
		if (index > -1)	{
			result.splice(index, 3);
		}

		console.log("result");
		console.log(result);
		
		var newData = result.join('@');

		console.log("newData");
		console.log(newData);

		var path = RNFS.DocumentDirectoryPath + '/downloaded-poems.yaml';



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
		*/

			

	}

	else{

		console.log("poem is not in the file")
		var path = RNFS.DocumentDirectoryPath + '/downloaded-poems.yaml';

		// var sherNumberComma = sherNumber + ',';
		var sherNumberComma = poem + '@' + that.state.poemNameUrdu + '@' + that.state.poemNameEnglish + '@';


		// write the file
		RNFS.appendFile(path, sherNumberComma, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');
			/*
                        let bookName = that.props.navigation.getParam('detailBook');
		  	console.log("In listPoemScreen.js inside starToggling else");
                        that.getPoemList(bookName);
			*/
		  })
		  .catch((err) => {
		    console.log(err.message);
		  });
		
		
		}	
	})


  }
	

deleteDownloadEntry(audioFile) {

	var that = this;
		
       this.readDownloadedAudioFile().then(function(result){
		console.log("result");
		console.log(result);
       
	if (result.includes(audioFile)){
		console.log("poem is in the file")
		var index = result.indexOf(audioFile);
		if (index > -1)	{
			result.splice(index, 3);
		}

		console.log("result");
		console.log(result);
		
		var newData = result.join('@');

		console.log("newData");
		console.log(newData);

		var path = RNFS.DocumentDirectoryPath + '/downloaded-poems.yaml';



		// write the file
		RNFS.writeFile(path, newData, 'utf8')
		  .then((success) => {
		    console.log('FILE WRITTEN!');

                        that.readDirectory();
		  })	// writeFile.then ends
		  .catch((err) => {
		    console.log(err.message);
		  });
}	// if entry was available in yaml file finished
			
})	// readDownloadedAudioFile.then ends

}

deleteDownload(audioFile) {
	var that = this;
	var path = RNFS.DocumentDirectoryPath + '/Iqbal-Demystified/' + audioFile;


	RNFS.unlink(path).then(() => {
	    console.log('FILE DELETED');
	    that.deleteDownloadEntry(audioFile);
	    // readDirectory() function is called inside deleteDownloadEntry function after removing, restructuring and writing to file
	
	  })
	  // `unlink` will throw an error, if the item to unlink does not exist
	  .catch((err) => {
	    console.log("Inside catch error")
	    console.log(err.message);
	  });
	

}

	async readDownloadedAudioFile() { 

		const path = RNFS.DocumentDirectoryPath + '/downloaded-poems.yaml';
		try {
			const yamlFile = await RNFS.readFile(path, "utf8")
			var partsOfStr = yamlFile.split('@');
			return partsOfStr;
		}
		catch(e) {
			return "";
		}

	}


	render() {
		var that = this
		var itemDownload = this.state.downloadedDataFinal.map( function (item, index) {
				return <View style={{flex: 1, flexDirection: "column"}}><View  style={{justifyContent: 'center',alignItems: 'center', flex: 0.2 }}><TouchableHighlight onPress={() =>that.deleteDownload(item.audioFile)} ><Image resizeMode='cover' source={iconGarbage} style={{width: 20, height: 20}} /></TouchableHighlight></View><View style={{borderBottomWidth: 0.5, borderBottomColor: '#d6d7da', flex: 0.8}} ><TouchableHighlight  onPress={() => that.onDownloadAudio(item.audioFile)}><View><View><Text style={styles.RenderedText}>{item.audioFile}</Text></View><View><Text style={styles.RenderedText}>{item.urduTitle}</Text></View><View><Text style={styles.RenderedText}>{item.englishTitle}</Text></View></View></TouchableHighlight></View></View>
			
		});
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


     var totalMinutes = Math.floor(this.state.duration / 60);
     var totalSeconds = Math.round(this.state.duration - totalMinutes * 60);

     var currentMinutes = Math.floor(this.state.currentTime / 60);
     var currentSeconds = Math.round(this.state.currentTime - currentMinutes * 60);

     var formattedTotalMinutes = ("0" + totalMinutes).slice(-2);
     var formattedTotalSeconds = ("0" + totalSeconds).slice(-2);
     var formattedCurrentMinutes = ("0" + currentMinutes).slice(-2);
     var formattedCurrentSeconds = ("0" + currentSeconds).slice(-2);


     var audioBox; 
     if (this.state.showAudioBox)
	audioBox = <Text style={{backgroundColor: 'skyblue'}}>Hide Audio Box</Text>	
     else
	audioBox = <Text style={{backgroundColor: 'skyblue'}}>Show Audio Box</Text>	


     var audioSystem1; 
     if (this.state.showAudioBox)
     audioSystem1 = <View style={{flex: 0.2, flexDirection: 'row',borderWidth: 0.5, borderColor: 'black'}}>
				<TouchableHighlight  style={styles.HighlightProperties}  onPress={() => this.soundBackward()}>
					<Image style={styles.RowImage} resizeMode="contain" source={iconBackward}/>
				</TouchableHighlight>

				<TouchableHighlight  style={styles.HighlightProperties}  onPress={() => this.onDownloadAudio()}>
				{soundIcon}
				</TouchableHighlight>

				<TouchableHighlight  style={styles.HighlightProperties}  onPress={() => this.soundForward()}>
					<Image style={styles.RowImage} resizeMode="contain" source={iconForward}/>
				</TouchableHighlight>

				
			</View>

	else 
		audioSystem1 = <View></View>;

     var audioSystem2; 
     if (this.state.showAudioBox)

     audioSystem2 = <View style={{flex:0.2}}>
				<View style={styles.controls}>
				    <View style={styles.progress}>
					<Text>{formattedCurrentMinutes}:{formattedCurrentSeconds}</Text>
					<View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
					<View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
					<Text>{formattedTotalMinutes}:{formattedTotalSeconds}</Text>
				    </View>
				 </View>
			</View>

     else 
		audioSystem2 = <View></View>;

// var path = 'file://' + RNFS.DocumentDirectoryPath + '/001_001.mp3';
// let path = RNFS.DocumentDirectoryPath + '/001_004.mp3';
let path = RNFS.DocumentDirectoryPath + '/Iqbal-Demystified/' + this.state.poemNumber + '.mp3';
// var requirePath = require

var videoSetup; 
if (this.state.isDownloadDone)
	videoSetup = <Video source={{uri:path}} 		
		       ref={(ref) => {
			 this.player = ref
		       }}         
		       onBuffer={this.onBuffer}        
		       paused={this.state.paused}
		       onLoad={this.onLoad}
		       onProgress={this.onProgress}
		       onEnd={this.onEnd}
		       repeat={true}
		       onError={this.videoError} />
else
	videoSetup = null;

		return (

      <View style={styles.MainContainer}>


	{/*
      <View>

	<TouchableHighlight onPress={() => this.readDirectory()}>
		<Text>Read Directory</Text>
	</TouchableHighlight>
      </View>
	*/}



        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
  <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'}}>
    <View style={{
            justifyContent: 'center',
    	    backgroundColor: 'skyblue',
            alignItems: 'center',
            width: 180,
            height: 50}}>
              <Text >Download Percentage: {this.state.progressDownloadPercent}</Text>
    </View>
  </View>

        </Modal>

	{videoSetup}



			<View style={{flex: 0.2}}>
                                <Text style={styles.UrduTitle}>
					MY Downloads
                                </Text>
			</View>
			
			<View style={{flex: 2}}>
			<ScrollView contentContainerStyle={{alignItems: 'center'}}>
				{itemDownload}
				{/*{itemScroll}*/}
				{/*{testItem}*/}
			</ScrollView>
			</View>

			<View style={{flex: 0.1, alignItems: 'flex-end'}}>
				<TouchableHighlight onPress={() => this.setState({showAudioBox: !this.state.showAudioBox})}>
					{audioBox}
				</TouchableHighlight>
			</View>

			{audioSystem1}
			{audioSystem2}
		
		

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

 OuterCircle: {
    backgroundColor: 'skyblue',
    width: 150,
    height: 150,
    // borderRadius: 100/2,
    justifyContent: 'center',
    alignItems: 'center'
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
