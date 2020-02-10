import React from "react";
import {
  Platform,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  View,
  Text
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

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
      text: "Urdu"
    }; // this.state ends
  } // constructor ends

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title || "",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  starToggling = poem => {
    var that = this;
    this.readBookmarks().then(function (result) {
      console.log("result");
      console.log(result);

      if (result.includes(poem.id)) {
        console.log("poem is in the file");
        var index = result.indexOf(poem.id);
        if (index > -1) {
          result.splice(index, 3);
        }

        var newData = result.join("@");
        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(success => {
            // console.log('FILE WRITTEN!');
            let bookName = that.props.navigation.getParam("detailBook");
            that.getPoemList(bookName);
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";
        var sherNumberComma =
          poem.id + "@" + poem.textUrdu + "@" + poem.textEnglish + "@";

        // write the file
        RNFS.appendFile(path, sherNumberComma, "utf8")
          .then(success => {
            console.log("FILE WRITTEN!");
            let bookName = that.props.navigation.getParam("detailBook");
            console.log("In listPoemScreen.js inside starToggling else");
            that.getPoemList(bookName);
          })
          .catch(err => {
            console.log(err.message);
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
        console.log("res is not equal to null: ");
        console.log(res);
        this.setState({ font: res });
      } else {
        console.log("res: ");
        console.log(res);
        this.setState({ font: "Normal" });
      }
    });

    AsyncStorage.getItem(TEXT).then(res => {
      if (res !== null) {
        console.log("res is not null: ");
        console.log(res);
        this.setState({ text: res });
      } else {
        console.log("res: ");
        console.log(res);
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
      console.log("Error");
      console.log(e);
    }
  }

  getPoemList(listId) {
    this.setState({ poemText: [] });
    var that = this;
    StaticContentService.getPoemList(listId).then(function (response) {
      var yamlObject = YAML.parse(response);
      that.setState({ poemList: yamlObject.sections });

      that.setState({ poemListName: that.state.poemList.poems });

      var checkValueVar = [];

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

    if (item.id != 0) {
      if (item.star)
        return (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 0.2
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
                borderBottomColor: "#d6d7da",
                flex: 0.8
              }}
            >
              <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>{item.textUrdu}</Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.textEnglish}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        );
      else
        return (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 0.2
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
                borderBottomColor: "#d6d7da",
                flex: 0.8
              }}
            >
              <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>{item.textUrdu}</Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
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
        <View style={{ backgroundColor: "#C0C0C0" }}>
          <Text style={{ fontSize: 14, padding: 2, fontWeight: "bold", color: "black" }}>{item.textUrdu}</Text>
          <Text style={{ fontSize: 14, padding: 2, fontWeight: "bold", color: "black" }}>{item.textEnglish}</Text>
        </View>
      );
  };

  render() {
    var fontFamilyTitleVariable;
    switch (this.state.font) {
      case "Normal":
        fontFamilyTitleVariable = styles.UrduTitleNormal;
        break;
      case "Nafees":
        fontFamilyTitleVariable = styles.UrduTitleNafees;
        break;
      case "Kasheeda":
        fontFamilyTitleVariable = styles.UrduTitleKasheeda;
        break;
      case "Fajer":
        fontFamilyTitleVariable = styles.UrduTitleFajer;
        break;
    }

    var item3 = this.state.poemText.map(item => (
      <Text key={item.index} onClick={() => this.onSubmit(item.id)}>
        {" "}
        {item.textUrdu}
      </Text>
    ));

    var that = this;

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
  RenderedTextNormal: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18
  },
  RenderedTextNafees: {
    fontFamily:
      Platform.OS === "ios" ? "NafeesNastaleeq" : "Nafees Nastaleeq v1.02",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18
  },
  RenderedTextKasheeda: {
    fontFamily:
      Platform.OS === "ios" ? "JameelNooriKasheeda" : "Jameel Noori Kasheeda",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18
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
    fontSize: 18
  },
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  UrduTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  },

  UrduTitleNormal: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  },

  UrduTitleNafees: {
    fontFamily:
      Platform.OS === "ios" ? "NafeesNastaleeq" : "Nafees Nastaleeq v1.02",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  },

  UrduTitleKasheeda: {
    fontFamily:
      Platform.OS === "ios" ? "JameelNooriKasheeda" : "Jameel Noori Kasheeda",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  },

  UrduTitleFajer: {
    fontFamily:
      Platform.OS === "ios"
        ? "FajerNooriNastalique"
        : "Fajer Noori Nastalique 15-12-2006",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  }
});

export default ListPoemScreen;
