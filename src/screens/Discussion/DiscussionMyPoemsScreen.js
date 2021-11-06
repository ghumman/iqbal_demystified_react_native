import React from "react";
import {
  Platform,
  Image,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Alert,
  View,
  Text
} from "react-native";
import StaticContentService from "../Misc/StaticContentServiceYaml";
// import Tabs from './Tabs'

import AsyncStorage from "@react-native-community/async-storage";

import starLiked from "../../assets/android_app_assets/star_liked.png";
import starNotLiked from "../../assets/android_app_assets/star_not_liked.png";
const sharedConstants = require("../../shared/Constants");

var RNFS = require("react-native-fs");

const FONT = "Normal";
const TEXT = "Urdu";

class CommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      listId: "List_001",
      sherText: [],
      wordText: [],
      poemText: [],
      sherObjects: [],
      sherGeneralDiscussionServerResponse: [],
      sherDiscussionDetail: [],
      wordDiscussionDetail: [],

      recentData: [],
      popularData: [],

      testString: "",
      key: "home",
      font: "Normal",
      text: "Urdu"
    };
  }

  static navigationOptions = {
    title: "My Poems"
  };

  onSubmit = sherNumber => {
    this.props.navigation.navigate("SherTabs", {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password
    });
  };
  ////////////////////////////////////////////////////////////////////
  //	Recent Function starts
  ///////////////////////////////////////////////////////////////////

  async getSherRecentListFromServer() {
    var that = this;
    try {
      fetch(sharedConstants.BACKEND_URL + "feed.php?type=recent", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(async function (data) {
        data.text().then(async function (data) {
          that.getRecentSher(data);
        }); // then async function ends
      }); // then async function ends
    } catch (err) {
      Alert.alert("inside catch err");
      Alert.alert(err);
      this.message = err;
    }
  }

  getRecentSher(sherRecentList) {
    var that = this;
    StaticContentService.getRecentSher(sherRecentList).then(function (response) {
      let newArr = [response.sher];

      response.sher.map(el => {
        el.sherContent[0].text = el.sherContent[0].text.split("|");
        try {
          el.sherContent[1].text = el.sherContent[1].text.split("|");
        } catch (err) {
          el.sherContent.push({
            text: ["#translation missing", "#translation missing"]
          });
        }
        try {
          el.sherContent[2].text = el.sherContent[2].text.split("|");
        } catch (err) {
          el.sherContent.push({
            text: ["#translation missing", "#translation missing"]
          });
        }
        return (el.sherContent = el.sherContent);
      });

      that.setState({
        recentData: newArr[0]
      });
    }); // then func response ends
  }
  ////////////////////////////////////////////////////////////////////
  //	Recent Function Ends
  ///////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////
  //	Popular Function Starts
  ///////////////////////////////////////////////////////////////////

  async getSherPopularListFromServer() {
    var that = this;

    that.readBookmarks().then(function (result) {
      var bookmarksPoemList = [];
      for (i = 0; i < result.length - 1; i += 3) {
        bookmarksPoemList.push(result[i]);
      } // end of for loop

      try {
        fetch(sharedConstants.BACKEND_URL + "feed.php?type=popular", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (data) {
          data.text().then(async function (data) {
            var dataArrayPopular = data.split(",");
            var poemDataArray = [];
            for (j = 0; j < dataArrayPopular.length - 1; j++) {
              if (
                bookmarksPoemList.includes(
                  dataArrayPopular[j].slice(0, dataArrayPopular[j].length - 4)
                )
              )
                poemDataArray.push(dataArrayPopular[j]);
            }

            try {
              // $.ajax({
              fetch(
                sharedConstants.BACKEND_URL + "feed.php?type=recent",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              ).then(async function (data) {
                data.text().then(async function (data) {
                  var dataArrayRecent = data.split(",");
                  for (j = 0; j < dataArrayRecent.length - 1; j++) {
                    // include the element from recent list only if sliced version meaning xxx_yyy is present inside bookmarksPoemList.yaml file but it is not already added from popular list
                    if (
                      bookmarksPoemList.includes(
                        dataArrayRecent[j].slice(
                          0,
                          dataArrayRecent[j].length - 4
                        )
                      ) &&
                      !poemDataArray.includes(dataArrayRecent[j])
                    )
                      poemDataArray.push(dataArrayRecent[j]);
                  }

                  var poemDataArrayString = poemDataArray.toString();
                  poemDataArrayString += ",";
                  that.getPopularSher(poemDataArrayString);
                }); // then async function ends
              }); // then async function ends
            } catch (err) {
              Alert.alert("inside catch err");
              Alert.alert(err);
              this.message = err;
            }
          }); // then function data ends
        }); // then function data ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
        this.message = err;
      }
    }); //  readBookmarks.then function ends
  }

  getPopularSher(sherPopularList) {
    var that = this;
    StaticContentService.getRecentSher(sherPopularList).then(function (
      response
    ) {
      that.readBookmarksShers().then(function (result) {
        for (var i = 0; i < response.sher.length; i++) {
          try {
            if (result.includes(response.sher[i].id))
              response.sher[i].star = true;
            else response.sher[i].star = false;
          } catch (e) {
          }
        }

        let newArrPopular = [response.sher];
        response.sher.map(el => {
          el.sherContent[0].text = el.sherContent[0].text.split("|");
          try {
            el.sherContent[1].text = el.sherContent[1].text.split("|");
          } catch (err) {
            el.sherContent.push({
              text: ["#translation missing", "#translation missing"]
            });
          }
          try {
            el.sherContent[2].text = el.sherContent[2].text.split("|");
          } catch (err) {
            el.sherContent.push({
              text: ["#translation missing", "#translation missing"]
            });
          }
          return (el.sherContent = el.sherContent);
        });

        that.setState({
          popularData: newArrPopular[0]
        });
      }); // readBookmark . then ends
    }); // then func response ends
  }

  ////////////////////////////////////////////////////////////////////
  //	Popular Function Ends
  ///////////////////////////////////////////////////////////////////

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

  starToggling = sher => {
    var that = this;

    this.readBookmarksShers().then(function (result) {
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
          })
          .catch(() => {
          });
        that.getSherPopularListFromServer();
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
          })
          .catch(() => {
          });

        that.getSherPopularListFromServer();
      }
    });
  };

  async readBookmarksShers() {
    const path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";
    try {
      const yamlFile = await RNFS.readFile(path, "utf8");
      var partsOfStr = yamlFile.split("@");
      return partsOfStr;
    } catch (e) {
      return "";
    }
  }

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
      this.getSherPopularListFromServer();
    } catch (e) {
    }
  }

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
          <TouchableHighlight onPress={() => this.onSubmit(item.id)}>
            <View>
              {that.state.text == "Urdu" ? (
                <View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[0].text[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={fontFamilyTextVariable}>
                      {item.sherContent[0].text[1]}
                    </Text>
                  </View>
                </View>)
                : (
                  <View>
                    <View>
                      <Text style={fontFamilyTextVariable}>
                        {item.sherContent[2].text[0]}
                      </Text>
                    </View>
                    <View>
                      <Text style={fontFamilyTextVariable}>
                        {item.sherContent[2].text[1]}
                      </Text>
                    </View>
                  </View>
                )}
              <View>
                <Text style={fontFamilyTextVariableEnglish}>
                  {item.sherContent[1].text[0]}
                </Text>
              </View>
              <View>
                <Text style={fontFamilyTextVariableEnglish}>
                  {item.sherContent[1].text[1]}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList data={this.state.popularData} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    height: 44
  },

  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },

  RenderedText: {
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
    textAlign: "center",
    padding: 2,
    fontSize: 18,
    color: "green"
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
});

export default CommentsPage;
