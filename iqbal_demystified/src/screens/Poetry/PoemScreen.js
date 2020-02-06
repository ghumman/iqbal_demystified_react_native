import React from 'react';
import {
  Platform,
  TouchableOpacity,
  Modal,
  Linking,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  View,
  Text,
} from 'react-native';
import ActionBar from 'react-native-action-bar';
import DrawerLayout from 'react-native-drawer-layout';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import StaticContentService from '../Misc/StaticContentServiceYaml';

import Menu from '../Misc/Menu';


import starLiked from '../../assets/android_app_assets/star_liked.png';
import starNotLiked from '../../assets/android_app_assets/star_not_liked.png';

import iconAddSound from '../../assets/android_app_assets/audio_player_add_sound.png';
import iconBackward from '../../assets/android_app_assets/audio_player_backward.png';
import iconForward from '../../assets/android_app_assets/audio_player_forward.png';
import iconPause from '../../assets/android_app_assets/audio_player_pause.png';
import iconPlay from '../../assets/android_app_assets/audio_player_play.png';


const RNFS = require('react-native-fs');
const YAML = require('yaml');
const menuList = require('../../shared/Constants');


const FONT = 'Normal';
const TEXT = 'Urdu';
const FONT_SIZE = '18';
const FONT_MAX_SIZE = '30';
const FONT_MIN_SIZE = '10';
const FONT_DEFAULT_SIZE = '18';

