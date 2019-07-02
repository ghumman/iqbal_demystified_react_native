import React from "react";
import { TouchableHighlight, Button, View, Text, Image, Platform, StyleSheet } from 'react-native';
import {NavigationEvents, createBottomTabNavigator, createAppContainer } from "react-navigation";

import AsyncStorage from '@react-native-community/async-storage';
// import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
// import { AsyncStorage } from "react-native";

// const USER_KEY = "";
const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

import logo from './assets/allam_iqbal_pic.jpg';

import iconSignIn from './assets/android_app_assets/icon_signed_in.png';
import iconBest from './assets/android_app_assets/icon_best.png';
import iconDiscussion from './assets/android_app_assets/icon_discussion.png';
import iconSearch from './assets/android_app_assets/icon_search.png';
import iconInfo from './assets/android_app_assets/icon_info.png';

import DetailsScreen from './DetailsScreen';

import TabNavigator from './TabScreen';


import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';






// const TabFunction = createAppContainer(TabNavigator);


export default class HomeScreen extends React.Component {
constructor(props) {
    super(props);
    this.state = {
          username: "",
          password: "",
          signinConfirmation: "",
          gotoPage: "", 


    }
  }


 onDidFocusCustomFunction = () => {

    AsyncStorage.getItem(USERNAME)
      .then(res => {
        if (res !== null) {
	  // console.log("res: ")
	  // console.log(res)
	this.setState({username: res});
        } else {
	  // console.log("res: ")
	  // console.log(res)
	this.setState({username: res});
        }
      })

    AsyncStorage.getItem(PASSWORD)
      .then(res => {
        if (res !== null) {
	  // console.log("res: ")
	  // console.log(res)
	  this.setState({password: res});
        } else {
	  // console.log("res: ")
	  // console.log(res)
	  this.setState({password: res});
        }
      })

    AsyncStorage.getItem(MESSAGE)
      .then(res => {
        // if (res !== null) {
	  // console.log("res: ")
	  // console.log(res)
	  this.setState({signinConfirmation: res});
	  if (res != 'done') {
		
                                console.log("Profile Signin Confirmation message is not done ")

                                this.setState({signinConfirmation: 'not signed in'});
                                this.setState({username: ''});
                                this.setState({gotoPage : "Register"})
}	else {
                                console.log("You're signed in and profileSigninConfirmation message is done");
                                this.setState({gotoPage : "Profile"})

}

        // } else {
	  // console.log("res: ")
	  // console.log(res)
	  // this.setState({signinConfirmation: res});
        // }
      })

/*
      if (this.state.signinConfirmation != 'done') {

                                console.log("Profile Signin Confirmation message is not done ")

                                this.setState({signinConfirmation: 'not signed in'});
                                this.setState({username: ''});
                                this.setState({gotoPage : "Register"})

                        }
                        else {
                                console.log("You're signed in and profileSigninConfirmation message is done");
                                this.setState({gotoPage : "Profile"})
                        }
*/

 }
	
 onSubmit = (pageName) => {

	  console.log("Inside onSubmit, pageName: ")
	  console.log(pageName)

	  console.log("Inside onSubmit, this.state.signinConfirmation: ")
	  console.log(this.state.signinConfirmation)

	  console.log("Inside onSubmit, this.state.username: ")
	  console.log(this.state.username)

	  console.log("Inside onSubmit, this.state.password: ")
	  console.log(this.state.password)

          if (pageName === 'Intikhab'){
                this.props.navigation.navigate('ListPoem',{ detailBook: "List_Editor_Pick", profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password })
          }
          else {
                this.props.navigation.navigate(pageName,{ profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password })
          }
        }

        componentDidMount() {
                try {
			this.onDidFocusCustomFunction();

			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});

                // this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
                // this.setState({username: this.props.location.state.profileUsername});
                // this.setState({password: this.props.location.state.profilePassword});


