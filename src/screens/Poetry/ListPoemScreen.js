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
import { NavigationEvents } from 'react-navigation';

import starLiked from "../../assets/android_app_assets/star_liked.png";
import starNotLiked from "../../assets/android_app_assets/star_not_liked.png";

import AsyncStorage from "@react-native-community/async-storage";

import StaticContentService from "../Misc/StaticContentServiceYaml";

var RNFS = require("react-native-fs");
var YAML = require("yaml");

const FONT = "Normal";
const TEXT = "Urdu";

class ListPoemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      text: "Urdu",
      focusListener: ""
    }; // this.state ends
  } // constructor ends

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title || "",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  starToggling = poem => {
    var that = this;
    this.readBookmarks().then(function (result) {
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
            let bookName = that.props.navigation.getParam("detailBook");
            that.getPoemList(bookName);
          })
          .catch(() => {
          });
      } else {
        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";
        var sherNumberComma =
          poem.id + "@" + poem.textUrdu + "@" + poem.textEnglish + "@";

        // write the file
        RNFS.appendFile(path, sherNumberComma, "utf8")
          .then(() => {
            let bookName = that.props.navigation.getParam("detailBook");
            that.getPoemList(bookName);
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
      let bookName = this.props.navigation.getParam("detailBook");
      this.getPoemList(bookName);
    } catch (e) {
    }
  }

  getPoemList(listId) {
    this.setState({ poemText: [] });
    var that = this;
    StaticContentService.getPoemList(listId).then(function (response) {
      var yamlObject = YAML.parse(response);
      that.setState({ poemList: yamlObject.sections });

      that.setState({ poemListName: that.state.poemList.poems });


      that.readBookmarks().then(function (result) {
        var set = new Set(result);

        for (var i = 0; i < yamlObject.sections.length; i++) {
          try {
            if (yamlObject.sections[i].sectionName[0]) {
              that.state.poemText.push({
                textUrdu: yamlObject.sections[i].sectionName[0].text,
                textEnglish: yamlObject.sections[i].sectionName[1].text,
                id: "0"
              });
            }
          } catch (e) {
            if (yamlObject.sections[i].poems[0].poemName[0]) {
              for (var j = 0; j < yamlObject.sections[i].poems.length; j++) {
                if (set.has(yamlObject.sections[i].poems[j].id)) {
                  that.state.poemText.push({
                    textUrdu: yamlObject.sections[i].poems[j].poemName[0].text,
                    textEnglish:
                      yamlObject.sections[i].poems[j].poemName[1].text,
                    id: yamlObject.sections[i].poems[j].id,
                    star: true
                  });
                } else
                  that.state.poemText.push({
                    textUrdu: yamlObject.sections[i].poems[j].poemName[0].text,
                    textEnglish:
                      yamlObject.sections[i].poems[j].poemName[1].text,
                    id: yamlObject.sections[i].poems[j].id,
                    star: false
                  });
                that.setState({ poemObject: yamlObject.sections[i].poems[j] });
              }
            } // if yamlObject.... ends
          } // catch ends
        } // for ends

        that.setState({ bookNameUrdu: yamlObject.name[0].text });
        that.setState({ bookNameEnglish: yamlObject.name[1].text });
        that.setState({ poemTextFinal: that.state.poemText });

        that.props.navigation.setParams({ title: that.state.bookNameUrdu });
      });
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
    switch (that.state.font) {
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

    if (item.id != 0) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableHighlight onPress={() => that.starToggling(item)}>
              <Image
                resizeMode="cover"
                source={item.star ? starLiked : starNotLiked}
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
                  <Text style={styles.RenderedEnglishText}>
                    {item.textEnglish}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else
      return (
        <View style={{ backgroundColor: "lightgreen" }}>
          <Text style={{ fontSize: 14, padding: 2, fontWeight: "bold", color: "black" }}>{item.textUrdu}</Text>
          <Text style={{ fontSize: 14, padding: 2, fontWeight: "bold", color: "black" }}>{item.textEnglish}</Text>
        </View>
      );
  };

  render() {



    return (
      <View style={styles.MainContainer}>

        <NavigationEvents onWillFocus={() => this.onDidFocusCustomFunction()} />

        <FlatList
          data={this.state.poemTextFinal}
          renderItem={this.renderItem}
          extraData={this.state.font}
        />
      </View>
    ); Focus
  }
}

const styles = StyleSheet.create({
  RenderedEnglishText: {
    flexShrink: 1,
    flexWrap: "wrap",
    alignSelf: 'stretch',
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "green"
  },
  RenderedTextNormal: {
    flexShrink: 1,
    flexWrap: "wrap",
    alignSelf: 'stretch',
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
    alignSelf: 'stretch',
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
    alignSelf: 'stretch',
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
    alignSelf: 'stretch',
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "black"
  },
  MainContainer: {
    flex: 1,
  },
});

export default ListPoemScreen;
