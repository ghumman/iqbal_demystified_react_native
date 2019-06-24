import React from "react";
import { Button, View, Text, Image, Platform, StyleSheet } from 'react-native';
import {createBottomTabNavigator, createAppContainer } from "react-navigation";


// following are books in second tab - Farsi 1
import farsi1Book1 from './assets/android_app_assets/book_rumuz_ae_bekhudi_persian_6.jpg';
import farsi1Book2 from './assets/android_app_assets/book_asrar_ae_khudi_persian_5.jpg';
import farsi1Book3 from './assets/android_app_assets/book_payam_ae_hijaz_persian_7.jpg';
import farsi1Book4 from './assets/android_app_assets/book_zabur_ae_ajam_persian_8.jpg';



class Farsi1 extends React.Component {
  render() {
    return (

      <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height:180, resizeMode: 'contain'}} source={farsi1Book1}/></View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={farsi1Book2}/></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={farsi1Book3}/></View>
        <View style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined}}><Image style={{width: 180, height: 180, resizeMode: 'contain'}} source={farsi1Book4}/></View>
      </View>
      </View>
    );
  }
}

export default Farsi1;
