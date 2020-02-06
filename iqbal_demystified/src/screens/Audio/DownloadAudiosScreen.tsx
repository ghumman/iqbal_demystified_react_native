import React from 'react';
import {
  Modal,
  Linking,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  Alert,
  View,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import StaticContentService from '../Misc/StaticContentServiceYaml';

// import iconBackward from '../../assets/android_app_assets/audio_player_backward.png';
const iconBackward = require('../../assets/android_app_assets/audio_player_backward.png');
// import iconForward from '../../assets/android_app_assets/audio_player_forward.png';
const iconForward = require('../../assets/android_app_assets/audio_player_forward.png');
// import iconPause from '../../assets/android_app_assets/audio_player_pause.png';
const iconPause = require('../../assets/android_app_assets/audio_player_pause.png');
// import iconPlay from '../../assets/android_app_assets/audio_player_play.png';
const iconPlay = require('../../assets/android_app_assets/audio_player_play.png');
// import iconGarbage from '../../assets/android_app_assets/garbage_icon.png';
const iconGarbage = require('../../assets/android_app_assets/garbage_icon.png');


const RNFS = require('react-native-fs');
const YAML = require('yaml');

class DownloadAudioScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signinConfirmation: '',

      listId: 'List_001',
      poemNumber: '',
      poemList: [],
      poemAudioUrl: '',
      poemNameUrdu: '',
      poemNameEnglish: '',
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

      audioPath: '',
    };
  }

  static navigationOptions = () => ({
    headerTitle: 'My Downloads',
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  });

  onSubmit = (sherNumber: any) => {
    this.props.navigation.navigate('SherTabs', {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password,
    });
  };

  getPoem(listId: any) {
    console.log(`listId: ${listId}`);
    const that = this;
    StaticContentService.getPoem(listId).then((response) => {
      console.log('response: ');
      console.log(response);

      const yamlObject = YAML.parse(response);
      console.log('yamlObject : ');
      console.log(yamlObject);

      that.setState({ poemAudioUrl: yamlObject.audioUrl });
      console.log('that.state.poemAudioUrl');
      console.log(that.state.poemAudioUrl);

      console.log('yamlObject.sher');
      console.log(yamlObject.sher);

      console.log('yamlObject.sher.length');
      console.log(yamlObject.sher.length);

      that.readBookmarks().then((result) => {
        console.log('result');
        console.log(result);

        for (let i = 0; i < yamlObject.sher.length; i++) {
          try {
            if (result.includes(yamlObject.sher[i].id)) yamlObject.sher[i].star = true;
            else yamlObject.sher[i].star = false;
          } catch (e) {
            console.log('catch caught an error');
          }
        }

        console.log('yamlObject.sher');
        console.log(yamlObject.sher);

        const newArr = [yamlObject.sher];
        console.log('Value of newArr');
        console.log(newArr);

        console.log('newArr[0].length');
        console.log(newArr[0].length);

        console.log('Value of newArr');
        console.log(newArr);

        yamlObject.sher.map((el: any) => {
          try {
            el.sherContent[0].text = el.sherContent[0].text.split('|');
            console.log(el.sherContent[0].text);
          } catch (err) {
            console.log('zero catch');
          }
          try {
            el.sherContent[1].text = el.sherContent[1].text.split('|');
            console.log(el.sherContent[1].text);
          } catch (err) {
            console.log('first catch');
            el.sherContent.push({
              text: ['#translation missing', '#translation missing'],
            });

            console.log(el.sherContent[1].text);
          }
          try {
            el.sherContent[2].text = el.sherContent[2].text.split('|');
          } catch (err) {
            console.log('second catch');
            el.sherContent.push({
              text: ['#translation missing', '#translation missing'],
            });
            console.log(el.sherContent[2].text);
          }
          return (el.sherContent = el.sherContent);
        });

        console.log('Value of newArr');
        console.log(newArr);

        console.log('Value of newArr[0]');
        console.log(newArr[0]);

        console.log('Value of newArr[1]');
        console.log(newArr[1]);

        console.log('Value of newArr.length');
        console.log(newArr[0].length);

        that.setState({
          poemTextNew: newArr[0],
        });

        that.setState({ poemNameUrdu: yamlObject.heading[0].text });
        that.setState({ poemNameEnglish: yamlObject.heading[1].text });

        console.log('poemNameUrdu: ');
        console.log(yamlObject.heading[0].text);
        console.log('poemNameEnglish: ');
        console.log(yamlObject.heading[1].text);
      });
    });
  }

  starToggling = (sher: any) => {
    const that = this;

    this.readBookmarks().then((result) => {
      console.log('result');
      console.log(result);

      if (result.includes(sher.id)) {
        const index = result.indexOf(sher.id);
        if (index > -1) {
          result.splice(index, 5);
        }

        console.log('result');
        console.log(result);

        const newData = result.join('@');

        console.log('newData');
        console.log(newData);

        var path = `${RNFS.DocumentDirectoryPath}/bookmarked-shers.txt`;

        // write the file
        RNFS.writeFile(path, newData, 'utf8')
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch((err: any) => {
            console.log(err.message);
          });

        const poemName = that.props.navigation.getParam('detailPoem');
        console.log('In poempage.js inside starToggling if');
        that.getPoem(poemName);
      } else {
        var path = `${RNFS.DocumentDirectoryPath}/bookmarked-shers.txt`;

        const sherAt = `${sher.id
          }@${
          sher.sherContent[0].text[0]
          }@${
          sher.sherContent[0].text[1]
          }@${
          sher.sherContent[1].text[0]
          }@${
          sher.sherContent[1].text[1]
          }@`;

        // write the file
        RNFS.appendFile(path, sherAt, 'utf8')
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch((err: any) => {
            console.log(err.message);
          });

        const poemName = that.props.navigation.getParam('detailPoem');
        console.log('In poempage.js inside starToggling else');
        that.getPoem(poemName);
      }
    });
  };

  async readBookmarks() {
    const path = `${RNFS.DocumentDirectoryPath}/bookmarked-shers.txt`;
    try {
      const yamlFile = await RNFS.readFile(path, 'utf8');
      const partsOfStr = yamlFile.split('@');
      return partsOfStr;
    } catch (e) {
      return '';
    }
  }

  componentDidMount() {
    try {
      this.setState({
        signinConfirmation: this.props.navigation.getParam(
          'profileSigninConfirmation',
        ),
      });
      this.setState({
        username: this.props.navigation.getParam('profileUsername'),
      });
      this.setState({
        password: this.props.navigation.getParam('profilePassword'),
      });
      this.readDirectory();
    } catch (e) {
      console.log('Inside catch');
    }
  }

  soundForward = () => {
    if (!this.state.paused) {
      if (this.state.duration - this.state.currentTime > 6) this.player.seek(this.state.currentTime + 5);
      else this.player.seek(0);
    }
  };

  soundBackward = () => {
    if (!this.state.paused) {
      this.player.seek(this.state.currentTime - 5);
    }
  };

  playTrack() {
    console.log('Inside playTrack');
    const localSong = `${RNFS.CachesDirectoryPath}/song-name.mp3`;
    RNFS.downloadFile(
      'http://www.iqbal.com.pk/mp3/Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3',
      localSong,
    ).then(() => {
      const song = new Sound(localSong, '', () => {
        song.play();
      });
    });
  }

  onLoad = (data: any) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data: any) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true });
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  resumeIfUrlPresent() {
    if (this.state.poemAudioUrl != '') this.setState({ paused: !this.state.paused });
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
          {
            text: 'GO TO SOUNDCLOUD',
            onPress: () => Linking.openURL('https://soundcloud.com'),
          },
        ],
        { cancelable: true },
      );
    }
  }

  onPlayPause() {
    console.log('Inside onPlayPause');
    if (this.state.isDownloadDone) {
      this.setState({ paused: !this.state.paused });
    } else Alert.alert('Please select a poem first.');
  }

  onDownloadAudio(audioFile: any) {
    console.log('Inside onDownloadAudio');
    const path = `${RNFS.DocumentDirectoryPath}/Iqbal-Demystified/${audioFile}`;
    this.setState({ audioPath: path });

    this.setState({ paused: false });
    this.setState({ isDownloadDone: true });
  }

  onCheckFileExists() {
    const path = `${RNFS.DocumentDirectoryPath
      }/Iqbal-Demystified/${
      this.state.poemNumber
      }.mp3`;
    RNFS.exists(path).then((exists) => {
      if (exists) {
        console.log('BLAH EXISTS');
      } else {
        console.log('BLAH DOES NOT EXIST');
      }
    });
  }

  videoError() {
    console.log('Inside videoError');
  }

  readDirectory() {
    const that = this;
    that.state.downloadedData = [];

    RNFS.readDir(`${RNFS.DocumentDirectoryPath}/Iqbal-Demystified`).then(
      (result: any) => {
        console.log('GOT RESULT', result);
        console.log('result.length', result.length);
        const previousResult = result;

        that.readDownloadedAudioFile().then((result1) => {
          for (var i = 0; i < previousResult.length; i++) {
            if (previousResult[i].isFile()) {
              console.log('prevousResult[i].name', previousResult[i].name);
              console.log('result1');
              console.log(result1);

              console.log('previousResult');
              console.log(previousResult);

              try {
                if (result1.includes(previousResult[i].name)) {
                  console.log('found the mp3 file inside saved yaml file');
                  const index = result1.indexOf(previousResult[i].name);
                  that.state.downloadedData.push({
                    audioFile: previousResult[i].name,
                    urduTitle: result1[index + 1],
                    englishTitle: result1[index + 2],
                  });
                } else {
                  console.log(
                    'printing this line means, we have mp3 file in Iqbal-demystified directory but it is not saved in downloaded-audio.yaml file',
                  );
                  that.state.downloadedData.push({
                    audioFile: previousResult[i].name,
                    urduTitle: '#missing title',
                    englishTitle: '#missing translation',
                  });
                }
              } catch (e) {
                console.log('Inside catch, error: ');
                console.log(e);
              }
            } // if the selected file in the directory isFile ends
          } // for loop for all the files inside Iqbal-Demystified folder ends

          that.setState({ downloadedDataFinal: that.state.downloadedData });

          console.log('that.setState.downloadedData');
          console.log(that.setState.downloadedData);

          console.log('that.setState.downloadedDataFinal');
          console.log(that.setState.downloadedDataFinal);
        }); // readDownloadedAudioFile.then ends
      },
    ); // RNFS.readDir.then ends
  }

  readFromDownloadedAudioFile = (poem) => {
    const that = this;
    this.readDownloadedAudioFile().then((result) => {
      console.log('result');
      console.log(result);

      if (result.includes(poem)) {
        console.log('poem is in the file');
      } else {
        console.log('poem is not in the file');
        const path = `${RNFS.DocumentDirectoryPath}/downloaded-poems.yaml`;

        const sherNumberComma = `${poem
          }@${
          that.state.poemNameUrdu
          }@${
          that.state.poemNameEnglish
          }@`;

        // write the file
        RNFS.appendFile(path, sherNumberComma, 'utf8')
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch((err: any) => {
            console.log(err.message);
          });
      }
    });
  };

  deleteDownloadEntry(audioFile: any) {
    const that = this;

    this.readDownloadedAudioFile().then((result) => {
      console.log('result');
      console.log(result);

      if (result.includes(audioFile)) {
        console.log('poem is in the file');
        const index = result.indexOf(audioFile);
        if (index > -1) {
          result.splice(index, 3);
        }

        console.log('result');
        console.log(result);

        const newData = result.join('@');

        console.log('newData');
        console.log(newData);

        const path = `${RNFS.DocumentDirectoryPath}/downloaded-poems.yaml`;

        // write the file
        RNFS.writeFile(path, newData, 'utf8')
          .then(() => {
            console.log('FILE WRITTEN!');

            that.readDirectory();
          }) // writeFile.then ends
          .catch((err: any) => {
            console.log(err.message);
          });
      } // if entry was available in yaml file finished
    }); // readDownloadedAudioFile.then ends
  }

  confirmDeleteDownload(audioFile: any) {
    Alert.alert('Are you sure you want to delete this audio?', '', [
      {
        text: 'NO',
        onPress: () => console.log('NO Pressed'),
      },
      {
        text: 'YES',
        onPress: () => this.deleteDownload(audioFile),
      },
    ]);
  }

  deleteDownload(audioFile: any) {
    const that = this;
    const path = `${RNFS.DocumentDirectoryPath}/Iqbal-Demystified/${audioFile}`;

    RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
        that.deleteDownloadEntry(audioFile);
      })
      .catch((err: any) => {
        console.log('Inside catch error');
        console.log(err.message);
      });
  }

  async readDownloadedAudioFile() {
    const path = `${RNFS.DocumentDirectoryPath}/downloaded-poems.yaml`;
    try {
      const yamlFile = await RNFS.readFile(path, 'utf8');
      const partsOfStr = yamlFile.split('@');
      return partsOfStr;
    } catch (e) {
      return '';
    }
  }

  render() {
    const that = this;
    const itemDownload = this.state.downloadedDataFinal.map((
      item: any,
    ) => (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.2,
            }}
          >
            <TouchableHighlight
              onPress={() => that.confirmDeleteDownload(item.audioFile)}
            >
              <Image
                resizeMode="cover"
                source={iconGarbage}
                style={{ width: 20, height: 20 }}
              />
            </TouchableHighlight>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#d6d7da',
              flex: 0.8,
            }}
          >
            <TouchableHighlight
              onPress={() => that.onDownloadAudio(item.audioFile)}
            >
              <View>
                <View>
                  <Text style={styles.RenderedText}>{item.audioFile}</Text>
                </View>
                <View>
                  <Text style={styles.RenderedText}>{item.urduTitle}</Text>
                </View>
                <View>
                  <Text style={styles.RenderedText}>{item.englishTitle}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      ));


    let soundIcon;
    if (this.state.paused) {
      soundIcon = (
        <Image style={styles.RowImage} resizeMode="contain" source={iconPlay} />
      );
    } else {
      soundIcon = (
        <Image
          style={styles.RowImage}
          resizeMode="contain"
          source={iconPause}
        />
      );
    }

    const flexCompleted = Math.round(this.getCurrentTimePercentage() * 100);
    const flexRemaining = Math.round(
      (1 - this.getCurrentTimePercentage()) * 100,
    );

    const totalMinutes = Math.floor(this.state.duration / 60);
    const totalSeconds = Math.round(this.state.duration - totalMinutes * 60);

    const currentMinutes = Math.floor(this.state.currentTime / 60);
    const currentSeconds = Math.round(
      this.state.currentTime - currentMinutes * 60,
    );

    const formattedTotalMinutes = (`0${totalMinutes}`).slice(-2);
    const formattedTotalSeconds = (`0${totalSeconds}`).slice(-2);
    const formattedCurrentMinutes = (`0${currentMinutes}`).slice(-2);
    const formattedCurrentSeconds = (`0${currentSeconds}`).slice(-2);

    let audioBox;
    if (this.state.showAudioBox) {
      audioBox = (
        <Text style={{ backgroundColor: 'skyblue' }}>Hide Audio Box</Text>
      );
    } else {
      audioBox = (
        <Text style={{ backgroundColor: 'skyblue' }}>Show Audio Box</Text>
      );
    }

    let audioSystem1;
    if (this.state.showAudioBox) {
      audioSystem1 = (
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: 'black',
          }}
        >
          <TouchableHighlight
            style={styles.HighlightProperties}
            onPress={() => this.soundBackward()}
          >
            <Image
              style={styles.RowImage}
              resizeMode="contain"
              source={iconBackward}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.HighlightProperties}
            onPress={() => this.onPlayPause()}
          >
            {soundIcon}
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.HighlightProperties}
            onPress={() => this.soundForward()}
          >
            <Image
              style={styles.RowImage}
              resizeMode="contain"
              source={iconForward}
            />
          </TouchableHighlight>
        </View>
      );
    } else audioSystem1 = <View />;

    let audioSystem2;
    if (this.state.showAudioBox) {
      audioSystem2 = (
        <View style={{ flex: 0.2 }}>
          <View style={styles.controls}>
            <View style={styles.progress}>
              <Text>
                {formattedCurrentMinutes}
                :
                {formattedCurrentSeconds}
              </Text>
              <View
                style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
              />
              <View
                style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
              />
              <Text>
                {formattedTotalMinutes}
                :
                {formattedTotalSeconds}
              </Text>
            </View>
          </View>
        </View>
      );
    } else audioSystem2 = <View />;


    let videoSetup;
    if (this.state.isDownloadDone) {
      videoSetup = (
        <Video
          source={{ uri: this.state.audioPath }}
          ref={(ref: any) => {
            this.player = ref;
          }}
          onBuffer={this.onBuffer}
          paused={this.state.paused}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          repeat
          onError={this.videoError}
        />
      );
    } else videoSetup = null;

    return (
      <View style={styles.MainContainer}>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: 'skyblue',
                alignItems: 'center',
                width: 180,
                height: 50,
              }}
            >
              <Text>
                Download Percentage:
                {' '}
                {this.state.progressDownloadPercent}
              </Text>
            </View>
          </View>
        </Modal>

        {videoSetup}

        <View style={{ flex: 2 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {itemDownload}
          </ScrollView>
        </View>

        <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
          <TouchableHighlight
            onPress={() => this.setState({ showAudioBox: !this.state.showAudioBox })}
          >
            {audioBox}
          </TouchableHighlight>
        </View>

        {audioSystem1}
        {audioSystem2}
      </View>
    );
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  RenderedText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  MainContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  HighlightProperties: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    margin: 1,
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
    alignItems: 'center',
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    marginLeft: 10,
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#f1a91b',
  },

  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#2C2C2C',
  },
});

export default DownloadAudioScreen;
