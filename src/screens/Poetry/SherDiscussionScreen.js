import React from "react";
import {
  Platform,
  Share,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  View,
  Text} from "react-native";
import StaticContentService from "../Misc/StaticContentServiceYaml";

import Moment from "moment";

import AsyncStorage from "@react-native-community/async-storage";

import iconShare from "../../assets/android_app_assets/share2.png";
import iconUploadComment from "../../assets/android_app_assets/upload_comment2.png";
import iconUpVote from "../../assets/android_app_assets/vote_up_unselected2.png";
import iconDownVote from "../../assets/android_app_assets/vote_down_unselected2.png";

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
      poemId: "",
      comingFromPoem: true,
      sherText: [],
      wordText: [],
      poemText: [],
      sherObjects: [],
      sherGeneralDiscussionServerResponse: [],
      sherDiscussionDetail: [],
      wordDiscussionDetail: [],
      mySelectedWord: "",
      mySelectedId: "-99",

      userMessageSher: "",
      userMessageWord: "",

      key: "home",
      height: "40", 

      testWidth: '99%' // for copy paste textinput issue
    };
    this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
    this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

    this.handleSubmitSher = this.handleSubmitSher.bind(this);
    this.handleSubmitWord = this.handleSubmitWord.bind(this);
  }

  static navigationOptions = ({ }) => {
    return {
      title: "Discussion"
    };
  };

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
          fetch("https://icanmakemyownapp.com/iqbal/v3/post-comment.php", {
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
    // do not try pushing comment if message is empty
    if (this.state.userMessageWord.trim() != "") {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != "" &&
        this.state.password.trim() != ""
      ) {
        try {
          fetch("https://icanmakemyownapp.com/iqbal/v3/post-comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: {
              sher: this.state.sherId,
              discussion_type: "word-meanings",
              username: this.state.username,
              password: this.state.password,
              comment_text: this.state.userMessageWord,
              word_position: this.state.mySelectedId + 1
            }
          }).then(function () {
            this.getSherWordDiscussion(this.state.sherId);
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
      fetch("https://icanmakemyownapp.com/iqbal/v3/get-discussion.php", {
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
          
          // make wordTextLocal equal to this.state.wordText
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
    try {
      fetch("https://icanmakemyownapp.com/iqbal/v3/get-discussion.php", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: { sher: sherName, discussion_type: "word-meanings" }
      }).then(function (data) {
        var sherWordDiscussionServerResponse = data;

        this.getWordDiscussion(sherWordDiscussionServerResponse);
      }); // success function ends
    } catch (err) {
      // try ends
      Alert.alert("inside catch err");
      Alert.alert(err);
    } // catch ends
  }

  getWordDiscussion(sherWordDiscussionServerResponse) {
    var wordDiscussionDetailLocal = JSON.parse(
      sherWordDiscussionServerResponse
    );

    for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {
      wordDiscussionDetailLocal[i].text = decodeURI(
        wordDiscussionDetailLocal[i].text
      );
    }
    this.setState({ wordDiscussionDetail: wordDiscussionDetailLocal });
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({testWidth: '100%'})
    }, 100);

    AsyncStorage.getItem(USERNAME).then(res => {
      this.setState({ username: res });
    });

    AsyncStorage.getItem(PASSWORD).then(res => {
      this.setState({ password: res });
    });


    try {
      this.setState({ sherId: this.props.navigation.getParam("detailSher") });

      // if not coming from Poem set comingFromPoem to false.
      // Also set poemId
      const headerTitle = this.props.navigation.getParam("poemTitle");
      if (headerTitle == null) { // meaning not coming directly from Poem
        this.setState({ comingFromPoem: false });

        try {
          
          let sherInstanceId =  this.props.navigation.getParam("detailSher");
          var sherInstanceSplitedId = sherInstanceId.split('_');
          var poemInstanceId = sherInstanceSplitedId[0] +  '_' +  sherInstanceSplitedId[1];
          this.setState({ poemId: poemInstanceId});
        }
        catch(e) {
        }

      }

      let sherName = this.props.navigation.getParam("detailSher");
      this.getSherGeneralDiscussion(sherName);
    } catch (e) {
      // try ends
    } // catch ends
  } // componentDidMount ends

  ///////////////////////////////////////////////////////////
  //	Vote Like General
  ///////////////////////////////////////////////////////////
  vote_like_arrow(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        localTestString =
          "sher=002_001_001&discussion_type=general&comment_id=319&username=agent3&password=agent&is_like=1&is_cancel=0";
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
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
              that.getSherGeneralDiscussion(that.state.sherId);
            } else if (data == "vote already registered") {
              try {
                fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:
                    "sher=" +
                    that.state.sherId +
                    "&discussion_type=general&comment_id=" +
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
                      that.getSherGeneralDiscussion(that.state.sherId);
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

  vote_like(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        localTestString =
          "sher=002_001_001&discussion_type=general&comment_id=319&username=agent3&password=agent&is_like=1&is_cancel=0";
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=1&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {

            if (data == "vote registered")
              that.getSherGeneralDiscussion(that.state.sherId);
            else if (data == "vote already registered") {
              Alert.alert(
                "Vote is already registerd. Unregister vote first and then you can revote"
              );
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
  //	Vote Dislike General
  ///////////////////////////////////////////////////////////

  vote_dislike_arrow(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {

            if (data == "vote registered") {
              Alert.alert("Vote registered.");

              that.getSherGeneralDiscussion(that.state.sherId);
            } else if (data == "vote already registered") {
              try {
                fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:
                    "sher=" +
                    that.state.sherId +
                    "&discussion_type=general&comment_id=" +
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
                      that.getSherGeneralDiscussion(that.state.sherId);
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

  vote_dislike(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {

            if (data == "vote registered")
              that.getSherGeneralDiscussion(that.state.sherId);
            else if (data == "vote already registered") {
              Alert.alert(
                "Vote is already registerd. Unregister vote first and then you can revote"
              );
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
  //	Vote Unregister General
  ///////////////////////////////////////////////////////////

  vote_unregister(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=1"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote removed") {
              that.getSherGeneralDiscussion(that.state.sherId);
              Alert.alert("Your vote is removed");
            } else if (data == "invalid is_cancel value") {
              Alert.alert("You have not liked or disliked it yet.");
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

  selectedWord(wordText, wordId) {
    this.setState({ mySelectedWord: wordText });
    this.setState({ mySelectedId: wordId });
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
    var completeSher = this.state.sherText.map((item) => (
      <Text key={item.index} style={styles.RenderedText}>
        {" "}
        {item}
      </Text>
    ));


    var sherComments = this.state.sherDiscussionDetail.map((item) => (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 0.1, flexDirection: "column" }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableHighlight onPress={() => this.vote_like_arrow(item.id)}>
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
            <Text style={{ color: "green", fontSize: 24, fontWeight: "bold" }}>
              {item.score}
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableHighlight
              onPress={() => this.vote_dislike_arrow(item.id)}
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
    ));


    if (this.state.signinConfirmation === "done") {
    } else {
    }

    var goToPoem;
    if (!this.state.comingFromPoem) {
      goToPoem = (
      <View style={{ flex: 0.1, alignItems: "flex-end", padding: 2 }}>
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("Poem", {
            detailPoem: this.state.poemId,
            profileSigninConfirmation: this.state.signinConfirmation,
            profileUsername: this.state.username,
            profilePassword: this.state.password
          })
        }
      >
        <Text style={{ backgroundColor: "lightgreen", color: "black" }}>Go to Poem</Text>
      </TouchableHighlight>
    </View>
      )
    }


    return (
      <View style={{ flex: 1 }}>
        <View style={styles.MainScrollView}>
          
          <ScrollView>

            {goToPoem}
            <View>
              <View style={styles.RenderedView}>{completeSher}</View>
              <View sytle={styles.RenderedItem6View}>{sherComments}</View>
            </View>
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
              style={[{ height: 40, borderWidth: 3, borderColor: "gray", width: this.state.testWidth},
              { height: Math.max(40, this.state.height) }]}
              placeholder="Comments..."
              onChangeText={text => this.setState({ userMessageSher: text })}
              autoGrow
            />

          </View>


          <View style={{ flex: 0.8 }}>

            <TouchableHighlight onPress={this.handleSubmitSher}>
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
    flex: 1,
    paddingTop: 22
  },
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  },

  RenderedText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    color: "green"
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
  RenderedItem6View: {
    backgroundColor: "white",
    margin: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 4
  },
  RenderedItem8View: {
    backgroundColor: "gray",
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingBottom: 8
  },
    RenderedItem8View: {
    backgroundColor: "white",
    margin: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 4
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
    flex: 5,
    borderWidth: 1
  }
});

export default SherPage;
