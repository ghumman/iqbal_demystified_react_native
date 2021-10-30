import React from "react";
import {
  Platform,
  Image,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  View,
  Text
} from "react-native";

import starLiked from "../../assets/android_app_assets/star_liked.png";


import AsyncStorage from "@react-native-community/async-storage";

var RNFS = require("react-native-fs");

const FONT = "Normal";
const TEXT = "Urdu";

class ListPoemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // following three are normally passed to every page
      username: "hello",
      password: "",
      signinConfirmation: "",

      pictures: [],
      listId: "List_001",
      poemList: [],
      poemListName: [],
      bookName: [],
      bookNameUrdu: "",
      bookNameEnglish: "",
      bookSections: [],
      onePoem: "",
      poemText: [],
      poemTextFinal: [],
      poemObjects: [],

      font: "Normal",
      text: "Urdu"
    }; // this.state ends
  } // constructor ends

  starToggling = poem => {
    var that = this;

    this.readBookmarks().then(function(result) {

      // create a path you want to write to
      // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
      // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

      if (result.includes(poem.id)) {
        var index = result.indexOf(poem.id);
        if (index > -1) {
          result.splice(index, 3);
        }

        var newData = result.join("@");

        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(() => {
            that.getPoemList();
          })
          .catch(() => {
          });
      } else {
        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";

        // var sherNumberComma = sherNumber + ',';
        var sherNumberComma =
          poem.id + "@" + poem.textUrdu + "@" + poem.textEnglish + "@";

        // write the file
        RNFS.appendFile(path, sherNumberComma, "utf8")
          .then(() => {
            that.getPoemList();
          })
          .catch(() => {
          });
      }
    });
  };

  async readBookmarks() {
    const path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";
    try {
      const yamlFile = await RNFS.readFile(path, "utf8");
      var partsOfStr = yamlFile.split("@");
      return partsOfStr;
    } catch (e) {
      return "";
    }
  }

  onDidFocusCustomFunction = () => {

    AsyncStorage.getItem(FONT).then(res => {
      if (res !== null) {
        this.setState({ font: res });
      } else {
        this.setState({ font: "Normal" });
      }
    });

    AsyncStorage.getItem(TEXT).then(res => {
      if (res !== null) {
        this.setState({ text: res });
      } else {
        this.setState({ text: "Urdu" });
      }
    });
  };

  componentDidMount() {
    // retrive the data
    try {
      this.onDidFocusCustomFunction();

      this.setState({
        signinConfirmation: this.props.navigation.getParam(
          "profileSigninConfirmation"
        )
      });
      this.setState({
        username: this.props.navigation.getParam("profileUsername")
      });
      this.setState({
        password: this.props.navigation.getParam("profilePassword")
      });
      this.getPoemList();
    } catch (e) {
    }
  }

  getPoemList() {
    this.setState({ poemText: [] });

    var that = this;
    that.readBookmarks().then(function(result) {

      for (i = 0; i < (result.length - 1) / 3; i++) {
        that.state.poemText.push({
          id: result[i * 3],
          textUrdu: result[i * 3 + 1],
          textEnglish: result[i * 3 + 2]
        });
      }

      that.setState({ poemTextFinal: that.state.poemText });

    });
  }

  onSubmit = poemNumber => {
    if (poemNumber != 0) {
      this.props.navigation.navigate("Poem", {
        detailPoem: poemNumber,
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password
      });
    }
  };

  renderItem = ({ item }) => {
    var that = this;
    var fontFamilyTextVariable;
    switch (this.state.font) {
      case "Normal":
        fontFamilyTextVariable = styles.RenderedTextNormal;
        break;
      case "Nafees":
        fontFamilyTextVariable = styles.RenderedTextNafees;
        break;
      case "Kasheeda":
        fontFamilyTextVariable = styles.RenderedTextKasheeda;
        break;
      case "Fajer":
        fontFamilyTextVariable = styles.RenderedTextFajer;
        break;
    }

    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 0.1 }}
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
            borderBottomColor: "#d6d7da",
            flex: 0.9, 
            alignItems: "center"
          }}
        >
          <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
            <View>
              <View>
                <Text style={fontFamilyTextVariable}>{item.textUrdu}</Text>
              </View>
              <View>
                <Text style={fontFamilyTextVariable}>{item.textEnglish}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  render() {

    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.poemTextFinal}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  StarImage: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  RenderedView: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d7da"
  },

  RenderedText: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18
  },

  RenderedTextNormal: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "black"
  },

  RenderedTextNafees: {
    fontFamily:
      Platform.OS === "ios" ? "NafeesNastaleeq" : "Nafees Nastaleeq v1.02",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "black"
  },

  RenderedTextKasheeda: {
    fontFamily:
      Platform.OS === "ios" ? "JameelNooriKasheeda" : "Jameel Noori Kasheeda",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "black"
  },

  RenderedTextFajer: {
    fontFamily:
      Platform.OS === "ios"
        ? "FajerNooriNastalique"
        : "Fajer Noori Nastalique 15-12-2006",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "black"
  },

  MainContainer: {
    flex: 1
  },
});

export default ListPoemScreen;
