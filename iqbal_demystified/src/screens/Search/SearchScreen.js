import React from "react";
import {
  Image,
  Platform,
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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import starLiked from "../../assets/android_app_assets/star_liked.png";
import starNotLiked from "../../assets/android_app_assets/star_not_liked.png";

var RNFS = require("react-native-fs");
var YAML = require("yaml");

var radio_props = [
  { label: "Title", value: "title" },
  { label: "Text", value: "text" }
];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      searchText: "",
      selectedOption: "title",

      inputBoxClicked: false,

      pictures: [],
      listId: "List_001",
      poemList: [],
      sherList: [],
      poemListName: [],
      bookName: [],
      bookNameUrdu: "",
      bookNameEnglish: "",
      bookSections: [],
      onePoem: "",
      poemText: [],
      poemObjects: [],
      messageResults: "Results"
    };
    this.handleSearchText = this.handleSearchText.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Allama Iqbal Search Engine",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 10,
      textAlign: "center"
    }
  });

  handleAlphabet(alphabetValue) {
    console.log("alphabetValue: ");
    console.log(alphabetValue);
    if (alphabetValue != "Back")
      this.setState({ searchText: this.state.searchText + alphabetValue });
    else
      this.setState({
        searchText: this.state.searchText.substr(
          0,
          this.state.searchText.length - 1
        )
      });
  }

  handleInputClicked() {
    console.log("Input box is clicked: ");
    this.setState({ inputBoxClicked: true });
  }

  handleOptionChange(changeEvent) {
    this.setState({ selectedOption: changeEvent.target.value });
  }

  handleSearchText(event) {
    this.setState({ searchText: event.target.value });
  }

  // handleSubmit
  handleSubmit(event) {
    this.setState({ inputBoxClicked: false });

    console.log("SEARCH is pressed");
    console.log("You searched for: ");
    console.log(this.state.searchText);

    console.log("Option selected is: ");
    console.log(this.state.selectedOption);

    if (this.state.searchText.trim() != "") {
      if (this.state.selectedOption == "title") {
        console.log("going to getPoemListSearch");
        this.getPoemListSearch(this.state.searchText.trim());
      } else if (this.state.selectedOption == "text") {
        console.log("going to getPoemSearch");
        this.getPoemSearch(this.state.searchText.trim());
      }
    } else {
      Alert.alert("Search Field can not be empty");
    }
  }

  starTogglingSher = sher => {
    var that = this;

    this.readBookmarksSher().then(function (result) {
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
        that.handleSubmit();
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

        that.handleSubmit();
      }
    });
  };

  async readBookmarksSher() {
    const path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";
    try {
      const yamlFile = await RNFS.readFile(path, "utf8");
      var partsOfStr = yamlFile.split("@");
      return partsOfStr;
    } catch (e) {
      return "";
    }
  }

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

        console.log("result");
        console.log(result);

        var newData = result.join("@");

        console.log("newData");
        console.log(newData);

        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(success => {
            console.log("FILE WRITTEN!");

            that.handleSubmit();
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        console.log("poem is not in the file");
        var path = RNFS.DocumentDirectoryPath + "/bookmarked-poems.yaml";

        var sherNumberComma =
          poem.id +
          "@" +
          poem.poemName[0].text +
          "@" +
          poem.poemName[1].text +
          "@";

        // write the file
        RNFS.appendFile(path, sherNumberComma, "utf8")
          .then(success => {
            console.log("FILE WRITTEN!");

            that.handleSubmit();
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

  getPoemListSearch(listId) {
    var that = this;
    this.setState({ messageResults: "Searching..." });
    that.setState({ poemList: [] });
    StaticContentService.getPoemListSearch(listId).then(function (response) {
      console.log("Reseponse");
      console.log(response);
      that.readBookmarks().then(function (result) {
        console.log("Result");
        console.log(result);
        for (var i = 0; i < response.poems.length; i++) {
          if (result.includes(response.poems[i].id)) {
            response.poems[i].star = true;
            console.log("star added");
          } else {
            response.poems[i].star = false;
            console.log("star not added");
          }
        }

        that.setState({ poemList: response.poems });
        console.log("poemList");
        console.log(that.state.poemList);
        that.setState({ messageResults: "No Results Found" });
      });
    });
  }

  getPoemSearch(poemId) {
    var that = this;

    this.setState({ messageResults: "Searching..." });
    that.setState({ sherList: [] });

    StaticContentService.getPoemSearch(poemId).then(function (response) {
      console.log("Reseponse");
      console.log(response);
      that.readBookmarksSher().then(function (result) {
        console.log("Result");
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
            console.log(el.sherContent[1].text);
          }
          try {
            el.sherContent[2].text = el.sherContent[2].text.split("|");
          } catch (err) {
            el.sherContent.push({
              text: ["#translation missing", "#translation missing"]
            });
            console.log(el.sherContent[2].text);
          }
          return (el.sherContent = el.sherContent);
        });
        console.log("Reseponse");
        console.log(response);

        that.setState({ sherList: response.sher });
        that.setState({ messageResults: "No Results Found" });
      });
    });
  }

  onSubmitPoem = poemNumber => {
    console.log("Value of poemNumber: ");
    console.log(poemNumber);
    this.props.navigation.navigate("Poem", {
      detailPoem: poemNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password
    });
  };

  onSubmitSher = sherNumber => {
    this.props.navigation.navigate("SherTabs", {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password
    });
  };

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
    } catch (e) {
      console.log("Inside catch");
    }
  }

  render() {
    var items = this.state.bookSections.map((item, key) => (
      <Text key={item.sectionName}>{item.sectionName}</Text>
    ));
    var items2 = items.map((item, key) => (
      <Text key={item.text}>{item.text}</Text>
    ));

    var item3 = this.state.poemText.map(item => (
      <Text key={item.index} onPress={() => this.onSubmit(item.id)}>
        {" "}
        {item.text}: {item.id}
      </Text>
    ));

    var itemsPoemOrSher = [];
    var lenghtPoem = this.state.poemList.length;
    var lenghtSher = this.state.sherList.length;
    if (this.state.selectedOption === "title") {
      if (this.state.poemList.length != 0) {
        var that = this;
        var itemsPoemOrSher = this.state.poemList.map(function (item, index) {
          if (item.star) {
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
                  <Text
                    style={styles.RenderedText}
                    key={item.id}
                    onPress={() => that.onSubmitPoem(item.id)}
                  >
                    {item.poemName[0].text}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitPoem(item.id)}
                  >
                    {" "}
                    {item.poemName[1].text}{" "}
                  </Text>
                </View>
              </View>
            );
          } else {
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
                  <Text
                    style={styles.RenderedText}
                    key={item.id}
                    onPress={() => that.onSubmitPoem(item.id)}
                  >
                    {item.poemName[0].text}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitPoem(item.id)}
                  >
                    {" "}
                    {item.poemName[1].text}{" "}
                  </Text>
                </View>
              </View>
            );
          }
        });
      } else {
        var itemsPoemOrSher = (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ padding: 10, fontSize: 18 }}>
              {this.state.messageResults}
            </Text>
          </View>
        );
      }
    } else {
      if (this.state.sherList.length != 0) {
        var that = this;
        var itemsPoemOrSher = this.state.sherList.map(function (item, index) {
          if (item.star) {
            return (
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.2
                  }}
                >
                  <TouchableHighlight
                    onPress={() => that.starTogglingSher(item)}
                  >
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
                  <Text
                    style={styles.RenderedText}
                    key={item.id}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {" "}
                    {item.sherContent[0].text[0]}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {item.sherContent[0].text[1]}{" "}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {" "}
                    {item.sherContent[1].text[0]}{" "}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {item.sherContent[1].text[1]}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.2
                  }}
                >
                  <TouchableHighlight
                    onPress={() => that.starTogglingSher(item)}
                  >
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
                  <Text
                    style={styles.RenderedText}
                    key={item.id}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {" "}
                    {item.sherContent[0].text[0]}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {item.sherContent[0].text[1]}{" "}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {" "}
                    {item.sherContent[1].text[0]}{" "}
                  </Text>
                  <Text
                    style={styles.RenderedText}
                    onPress={() => that.onSubmitSher(item.id)}
                  >
                    {item.sherContent[1].text[1]}
                  </Text>
                </View>
              </View>
            );
          }
        });
      } else {
        var itemsPoemOrSher = (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ padding: 10, fontSize: 18 }}>
              {this.state.messageResults}
            </Text>
          </View>
        );
      }
    }

    var aVar = this.state.bookSections.length;
    console.log("hello world");
    console.log(this.state.bookSections);
    var stationsArr = [];
    for (var i = 0; i < this.state.bookSections.length; i++) {
      stationsArr.push(<Text>{this.data}</Text>);
    }

    let keyboardTag;
    if (this.state.inputBoxClicked === true) {
      keyboardTag = (
        <View>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("Back")} title="->" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ح")} title="ح" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("چ")} title="چ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ج")} title="ج" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ث")} title="ث" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ٹ")} title="ٹ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ت")} title="ت" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("پ")} title="پ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ب")} title="ب" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ا")} title="ا" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("آ")} title="آ" />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ص")} title="ص" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ش")} title="ش" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("س")} title="س" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ژ")} title="ژ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ز")} title="ز" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ڑ")} title="ڑ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ر")} title="ر" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ز")} title="ز" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ڈ")} title="ڈ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("د")} title="د" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("خ")} title="خ" />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("م")} title="م" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ل")} title="ل" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("گ")} title="گ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ک")} title="ک" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ق")} title="ق" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ف")} title="ف" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("غ")} title="غ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ع")} title="ع" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ظ")} title="ظ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ط")} title="ط" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ض")} title="ض" />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet(" ")} title="Space" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ے")} title="ے" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ي")} title="ي" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ء")} title="ء" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ھ")} title="ھ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ہ")} title="ہ" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("و")} title="و" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ں")} title="ں" />
            </View>
            <View style={styles.button}>
              <Button color= "black" onPress={() => this.handleAlphabet("ن")} title="ن" />
            </View>
          </View>
        </View>
      );
    } else {
      // signinMessageLocal = "Sign In"
      keyboardTag = <Text></Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        {/*
				<Text style={styles.EnglishTitle}>Allama Iqbal Search Engine</Text>*/}
        <View style={{ flex: 1 }}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonColor={"black"}
            selectedButtonColor={"black"}
            onPress={value => {
              this.setState({ selectedOption: value });
            }}
          />
        </View>

        <View style={styles.RenderedView}>
          <TextInput
            style={{ height: 40 }}
            placeholder="تلاش کریں…"
            onFocus={() => this.handleInputClicked()}
            onChangeText={text => this.setState({ searchText: text })}
            value={this.state.searchText}
          />
        </View>

        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <Button color="black" onPress={this.handleSubmit} title="SEARCH" />
          </View>
        </View>


        <View style={{ flex: 5 }}>
          <ScrollView>
            {keyboardTag}
            {itemsPoemOrSher}
          </ScrollView>
        </View>
      </View>
    ); // return ends
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },

  RenderedView: {
    // height: 44,
    flex: 0.5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },

  RenderedText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  UrduTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000"
  },
  EnglishTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000",
    padding: 3
  },

  button: {
    paddingTop: 5,
    borderRadius: Platform.OS === "ios" ? 10 : 0,
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    height: 60
  }
});

export default SearchPage;
