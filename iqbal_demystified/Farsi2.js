import React from "react";
import { Button, View, Text, Image, Platform, StyleSheet } from 'react-native';
import {createBottomTabNavigator, createAppContainer } from "react-navigation";

// following are books in second tab - Farsi 2
import farsi2Book1 from './assets/android_app_assets/book_javed_nama_persian_9.jpg';
import farsi2Book2 from './assets/android_app_assets/book_pas_cheh_bayad_kard_persian_10.jpg';
import farsi2Book3 from './assets/android_app_assets/book_armaghan_ae_hijaz_persian_11.jpg';

class Farsi2 extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height:180, resizeMode: 'contain'}} source={farsi2Book1}/></View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={farsi2Book2}/></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={farsi2Book3}/></View>
      </View>
      </View>
	
    );
  }
}

export default Farsi2;
