import React, { Component, PropTypes } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

const menuList = require("../../shared/Constants.js");

export default class Menu extends Component {
  menuItemClicked = item => {
    console.log("item: ");
    console.log(item);

    console.log("item.index: ");
    console.log(item.index);
  };
  render() {
    var that = this;
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          {menuList.MENU_LIST.map(item => (
            <TouchableOpacity
              key={item.index}
              onPress={() => that.menuItemClicked(item)}
            >
              <Text style={styles.listMenu}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#33cc33"
  },

  listMenu: {
    color: "white",
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12
  }
});
