import React from "react";
import {
  Picker,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  View,
  Text
} from "react-native";

import {
  Table,
  TableWrapper,
  Row,
  Col
} from "react-native-table-component";

import AsyncStorage from "@react-native-community/async-storage";
const sharedConstants = require("../../shared/Constants");

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
      poemObjects: [],

      leaderBoardText: [],
      leaderBoardTextEven: [],
      leaderBoardTextOdd: [],
      leaderBoardTextEvenDiscussion: [],
      leaderBoardTextEvenDiscussionName: [],
      leaderBoardTextOddDiscussion: [],
      leaderBoardTextOddDiscussionName: [],
      leaderBoardTextDiscussionConcat: [],
      leaderBoardTextEvenWord: [],
      leaderBoardTextEvenWordName: [],
      leaderBoardTextOddWord: [],
      leaderBoardTextOddWordName: [],
      leaderBoardTextWordConcat: [],

      dropdownState: "discussion"
    };

    this.dropChange = this.dropChange.bind(this);
  }

  static navigationOptions = {
    title: "My Profile",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  };

  dropChange(event) {
    this.setState({ dropdownState: event.target.value });
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
      this.get_leader_board();
    } catch (e) {
    }
  }

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

  myDownloads = () => {
    this.props.navigation.navigate("DownloadAudios", {
      profileUsername: this.state.username,
      profilePassword: this.state.password,
      profileSigninConfirmation: this.state.signinConfirmation
    });
  };

  changePassword = () => {
    this.props.navigation.navigate("ChangePassword", {
      profileUsername: this.state.username,
      profilePassword: this.state.password,
      profileSigninConfirmation: this.state.signinConfirmation
    });
  };

  signOut = () => {
    AsyncStorage.removeItem(USERNAME);
    AsyncStorage.removeItem(PASSWORD);
    AsyncStorage.removeItem(MESSAGE);

    this.props.navigation.navigate("Home", {
      profileUsername: "",
      profilePassword: "",
      profileSigninConfirmation: ""
    });
  };

  async get_leader_board() {
    var leaderBoardTextLocal = [];
    var leaderBoardTextEvenLocal = [];
    var leaderBoardTextOddLocal = [];
    var leaderBoardTextEvenDiscussionLocal = [];
    var leaderBoardTextOddDiscussionLocal = [];
    var leaderBoardTextEvenWordLocal = [];
    var leaderBoardTextOddWordLocal = [];

    var that = this;
    try {
      fetch(sharedConstants.BACKEND_URL + "leaderboard.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(async function (data) {
        data.text().then(async function (data) {

          leaderBoardTextLocal = data.split(",");
          leaderBoardTextLocal.splice(-1, 1);
          for (var i = 0; i < leaderBoardTextLocal.length; i++) {
            if (i % 2 === 0) {
              leaderBoardTextEvenLocal.push(leaderBoardTextLocal[i]);
            } else {
              leaderBoardTextOddLocal.push(leaderBoardTextLocal[i]);
            }
          }
          for (var i = 0; i < leaderBoardTextEvenLocal.length; i++) {
            if (i < 10) {
              leaderBoardTextEvenDiscussionLocal.push(
                leaderBoardTextEvenLocal[i]
              );
              leaderBoardTextOddDiscussionLocal.push(
                leaderBoardTextOddLocal[i]
              );
              that.state.leaderBoardTextEvenDiscussionName.push({
                name: leaderBoardTextEvenLocal[i]
              });
              that.state.leaderBoardTextOddDiscussionName.push({
                points: leaderBoardTextOddLocal[i]
              });
              that.state.leaderBoardTextDiscussionConcat.push({
                name: leaderBoardTextEvenLocal[i],
                points: leaderBoardTextOddLocal[i]
              });
            } else {
              leaderBoardTextEvenWordLocal.push(leaderBoardTextEvenLocal[i]);
              leaderBoardTextOddWordLocal.push(leaderBoardTextOddLocal[i]);

              that.state.leaderBoardTextEvenWordName.push({
                name: leaderBoardTextEvenLocal[i]
              });
              that.state.leaderBoardTextOddWordName.push({
                points: leaderBoardTextOddLocal[i]
              });
              that.state.leaderBoardTextWordConcat.push({
                name: leaderBoardTextEvenLocal[i],
                points: leaderBoardTextOddLocal[i]
              });
            }
          }

          that.setState({ leaderBoardText: leaderBoardTextLocal });
          that.setState({ leaderBoardTextEven: leaderBoardTextEvenLocal });
          that.setState({ leaderBoardTextOdd: leaderBoardTextOddLocal });
          that.setState({
            leaderBoardTextEvenDiscussion: leaderBoardTextEvenDiscussionLocal
          });
          that.setState({
            leaderBoardTextOddDiscussion: leaderBoardTextOddDiscussionLocal
          });
          that.setState({
            leaderBoardTextEvenWord: leaderBoardTextEvenWordLocal
          });
          that.setState({
            leaderBoardTextOddWord: leaderBoardTextOddWordLocal
          });
        }); // data.text().then ends
      }); // then async func ends
    } catch (err) {
      Alert.alert("inside catch err");
      Alert.alert(err);
    }
  }

  render() {
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

    var itemOddWord = this.state.leaderBoardTextOddWord.map(item => (
      <Text key={item}> {item}</Text>
    ));

    var itemEvenWord = this.state.leaderBoardTextEvenWord.map(item => (
      <Text key={item}> {item}</Text>
    ));

    var itemOddDiscussion = this.state.leaderBoardTextOddDiscussion.map(
      item => <Text key={item}> {item}</Text>
    );

    var itemEvenDiscussion = this.state.leaderBoardTextEvenDiscussion.map(
      item => <Text key={item}> {item}</Text>
    );


    const tableHeader = ["Leaderboard Name", "Points"];

    var myTable = "";

    if (this.state.dropdownState === "discussion") {
      myTable = (
        <Table>
          <Row
            data={tableHeader}
            flexArr={[1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={itemEvenDiscussion}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
            <Col
              data={itemOddDiscussion}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      );
    } else {
      myTable = (
        <Table>
          <Row
            data={tableHeader}
            flexArr={[1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={itemEvenWord}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
            <Col
              data={itemOddWord}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      );
    }
    return (
      <View style={{ flex: 1 }}>


        <View style={{ flex: 1 }}>
          <View style={styles.UsernameView}>
            <View style={styles.UsernameViewInner}>
              <Text style={styles.Username}>{this.state.username}</Text>
            </View>
          </View>

          <Text style={styles.Message}>Now you can write comments!</Text>
          <Text style={styles.Message}>
            You can also vote to others' comments!
          </Text>
          <Text style={styles.Message}>More profile features coming soon!</Text>
        </View>

        <View style={{ flex: 2 }}>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              padding: 1
            }}
          >
            <View>
              <Button color="green" onPress={() => this.myDownloads()} title="MY DOWNLOADS" />
            </View>
            <View>
              <Button
                color="green"
                onPress={() => this.changePassword()}
                title="CHANGE PASSWORD"
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 1
            }}
          >
            <Button color="green" onPress={() => this.signOut()} title="SIGN OUT" />
          </View>

          <View
            style={{
              padding: 1, 
              borderColor: "black",
              borderWidth: 1,
            }}
          >
            <Picker
              style={{height: 100}}
              itemStyle={{height: 100}}
              selectedValue={this.state.dropdownState}
              onValueChange={(itemValue) =>
                this.setState({ dropdownState: itemValue })
              }
            >
              <Picker.Item label="Discussion" value="discussion" style={{backgroundColor: "red"}}/>
              <Picker.Item label="Word Meanings" value="word" style={{backgroundColor: "red"}} />
            </Picker>
          </View>
        </View>


        <View style={{ flex: 3 }}>
          <ScrollView>{myTable}</ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: { height: 28, backgroundColor: "green"},
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "lightgreen" },
  text: { textAlign: "center", color: "white" },

  Message: {
    textAlign: "center"
  },
  UsernameView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  UsernameViewInner: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "lightgreen"
  },
  Username: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "green"
  }
});
// return <h1>I got following message : {this.props.location.state.detail}</h1>

export default ProfilePage;