class PoemPage extends React.Component {
  constructor(props) {
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

      introductionText: '',
      introVisible: false,

      detailsVisible: false,

      paused: true,
      duration: 0.0,
      currentTime: 0.0,

      showAudioBox: true,
      isDownloadDone: false,
      modalVisible: false,
      progressDownloadPercent: 0.0,

      font: 'Normal',
      text: 'Urdu',
      fontGlobalSize: '18',

      drawerClosed: true,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setDrawerState = this.setDrawerState.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title || '',
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  });

  onSubmit = (sherNumber) => {
    this.props.navigation.navigate('SherTabs', {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password,
      poemTitle: this.state.poemNameUrdu,
    });
  };

  getPoem(listId) {
    console.log(`listId: ${listId}`);

    const that = this;
    StaticContentService.getPoem(listId).then((response) => {
      console.log('response: ');
      console.log(response);

      const yamlObject = YAML.parse(response);
      console.log('yamlObject : ');
      console.log(yamlObject);
      try {
        that.setState({ introductionText: yamlObject.description[0].text });
        console.log('that.state.introductionText[0].text');
        console.log(that.state.introductionText[0].text);
      } catch (e) {
        that.setState({ introductionText: '' });
      }

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

        yamlObject.sher.map((el) => {
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

        that.props.navigation.setParams({ title: that.state.poemNameUrdu });

        console.log('poemNameUrdu: ');
        console.log(yamlObject.heading[0].text);
        console.log('poemNameEnglish: ');
        console.log(yamlObject.heading[1].text);
      });
    });
  }

  starToggling = (sher) => {
    const that = this;
    this.readBookmarks().then((result) => {
      console.log('result');
      console.log(result);
      if (result.includes(sher.id)) {
        const index = result.indexOf(sher.id);
        if (index > -1) {
          result.splice(index, 7);
        }

        console.log('result');
        console.log(result);

        const newData = result.join('@');

        console.log('newData');
        console.log(newData);

        var path = `${RNFS.DocumentDirectoryPath}/bookmarked-shers.txt`;

        // write the file
        RNFS.writeFile(path, newData, 'utf8')
          .then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
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
        }@${
          sher.sherContent[2].text[0]
        }@${
          sher.sherContent[2].text[1]
        }@`;

        // write the file
        RNFS.appendFile(path, sherAt, 'utf8')
          .then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
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

  onDidFocusCustomFunction = () => {
    console.log('Inside onDidFocusCustomFunction');

    AsyncStorage.getItem(FONT).then((res) => {
      if (res !== null) {
        console.log('res is not equal to null: ');
        console.log(res);
        this.setState({ font: res });
      } else {
        this.setState({ font: 'Normal' });
      }
    });

    AsyncStorage.getItem(TEXT).then((res) => {
      if (res !== null) {
        console.log('res is not null: ');
        console.log(res);
        this.setState({ text: res });
      } else {
        this.setState({ text: 'Urdu' });
      }
    });
  };

  componentDidMount() {
    try {
      this.onDidFocusCustomFunction();
      this.setFontSizeIfNotSet(0);

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
      this.setState({
        poemNumber: this.props.navigation.getParam('detailPoem'),
      });

      const poemName = this.props.navigation.getParam('detailPoem');
      console.log('In poempage.js inside componentdidmount');
      this.getPoem(poemName);
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
      const song = new Sound(localSong, '', (error) => {
        song.play();
      });
    });
  }

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data) => {
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

  saveToDownloadedAudioFile = (poem) => {
    const that = this;
    this.readDownloadedAudioFile().then((result) => {
      console.log('result');
      console.log(result);

      if (result.includes(poem)) {
        console.log('poem is in the file');
        return null;
      }
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
        .then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

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

  onDownloadAudio() {
    console.log('Inside onDownloadAudio');
    const path = `${RNFS.DocumentDirectoryPath
    }/Iqbal-Demystified/${
      this.state.poemNumber
    }.mp3`;
    const that = this;
    if (this.state.poemAudioUrl != '') {
      RNFS.exists(path).then((exists) => {
        if (exists) {
          console.log('BLAH EXISTS');
          this.setState({ isDownloadDone: true });
        } else {
          console.log('BLAH DOES NOT EXIST');
          try {
            RNFS.downloadFile({
              fromUrl: that.state.poemAudioUrl,
              toFile: `${RNFS.DocumentDirectoryPath}/Iqbal-Demystified/${that.state.poemNumber}.mp3`,
              progress: (res: DownloadProgressCallbackResult) => {
                that.setState({ modalVisible: true });

                console.log('res: ');
                console.log(res);
                const progressPercent = (res.bytesWritten / res.contentLength) * 100;
                console.log('progressPercent');
                console.log(Math.round(progressPercent));
                that.setState({
                  progressDownloadPercent: Math.round(progressPercent),
                });
              },
            })
              .promise.then((r) => {
                console.log('r: ');
                console.log(r);
                that.setState({ modalVisible: false });
                console.log('Download completed');
                that.saveToDownloadedAudioFile(`${that.state.poemNumber}.mp3`);
                this.setState({ isDownloadDone: true });
              })
              .catch((err) => {
                console.log('inside .catch err...');
                console.log('err: ');
                console.log(err);
                Alert.alert(err.toString());
                that.setState({ modalVisible: false });
                this.setState({ isDownloadDone: false });
                this.setState({ paused: true });
              });
          } catch (error) {
            // try ends
            console.log('error: ');
            console.log(error);
            that.setState({ modalVisible: false });
            this.setState({ isDownloadDone: false });
            this.setState({ paused: true });
          }
        } // else file does not exists ends
      }); // RNFS.exists . then ends
      this.setState({ paused: !this.state.paused });
    } // if url is not empty ends
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

  setDrawerState() {
    this.setState({
      drawerClosed: !this.state.drawerClosed,
    });
  }

  toggleDrawer = () => {
    if (this.state.drawerClosed) {
      this.DRAWER.openDrawer();
    } else {
      this.DRAWER.closeDrawer();
    }
  };

  setFontSizeIfNotSet = (appendment) => {
    AsyncStorage.getItem(FONT_SIZE).then((res) => {
      if (res !== null) {
        console.log('res is not equal to null, res:  ');
        console.log(res);

        if (appendment == -1) {
          console.log('You have pressed Zoom Out');
          console.log('FONT_MIN_SIZE: ');
          console.log(FONT_MIN_SIZE);

          if (res <= FONT_MIN_SIZE) Alert.alert('This is the smallest font size');
          else {
            AsyncStorage.setItem(FONT_SIZE, (parseInt(res) - 4).toString());
            this.setState({ fontGlobalSize: parseInt(res) - 4 });
          }
        } else if (appendment == 1) {
          console.log('You have pressed Zoom In');
          console.log('FONT_MAX_SIZE: ');
          console.log(FONT_MAX_SIZE);

          if (res >= FONT_MAX_SIZE) Alert.alert('This is the largest font size');
          else {
            AsyncStorage.setItem(FONT_SIZE, (parseInt(res) + 4).toString());
            this.setState({ fontGlobalSize: parseInt(res) + 4 });
          }
        }

        // if appendment is 0, meaning you have set the FONT_SIZE before on this phone, and now you have come to this Screen to set fontGlobalSize
        else if (appendment == 0) {
          console.log('First time in setFontSizeIfNotSet');
          console.log('res:');
          console.log(res);
          this.setState({ fontGlobalSize: parseInt(res) });
        }
      } else {
        console.log('FONT_SIZE is never set before, res');
        AsyncStorage.setItem(FONT_SIZE, FONT_DEFAULT_SIZE);

        this.setState({ fontGlobalSize: parseInt(FONT_DEFAULT_SIZE) });
      }
    });
  };

  menuItemClicked = (item) => {
    console.log('item: ');
    console.log(item);

    console.log('item.index: ');
    console.log(item.index);

    if (item.index == 1) {
      this.setFontSizeIfNotSet(1);
    } else if (item.index == 2) {
      this.setFontSizeIfNotSet(-1);
    } else if (item.index == 3) {
      this.props.navigation.navigate('Info', {
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password,
      });
    }
    this.toggleDrawer();
  };

  toggleIntro() {
    this.setState({ introVisible: !this.state.introVisible });
  }

  contributeFunction() {
    this.props.navigation.navigate('ContributeIntroduction', {
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password,
      poemTitle: this.state.poemNameUrdu,
    });
  }

  render() {
    const that = this;

    let displayIntro;
    if (this.state.introVisible) {
      if (this.state.introductionText != '') {
        displayIntro = (
          <View>
            <Text style={fontSizeVariable(that.state.fontGlobalSize)}>
              {this.state.introductionText}
            </Text>
          </View>
        );
      } else {
        displayIntro = (
          <View>
            <TouchableHighlight onPress={() => this.contributeFunction()}>
              <Text
                style={fontSizeVariableUnderline(that.state.fontGlobalSize)}
              >
            No Introduction found. Click here to contribute!
              </Text>
            </TouchableHighlight>
          </View>
        );
      }
    } else displayIntro = null;

    let fontFamilyTextVariable;
    let fontFamilyTitleVariable;
    switch (this.state.font) {
      case 'Normal':
        fontFamilyTitleVariable = styles.UrduTitleNormal;
        fontFamilyTextVariable = styles.RenderedTextNormal;
        break;
      case 'Nafees':
        fontFamilyTitleVariable = styles.UrduTitleNafees;
        fontFamilyTextVariable = styles.RenderedTextNafees;
        break;
      case 'Kasheeda':
        fontFamilyTitleVariable = styles.UrduTitleKasheeda;
        fontFamilyTextVariable = styles.RenderedTextKasheeda;
        break;
      case 'Fajer':
        fontFamilyTitleVariable = styles.UrduTitleFajer;
        fontFamilyTextVariable = styles.RenderedTextFajer;
        break;
    }

    IntroSettings = function (argument) {
      argument = parseInt(argument);
      return {
        flexWrap: 'wrap',
        fontSize: argument,
        textAlign: 'center',
        padding: 2,
        color: 'blue',
      };
    };

    fontSizeVariableTitle = function (argument) {
      argument = parseInt(argument);
      switch (that.state.font) {
        case 'Normal':
          return {
            flexWrap: 'wrap',
            fontSize: argument,
            textAlign: 'center',
            color: '#FF0000',
          };
          break;
        case 'Nafees':
          return {
            flexWrap: 'wrap',
            fontFamily:
              Platform.OS === 'ios'
                ? 'NafeesNastaleeq'
                : 'Nafees Nastaleeq v1.02',
            fontSize: argument,
            textAlign: 'center',
            color: '#FF0000',
          };
          break;
        case 'Kasheeda':
          return {
            flexWrap: 'wrap',
            fontFamily:
              Platform.OS === 'ios'
                ? 'JameelNooriKasheeda'
                : 'Jameel Noori Kasheeda',
            fontSize: argument,
            textAlign: 'center',
            color: '#FF0000',
          };
          break;
        case 'Fajer':
          return {
            flexWrap: 'wrap',
            fontFamily:
              Platform.OS === 'ios'
                ? 'FajerNooriNastalique'
                : 'Fajer Noori Nastalique 15-12-2006',
            fontSize: argument,
            textAlign: 'center',
            color: '#FF0000',
          };
          break;
      }
    };

    fontSizeVariableUnderline = function (argument) {
      argument = parseInt(argument);
      return {
        fontSize: argument,
        flexShrink: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'blue',
        padding: 10,
      };
    };

    fontSizeVariable = function (argument) {
      argument = parseInt(argument);
      switch (that.state.font) {
        case 'Normal':
          return {
            fontSize: argument,
            flexShrink: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
            padding: 10,
          };
          break;
        case 'Nafees':
          return {
            fontFamily:
              Platform.OS === 'ios'
                ? 'NafeesNastaleeq'
                : 'Nafees Nastaleeq v1.02',
            fontSize: argument,
            flexShrink: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
            padding: 10,
          };
          break;
        case 'Kasheeda':
          return {
            fontFamily:
              Platform.OS === 'ios'
                ? 'JameelNooriKasheeda'
                : 'Jameel Noori Kasheeda',
            fontSize: argument,
            flexShrink: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
            padding: 10,
          };
          break;
        case 'Fajer':
          return {
            fontFamily:
              Platform.OS === 'ios'
                ? 'FajerNooriNastalique'
                : 'Fajer Noori Nastalique 15-12-2006',
            fontSize: argument,
            flexShrink: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
            padding: 10,
          };
          break;
      }
    };

    const itemScroll = this.state.poemTextNew.map((item, index) => {
      if (item.star) {
        if (that.state.text == 'Urdu') {
          if (that.state.detailsVisible) {
            try {
              return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 0.2,
                    }}
                  >
                    <TouchableHighlight onPress={() => that.starToggling(item)}>
                      <Image
                        resizeMode="cover"
                        source={starLiked}
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
                    <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                      <View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[0].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[0].text[1]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[1]}
                          </Text>
                        </View>
                        <View>
                          {item.sherContent[1].notes.map((item2, key2) => (
                            <Text
                              key={key2}
                              style={IntroSettings(that.state.fontGlobalSize)}
                            >
                              {item2.phrase}
                              :
                              {item2.meaning}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            } catch (e) {
              return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 0.2,
                    }}
                  >
                    <TouchableHighlight onPress={() => that.starToggling(item)}>
                      <Image
                        resizeMode="cover"
                        source={starLiked}
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
                    <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                      <View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[0].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[0].text[1]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[1]}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            }
          } else {
            return (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.2,
                  }}
                >
                  <TouchableHighlight onPress={() => that.starToggling(item)}>
                    <Image
                      resizeMode="cover"
                      source={starLiked}
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
                  <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                    <View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[0].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[0].text[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          }
        } else if (that.state.text == 'Roman') {
          if (that.state.detailsVisible) {
            try {
              return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 0.2,
                    }}
                  >
                    <TouchableHighlight onPress={() => that.starToggling(item)}>
                      <Image
                        resizeMode="cover"
                        source={starLiked}
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
                    <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                      <View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[2].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[2].text[1]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[1]}
                          </Text>
                        </View>
                        <View>
                          {item.sherContent[1].notes.map((item2, key2) => (
                            <Text
                              key={key2}
                              style={IntroSettings(that.state.fontGlobalSize)}
                            >
                              {item2.phrase}
                              :
                              {item2.meaning}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            } catch (e) {
              return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 0.2,
                    }}
                  >
                    <TouchableHighlight onPress={() => that.starToggling(item)}>
                      <Image
                        resizeMode="cover"
                        source={starLiked}
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
                    <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                      <View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[2].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[2].text[1]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[0]}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={fontSizeVariable(that.state.fontGlobalSize)}
                          >
                            {item.sherContent[1].text[1]}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            }
          } else {
            return (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.2,
                  }}
                >
                  <TouchableHighlight onPress={() => that.starToggling(item)}>
                    <Image
                      resizeMode="cover"
                      source={starLiked}
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
                  <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                    <View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[2].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[2].text[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          }
        }
      } else if (that.state.text == 'Urdu') {
        if (that.state.detailsVisible) {
          try {
            return (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.2,
                  }}
                >
                  <TouchableHighlight onPress={() => that.starToggling(item)}>
                    <Image
                      resizeMode="cover"
                      source={starNotLiked}
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
                  <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                    <View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[0].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[0].text[1]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[1]}
                        </Text>
                      </View>
                      <View>
                        {item.sherContent[1].notes.map((item2, key2) => (
                          <Text
                              key={key2}
                              style={IntroSettings(that.state.fontGlobalSize)}
                            >
                              {item2.phrase}
                              :
                              {item2.meaning}
                            </Text>
                        ))}
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          } catch (e) {
            return (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.2,
                  }}
                >
                  <TouchableHighlight onPress={() => that.starToggling(item)}>
                    <Image
                      resizeMode="cover"
                      source={starNotLiked}
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
                  <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                    <View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[0].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[0].text[1]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          }
        } else {
          return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 0.2,
                }}
              >
                <TouchableHighlight onPress={() => that.starToggling(item)}>
                  <Image
                    resizeMode="cover"
                    source={starNotLiked}
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
                <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                  <View>
                    <View>
                      <Text
                        style={fontSizeVariable(that.state.fontGlobalSize)}
                      >
                        {item.sherContent[0].text[0]}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={fontSizeVariable(that.state.fontGlobalSize)}
                      >
                        {item.sherContent[0].text[1]}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          );
        }
      } else if (that.state.text == 'Roman') {
        if (that.state.detailsVisible) {
          try {
            return (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.2,
                  }}
                >
                  <TouchableHighlight onPress={() => that.starToggling(item)}>
                    <Image
                      resizeMode="cover"
                      source={starNotLiked}
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
                  <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                    <View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[2].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[2].text[1]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[1]}
                        </Text>
                      </View>
                      <View>
                        {item.sherContent[1].notes.map((item2, key2) => (
                          <Text
                              key={key2}
                              style={IntroSettings(that.state.fontGlobalSize)}
                            >
                              {item2.phrase}
                              :
                              {item2.meaning}
                            </Text>
                        ))}
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          } catch (e) {
            return (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.2,
                  }}
                >
                  <TouchableHighlight onPress={() => that.starToggling(item)}>
                    <Image
                      resizeMode="cover"
                      source={starNotLiked}
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
                  <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                    <View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[2].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[2].text[1]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={fontSizeVariable(that.state.fontGlobalSize)}
                        >
                          {item.sherContent[1].text[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          }
        } else {
          return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 0.2,
                }}
              >
                <TouchableHighlight onPress={() => that.starToggling(item)}>
                  <Image
                    resizeMode="cover"
                    source={starNotLiked}
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
                <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                  <View>
                    <View>
                      <Text
                        style={fontSizeVariable(that.state.fontGlobalSize)}
                      >
                        {item.sherContent[2].text[0]}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={fontSizeVariable(that.state.fontGlobalSize)}
                      >
                        {item.sherContent[2].text[1]}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          );
        }
      }
    });

    const testItem = this.state.poemTextNew.map((item, index) => (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center' }}>
          <Image source={starNotLiked} style={{ width: 30, height: 30 }} />
        </View>
        <View style={{}}>
          <Text>Hello</Text>
        </View>
      </View>
    ));

    let soundIcon;
    if (this.state.poemAudioUrl != '') {
      if (this.state.paused) {
        soundIcon = (
          <Image
            style={styles.RowImage}
            resizeMode="contain"
            source={iconPlay}
          />
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
    } else {
      soundIcon = (
        <Image
          style={styles.RowImage}
          resizeMode="contain"
          source={iconAddSound}
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

    let detailsBox;
    if (this.state.detailsVisible) {
      detailsBox = (
        <Text style={{ backgroundColor: 'skyblue' }}>Hide Translation</Text>
      );
    } else {
      detailsBox = (
        <Text style={{ backgroundColor: 'skyblue' }}>Show Translation</Text>
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
            onPress={() => this.onDownloadAudio()}
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

    const path = `${RNFS.DocumentDirectoryPath
    }/Iqbal-Demystified/${
      this.state.poemNumber
    }.mp3`;

    let videoSetup;
    if (this.state.isDownloadDone) {
      videoSetup = (
        <Video
          source={{ uri: path }}
          ref={(ref) => {
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
      <DrawerLayout
        drawerWidth={300}
        ref={(drawerElement) => {
          this.DRAWER = drawerElement;
        }}
        drawerPosition={DrawerLayout.positions.left}
        onDrawerOpen={this.setDrawerState}
        onDrawerClose={this.setDrawerState}
        // renderNavigationView={() => <Menu />}
        renderNavigationView={() => (
          <View style={styles.wrapper}>
            <ScrollView>
              {menuList.MENU_LIST.map((item) => (
                <TouchableOpacity
                  key={item.index}
                  onPress={() => that.menuItemClicked(item)}
                >
                  <Text style={styles.listMenu}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      >
        <View style={styles.MainContainer}>
          <View style={{ flex: 0.3 }}>
            <ActionBar
              backgroundColor="#606060"
              leftIconName="menu"
              onLeftPress={this.toggleDrawer}
            />
          </View>

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

          <View style={{ flex: 0.1, alignItems: 'flex-end', padding: 4 }}>
            <TouchableHighlight
              onPress={() => this.setState({ detailsVisible: !this.state.detailsVisible })}
            >
              {detailsBox}
            </TouchableHighlight>
          </View>
          <View style={{ flex: 2 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
              <View style={{ flex: 0.2 }}>
                <Text style={fontSizeVariableTitle(this.state.fontGlobalSize)}>
                  {this.state.poemNameUrdu}
                </Text>
              </View>
              <View style={{ flex: 0.2 }}>
                <Text style={fontSizeVariableTitle(this.state.fontGlobalSize)}>
                  {this.state.poemNameEnglish}
                </Text>
              </View>

              <View style={[{ flex: 0.2 }, styles.submit]}>
                <Text
                  style={IntroSettings(this.state.fontGlobalSize)}
                  onPress={() => this.toggleIntro()}
                >
                  Introduction
                </Text>
              </View>
              {displayIntro}
              {itemScroll}
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
      </DrawerLayout>
    );
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },

  RenderedTextNormal: {
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextNafees: {
    fontFamily:
      Platform.OS === 'ios' ? 'NafeesNastaleeq' : 'Nafees Nastaleeq v1.02',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextKasheeda: {
    fontFamily:
      Platform.OS === 'ios' ? 'JameelNooriKasheeda' : 'Jameel Noori Kasheeda',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  RenderedTextFajer: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'FajerNooriNastalique'
        : 'Fajer Noori Nastalique 15-12-2006',
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

  UrduTitleNormal: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },

  UrduTitleNafees: {
    fontFamily:
      Platform.OS === 'ios' ? 'NafeesNastaleeq' : 'Nafees Nastaleeq v1.02',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },

  UrduTitleKasheeda: {
    fontFamily:
      Platform.OS === 'ios' ? 'JameelNooriKasheeda' : 'Jameel Noori Kasheeda',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },

  UrduTitleFajer: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'FajerNooriNastalique'
        : 'Fajer Noori Nastalique 15-12-2006',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
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

  wrapper: {
    backgroundColor: 'lightgray',
    marginTop: 50,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  listMenu: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export default PoemPage;
