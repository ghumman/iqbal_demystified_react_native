import React from "react";
import {
  Image,
  Platform,
  Share,
  ScrollView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  View,
  Text
} from "react-native";
import StaticContentService from "../Misc/StaticContentServiceYaml";

import Moment from "moment";

import AsyncStorage from "@react-native-community/async-storage";

import iconShare from "../../assets/android_app_assets/share2.png";
import iconUploadComment from "../../assets/android_app_assets/upload_comment2.png";
import iconUpVote from "../../assets/android_app_assets/vote_up_unselected2.png";
import iconDownVote from "../../assets/android_app_assets/vote_down_unselected2.png";
const sharedConstants = require("../../shared/Constants");

var RNFS = require("react-native-fs");
var YAML = require("yaml");

// initializing
const USERNAME = "username";
const PASSWORD = "password";

class SherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      listId: "List_001",
      sherId: "",
      sherText: [],
      meaningsAvailable: new Set(),
      wordText: [],
      poemText: [],
      sherObjects: [],
      sherGeneralDiscussionServerResponse: [],
      sherDiscussionDetail: [],
      wordDiscussionDetail: [],
      mySelectedWord: "",
      mySelectedId: "1",

      userMessageSher: "",
      userMessageWord: "",

      key: "home",
      height: "40"
    };
    this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
    this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

    this.handleSubmitSher = this.handleSubmitSher.bind(this);
    this.handleSubmitWord = this.handleSubmitWord.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Word Meanings",
    headerTitle: navigation.state.params.title || "",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  handleUserMessageSher(event) {
    this.setState({ userMessageSher: event.target.value });
  }

  handleUserMessageWord(event) {
    this.setState({ userMessageWord: event.target.value });
  }

  handleSubmitSher(event) {
    this.send_sher_message();
    event.preventDefault();
  }

  handleSubmitWord(event) {
    this.send_word_message();
    event.preventDefault();
  }

  async send_sher_message() {

    var that = this;

    // do not try pushing comment if message is empty
    if (this.state.userMessageSher.trim() != "") {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != "" &&
        this.state.password.trim() != ""
      ) {
        try {
          fetch(sharedConstants.BACKEND_URL + "post-comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
              "sher=" +
              that.state.sherId +
              "&discussion_type=general&username=" +
              that.state.username +
              "&password=" +
              that.state.password +
              "&comment_text=" +
              that.state.userMessageSher
          }).then(async function () {
            that.getSherGeneralDiscussion(that.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert("inside catch err");
          Alert.alert(err);
        }
      } // if not logged in empty
      else {
        Alert.alert("Please login first to add comments.");
      }
    } // if message is empty ends
    else {
      Alert.alert("Comments can not be empty");
    }
  }

  async send_word_message() {

    var that = this;
    if (this.state.userMessageWord.trim() != "") {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != "" &&
        this.state.password.trim() != ""
      ) {
        try {
          fetch(sharedConstants.BACKEND_URL + "post-comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
              "sher=" +
              that.state.sherId +
              "&discussion_type=word-meanings&username=" +
              that.state.username +
              "&password=" +
              that.state.password +
              "&comment_text=" +
              that.state.userMessageWord +
              "&word_position=" +
              that.state.mySelectedId
          }).then(async function () {

            that.getSherWordDiscussion(that.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert("inside catch err");
          Alert.alert(err);
        }

      } // if not logged in empty
      else {
        Alert.alert("Please login first to add comments.");
      }
    } // if message is empty ends
    else {
      Alert.alert("Comments can not be empty");
    }
  }

  onSubmit = sherNumber => {
    this.props.history.push({
      pathname: "/SherPage",
      state: {
        detailSher: sherNumber,
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password
      }
    });
  };

  async getSherGeneralDiscussion(sherName) {
    var that = this;
    try {

      fetch(sharedConstants.BACKEND_URL + "get-discussion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "sher=" + sherName + "&discussion_type=general"
      }).then(async function (data) {
        data.json().then(async function (data) {

          var sherArray = sherName.split("_");

          var path = "";
          var yamlFile = "";
          if (Platform.OS == "ios") {
            path =
              RNFS.MainBundlePath +
              "/src/assets/poems/" +
              sherArray[0] +
              "/" +
              sherArray[0] +
              "_" +
              sherArray[1] +
              ".yaml";
            yamlFile = await RNFS.readFile(path, "utf8");
          } else if (Platform.OS == "android") {
            path =
              "poems/" +
              sherArray[0] +
              "/" +
              sherArray[0] +
              "_" +
              sherArray[1] +
              ".yaml";
            yamlFile = await RNFS.readFileAssets(path, "utf8");
          }


          var sherIndex = sherArray[2] - 1;
          var yamlObject = YAML.parse(yamlFile);


          var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

          var sherTextLocal = sherTextTemp.split("|");
          that.setState({ sherText: sherTextLocal });


          var wordTextLocal = that.state.sherText[0]
            .split(" ")
            .concat(that.state.sherText[1].split(" "));
          var ii;

          for (ii = 0; ii < wordTextLocal.length; ii++) {
            if (
              wordTextLocal[ii] == "" ||
              wordTextLocal[ii] == " " ||
              wordTextLocal[ii] == "،"
            ) {
              wordTextLocal.splice(ii, 1);
              ii--;
            } else {

              wordTextLocal[ii] = wordTextLocal[ii].replace(
                /[|&!;$%@"<>()+,]/g,
                ""
              );
            } // else ends
          } // for wordTextLocal.... ends

          that.setState({ wordText: wordTextLocal });

          var poemTextLocal = yamlObject.heading[0].text;
          var sherGeneralDiscussionServerResponseLocal = data;

          that.setState({ poemText: poemTextLocal });
          that.setState({
            sherGeneralDiscussionServerResponse: sherGeneralDiscussionServerResponseLocal
          });

          that.props.navigation.setParams({ title: that.state.poemText });

          that.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);
        }); // data.json().then ends
      }); // success function ends
    } catch (err) {
      Alert.alert("inside catch err");
      Alert.alert(err);
      that.message = err;
    }
  } // async getSherGeneralDiscussion ends

  getSherDiscussion(sherGeneralDiscussionServerResponse) {
    var that = this;
    StaticContentService.getSherDiscussion(
      sherGeneralDiscussionServerResponse
    ).then(function () {
      var sherDiscussionDetailLocal = sherGeneralDiscussionServerResponse;

      for (var i = 0; i < sherDiscussionDetailLocal.length; i++) {

        sherDiscussionDetailLocal[i].text = decodeURI(
          sherDiscussionDetailLocal[i].text
        );
      }
      that.setState({ sherDiscussionDetail: sherDiscussionDetailLocal });
    }); // .then(func res) ends
  }

  async getSherWordDiscussion(sherName) {
    var that = this;
    try {
      fetch(sharedConstants.BACKEND_URL + "get-discussion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "sher=" + sherName + "&discussion_type=word-meanings"
      }).then(async function (data) {
        data.json().then(async function (data) {

          var sherWordDiscussionServerResponse = data;

          that.getWordDiscussion(sherWordDiscussionServerResponse);
        }); // data.json().then ends
      }); // success function ends
    } catch (err) {
      // try ends
      Alert.alert("inside catch err");
      Alert.alert(err);
    } // catch ends
  }

  getWordDiscussion(sherWordDiscussionServerResponse) {
    var wordDiscussionDetailLocal = sherWordDiscussionServerResponse;

    var meaningsAvailableLocal = new Set();

    for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {
      wordDiscussionDetailLocal[i].text = decodeURI(
        wordDiscussionDetailLocal[i].text
      );
      meaningsAvailableLocal.add(wordDiscussionDetailLocal[i].wordposition);
    }
    this.setState({ wordDiscussionDetail: wordDiscussionDetailLocal });

    this.setState({ meaningsAvailable: meaningsAvailableLocal });

  }

  componentDidMount() {
    try {

      AsyncStorage.getItem(USERNAME).then(res => {
        this.setState({ username: res });
      });
  
      AsyncStorage.getItem(PASSWORD).then(res => {
        this.setState({ password: res });
      });

      this.setState({ sherId: this.props.navigation.getParam("detailSher") });

      let sherName = this.props.navigation.getParam("detailSher");

      this.getSherGeneralDiscussion(sherName);
      this.getSherWordDiscussion(sherName);
    } // try ends
    catch (e) {
    } // catch ends
  } // componentDidMount ends

  ///////////////////////////////////////////////////////////
  //	Vote Like Word
  ///////////////////////////////////////////////////////////

  vote_like_word_arrow(comment_general_id) {

    var that = this;
    if (this.state.username != "") {
      try {
        fetch(sharedConstants.BACKEND_URL + "vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=1&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered") {
              Alert.alert("Vote registered.");
              that.getSherWordDiscussion(that.state.sherId);
            } else if (data == "vote already registered") {
              try {
                fetch(sharedConstants.BACKEND_URL + "vote.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:
                    "sher=" +
                    that.state.sherId +
                    "&discussion_type=word-meanings&comment_id=" +
                    comment_general_id +
                    "&username=" +
                    that.state.username +
                    "&password=" +
                    that.state.password +
                    "&is_like=0&is_cancel=1"
                }).then(async function (data) {
                  data.text().then(async function (data) {
                    if (data == "vote removed") {
                      Alert.alert("Vote removed.");
                      that.getSherWordDiscussion(that.state.sherId);
                    } else if (data == "invalid is_cancel value") {
                      Alert.alert("You have not liked or disliked it yet.");
                    }
                  }); // data.text.then.func ends
                }); // success function ends
              } catch (err) {
                Alert.alert("inside catch err");
                Alert.alert(err);
              }
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }
  }

  ///////////////////////////////////////////////////////////
  //	Vote Dislike Word
  ///////////////////////////////////////////////////////////

  vote_dislike_word_arrow(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch(sharedConstants.BACKEND_URL + "vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=0"
        }).then(function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered") {
              Alert.alert("Vote registered.");
              that.getSherWordDiscussion(that.state.sherId);
            } else if (data == "vote already registered") {
              try {
                fetch(sharedConstants.BACKEND_URL + "vote.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:
                    "sher=" +
                    that.state.sherId +
                    "&discussion_type=word-meanings&comment_id=" +
                    comment_general_id +
                    "&username=" +
                    that.state.username +
                    "&password=" +
                    that.state.password +
                    "&is_like=0&is_cancel=1"
                }).then(async function (data) {
                  data.text().then(async function (data) {
                    if (data == "vote removed") {
                      Alert.alert("Vote removed.");
                      that.getSherWordDiscussion(that.state.sherId);
                    } else if (data == "invalid is_cancel value") {
                      Alert.alert("You have not liked or disliked it yet.");
                    }
                  }); // data.text.then.func ends
                }); // success function ends
              } catch (err) {
                Alert.alert("inside catch err");
                Alert.alert(err);
              }
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
        this.message = err;
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  selectedWord(wordText, wordId) {
    this.setState({ mySelectedWord: wordText });
    this.setState({ mySelectedId: wordId + 1 });
  }

  onShare = async () => {
    var that = this;
    try {
      const result = await Share.share({
        title: "Iqbal Demystified",
        message:
          that.state.sherText[0] +
          "\n" +
          that.state.sherText[1] +
          "\n" +
          "(Iqbal Demystified by International Iqbal Society)"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    Moment.locale("en");


    const viewStylesNotSelected = {
      borderRadius: 10
    };
    const viewStylesWithMeanings = {
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10
    };
    const viewStylesSelected = {
      borderColor: "red",
      borderWidth: 4,
      borderRadius: 10
    };

    const textStylesNotSelected = {
      color: "gray",
      fontWeight: "normal"
    };
    const textStylesSelected = {
      color: "green",
      fontWeight: "bold"
    };

    var that = this;
    var singleWords = this.state.wordText.map(function (item, index) {
      if (parseInt(that.state.mySelectedId) == index + 1)
        return (
          <View style={[styles.button, viewStylesSelected]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonsingleWordsText, textStylesSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      else if (that.state.meaningsAvailable.has((index + 1).toString())) {
        return (
          <View style={[styles.button, viewStylesWithMeanings]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonText, textStylesNotSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      } else {
        return (
          <View style={[styles.button, viewStylesNotSelected]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonText, textStylesNotSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      }
    });


    var singleWordsComments = this.state.wordDiscussionDetail.map((item) => {
      if (item.wordposition == this.state.mySelectedId)
        return (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.1, flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableHighlight
                  onPress={() => this.vote_like_word_arrow(item.id)}
                >
                  <Image
                    resizeMode="stretch"
                    style={{ height: 30, width: 30 }}
                    source={iconUpVote}
                  />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 0.2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  {item.score}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableHighlight
                  onPress={() => this.vote_dislike_word_arrow(item.id)}
                >
                  <Image
                    resizeMode="stretch"
                    style={{ height: 30, width: 30 }}
                    source={iconDownVote}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View
              key={item.id}
              style={[styles.RenderedItem8View, styles.flexPoint8]}
            >
              <View style={styles.NavBar}>
                <Text style={{color: "brown"}}>{item.username}</Text>
                <Text style={{color: "brown"}}>{Moment(item.timestamp).format("MMM DD, YYYY")}</Text>
              </View>
              <View>
                <Text style={styles.CommentsText}>{item.text}{"\n"}{"\n"}{"\n"}</Text>
              </View>
            </View>
          </View>
        );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.FirstSection}>
          <ScrollView>
            <View style={styles.container}>{singleWords}</View>
          </ScrollView>
        </View>
        <View style={styles.SecondSection}>
          <ScrollView>
            <View>{singleWordsComments}</View>
          </ScrollView>
        </View>



        <View style={{
          flex: 0,
          flexGrow: 0.1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderWidth: 3,
          borderColor: "black",
        }}>
          <View style={{ flex: 5 }}>


            <TextInput
              keyboardType="default"
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              multiline={true}
              style={[{ height: 40, borderWidth: 3, borderColor: "gray" },
              { height: Math.max(40, this.state.height) }]}
              placeholder="Comments..."
              onChangeText={text => this.setState({ userMessageWord: text })}
              autoGrow
            />

          </View>


          <View style={{ flex: 0.8 }}>

            <TouchableHighlight onPress={this.handleSubmitWord}>
              <Image resizeMode="contain" source={iconUploadComment} />
            </TouchableHighlight>
          </View>
          <View style={{ flex: 0.8 }}>
            <TouchableHighlight onPress={() => this.onShare()}>
              <Image resizeMode="contain" source={iconShare} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    ); // return ends
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  button: {
    padding: 5,
    borderRadius: 10,
    padding: 10
  },

  buttonText: {
    textAlign: "right",
    textAlignVertical: "center",
    fontSize: 18
  },
  FirstSection: {
    flex: 0,
    flexGrow: 0.1,
    borderWidth: 1
  },
  SecondSection: {
    flex: 4,
    borderWidth: 1
  },
  buttonSelected: {
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    width: "25%",
    height: 40
  },
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },

  RenderedText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18
  },
  CommentsText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    color: "black"
  },

  flexPoint8: {
    flex: 0.8
  },
  RenderedItem8View: {
    backgroundColor: "white",
    margin: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 2
  },
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  MainScrollView: {
    flex: 3,
    borderWidth: 1
  },
  WordButtons: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15
  }
});

export default SherPage;
