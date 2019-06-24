import React from "react";
import { Button, View, Text, Image, Platform, StyleSheet } from 'react-native';
import {createBottomTabNavigator, createAppContainer } from "react-navigation";


// following are books in first tab - Urdu
import urduBook1 from './assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg';
import urduBook2 from './assets/android_app_assets/book_bang_ae_dara_urdu_1.jpg';
import urduBook3 from './assets/android_app_assets/book_armaghan_ae_hijaz_urdu_4.jpg';
import urduBook4 from './assets/android_app_assets/book_zarb_ae_kaleem_urdu_3.jpg';


class Urdu extends React.Component {
  render() {
    return (
	<View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height:180, resizeMode: 'contain'}} source={urduBook1}/></View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={urduBook2}/></View>
	</View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={urduBook3}/></View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={urduBook4}/></View>
      </View>
	</View>
    );
  }
}

export default Urdu;