      // if (this.props.navigation.getParam('profileSigninConfirmation') != 'done') {
      if (this.state.signinConfirmation != 'done') {

                                console.log("Profile Signin Confirmation message is not done ")

                                this.setState({signinConfirmation: 'not signed in'});
                                this.setState({username: ''});
                                this.setState({gotoPage : "Register"})

                        }
                        else {
                                console.log("You're signed in and profileSigninConfirmation message is done");
                                this.setState({gotoPage : "Profile"})
                        }
                }
                catch (e) {
                        console.log("Inside catch")
                        console.log("Not signed in or just started the app");

                        this.setState({signinConfirmation: 'not signed in'});
                        this.setState({username: ''});
                        this.setState({gotoPage : "RegisterPage"})
                }
        }

	render() {
		
    		const state = this.state;
		const {navigate} = this.props.navigation;
		return (
			<View style={{flex: 1}}>
<NavigationEvents onDidFocus={() => this.onDidFocusCustomFunction()} />
		<View style={{flex: 1}}>
        {/*<Text style={styles.appTitle}>ALLAMA IQBAL</Text>*/}
	{/*<Image source={logo}/>*/}

{/*<Table style={{flex: 1}}>
	<Row data={[<Image style={{resizeMode: 'contain'}} source={iconSignIn}/>, <Image style={{resizeMode: 'contain'}} source={iconBest}/>]}/>
</Table>*/}

	{/*
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
	<Row  data={[<Image style={{flex: 1, resizeMode: 'contain'}} source={iconSignIn}/>, <Image style={{flex: 1, resizeMode: 'contain'}} source={iconBest}/>]}/>
        </Table>
	*/}
	{/*<Row data={['1', '2']}/>*/}
	{/*
	<Image source={iconSignIn}/>
	<Image source={iconBest}/>
	<Image source={iconDiscussion}/>

	<Image source={iconSearch}/>
	<Image source={iconInfo}/>
	<Image source={iconInfo}/>
	*/}

        {/*
	<Text style={styles.welcome}>I am making changes to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
	*/}
			{/*<Text> Can you see me ? </Text>*/}
{/*
<TouchableHighlight onPress={() => navigate('ListPoem', {name: 'Hello'})} >
<Image style={{width: 90, height:90, resizeMode: 'contain'}} source={iconSignIn}/>
</TouchableHighlight>
*/}

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}>
		<TouchableHighlight onPress={() =>this.onSubmit(this.state.gotoPage)} >
			<Image style={{width: 90, height:90, resizeMode: 'contain'}} source={iconSignIn}/>
		</TouchableHighlight>

	</View>

        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}>
		<TouchableHighlight onPress={() => this.onSubmit("Intikhab")}>
			<Image style={{width: 90, height: 90, resizeMode: 'contain'}} source={iconBest}/>
		</TouchableHighlight>
	</View>

        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}>
		<TouchableHighlight onPress={() => this.onSubmit("DiscussionTabs")}>
<Image style={{width: 90, height: 90, resizeMode: 'contain'}} source={iconDiscussion}/>
		</TouchableHighlight>
</View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}>

		<TouchableHighlight onPress={() => this.onSubmit("Search")}>
<Image style={{width: 90, height:90, resizeMode: 'contain'}} source={iconSearch}/>
		</TouchableHighlight>

</View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}>

		<TouchableHighlight onPress={() => this.onSubmit("Info")}>
<Image style={{width: 90, height: 90, resizeMode: 'contain'}} source={iconInfo}/>
		</TouchableHighlight>

</View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 90, height: 90, resizeMode: 'contain'}} source={iconInfo}/></View>

	
      </View>

        {/*
<View style={{backgroundColor: 'skyblue', justifyContent: 'space-between'}} ><Image style={{resizeMode: 'contain'}}source={iconSearch}/></View>
        <View style={{backgroundColor: 'steelblue', justifyContent: 'space-between'}} />
	*/}
	</View>
			
	<View style={{flex: 2}}>
			{/*<TabFunction/>*/}
		{/*
		{navigate('TabFunction')}
		*/}
		{/*<DetailsScreen/>*/}
		<Button onPress={() => navigate('TabFunction', { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password })} title='BOOKS'/>
	</View>
			</View>


		)
	}
}



// instructions
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  appTitle: {
    fontSize: 40,
    textAlign: 'center',
    color: 'red',
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

