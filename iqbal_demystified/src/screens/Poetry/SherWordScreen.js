import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  StyleSheet,
  Alert,
  View,
  Text,
} from 'react-native';

import Moment from 'moment';

import StaticContentService from '../Misc/StaticContentServiceYaml';

import iconUpVote from '../../assets/android_app_assets/vote_up_unselected.png';
import iconDownVote from '../../assets/android_app_assets/vote_down_unselected.png';

const RNFS = require('react-native-fs');
const YAML = require('yaml');

class SherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signinConfirmation: '',

      listId: 'List_001',
      sherId: '',
      sherText: [],
      meaningsAvailable: new Set(),
      wordText: [],
      poemText: [],
      sherObjects: [],
      sherGeneralDiscussionServerResponse: [],
      sherDiscussionDetail: [],
      wordDiscussionDetail: [],
      mySelectedWord: '',
      mySelectedId: '1',

      userMessageSher: '',
      userMessageWord: '',

      key: 'home',
    };
    this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
    this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

    this.handleSubmitSher = this.handleSubmitSher.bind(this);
    this.handleSubmitWord = this.handleSubmitWord.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Word Meanings',
    headerTitle: navigation.state.params.title || '',
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  });

  handleUserMessageSher(event) {
    this.setState({ userMessageSher: event.target.value });
  }

  handleUserMessageWord(event) {
    this.setState({ userMessageWord: event.target.value });
  }

  handleSubmitSher(event) {
    console.log('username: ');
    console.log(this.state.username);
    console.log('password: ');
    console.log(this.state.password);
    this.send_sher_message();
    event.preventDefault();
  }

  handleSubmitWord(event) {
    console.log('Inside handleSubmitWord');

    console.log('Going to send_word_message');
    this.send_word_message();
    event.preventDefault();
  }

  async send_sher_message() {
    console.log('Inside send_sher_message');
    console.log('username: ');
    console.log(this.state.username);
    console.log('password: ');
    console.log(this.state.password);

    const that = this;

    // do not try pushing comment if message is empty
    if (this.state.userMessageSher.trim() != '') {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != ''
        && this.state.password.trim() != ''
      ) {
        try {
          fetch('https://icanmakemyownapp.com/iqbal/v3/post-comment.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
              `sher=${
              that.state.sherId
              }&discussion_type=general&username=${
              that.state.username
              }&password=${
              that.state.password
              }&comment_text=${
              that.state.userMessageSher}`,
          }).then(async (data) => {
            console.log('data');
            console.log(data);
            console.log('Inside then async func');
            that.getSherGeneralDiscussion(that.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert('inside catch err');
          Alert.alert(err);
        }
      } // if not logged in empty
      else {
        Alert.alert('Please login first to add comments.');
      }
    } // if message is empty ends
    else {
      Alert.alert('Comments can not be empty');
    }
  }

  async send_word_message() {
    console.log('Inside send_word_message');

    console.log(
      'sending message using body: sher= + that.state.sherId + &discussion_type=word-meanings&username= + that.state.username + &password= + that.state.password + &comment_text= + that.state.userMessageSher + &word_position= + that.state.mySelectedId',
    );

    console.log('this.state.sherId: ');
    console.log(this.state.sherId);

    console.log('this.state.username: ');
    console.log(this.state.username);

    console.log('this.state.pasword: ');
    console.log(this.state.password);

    console.log('this.state.userMessage: ');
    console.log(this.state.userMessageWord);

    console.log('this.state.mySelectedId: ');
    console.log(this.state.mySelectedId);

    const that = this;
    if (this.state.userMessageWord.trim() != '') {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != ''
        && this.state.password.trim() != ''
      ) {
        try {
          fetch('https://icanmakemyownapp.com/iqbal/v3/post-comment.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
              `sher=${
              that.state.sherId
              }&discussion_type=word-meanings&username=${
              that.state.username
              }&password=${
              that.state.password
              }&comment_text=${
              that.state.userMessageWord
              }&word_position=${
              that.state.mySelectedId}`,
          }).then(async (data) => {
            console.log('data');
            console.log(data);
            that.getSherWordDiscussion(that.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert('inside catch err');
          Alert.alert(err);
        }

        console.log('messageSher sent to send sher message function');
      } // if not logged in empty
      else {
        Alert.alert('Please login first to add comments.');
      }
    } // if message is empty ends
    else {
      Alert.alert('Comments can not be empty');
    }
  }

  onSubmit = (sherNumber) => {
    this.props.history.push({
      pathname: '/SherPage',
      state: {
        detailSher: sherNumber,
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password,
      },
    });
  };

  async getSherGeneralDiscussion(sherName) {
    const that = this;
    try {
      console.log('sherName: ');
      console.log(sherName);
      fetch('https://icanmakemyownapp.com/iqbal/v3/get-discussion.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `sher=${sherName}&discussion_type=general`,
      }).then(async (data) => {
        data.json().then(async (data) => {
          console.log('data: ');
          console.log(data);
          const sherArray = sherName.split('_');

          let path = '';
          let yamlFile = '';
          if (Platform.OS == 'ios') {
            path = `${RNFS.MainBundlePath
              }/assets/poems/${
              sherArray[0]
              }/${
              sherArray[0]
              }_${
              sherArray[1]
              }.yaml`;
            yamlFile = await RNFS.readFile(path, 'utf8');
          } else if (Platform.OS == 'android') {
            path = `poems/${
              sherArray[0]
              }/${
              sherArray[0]
              }_${
              sherArray[1]
              }.yaml`;
            yamlFile = await RNFS.readFileAssets(path, 'utf8');
          }

          console.log('After calling yamlFiles');
          console.log('Value of yamlFile');
          console.log(yamlFile);

          const sherIndex = sherArray[2] - 1;
          const yamlObject = YAML.parse(yamlFile);

          console.log('this is the sher text');
          console.log(yamlObject.sher[sherIndex].sherContent[0].text);

          const sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

          const sherTextLocal = sherTextTemp.split('|');
          that.setState({ sherText: sherTextLocal });

          console.log('that.state.sherText');
          console.log(that.state.sherText);

          const wordTextLocal = that.state.sherText[0]
            .split(' ')
            .concat(that.state.sherText[1].split(' '));
          let ii;
          console.log('Original array: ');
          for (ii = 0; ii < wordTextLocal.length; ii++) console.log(wordTextLocal[ii]);
          for (ii = 0; ii < wordTextLocal.length; ii++) {
            if (
              wordTextLocal[ii] == ''
              || wordTextLocal[ii] == ' '
              || wordTextLocal[ii] == '،'
            ) {
              wordTextLocal.splice(ii, 1);
              ii--;
              console.log('inside if Value of wordTextLocal[ii]');
              console.log(ii);
              console.log(wordTextLocal[ii]);
            } else {
              console.log(
                'inside else before replace Value of wordTextLocal[ii]',
              );
              console.log(ii);
              console.log(wordTextLocal[ii]);

              wordTextLocal[ii] = wordTextLocal[ii].replace(
                /[|&!;$%@"<>()+,]/g,
                '',
              );
              console.log('inside else Value of wordTextLocal[ii]');
              console.log(ii);
              console.log(wordTextLocal[ii]);
            } // else ends
          } // for wordTextLocal.... ends
          console.log('wordTextLocal.length');
          console.log(wordTextLocal.length);
          for (ii = 0; ii < wordTextLocal.length; ii++) console.log(wordTextLocal[ii]);

          if (wordTextLocal[6] == '') console.log('Empty string');
          else if (wordTextLocal[6] == ' ') console.log('Space string');
          else {
            console.log('Neither empty nor space: ');
            console.log(wordTextLocal[6]);
          }

          that.setState({ wordText: wordTextLocal });

          const poemTextLocal = yamlObject.heading[0].text;
          const sherGeneralDiscussionServerResponseLocal = data;

          console.log('poemTextLocal: ');
          console.log(poemTextLocal);

          console.log('sherGeneralDiscussionServerResponseLocal');
          console.log(sherGeneralDiscussionServerResponseLocal);

          that.setState({ poemText: poemTextLocal });
          that.setState({
            sherGeneralDiscussionServerResponse: sherGeneralDiscussionServerResponseLocal,
          });

          that.props.navigation.setParams({ title: that.state.poemText });

          that.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);
        }); // data.json().then ends
      }); // success function ends
    } catch (err) {
      Alert.alert('inside catch err');
      Alert.alert(err);
      that.message = err;
    }
  } // async getSherGeneralDiscussion ends

  getSherDiscussion(sherGeneralDiscussionServerResponse) {
    const that = this;
    StaticContentService.getSherDiscussion(
      sherGeneralDiscussionServerResponse,
    ).then(() => {
      const sherDiscussionDetailLocal = sherGeneralDiscussionServerResponse;

      console.log('Value of sherDiscussionDetailLocal:');
      console.log(sherDiscussionDetailLocal);
      console.log('Value of sherDiscussionDetailLocal.length:');
      console.log(sherDiscussionDetailLocal.length);

      for (let i = 0; i < sherDiscussionDetailLocal.length; i++) {
        console.log('Value of sherDiscussionDetailLocal[i].data:');
        console.log(sherDiscussionDetailLocal[i].text);
        console.log(decodeURI(sherDiscussionDetailLocal[i].text));

        sherDiscussionDetailLocal[i].text = decodeURI(
          sherDiscussionDetailLocal[i].text,
        );

        console.log('Value of sherDiscussionDetailLocal[i].data:');
        console.log(sherDiscussionDetailLocal[i].text);
      }
      that.setState({ sherDiscussionDetail: sherDiscussionDetailLocal });
    }); // .then(func res) ends
  }

  async getSherWordDiscussion(sherName) {
    const that = this;
    try {
      fetch('https://icanmakemyownapp.com/iqbal/v3/get-discussion.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `sher=${sherName}&discussion_type=word-meanings`,
      }).then(async (data) => {
        data.json().then(async (data) => {
          console.log('data: ');
          console.log(data);

          const sherWordDiscussionServerResponse = data;
          console.log('sherWordDiscussionServerResponse');
          console.log(sherWordDiscussionServerResponse);

          that.getWordDiscussion(sherWordDiscussionServerResponse);
        }); // data.json().then ends
      }); // success function ends
    } catch (err) {
      // try ends
      Alert.alert('inside catch err');
      Alert.alert(err);
    } // catch ends
  }

  getWordDiscussion(sherWordDiscussionServerResponse) {
    const wordDiscussionDetailLocal = sherWordDiscussionServerResponse;
    console.log('wordDiscussionDetailLocal');
    console.log(wordDiscussionDetailLocal);

    const meaningsAvailableLocal = new Set();

    for (let i = 0; i < wordDiscussionDetailLocal.length; i++) {
      console.log(wordDiscussionDetailLocal[i].text);
      console.log(decodeURI(wordDiscussionDetailLocal[i].text));
      wordDiscussionDetailLocal[i].text = decodeURI(
        wordDiscussionDetailLocal[i].text,
      );
      meaningsAvailableLocal.add(wordDiscussionDetailLocal[i].wordposition);
    }
    console.log('Before setState');
    this.setState({ wordDiscussionDetail: wordDiscussionDetailLocal });
    console.log('After setState');

    console.log('meaningsAvailableLocal');
    console.log(meaningsAvailableLocal);

    this.setState({ meaningsAvailable: meaningsAvailableLocal });

    console.log('this.state.meaningsAvailable');
    console.log(this.state.meaningsAvailable);
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
      this.setState({ sherId: this.props.navigation.getParam('detailSher') });

      const sherName = this.props.navigation.getParam('detailSher');
      console.log('In poempage.js inside componentdidmount');
      console.log('sherName: ');
      console.log(sherName);
      this.getSherGeneralDiscussion(sherName);
      this.getSherWordDiscussion(sherName);
    } catch (e) {
      // try ends
      console.log('Inside catch');
    } // catch ends
  } // componentDidMount ends

  signMeIn = () => {
    if (this.state.username == '') {
      this.props.history.push({
        pathname: '/RegisterPage',
        state: {
          profileSigninConfirmation: this.state.signinConfirmation,
          profileUsername: this.state.username,
          profilePassword: this.state.password,
        },
      });
    }
  };

  // /////////////////////////////////////////////////////////
  //	Vote Like Word
  // /////////////////////////////////////////////////////////

  vote_like_word_arrow(comment_general_id) {
    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;
    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=word-meanings&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=1&is_cancel=0`,
        }).then(async (data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote registered') {
              Alert.alert('Vote registered.');
              that.getSherWordDiscussion(that.state.sherId);
            } else if (data == 'vote already registered') {
              try {
                fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body:
                    `sher=${
                    that.state.sherId
                    }&discussion_type=word-meanings&comment_id=${
                    comment_general_id
                    }&username=${
                    that.state.username
                    }&password=${
                    that.state.password
                    }&is_like=0&is_cancel=1`,
                }).then(async (data) => {
                  data.text().then(async (data) => {
                    console.log('data');
                    console.log(data);
                    if (data == 'vote removed') {
                      Alert.alert('Vote removed.');
                      that.getSherWordDiscussion(that.state.sherId);
                    } else if (data == 'invalid is_cancel value') {
                      Alert.alert('You have not liked or disliked it yet.');
                    }
                  }); // data.text.then.func ends
                }); // success function ends
              } catch (err) {
                Alert.alert('inside catch err');
                Alert.alert(err);
              }
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  vote_like_word(comment_general_id) {
    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;
    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=word-meanings&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=1&is_cancel=0`,
        }).then(async (data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote registered') that.getSherWordDiscussion(that.state.sherId);
            else if (data == 'vote already registered') {
              Alert.alert(
                'Vote is already registerd. Unregister vote first and then you can revote',
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  // /////////////////////////////////////////////////////////
  //	Vote Dislike Word
  // /////////////////////////////////////////////////////////

  vote_dislike_word_arrow(comment_general_id) {
    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;

    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=word-meanings&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=0&is_cancel=0`,
        }).then((data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote registered') {
              Alert.alert('Vote registered.');
              that.getSherWordDiscussion(that.state.sherId);
            } else if (data == 'vote already registered') {
              try {
                fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body:
                    `sher=${
                    that.state.sherId
                    }&discussion_type=word-meanings&comment_id=${
                    comment_general_id
                    }&username=${
                    that.state.username
                    }&password=${
                    that.state.password
                    }&is_like=0&is_cancel=1`,
                }).then(async (data) => {
                  data.text().then(async (data) => {
                    // success: (data) => {	// success funciton starts
                    console.log('data');
                    console.log(data);
                    if (data == 'vote removed') {
                      // this.toggle_word(idx);
                      Alert.alert('Vote removed.');
                      that.getSherWordDiscussion(that.state.sherId);
                    } else if (data == 'invalid is_cancel value') {
                      Alert.alert('You have not liked or disliked it yet.');
                    }
                  }); // data.text.then.func ends
                }); // success function ends
                // });	// ajax call ends
              } catch (err) {
                Alert.alert('inside catch err');
                Alert.alert(err);
                // this.message = err;
              }
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
        this.message = err;
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
    // console.log(this.messageSher);
  }

  vote_dislike_word(comment_general_id) {
    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;

    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=word-meanings&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=0&is_cancel=0`,
        }).then((data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote registered') that.getSherWordDiscussion(that.state.sherId);
            else if (data == 'vote already registered') {
              Alert.alert(
                'Vote is already registerd. Unregister vote first and then you can revote',
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
        this.message = err;
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  // /////////////////////////////////////////////////////////
  //	Vote Unregister Word
  // /////////////////////////////////////////////////////////

  vote_unregister_word(comment_general_id) {
    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;

    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=word-meanings&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=0&is_cancel=1`,
        }).then(async (data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote removed') {
              that.getSherWordDiscussion(that.state.sherId);
              Alert.alert('Your vote is removed');
            } else if (data == 'invalid is_cancel value') {
              Alert.alert('You have not liked or disliked it yet.');
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  // /////////////////////////////////////////////////////////
  //	Vote Like General
  // /////////////////////////////////////////////////////////

  vote_like(comment_general_id) {
    console.log('Inside vote_like');

    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;

    if (this.state.username != '') {
      try {
        localTestString = 'sher=002_001_001&discussion_type=general&comment_id=319&username=agent3&password=agent&is_like=1&is_cancel=0';
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=general&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=1&is_cancel=0`,
        }).then(async (data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote registered') that.getSherGeneralDiscussion(that.state.sherId);
            else if (data == 'vote already registered') {
              Alert.alert(
                'Vote is already registerd. Unregister vote first and then you can revote',
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  // /////////////////////////////////////////////////////////
  //	Vote Dislike General
  // /////////////////////////////////////////////////////////

  vote_dislike(comment_general_id) {
    console.log('Inside vote_dislike');

    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;

    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=general&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=0&is_cancel=0`,
        }).then(async (data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote registered') that.getSherGeneralDiscussion(that.state.sherId);
            else if (data == 'vote already registered') {
              Alert.alert(
                'Vote is already registerd. Unregister vote first and then you can revote',
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  // /////////////////////////////////////////////////////////
  //	Vote Unregister General
  // /////////////////////////////////////////////////////////

  vote_unregister(comment_general_id) {
    console.log('Inside vote_unregister');

    console.log('Value of comment_general_id');
    console.log(comment_general_id);

    const that = this;

    if (this.state.username != '') {
      try {
        fetch('https://icanmakemyownapp.com/iqbal/v3/vote.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            `sher=${
            that.state.sherId
            }&discussion_type=general&comment_id=${
            comment_general_id
            }&username=${
            that.state.username
            }&password=${
            that.state.password
            }&is_like=0&is_cancel=1`,
        }).then(async (data) => {
          data.text().then(async (data) => {
            console.log('data');
            console.log(data);
            if (data == 'vote removed') {
              that.getSherGeneralDiscussion(that.state.sherId);
              Alert.alert('Your vote is removed');
            } else if (data == 'invalid is_cancel value') {
              Alert.alert('You have not liked or disliked it yet.');
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert('inside catch err');
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        'You are you not logged in. Please Login to give your feedback.',
      );
    }

    console.log('messageSher sent to send sher message function');
  }

  selectedWord(wordText, wordId) {
    this.setState({ mySelectedWord: wordText });
    this.setState({ mySelectedId: wordId + 1 });
    console.log('Value of mySelectedWord');
    console.log(this.state.mySelectedWord);
    console.log('Value of mySelectedId');
    console.log(this.state.mySelectedId);
  }

  chooseColor() {
    return {
      borderColor: 'red',
    };
  }

  render() {
    Moment.locale('en');


    const viewStylesNotSelected = {
      borderColor: 'black',
      borderWidth: 1,
    };
    const viewStylesWithMeanings = {
      borderColor: 'green',
      borderWidth: 1,
    };
    const viewStylesSelected = {
      borderColor: 'red',
      borderWidth: 2,
    };

    const textStylesNotSelected = {
      color: 'black',
      fontWeight: 'normal',
    };
    const textStylesSelected = {
      color: 'red',
      fontWeight: 'bold',
    };

    const that = this;
    const item5 = this.state.wordText.map((item, index) => {
      if (parseInt(that.state.mySelectedId) == index + 1) {
        return (
          <View style={[styles.button, viewStylesSelected]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonText, textStylesSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      }
      if (that.state.meaningsAvailable.has((index + 1).toString())) {
        return (
          <View style={[styles.button, viewStylesWithMeanings]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonText, textStylesNotSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      }
      return (
        <View style={[styles.button, viewStylesNotSelected]}>
          <TouchableHighlight
            key={item.index}
            onPress={() => that.selectedWord(item, index)}
          >
            <Text style={[styles.buttonText, textStylesNotSelected]}>
              {item}
            </Text>
          </TouchableHighlight>
        </View>
      );
    });


    const item7 = this.state.wordDiscussionDetail.map((item) => {
      if (item.wordposition == this.state.mySelectedId) {
        return (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.1, flexDirection: 'column' }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableHighlight
                  onPress={() => this.vote_like_word_arrow(item.id)}
                >
                  <Image
                    resizeMode="stretch"
                    style={{ height: 30, width: 30 }}
                    source={iconUpVote}
                  />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 0.2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {item.score}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableHighlight
                  onPress={() => this.vote_dislike_word_arrow(item.id)}
                >
                  <Image
                    resizeMode="stretch"
                    style={{ height: 30, width: 30 }}
                    source={iconDownVote}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View
              key={item.id}
              style={[styles.RenderedItem6View, styles.flexPoint8]}
            >
              <View style={styles.NavBar}>
                <Text>{item.username}</Text>
                <Text>{Moment(item.timestamp).format('MMM DD, YYYY')}</Text>
              </View>
              <View>
                <Text style={styles.CommentsText}>{item.text}</Text>
              </View>
            </View>
          </View>
        );
      }
    });

    let signinMessageLocal = '';
    if (this.state.signinConfirmation === 'done') {
      signinMessageLocal = this.state.username.charAt(0).toUpperCase();
    } else {
      signinMessageLocal = 'Sign In';
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.FirstSection}>
          <ScrollView>
            <View style={styles.container}>{item5}</View>
          </ScrollView>
        </View>
        <View style={styles.SecondSection}>
          <ScrollView>
            <View>{item7}</View>
          </ScrollView>
        </View>

        <View style={{ flex: 1 }}>
          <View>
            <Text>Comments:</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 40 }}
              placeholder="Comments..."
              onChangeText={(text) => this.setState({ userMessageWord: text })}
            />
          </View>
          <Button onPress={this.handleSubmitWord} title="SUBMIT" />
        </View>
      </View>
    ); // return ends
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    padding: 5,
    borderRadius: 10,
    padding: 10,
  },

  buttonText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize: 18,
  },
  FirstSection: {
    flex: 2,
    borderWidth: 1,
  },
  SecondSection: {
    flex: 4,
    borderWidth: 1,
  },
  buttonSelected: {
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    width: '25%',
    height: 40,
  },
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  RenderedText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },
  CommentsText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },

  flexPoint8: {
    flex: 0.8,
  },
  RenderedItem6View: {
    backgroundColor: 'skyblue',
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  UrduTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    padding: 5,
    margin: 5,
  },

  EnglishTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },

  MainScrollView: {
    flex: 3,
    borderWidth: 1,
  },
  WordButtons: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
});

export default SherPage;
