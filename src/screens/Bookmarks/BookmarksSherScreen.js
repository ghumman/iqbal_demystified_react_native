import React from "react";
import {
  Platform,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from "react-native";

import starLiked from "../../assets/android_app_assets/star_liked.png";


import AsyncStorage from "@react-native-community/async-storage";

var RNFS = require("react-native-fs");

const FONT = "Normal";
const TEXT = "Urdu";

class PoemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      listId: "List_001",
      poemList: [],
      poemNameUrdu: "",
      poemNameEnglish: "",
      poemText: [],
      poemTextNew: [],
      poemObjects: [],

      font: "Normal",
      text: "Urdu"
    };
  }

  static navigationOptions = {
    title: "VERSES"
  };

  onSubmit = sherNumber => {
    this.props.navigation.navigate("SherTabs", {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password
    });
  };

  getPoem() {
    var that = this;

    this.setState({ poemText: [] });

    that.readBookmarks().then(function (result) {
      for (i = 0; i < (result.length - 1) / 7; i++) {
        that.state.poemText.push({
          id: result[i * 7],
          textUrdu1: result[i * 7 + 1],
          textUrdu2: result[i * 7 + 2],
          textEnglish1: result[i * 7 + 3],
          textEnglish2: result[i * 7 + 4],
          textRoman1: result[i * 7 + 5],
          textRoman2: result[i * 7 + 6]
        });
      }

      that.setState({ poemTextNew: that.state.poemText });
    });
  }

  starToggling = sher => {
    var that = this;

    this.readBookmarks().then(function (result) {
      if (result.includes(sher.id)) {
        var index = result.indexOf(sher.id);
        if (index > -1) {
          result.splice(index, 7);
        }

        var newData = result.join("@");

        var path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(() => {
            that.getPoem();
          })
          .catch(() => {
          });
      } else {
        var path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";

        var sherAt =
          sher.id +
          "@" +
          sher.sherContent[0].text[0] +
          "@" +
          sher.sherContent[0].text[1] +
          "@" +
          sher.sherContent[1].text[0] +
          "@" +
          sher.sherContent[1].text[1] +
          "@" +
          sher.sherContent[2].text[0] +
          "@" +
          sher.sherContent[2].text[1] +
          "@";

        // write the file
        RNFS.appendFile(path, sherAt, "utf8")
          .then(() => {
            that.getPoem();
          })
          .catch(() => {
          });
      }
    });
  };

  async readBookmarks() {
    const path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";
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

      this.getPoem();
    } catch (e) {
    }
  }

  render() {
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

    var fontFamilyTextVariableEnglish;
    switch (this.state.font) {
      case "Normal":
        fontFamilyTextVariableEnglish = styles.RenderedTextNormalEnglish;
        break;
      case "Nafees":
        fontFamilyTextVariableEnglish = styles.RenderedTextNafeesEnglish;
        break;
      case "Kasheeda":
        fontFamilyTextVariableEnglish = styles.RenderedTextKasheedaEnglish;
        break;
      case "Fajer":
        fontFamilyTextVariableEnglish = styles.RenderedTextFajerEnglish;
        break;
    }

    var that = this;
    var itemScroll = this.state.poemTextNew.map(function (item) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.1
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
              flex: 0.9,
              alignItems: "center"
            }}
          >
            <TouchableHighlight onPress={() => that.onSubmit(item.id)}>
              <View>
                {(that.state.text == "Urdu") ?
                  (<View>
                    <View>
                      <Text style={fontFamilyTextVariable}>{item.textUrdu1}</Text>
                    </View>
                    <View>
                      <Text style={fontFamilyTextVariable}>{item.textUrdu2}</Text>
                    </View>
                  </View>)
                  :
                  (<View>
                    <View>
                      <Text style={fontFamilyTextVariable}>
                        {item.textRoman1}
                      </Text>
                    </View>
                    <View>
                      <Text style={fontFamilyTextVariable}>
                        {item.textRoman2}
                      </Text>
                    </View>
                  </View>)}


                <View>
                  <Text style={fontFamilyTextVariableEnglish}>
                    {item.textEnglish1}
                  </Text>
                </View>
                <View>
                  <Text style={fontFamilyTextVariableEnglish}>
                    {item.textEnglish2}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );

    });


    return (
      <View style={styles.MainContainer}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {itemScroll}
        </ScrollView>
      </View>
    );
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    // flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "black"
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

  RenderedTextEnglish: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18
  },

  RenderedTextNormalEnglish: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "green"
  },

  RenderedTextNafeesEnglish: {
    fontFamily:
      Platform.OS === "ios" ? "NafeesNastaleeq" : "Nafees Nastaleeq v1.02",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "green"
  },

  RenderedTextKasheedaEnglish: {
    fontFamily:
      Platform.OS === "ios" ? "JameelNooriKasheeda" : "Jameel Noori Kasheeda",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "green"
  },

  RenderedTextFajerEnglish: {
    fontFamily:
      Platform.OS === "ios"
        ? "FajerNooriNastalique"
        : "Fajer Noori Nastalique 15-12-2006",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "green"
  },

  MainContainer: {
    flex: 1
  },
});

export default PoemPage;
