import React from "react";
import {
  TextInput,
  Image,
  ScrollView,
  Linking,
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from "react-native";
import RadioForm, {
  } from "react-native-simple-radio-button";
import AsyncStorage from "@react-native-community/async-storage";

import qs from "qs";

import iconWebsite from "../../assets/android_app_assets/iqbal_website3.jpg";
import iconFacebook from "../../assets/android_app_assets/facebook_link.png";
import iconGithub from "../../assets/android_app_assets/github_logo_fancy.jpg";
import iconIis from "../../assets/android_app_assets/iqbal_com_pk.png";
import iconAcademy from "../../assets/android_app_assets/iap.png";

const VERSION = "Version No.: 4.0.4";
const FONT = "Normal";
const TEXT = "Urdu";

var radio_props_font = [
  { label: "Normal", value: "Normal" },
  { label: "Nafees", value: "Nafees" },
  { label: "Kasheeda", value: "Kasheeda" },
  { label: "Fajer", value: "Fajer" }
];

var radio_props_text = [
  { label: "Urdu", value: "Urdu" },
  { label: "Roman English", value: "Roman" }
];

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",
      font: "Normal",
      text: "Urdu",
      fontIndex: -1,
      textIndex: -1,
      emailText: "",
      height: 40,
      emailText: "",
      isFocused: false,

      fontIndexReady: false,
      textIndexReady: false
    };
  }

  static navigationOptions = ({ }) => ({
    headerTitle: "Settings",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  onDidFocusCustomFunction = () => {
    try {
      AsyncStorage.getItem(FONT).then(res => {
        if (res !== null) {
          this.setState({ font: res });
          switch (res) {
            case "Normal":
              this.setState({ fontIndex: 0 });
              break;
            case "Nafees":
              this.setState({ fontIndex: 1 });
              break;
            case "Kasheeda":
              this.setState({ fontIndex: 2 });
              break;
            case "Fajer":
              this.setState({ fontIndex: 3 });
              break;
          }
          this.setState({ fontIndexReady: true });
        } else {
          this.setState({ font: "Normal" });
          this.setState({ fontIndex: 0 });
          this.setState({ fontIndexReady: true });
        }
      });
    } catch (err) {
      this.setState({ font: "Normal" });
    }

    AsyncStorage.getItem(TEXT).then(res => {
      if (res !== null) {
        this.setState({ text: res });
        switch (res) {
          case "Urdu":
            this.setState({ textIndex: 0 });
            break;
          case "Roman":
            this.setState({ textIndex: 1 });
            break;
        }
        this.setState({ textIndexReady: true });
      } else {
        this.setState({ text: "Urdu" });
        this.setState({ textIndex: 0 });
        this.setState({ textIndexReady: true });
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
    } catch (e) {
    }
  }

  updateSize = height => {
    this.setState({ height });
  };

  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  sendEmailFunction() {
    this.sendEmail(
      "admin@ghummantech.com",
      "Iqbal Demystified App - User Email",
      this.state.emailText
    ).then(() => {
    });
  }

  async sendEmail(to, subject, body) {
    const cc = "";
    const bcc = "";

    let url = `mailto:${to}`;

    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error("Provided URL can not be handled");
    }
    return Linking.openURL(url);
  }

  render() {
    const { emailText, height } = this.state;

    let newStyle = {
      height,
      backgroundColor: "#ffffff",
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomColor: this.state.isFocused ? "black" : "gray",
      borderBottomWidth: 1
    };


    var showFontRadioForm;
    if (this.state.fontIndexReady)
      showFontRadioForm = (
        <RadioForm
          radio_props={radio_props_font}
          initial={this.state.fontIndex}
          buttonColor={"black"}
          selectedButtonColor={"black"}
          onPress={value => AsyncStorage.setItem(FONT, value)}
        />
      );
    else showFontRadioForm = null;

    var showTextRadioForm;
    if (this.state.textIndexReady)
      showTextRadioForm = (
        <RadioForm
          radio_props={radio_props_text}
          initial={this.state.textIndex}
          buttonColor={"black"}
          selectedButtonColor={"black"}
          onPress={value => {
            AsyncStorage.setItem(TEXT, value);
          }}
        />
      );
    else showTextRadioForm = null;

    var aboutText =
      "Iqbal Demystified App helps the young generation to fully understand the work of Allama Iqbal. The purpose of this app is to facilitate students who are unable to benefit from Iqbal's work because of the difficult terms used or lack of knowledge about the context of the poems.\n\nUsers can contribute to this app in several ways including but not limited to writing poem introductions, providing audios for poems and adding more references to difficult words. We are always open to suggestions and comments and are looking for other effective techniques that can facilitate learning about our lost heritage.";

    var developerText =
      "We have open-sourced our repositories and codebase in an attempt to involve the community to help us with this project. If you are interested in working on a new feature for the app, please contact us.\n\nFollowing are the 2 GitHub repositories for this project. Please get involved!";

    var websiteText =
      "You can also use Iqbal Demystified Application as a website. This website runs on all internet browsers and use the same credentials of mobile application to login, posting comments, like/dislike comments and other features.";
    return (
      <View>
        <ScrollView>
          <Text style={styles.EnglishTitle}>Choose Font</Text>
          {showFontRadioForm}

          <Text style={{ color: "black" }}>
            Warning: Fonts may not show up properly on some mobile devices.
          </Text>

          <Text style={styles.EnglishTitle}>Choose Text Type</Text>
          {showTextRadioForm}

          <Text style={styles.EnglishTitle}>Contribute</Text>
          <Text style={styles.RenderedText}>
            If you have any suggestions or if you can contribute to the app in
            any way, we would really appreciate your help. Visit our Facebook
            Page to see how you can help.
          </Text>
          <TextInput
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="Message..."
            onChangeText={emailText => this.setState({ emailText })}
            style={[newStyle]}
            editable={true}
            multiline={true}
            value={emailText}
            onContentSizeChange={e =>
              this.updateSize(e.nativeEvent.contentSize.height)
            }
          />

          <View style={styles.RenderedTextFeedbackView}>
            <TouchableHighlight onPress={() => this.sendEmailFunction()}>
              <Text style={styles.RenderedTextFeedback}>
                SEND FEEDBACK TO DEVELOPERS
              </Text>
            </TouchableHighlight>
          </View>

          <Text style={styles.EnglishTitle}>About This App</Text>
          <Text style={styles.RenderedText}>{aboutText}</Text>

          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL("https://www.facebook.com/IqbalDemystified")
              }
            >
              <Image source={iconFacebook} />
            </TouchableHighlight>
          </View>

          <Text style={styles.EnglishTitle}>Iqbal Demystified Website</Text>
          <Text style={styles.RenderedText}>{websiteText}</Text>
          <View style={styles.ImageView}>
            
            <Text 
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => Linking.openURL('https://ghumman.github.io/iqbal-demystified-web')}
            >
            Iqbal Demystified Website</Text>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL("https://ghumman.github.io/iqbal-demystified-web")
              }
            >
              <Image source={iconWebsite} resizeMode="cover"/>
            </TouchableHighlight>
          </View>

          <Text style={styles.EnglishTitle}>Are you a developer?</Text>
          <Text style={styles.RenderedText}>{developerText}</Text>

          <Text style={styles.EnglishTitle}>Mobile Application Code</Text>
          <View style={{alignItems: "center"}}>
          <TouchableHighlight
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/ghumman/iqbal_demystified_react_native"
                  )
                }
              >
                <Image
                  style={{alignContent: "center"}}
                  resizeMode="stretch"
                  source={iconGithub}
                />
              </TouchableHighlight>
              </View>

              <Text style={styles.EnglishTitle}>Website Code</Text>
              <View style={{alignItems: "center"}}>
              <TouchableHighlight
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/ghumman/iqbal-demystified-web"
                  )
                }
              >
                <Image
                  style={{justifyContent: "center"}}
                  resizeMode="stretch"
                  source={iconGithub}
                />
              </TouchableHighlight>
              </View>

         

          <Text style={styles.RenderedText}>
            {"ﺷﮑﻮﮦﺀ۔ ﻇﻠﻤﺖِ ﺷﺐ ﺳﮯ ﺗﻮ ﮐﮩﯿﮟ ﺑﮩﺘﺮ ﺗﮭﺎ"}
          </Text>
          <Text style={styles.RenderedText}>
            {"ﺍﭘﻨﮯ ﺣﺼﮯ ﮐﯽ ﮐﻮﺋﯽ ﺷﻤﻊ ﺟﻼﺗﮯ ﺟﺎﺗﮯ"}
          </Text>

          <Text style={styles.EnglishTitle}>Created By</Text>
          <Text style={styles.EnglishTitle}>International Iqbal Society</Text>
          <Text style={styles.RenderedText}>{"{{Developers}}"}</Text>
          <Text style={styles.RenderedText}>Azeem Ghumman</Text>
          <Text style={styles.RenderedText}>Faizan Khan</Text>
          <Text style={styles.RenderedText}>
            Ahmed Ghumman (CEO: Ghumman Tech)
          </Text>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() => Linking.openURL("http://www.iqbal.com.pk/")}
            >
              <Image source={iconIis} />
            </TouchableHighlight>
          </View>
          <Text style={styles.RenderedText}>
            {"International Iqbal Society\n(Formerly DISNA)"}
          </Text>
          <Text style={styles.EnglishTitle}>Special Thanks</Text>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() => Linking.openURL("http://iap.gov.pk/")}
            >
              <Image source={iconAcademy} />
            </TouchableHighlight>
          </View>
          <Text style={styles.RenderedText}>Iqbal Academy Pakistan</Text>
            <Text style={styles.RenderedText}>{VERSION}</Text>

        </ScrollView>
      </View>
    ); // return ends
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  RenderedTextFeedbackView: {
    backgroundColor: "gray",
    padding: 10
  },
  RenderedTextFeedback: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  RenderedText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18
  },

  EnglishTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  ImageView: {
    justifyContent: "center",
    alignItems: "center"
  },
  RowImage: {
    flex: 1
  }
});

export default InfoPage;
