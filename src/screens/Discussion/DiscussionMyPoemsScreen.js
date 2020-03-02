import React from "react";
import {
  Platform,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  View,
  Text
} from "react-native";
import StaticContentService from "../Misc/StaticContentServiceYaml";
// import Tabs from './Tabs'

import AsyncStorage from "@react-native-community/async-storage";

import starLiked from "../../assets/android_app_assets/star_liked.png";
import starNotLiked from "../../assets/android_app_assets/star_not_liked.png";

var RNFS = require("react-native-fs");
var YAML = require("yaml");

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
      fetch("https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent", {
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
      console.log(
        "Back from Static Content Service.sherRecentList call, response: "
      );
      console.log(response);
      let newArr = [response.sher];
      console.log(
        "Value of newArr inside getRecentSher inside then function responseafter newArr = response.sher"
      );
      console.log(newArr);

      response.sher.map(el => {
        el.sherContent[0].text = el.sherContent[0].text.split("|");
        console.log(el.sherContent[0].text);
        try {
          el.sherContent[1].text = el.sherContent[1].text.split("|");
          console.log(el.sherContent[1].text);
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

      console.log("Value of newArr");
      console.log(newArr);

      console.log("Value of newArr[0]");
      console.log(newArr[0]);

      console.log("Value of newArr[1]");
      console.log(newArr[1]);

      console.log("Value of newArr.length");
      console.log(newArr[0].length);

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
      console.log("result.length");
      console.log(result.length);
      var bookmarksPoemList = [];
      for (i = 0; i < result.length - 1; i += 3) {
        console.log("result[x]");
        console.log(result[i]);
        bookmarksPoemList.push(result[i]);
      } // end of for loop

      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/feed.php?type=popular", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (data) {
          data.text().then(async function (data) {
            console.log("data");
            console.log(data);

            var dataArrayPopular = data.split(",");
            console.log("dataArrayPopular");
            console.log(dataArrayPopular);

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
                "https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              ).then(async function (data) {
                data.text().then(async function (data) {
                  console.log("following is recent data");
                  console.log(data);

                  var dataArrayRecent = data.split(",");
                  console.log("dataArrayRecent");
                  console.log(dataArrayRecent);

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

                  console.log("poemDataArray");
                  console.log(poemDataArray);

                  var poemDataArrayString = poemDataArray.toString();

                  console.log("poemDataArrayString");
                  console.log(poemDataArrayString);

                  poemDataArrayString += ",";

                  console.log("poemDataArrayString after comma");
                  console.log(poemDataArrayString);

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
        console.log("result");
        console.log(result);

        for (var i = 0; i < response.sher.length; i++) {
          try {
            if (result.includes(response.sher[i].id))
              response.sher[i].star = true;
            else response.sher[i].star = false;
          } catch (e) {
            console.log("catch caught an error");
          }
        }

        let newArrPopular = [response.sher];
        console.log("Value of newArrPopular");
        console.log(newArrPopular);
        console.log("I am at this point");

        response.sher.map(el => {
          el.sherContent[0].text = el.sherContent[0].text.split("|");
          console.log(el.sherContent[0].text);
          try {
            el.sherContent[1].text = el.sherContent[1].text.split("|");
            console.log(el.sherContent[1].text);
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
    console.log("Inside onDidFocusCustomFunction");

    AsyncStorage.getItem(FONT).then(res => {
      if (res !== null) {
        console.log("res is not equal to null: ");
        console.log(res);
        this.setState({ font: res });
      } else {
        this.setState({ font: "Normal" });
      }
    });

    AsyncStorage.getItem(TEXT).then(res => {
      if (res !== null) {
        console.log("res is not null: ");
        console.log(res);
        this.setState({ text: res });
      } else {
        this.setState({ text: "Urdu" });
      }
    });
  };

  starToggling = sher => {
    var that = this;

    this.readBookmarksShers().then(function (result) {
      console.log("result");
      console.log(result);

      if (result.includes(sher.id)) {
        var index = result.indexOf(sher.id);
        if (index > -1) {
          result.splice(index, 7);
        }

        console.log("result");
        console.log(result);

        var newData = result.join("@");

        console.log("newData");
        console.log(newData);

        var path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(success => {
            console.log("FILE WRITTEN!");
          })
          .catch(err => {
            console.log(err.message);
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
          .then(success => {
            console.log("FILE WRITTEN!");
          })
          .catch(err => {
            console.log(err.message);
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

      console.log("passed setState going to getSherPopularListFromServer");
      this.getSherPopularListFromServer();

      console.log("In poempage.js inside componentdidmount");
    } catch (e) {
      console.log("Inside catch componentDidMount");
    }
  }

  renderItem = ({ item }) => {
    var that = this;
    var fontFamilyTextVariable;
    console.log("this.state.font");
    console.log(this.state.font);
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
                <Text style={fontFamilyTextVariable}>
                  {item.sherContent[1].text[0]}
                </Text>
              </View>
              <View>
                <Text style={fontFamilyTextVariable}>
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
  }
});

export default CommentsPage;
