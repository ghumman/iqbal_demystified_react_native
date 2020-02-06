import React from 'react';
import {
  Platform,
  Image,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Alert,
  View,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import StaticContentService from '../Misc/StaticContentServiceYaml';


import starLiked from '../../assets/android_app_assets/star_liked.png';
import starNotLiked from '../../assets/android_app_assets/star_not_liked.png';

const RNFS = require('react-native-fs');

const FONT = 'Normal';
const TEXT = 'Urdu';

class CommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signinConfirmation: '',

      listId: 'List_001',
      sherText: [],
      wordText: [],
      poemText: [],
      sherObjects: [],
      sherGeneralDiscussionServerResponse: [],
      sherDiscussionDetail: [],
      wordDiscussionDetail: [],

      recentData: [],
      popularData: [],

      testString: '',
      key: 'home',

      font: 'Normal',
      text: 'Urdu',
    };
  }

  onSubmit = (sherNumber) => {
    this.props.navigation.navigate('SherTabs', {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password,
    });
  };

  // //////////////////////////////////////////////////////////////////
  //	Recent Function starts
  // /////////////////////////////////////////////////////////////////

  async getSherRecentListFromServer() {
    const that = this;
    try {
      fetch('https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(async (data) => {
        data.text().then(async (data) => {
          console.log('data');
          console.log(data);
          that.getRecentSher(data);
        }); // then async function ends
      }); // then async function ends
    } catch (err) {
      Alert.alert('inside catch err');
      Alert.alert(err);
      this.message = err;
    }
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
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
        that.getSherRecentListFromServer();
      } else {
        var path = `${RNFS.DocumentDirectoryPath}/bookmarked-shers.txt`;

        // var sherNumberComma = sherNumber + ',';
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
          .then(() => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
        that.getSherRecentListFromServer();
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

  getRecentSher(sherRecentList) {
    const that = this;
    StaticContentService.getRecentSher(sherRecentList).then((response) => {
      console.log(
        'Back from Static Content Service.sherRecentList call, response: ',
      );
      console.log(response);

      that.readBookmarks().then((result) => {
        console.log('result');
        console.log(result);

        for (let i = 0; i < response.sher.length; i++) {
          try {
            if (result.includes(response.sher[i].id)) response.sher[i].star = true;
            else response.sher[i].star = false;
          } catch (e) {
            console.log('catch caught an error');
          }
        }
        const newArr = [response.sher];
        console.log(
          'Value of newArr inside getRecentSher inside then function responseafter newArr = response.sher',
        );
        console.log(newArr);

        response.sher.map((el) => {
          el.sherContent[0].text = el.sherContent[0].text.split('|');
          console.log(el.sherContent[0].text);
          try {
            el.sherContent[1].text = el.sherContent[1].text.split('|');
            console.log(el.sherContent[1].text);
          } catch (err) {
            el.sherContent.push({
              text: ['#translation missing', '#translation missing'],
            });
          }
          try {
            el.sherContent[2].text = el.sherContent[2].text.split('|');
          } catch (err) {
            el.sherContent.push({
              text: ['#translation missing', '#translation missing'],
            });
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
          recentData: newArr[0],
        });
      }); // readBookmark . then ends
    }); // then func response ends
  }
  // //////////////////////////////////////////////////////////////////
  //	Recent Function Ends
  // /////////////////////////////////////////////////////////////////

  // //////////////////////////////////////////////////////////////////
  //	Popular Function Starts
  // /////////////////////////////////////////////////////////////////

  async getSherPopularListFromServer() {
    const that = this;
    try {
      fetch('https://icanmakemyownapp.com/iqbal/v3/feed.php?type=popular', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((data) => {
        data.text().then(async (data) => {
          console.log('data');
          console.log(data);
          that.getPopularSher(data);
        }); // then function data ends
      }); // then function data ends
    } catch (err) {
      Alert.alert('inside catch err');
      Alert.alert(err);
      this.message = err;
    }
  }

  getPopularSher(sherPopularList) {
    const response = StaticContentService.getRecentSher(sherPopularList);
    const newArrPopular = [response.sher];
    console.log('Value of newArrPopular');
    console.log(newArrPopular);
    console.log('I am at this point');

    response.sher.map((el) => {
      el.sherContent[0].text = el.sherContent[0].text.split('|');
      console.log(el.sherContent[0].text);
      try {
        el.sherContent[1].text = el.sherContent[1].text.split('|');
        console.log(el.sherContent[1].text);
      } catch (err) { }
      try {
        el.sherContent[2].text = el.sherContent[2].text.split('|');
      } catch (err) { }
      return (el.sherContent = el.sherContent);
    });

    this.setState({
      popularData: newArrPopular[0],
    });
  }

  // //////////////////////////////////////////////////////////////////
  //	Popular Function Ends
  // /////////////////////////////////////////////////////////////////

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

      this.getSherRecentListFromServer();
      // this.getSherPopularListFromServer()
      console.log('In poempage.js inside componentdidmount');
    } catch (e) {
      console.log('Inside catch');
    }
  }

  renderItem = ({ item }) => {
    const that = this;
    let fontFamilyTextVariable;
    switch (this.state.font) {
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
    if (item.star) {
      if (that.state.text == 'Urdu') {
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
              <TouchableHighlight onPress={() => this.onSubmit(item.id)}>
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[0].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[0].text[1]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[1]}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        );
      } if (that.state.text == 'Roman') {
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
              <TouchableHighlight onPress={() => this.onSubmit(item.id)}>
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[2].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[2].text[1]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
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
      if (that.state.text == 'Urdu') {
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
              <TouchableHighlight onPress={() => this.onSubmit(item.id)}>
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[0].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[0].text[1]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[1]}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        );
      } if (that.state.text == 'Roman') {
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
              <TouchableHighlight onPress={() => this.onSubmit(item.id)}>
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[2].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[2].text[1]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[1].text[1]}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        );
      }
    }
  };

  render() {
    return (
      <View>
        <FlatList data={this.state.recentData} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  RenderedView: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  RenderedText: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  UrduTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
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
  EnglishTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default CommentsPage;
