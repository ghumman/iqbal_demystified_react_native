import React from "react";
import {
  Platform,
  Share,
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
  Text,
  KeyboardAvoidingView
} from "react-native";
import StaticContentService from "../Misc/StaticContentServiceYaml";

import Moment from "moment";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

import iconShare from "../../assets/android_app_assets/share.png";
import iconUploadComment from "../../assets/android_app_assets/upload_comment.png";
import iconUpVote from "../../assets/android_app_assets/vote_up_unselected.png";
import iconDownVote from "../../assets/android_app_assets/vote_down_unselected.png";

var RNFS = require("react-native-fs");
var YAML = require("yaml");

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
      height: "40"
    };
    this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
    this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

    this.handleSubmitSher = this.handleSubmitSher.bind(this);
    this.handleSubmitWord = this.handleSubmitWord.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
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
    console.log("username: ");
    console.log(this.state.username);
    console.log("password: ");
    console.log(this.state.password);
    this.send_sher_message();
    event.preventDefault();
  }

  handleSubmitWord(event) {
    this.send_word_message();
    event.preventDefault();
  }

  async send_sher_message() {
    console.log("Inside send_sher_message");
    console.log("username: ");
    console.log(this.state.username);
    console.log("password: ");
    console.log(this.state.password);

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
          }).then(async function (data) {
            console.log("data");
            console.log(data);
            console.log("Inside then async func");
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
          }).then(function (data) {
            console.log("data");
            console.log(data);
            this.getSherWordDiscussion(this.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert("inside catch err");
          Alert.alert(err);
        }

        console.log("messageSher sent to send sher message function");
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
      console.log("sherName: ");
      console.log(sherName);
      var localData = { sher: sherName, discussion_type: "general" };
      fetch("https://icanmakemyownapp.com/iqbal/v3/get-discussion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "sher=" + sherName + "&discussion_type=general"
      }).then(async function (data) {
        data.json().then(async function (data) {
          console.log("data: ");
          console.log(data);

          var sherArray = sherName.split("_");

          var path = "";
          var yamlFile = "";
          if (Platform.OS == "ios") {
            path =
              RNFS.MainBundlePath +
              "/assets/poems/" +
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

          console.log("After calling yamlFiles");
          console.log("Value of yamlFile");
          console.log(yamlFile);

          var sherIndex = sherArray[2] - 1;
          var yamlObject = YAML.parse(yamlFile);

          console.log("this is the sher text");
          console.log(yamlObject.sher[sherIndex].sherContent[0].text);

          var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

          var sherTextLocal = sherTextTemp.split("|");
          that.setState({ sherText: sherTextLocal });

          console.log("that.state.sherText");
          console.log(that.state.sherText);

          var wordTextLocal = that.state.sherText[0]
            .split(" ")
            .concat(that.state.sherText[1].split(" "));
          var ii;
          console.log("Original array: ");
          for (ii = 0; ii < wordTextLocal.length; ii++)
            console.log(wordTextLocal[ii]);
          for (ii = 0; ii < wordTextLocal.length; ii++) {
            if (
              wordTextLocal[ii] == "" ||
              wordTextLocal[ii] == " " ||
              wordTextLocal[ii] == "،"
            ) {
              wordTextLocal.splice(ii, 1);
              ii--;
              console.log("inside if Value of wordTextLocal[ii]");
              console.log(ii);
              console.log(wordTextLocal[ii]);
            } else {
              console.log(
                "inside else before replace Value of wordTextLocal[ii]"
              );
              console.log(ii);
              console.log(wordTextLocal[ii]);

              wordTextLocal[ii] = wordTextLocal[ii].replace(
                /[|&!;$%@"<>()+,]/g,
                ""
              );
              console.log("inside else Value of wordTextLocal[ii]");
              console.log(ii);
              console.log(wordTextLocal[ii]);
            } // else ends
          } // for wordTextLocal.... ends
          console.log("wordTextLocal.length");
          console.log(wordTextLocal.length);
          for (ii = 0; ii < wordTextLocal.length; ii++)
            console.log(wordTextLocal[ii]);

          if (wordTextLocal[6] == "") console.log("Empty string");
          else if (wordTextLocal[6] == " ") console.log("Space string");
          else {
            console.log("Neither empty nor space: ");
            console.log(wordTextLocal[6]);
          }

          // make wordTextLocal equal to this.state.wordText
          that.setState({ wordText: wordTextLocal });

          var poemTextLocal = yamlObject.heading[0].text;
          var sherGeneralDiscussionServerResponseLocal = data;

          console.log("poemTextLocal: ");
          console.log(poemTextLocal);

          console.log("sherGeneralDiscussionServerResponseLocal");
          console.log(sherGeneralDiscussionServerResponseLocal);

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
    ).then(function (response) {
      var sherDiscussionDetailLocal = sherGeneralDiscussionServerResponse;

      console.log("Value of sherDiscussionDetailLocal:");
      console.log(sherDiscussionDetailLocal);
      console.log("Value of sherDiscussionDetailLocal.length:");
      console.log(sherDiscussionDetailLocal.length);

      for (var i = 0; i < sherDiscussionDetailLocal.length; i++) {
        console.log("Value of sherDiscussionDetailLocal[i].data:");
        console.log(sherDiscussionDetailLocal[i].text);
        console.log(decodeURI(sherDiscussionDetailLocal[i].text));

        sherDiscussionDetailLocal[i].text = decodeURI(
          sherDiscussionDetailLocal[i].text
        );

        console.log("Value of sherDiscussionDetailLocal[i].data:");
        console.log(sherDiscussionDetailLocal[i].text);
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
        console.log("sherWordDiscussionServerResponse");
        console.log(sherWordDiscussionServerResponse);

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
    console.log("wordDiscussionDetailLocal");
    console.log(wordDiscussionDetailLocal);

    for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {
      wordDiscussionDetailLocal[i].text = decodeURI(
        wordDiscussionDetailLocal[i].text
      );
    }
    this.setState({ wordDiscussionDetail: wordDiscussionDetailLocal });
  }

  componentDidMount() {
    try {
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
      this.setState({ sherId: this.props.navigation.getParam("detailSher") });

      let sherName = this.props.navigation.getParam("detailSher");
      console.log("In poempage.js inside componentdidmount");
      console.log("sherName: ");
      console.log(sherName);
      this.getSherGeneralDiscussion(sherName);
    } catch (e) {
      // try ends
      console.log("Inside catch");
    } // catch ends
  } // componentDidMount ends

  signMeIn = () => {
    if (this.state.username == "") {
      this.props.history.push({
        pathname: "/RegisterPage",
        state: {
          profileSigninConfirmation: this.state.signinConfirmation,
          profileUsername: this.state.username,
          profilePassword: this.state.password
        }
      });
    }
  };

  ///////////////////////////////////////////////////////////
  //	Vote Like Word
  ///////////////////////////////////////////////////////////

  vote_like_word(comment_general_id) {
    console.log("Value of comment_general_id");
    console.log(comment_general_id);

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: {
            sher: this.state.sherId,
            discussion_type: "word-meanings",
            comment_id: comment_general_id,
            username: this.state.username,
            password: this.state.password,
            is_like: 1,
            is_cancel: 0
          }
        }).then(function (data) {
          console.log("data");
          console.log(data);
          if (data == "vote registered")
            this.getSherWordDiscussion(this.state.sherId);
          else if (data == "vote already registered") {
            Alert.alert(
              "Vote is already registerd. Unregister vote first and then you can revote"
            );
          }
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

    console.log("messageSher sent to send sher message function");
  }

  ///////////////////////////////////////////////////////////
  //	Vote Dislike Word
  ///////////////////////////////////////////////////////////

  vote_dislike_word(comment_general_id) {
    console.log("Value of comment_general_id");
    console.log(comment_general_id);

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: {
            sher: this.state.sherId,
            discussion_type: "word-meanings",
            comment_id: comment_general_id,
            username: this.state.username,
            password: this.state.password,
            is_like: 0,
            is_cancel: 0
          }
        }).then(function (data) {
          console.log("data");
          console.log(data);
          if (data == "vote registered")
            this.getSherWordDiscussion(this.state.sherId);
          else if (data == "vote already registered") {
            Alert.alert(
              "Vote is already registerd. Unregister vote first and then you can revote"
            );
          }
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

    console.log("messageSher sent to send sher message function");
  }

  ///////////////////////////////////////////////////////////
  //	Vote Unregister Word
  ///////////////////////////////////////////////////////////

  vote_unregister_word(comment_general_id) {
    console.log("Value of comment_general_id");
    console.log(comment_general_id);

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: {
            sher: this.state.sherId,
            discussion_type: "word-meanings",
            comment_id: comment_general_id,
            username: this.state.username,
            password: this.state.password,
            is_like: 0,
            is_cancel: 1
          }
        }).then(function (data) {
          console.log("data");
          console.log(data);
          if (data == "vote removed") {
            this.getSherWordDiscussion(this.state.sherId);
            Alert.alert("Your vote is removed");
          } else if (data == "invalid is_cancel value") {
            Alert.alert("You have not liked or disliked it yet.");
          }
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

    console.log("messageSher sent to send sher message function");
  }

  ///////////////////////////////////////////////////////////
  //	Vote Like General
  ///////////////////////////////////////////////////////////
  vote_like_arrow(comment_general_id) {
    console.log("Inside vote_like");

    console.log("Value of comment_general_id");
    console.log(comment_general_id);

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
            // success: (data) => {	// success funciton starts
            console.log("data");
            console.log(data);
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
                    console.log("data");
                    console.log(data);
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

    console.log("messageSher sent to send sher message function");
  }

  vote_like(comment_general_id) {
    console.log("Inside vote_like");

    console.log("Value of comment_general_id");
    console.log(comment_general_id);

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
            console.log("data");
            console.log(data);
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

    console.log("messageSher sent to send sher message function");
  }

  ///////////////////////////////////////////////////////////
  //	Vote Dislike General
  ///////////////////////////////////////////////////////////

  vote_dislike_arrow(comment_general_id) {
    console.log("Inside vote_dislike");

    console.log("Value of comment_general_id");
    console.log(comment_general_id);

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
            console.log("data");
            console.log(data);
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
                    console.log("data");
                    console.log(data);
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

    console.log("messageSher sent to send sher message function");
  }

  vote_dislike(comment_general_id) {
    console.log("Inside vote_dislike");

    console.log("Value of comment_general_id");
    console.log(comment_general_id);

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
            console.log("data");
            console.log(data);
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

    console.log("messageSher sent to send sher message function");
  }

  ///////////////////////////////////////////////////////////
  //	Vote Unregister General
  ///////////////////////////////////////////////////////////

  vote_unregister(comment_general_id) {
    console.log("Inside vote_unregister");

    console.log("Value of comment_general_id");
    console.log(comment_general_id);

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
            console.log("data");
            console.log(data);
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

    console.log("messageSher sent to send sher message function");
  }

  selectedWord(wordText, wordId) {
    this.setState({ mySelectedWord: wordText });
    this.setState({ mySelectedId: wordId });
    console.log("Value of mySelectedWord");
    console.log(this.state.mySelectedWord);
    console.log("Value of mySelectedId");
    console.log(this.state.mySelectedId);
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
    var completeSher = this.state.sherText.map((item, index) => (
      <Text key={item.index} style={styles.RenderedText}>
        {" "}
        {item}
      </Text>
    ));

    var item5 = this.state.wordText.map((item, index) => (
      <span key={item.index}>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.selectedWord(item, index)}
        >
          {" "}
          {item}{" "}
        </button>{" "}
      </span>
    ));

    var sherComments = this.state.sherDiscussionDetail.map((item, index) => (
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
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
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
          style={[styles.RenderedItem6View, styles.flexPoint8]}
        >
          <View style={styles.NavBar}>
            <Text>{item.username}</Text>
            <Text>{Moment(item.timestamp).format("MMM DD, YYYY")}</Text>
          </View>
          <View>
            <Text style={styles.CommentsText}>{item.text}</Text>
          </View>
        </View>
      </View>
    ));

    var item7 = this.state.wordDiscussionDetail.map((item, index) => {
      if (item.wordposition - 1 == this.state.mySelectedId)
        return (
          <div key={item.id}>
            {" "}
            <div class="float-left">
              <p> {item.username}</p>
            </div>{" "}
            <div class="float-right">
              <p> {item.timestamp}</p>{" "}
            </div>
            <br />{" "}
            <p>
              {item.text}
              <br />
              <br />{" "}
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.vote_like_word(item.id)}
              >
                {" "}
                LIKE{" "}
              </button>
              <span class="px-2"> SCORE: {item.score}</span>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.vote_dislike_word(item.id)}
              >
                DISLIKE
              </button>
              <p></p>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.vote_unregister_word(item.id)}
              >
                UNREGISTER
              </button>
            </p>
          </div>
        );
    });

    let signinTag;
    var signinMessageLocal = "";
    if (this.state.signinConfirmation === "done") {
      signinMessageLocal = this.state.username.charAt(0).toUpperCase();
      signinTag = (
        <button type="button" class="btn btn-success btn-circle btn-lg">
          {" "}
          {signinMessageLocal}{" "}
        </button>
      );
    } else {
      signinMessageLocal = "Sign In";
      signinTag = (
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.signMeIn()}
        >
          {" "}
          {signinMessageLocal}{" "}
        </button>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={styles.MainScrollView}>
          <ScrollView>
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
          <View style={{ flex: 5}}>


            <TextInput
              keyboardType="email-address"
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              multiline={true}
              style={[{ height: 40, borderWidth: 3, borderColor: "gray" },
              { height: Math.max(40, this.state.height) }]}
              placeholder="Comments..."
              onChangeText={text => this.setState({ userMessageSher: text })}
              selectTextOnFocus
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
    fontSize: 18
  },

  flexPoint8: {
    flex: 0.8
  },
  RenderedItem6View: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 20
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

  UrduTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000",
    padding: 5,
    margin: 5
  },

  EnglishTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  },

  MainScrollView: {
    flex: 5,
    borderWidth: 1
  }
});

export default SherPage;
