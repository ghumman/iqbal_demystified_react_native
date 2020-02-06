import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Button,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

// used for reading and writing application wide variables
import AsyncStorage from '@react-native-community/async-storage';

// iqbal logo
import logo from '../../assets/allam_iqbal_pic.jpg';

// 6 main logos on main page
import iconSignIn from '../../assets/android_app_assets/icon_signed_in.png';
import iconBest from '../../assets/android_app_assets/icon_best.png';
import iconBookmarks from '../../assets/android_app_assets/icon_bookmark.png';
import iconDiscussion from '../../assets/android_app_assets/icon_discussion.png';
import iconSearch from '../../assets/android_app_assets/icon_search.png';
import iconInfo from '../../assets/android_app_assets/icon_info.png';

// books logo in the middle of the page
import booksLogo from '../../assets/android_app_assets/books_logo.png';

// used for reading/writing file system
const RNFS = require('react-native-fs');

// initializing
const USERNAME = 'username';
const PASSWORD = 'password';
const MESSAGE = 'message';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signinConfirmation: '',
      gotoPage: '',
    };
  }

  onDidFocusCustomFunction = () => {
    AsyncStorage.getItem(USERNAME).then((res) => {
      if (res !== null) {
        this.setState({ username: res });
      } else {
        this.setState({ username: res });
      }
    });

    AsyncStorage.getItem(PASSWORD).then((res) => {
      if (res !== null) {
        this.setState({ password: res });
      } else {
        this.setState({ password: res });
      }
    });

    AsyncStorage.getItem(MESSAGE).then((res) => {
      this.setState({ signinConfirmation: res });
      if (res != 'done') {
        // console.log("Profile Signin Confirmation message is not done ")

        this.setState({ signinConfirmation: 'not signed in' });
        this.setState({ username: '' });
        this.setState({ gotoPage: 'Register' });
      } else {
        // console.log("You're signed in and profileSigninConfirmation message is done");
        this.setState({ gotoPage: 'Profile' });
      }
    });
  };

  // if pageName is Intikhab go to ListPoem, becuase Intikhab is similar to ListPoem
  // else go to particular page like Register/Profile, BookmarksTabs, DiscussionTabs, Search or Info
  onSubmit = (pageName) => {
    if (pageName === 'Intikhab') {
      this.props.navigation.navigate('ListPoem', {
        detailBook: 'List_Editor_Pick',
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password,
      });
    } else {
      this.props.navigation.navigate(pageName, {
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password,
      });
    }
  };

  componentDidMount() {
    // first thing when app starts is to make Iqbal-Demystified folder, so that we can put .mp3, txt and yaml files in it.
    RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/Iqbal-Demystified`).then((
      res,
    ) => {
      // console.log("Iqbal-Demystified directory exists now");
    });
    try {
      // gets AsyncStorage username, passowrd, message and sets gotoPage to either Register or Profile
      this.onDidFocusCustomFunction();

      // following code is inherited from React, where username, encrypted password and signinconfirmation message used to get transfer through url and used to pass to every single page.
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

      if (this.state.signinConfirmation != 'done') {
        // console.log("Profile Signin Confirmation message is not done ")
        this.setState({ signinConfirmation: 'not signed in' });
        this.setState({ username: '' });
        this.setState({ gotoPage: 'Register' });
      } else {
        // console.log("You're signed in and profileSigninConfirmation message is done");
        this.setState({ gotoPage: 'Profile' });
      }
    } catch (e) {
      // try ends
      // console.log("Inside catch")
      // console.log("Not signed in or just started the app");
      this.setState({ signinConfirmation: 'not signed in' });
      this.setState({ username: '' });
      this.setState({ gotoPage: 'RegisterPage' });
    }
  }

  render() {
    const { state } = this;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        {/*
	  Following runs the onDidFocus... when user comes to home page
	  after going to other pages and check if the user is still logged
	  in or not.
	*/}
        <NavigationEvents onDidFocus={() => this.onDidFocusCustomFunction()} />

        {/*
	  allama iqbal picture
	*/}
        <View style={{ flex: 2 }}>
          <Image style={styles.Image} source={logo} />
        </View>

        {/*
	  main book logo in the center
	*/}
        <View style={styles.MainContainer}>
          <TouchableOpacity
            style={styles.BookStyle}
            activeOpacity={0.5}
            onPress={() => navigate('TabFunction', {
              profileSigninConfirmation: this.state.signinConfirmation,
              profileUsername: this.state.username,
              profilePassword: this.state.password,
            })}
          >
            <Image source={booksLogo} style={styles.ImageIconStyle} />
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}> BOOKS </Text>
          </TouchableOpacity>
        </View>

        {/*
	  all six logos at the bottom
	*/}
        <View style={{ flex: 2 }}>
          {/*
	    first row of logos
	  */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-around',
            }}
          >
            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit(this.state.gotoPage)}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconSignIn}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit('Intikhab')}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconBest}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit('BookmarksTabs')}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconBookmarks}
              />
            </TouchableHighlight>
          </View>

          {/*
	    second row of logos
	  */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-around',
            }}
          >
            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit('DiscussionTabs')}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconDiscussion}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit('Search')}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconSearch}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.HighlightProperties}
              onPress={() => this.onSubmit('Info')}
            >
              <Image
                style={styles.RowImage}
                resizeMode="contain"
                source={iconInfo}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  BookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#808000',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 150,
    width: 300,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 20,
    margin: 20,
    height: 120,
    width: 120,
    resizeMode: 'stretch',
  },
  TextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 10,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 5,
    height: 120,
  },
  Image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  RowImage: {
    flex: 1,
  },
  HighlightProperties: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    margin: 10,
  },
});
