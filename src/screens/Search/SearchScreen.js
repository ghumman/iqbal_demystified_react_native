import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
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
          
        });
      } else {
        var itemsPoemOrSher = (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ padding: 2, fontSize: 18 }}>
              {this.state.messageResults}
            </Text>
          </View>
        );
      }
    } else {
      if (this.state.sherList.length != 0) {
        var that = this;
        var itemsPoemOrSher = this.state.sherList.map(function (item, index) {
            return (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.1
                  }}
                >
                  <TouchableHighlight
                    onPress={() => that.starTogglingSher(item)}
                  >
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
         
        });
      } else {
        var itemsPoemOrSher = (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ padding: 2, fontSize: 18 }}>
              {this.state.messageResults}
            </Text>
          </View>
        );
      }
    }

    var aVar = this.state.bookSections.length;
    var stationsArr = [];
    for (var i = 0; i < this.state.bookSections.length; i++) {
      stationsArr.push(<Text>{this.data}</Text>);
    }

    let keyboardTag;
    if (this.state.inputBoxClicked === true) {
      keyboardTag = (
        <View>

           <View style={styles.container}>
            <View style={styles.buttonViewStyle}>
            <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("Back")}>
              <Text style={styles.buttonTextStyle}>{'->'}</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ح")}>
              <Text style={styles.buttonTextStyle}>ح</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("چ")}>
              <Text style={styles.buttonTextStyle}>چ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ج")}>
              <Text style={styles.buttonTextStyle}>ج</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ث")}>
              <Text style={styles.buttonTextStyle}>ث</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ٹ")}>
              <Text style={styles.buttonTextStyle}>ٹ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ت")}>
              <Text style={styles.buttonTextStyle}>ت</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("پ")}>
              <Text style={styles.buttonTextStyle}>پ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ب")}>
              <Text style={styles.buttonTextStyle}>ب</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ا")}>
              <Text style={styles.buttonTextStyle}>ا</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("آ")}>
              <Text style={styles.buttonTextStyle}>آ</Text>
            </TouchableOpacity>
            </View>
            </View>

            <View style={styles.container}>
            <View style={styles.buttonViewStyle}>
            <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ص")}>
              <Text style={styles.buttonTextStyle}>ص</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ش")}>
              <Text style={styles.buttonTextStyle}>ش</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("س")}>
              <Text style={styles.buttonTextStyle}>س</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ژ")}>
              <Text style={styles.buttonTextStyle}>ژ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ز")}>
              <Text style={styles.buttonTextStyle}>ز</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ڑ")}>
              <Text style={styles.buttonTextStyle}>ڑ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ر")}>
              <Text style={styles.buttonTextStyle}>ر</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ز")}>
              <Text style={styles.buttonTextStyle}>ز</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ڈ")}>
              <Text style={styles.buttonTextStyle}>ڈ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("د")}>
              <Text style={styles.buttonTextStyle}>د</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("خ")}>
              <Text style={styles.buttonTextStyle}>خ</Text>
            </TouchableOpacity>
            </View>
            </View>


            <View style={styles.container}>
            <View style={styles.buttonViewStyle}>
            <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("م")}>
              <Text style={styles.buttonTextStyle}>م</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ل")}>
              <Text style={styles.buttonTextStyle}>ل</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("گ")}>
              <Text style={styles.buttonTextStyle}>گ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ک")}>
              <Text style={styles.buttonTextStyle}>ک</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ق")}>
              <Text style={styles.buttonTextStyle}>ق</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ف")}>
              <Text style={styles.buttonTextStyle}>ف</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("غ")}>
              <Text style={styles.buttonTextStyle}>غ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ع")}>
              <Text style={styles.buttonTextStyle}>ع</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ظ")}>
              <Text style={styles.buttonTextStyle}>ظ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ط")}>
              <Text style={styles.buttonTextStyle}>ط</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ض")}>
              <Text style={styles.buttonTextStyle}>ض</Text>
            </TouchableOpacity>
            </View>
            </View>

            <View style={styles.container}>
            <View style={styles.buttonViewStyle}>
            <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet(" ")}>
              <Text style={styles.buttonTextStyle}>Space</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ے")}>
              <Text style={styles.buttonTextStyle}>ے</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ي")}>
              <Text style={styles.buttonTextStyle}>ي</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ء")}>
              <Text style={styles.buttonTextStyle}>ء</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ھ")}>
              <Text style={styles.buttonTextStyle}>ھ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ہ")}>
              <Text style={styles.buttonTextStyle}>ہ</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("و")}>
              <Text style={styles.buttonTextStyle}>و</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ں")}>
              <Text style={styles.buttonTextStyle}>ں</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonViewStyle}>
              <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ن")}>
              <Text style={styles.buttonTextStyle}>ن</Text>
            </TouchableOpacity>
            </View>
            </View>


          {/* <View style={styles.container}>
            <View style={{alignItems: "center", justifyContent: "center"}}>
          <TouchableOpacity  style={styles.buttonTouchableStyle} onPress={() => this.handleAlphabet("ص")}>
              <Text style={{color: "white", textAlign: "center"}}>ص</Text>
            </TouchableOpacity>
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
          </View> */}
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
    padding: 2,
    fontSize: 18
  },

  MainContainer: {
    flex: 1
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
    padding: 2
  },

  button: {
    paddingTop: 5,
    borderRadius: Platform.OS === "ios" ? 10 : 0,
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    height: 60
  },

  buttonTextStyle: {
    color: "white", 
    textAlign: "center",
    fontFamily:
      Platform.OS === "ios" ? "JameelNooriKasheeda" : "Jameel Noori Kasheeda",
  },

  buttonViewStyle: {
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 10
  },

  buttonTouchableStyle: {
    // paddingTop: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Platform.OS === "ios" ? 10 : 0,
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    height: 35,
    // width: 35,
    borderRadius:10,
    backgroundColor: "blue"
  }
});

export default SearchPage;
