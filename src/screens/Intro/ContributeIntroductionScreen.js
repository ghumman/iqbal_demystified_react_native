import React from "react";
import {
  TextInput,
  ScrollView,
  Linking,
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import qs from "qs";


const FONT = "Normal";
const TEXT = "Urdu";

class ContributeIntroductionScreen extends React.Component {
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
    headerTitle: "Contribute!",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'green',
    },
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
      this.setState({
        emailText:
          "Asalamualikum, I want to add the Introduction of the Poem: " +
          this.props.navigation.getParam("poemTitle") +
          "\n\n\n"
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


    return (
      <View>
        <ScrollView>
          <Text style={styles.RenderedText}>Submit Your Contribution!</Text>

          <Text style={{ color: "black" }}>
            If you have any suggestions, feel free to share with us. We would
            really appreciate your help. Visit our Facebook Page to see how you
            can help this project.
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

          <Text style={{ color: "green" }}>Note:</Text>
          <Text style={{ color: "green" }}>
            If your introduction is selected, it will be included in the next
            update of the app and you will be given credit for that
            introduction.
          </Text>
          <Text></Text>
          <Text style={{ color: "green" }}>
            It will also be featured on our Facebook Page!
          </Text>
          <View style={styles.RenderedTextFeedbackView}>
            <TouchableHighlight onPress={() => this.sendEmailFunction()}>
              <Text style={styles.RenderedTextFeedback}>SUBMIT</Text>
            </TouchableHighlight>
          </View>
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
  }
});

export default ContributeIntroductionScreen;
