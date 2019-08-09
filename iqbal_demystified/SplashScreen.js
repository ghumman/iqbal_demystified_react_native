import React from "react";
import {TouchableOpacity,  TouchableHighlight, Button, View, Text, Image, Platform, StyleSheet } from 'react-native';
import {NavigationEvents, createMaterialTopTabNavigator, createAppContainer } from "react-navigation";


// import logo from './assets/allam_iqbal_pic.jpg';
// import logo from './assets/android_app_assets/iqbal_icon.jpg';
import logo from './assets/ic_launcher.png';







// const TabFunction = createAppContainer(TabNavigator);


export default class HomeScreen extends React.Component {
	 componentWillMount () {
		 setTimeout(() => {
			 this.props.navigation.navigate('Home');
		 }, 2000);
		     }

	render() {
		
		return (
			<View style={{flex: 1}}>
				<View style={styles.TopArea}>
					<Text style={styles.TopText}> Iqbal Demystified </Text>
				</View>
				<View style={{flex:1}}>
	<Image style={styles.image} source={logo}/>
				</View>
				<View style={styles.BottomArea}>
					<Text style={styles.BottomText}> Created by International Iqbal Society </Text>
				</View>
			</View>
) } }




// Styling
const styles = StyleSheet.create({
  TopArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  TopText: {
    textAlign: 'center',
    fontFamily: 'Times New Roman',
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'gray',
  },
  BottomArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  BottomText: {
    textAlign: 'center',
    fontFamily: 'Times New Roman',
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'gray',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#485a96',
    backgroundColor: '#808000',
    borderWidth: 0.5,
    borderColor: '#fff',
    // height: 200,
    // width: 300,
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
  image: {
        flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'

  },

  RowSpace: {
    // alignSelf: 'flex-start',
    // flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain',
    // resizeMode: 'center',
    // margin: 15 

  },

  RowImage: {
    flex: 1,
    // alignItems: 'center',
    // width: 80, 
    // height: 80, 
    // width: undefined, 
    // height: undefined, 
    // width: null, 
    // height: null, 
    // resizeMode: 'contain'
  },

  HighlightProperties: {
    flex: 1,
    // alignItems: 'center',
    // width: 80, 
    // height: 80, 
    // width: undefined, 
    // height: undefined, 
    // width: null, 
    // height: null, 
	overflow: 'hidden', 
	alignItems: 'center', 
	// position: 'relative', 
	margin: 10
},

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

