import React from "react";
import {
  Modal,
  Linking,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  Alert,
  View,
  Text
} from "react-native";
import Slider from '@react-native-community/slider';
import StaticContentService from "../Misc/StaticContentServiceYaml";

import starLiked from "../../assets/android_app_assets/star_liked.png";
import starNotLiked from "../../assets/android_app_assets/star_not_liked.png";

import iconBackward from "../../assets/android_app_assets/audio_player_backward.png";
import iconForward from "../../assets/android_app_assets/audio_player_forward.png";
import iconPause from "../../assets/android_app_assets/audio_player_pause.png";
import iconPlay from "../../assets/android_app_assets/audio_player_play.png";
import iconGarbage from "../../assets/android_app_assets/garbage_icon.png";

import Video from "react-native-video";

var RNFS = require("react-native-fs");
var YAML = require("yaml");

class PoemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      listId: "List_001",
      poemNumber: "",
      poemList: [],
      poemAudioUrl: "",
      poemNameUrdu: "",
      poemNameEnglish: "",
      poemText: [],
      poemTextNew: [],
      poemObjects: [],

      paused: true,
      duration: 0.0,
      currentTime: 0.0,

      showAudioBox: true,
      isDownloadDone: false,
      modalVisible: false,
      progressDownloadPercent: 0.0,

      downloadedData: [],
      downloadedDataFinal: [],

      audioPath: ""
    };
  }

  static navigationOptions = ({ }) => ({
    headerTitle: "My Downloads",
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

  onSubmit = sherNumber => {
    this.props.navigation.navigate("SherTabs", {
      detailSher: sherNumber,
      profileSigninConfirmation: this.state.signinConfirmation,
      profileUsername: this.state.username,
      profilePassword: this.state.password
    });
  };

  getPoem(listId) {
    var that = this;
    StaticContentService.getPoem(listId).then(function (response) {

      var yamlObject = YAML.parse(response);

      that.setState({ poemAudioUrl: yamlObject.audioUrl });

      that.readBookmarks().then(function (result) {

        for (var i = 0; i < yamlObject.sher.length; i++) {
          try {
            if (result.includes(yamlObject.sher[i].id))
              yamlObject.sher[i].star = true;
            else yamlObject.sher[i].star = false;
          } catch (e) {
          }
        }
        let newArr = [yamlObject.sher];

        yamlObject.sher.map(el => {
          try {
            el.sherContent[0].text = el.sherContent[0].text.split("|");
          } catch (err) {
          }
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
          poemTextNew: newArr[0]
        });

        that.setState({ poemNameUrdu: yamlObject.heading[0].text });
        that.setState({ poemNameEnglish: yamlObject.heading[1].text });

      });
    });
  }

  starToggling = sher => {
    var that = this;

    this.readBookmarks().then(function (result) {
      if (result.includes(sher.id)) {
        var index = result.indexOf(sher.id);
        if (index > -1) {
          result.splice(index, 5);
        }
        var newData = result.join("@");

        var path = RNFS.DocumentDirectoryPath + "/bookmarked-shers.txt";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(() => {
          })
          .catch(() => {
          });

        let poemName = that.props.navigation.getParam("detailPoem");
        that.getPoem(poemName);
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
          "@";

        // write the file
        RNFS.appendFile(path, sherAt, "utf8")
          .then(() => {
          })
          .catch(() => {
          });

        let poemName = that.props.navigation.getParam("detailPoem");
        that.getPoem(poemName);
      }
    });
  };

  async readBookmarks() {
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
      this.readDirectory();
    } catch (e) {
    }
  }

  soundForward = () => {
    if (!this.state.paused) {
      if (this.state.duration - this.state.currentTime > 6)
        this.player.seek(this.state.currentTime + 5);
      else this.player.seek(0);
    }
  };

  soundBackward = () => {
    if (!this.state.paused) {
      this.player.seek(this.state.currentTime - 5);
    }
  };

  playTrack() {
    let localSong = RNFS.CachesDirectoryPath + "/song-name.mp3";
    RNFS.downloadFile(
      "http://www.iqbal.com.pk/mp3/Zia%20Muhauddin%20Reads%20Bang%20e%20Dara/001-%20Himala.mp3",
      localSong
    ).then(() => {
      let song = new Sound(localSong, "", () => {
        song.play();
      });
    });
  }

  onLoad = data => {
    this.setState({ duration: data.duration });
  };

  onProgress = data => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true });
  };

  onSeek = data => {
    this.player.seek(data)
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  resumeIfUrlPresent() {
    if (this.state.poemAudioUrl != "")
      this.setState({ paused: !this.state.paused });
    else {
      Alert.alert(
        "Upload a Recording!",
        "We need your recording of this poem. Please upload an audio recording on SoundCloud and share with us on our Facebook Page. If your recording is selected, we will include it in the next version of the app!",
        [
          {
            text: "CANCEL",
            style: "cancel"
          },
          {
            text: "GO TO SOUNDCLOUD",
            onPress: () => Linking.openURL("https://soundcloud.com")
          }
        ],
        { cancelable: true }
      );
    }
  }

  onPlayPause() {
    if (this.state.isDownloadDone) {
      this.setState({ paused: !this.state.paused });
    } else Alert.alert("Please select a poem first.");
  }

  onDownloadAudio(audioFile) {
    let path = RNFS.DocumentDirectoryPath + "/Iqbal-Demystified/" + audioFile;
    this.setState({ audioPath: path });

    this.setState({ paused: false });
    this.setState({ isDownloadDone: true });
  }

  onCheckFileExists() {
    let path =
      RNFS.DocumentDirectoryPath +
      "/Iqbal-Demystified/" +
      this.state.poemNumber +
      ".mp3";
    RNFS.exists(path).then(exists => {
      if (exists) {
      } else {
      }
    });
  }

  videoError() {
  }

  readDirectory() {
    var that = this;
    that.state.downloadedData = [];

    RNFS.readDir(RNFS.DocumentDirectoryPath + "/Iqbal-Demystified").then(
      result => {
        var previousResult = result;

        that.readDownloadedAudioFile().then(function (result1) {
          for (i = 0; i < previousResult.length; i++) {
            if (previousResult[i].isFile()) {
              try {
                if (result1.includes(previousResult[i].name)) {
                  var index = result1.indexOf(previousResult[i].name);
                  that.state.downloadedData.push({
                    audioFile: previousResult[i].name,
                    urduTitle: result1[index + 1],
                    englishTitle: result1[index + 2]
                  });
                } else {
                  that.state.downloadedData.push({
                    audioFile: previousResult[i].name,
                    urduTitle: "#missing title",
                    englishTitle: "#missing translation"
                  });
                }
              } catch (e) {
              }
            } // if the selected file in the directory isFile ends
          } // for loop for all the files inside Iqbal-Demystified folder ends

          that.setState({ downloadedDataFinal: that.state.downloadedData });

        }); // readDownloadedAudioFile.then ends
      }
    ); // RNFS.readDir.then ends
  }

  readFromDownloadedAudioFile = poem => {
    var that = this;
    this.readDownloadedAudioFile().then(function (result) {

      if (result.includes(poem)) {
      } else {
        var path = RNFS.DocumentDirectoryPath + "/downloaded-poems.yaml";

        var sherNumberComma =
          poem +
          "@" +
          that.state.poemNameUrdu +
          "@" +
          that.state.poemNameEnglish +
          "@";

        // write the file
        RNFS.appendFile(path, sherNumberComma, "utf8")
          .then(() => {
          })
          .catch(() => {
          });
      }
    });
  };

  deleteDownloadEntry(audioFile) {
    var that = this;

    this.readDownloadedAudioFile().then(function (result) {
      if (result.includes(audioFile)) {
        var index = result.indexOf(audioFile);
        if (index > -1) {
          result.splice(index, 3);
        }

        var newData = result.join("@");

        var path = RNFS.DocumentDirectoryPath + "/downloaded-poems.yaml";

        // write the file
        RNFS.writeFile(path, newData, "utf8")
          .then(() => {
            that.readDirectory();
          }) // writeFile.then ends
          .catch(() => {
          });
      } // if entry was available in yaml file finished
    }); // readDownloadedAudioFile.then ends
  }

  confirmDeleteDownload(audioFile) {
    Alert.alert("Are you sure you want to delete this audio?", "", [
      {
        text: "NO",
      },
      {
        text: "YES",
        onPress: () => this.deleteDownload(audioFile)
      }
    ]);
  }

  deleteDownload(audioFile) {
    var that = this;
    var path = RNFS.DocumentDirectoryPath + "/Iqbal-Demystified/" + audioFile;

    RNFS.unlink(path)
      .then(() => {
        that.deleteDownloadEntry(audioFile);
      })
      .catch(() => {
      });
  }

  async readDownloadedAudioFile() {
    const path = RNFS.DocumentDirectoryPath + "/downloaded-poems.yaml";
    try {
      const yamlFile = await RNFS.readFile(path, "utf8");
      var partsOfStr = yamlFile.split("@");
      return partsOfStr;
    } catch (e) {
      return "";
    }
  }

  render() {
    var that = this;
    var itemDownload = this.state.downloadedDataFinal.map(function (
      item    ) {
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
              onPress={() => that.confirmDeleteDownload(item.audioFile)}
            >
              <Image
                resizeMode="cover"
                source={iconGarbage}
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
            <TouchableHighlight
              onPress={() => that.onDownloadAudio(item.audioFile)}
            >
              <View>
                <View>
                  <Text style={styles.RenderedText}>{item.audioFile}</Text>
                </View>
                <View>
                  <Text style={styles.RenderedText}>{item.urduTitle}</Text>
                </View>
                <View>
                  <Text style={styles.RenderedText}>{item.englishTitle}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    });


    var soundIcon;
    if (this.state.paused)
      soundIcon = (
        <Image style={styles.RowImage} resizeMode="contain" source={iconPlay} />
      );
    else
      soundIcon = (
        <Image
          style={styles.RowImage}
          resizeMode="contain"
          source={iconPause}
        />
      );


    var totalMinutes = Math.floor(this.state.duration / 60);
    var totalSeconds = Math.round(this.state.duration - totalMinutes * 60);

    var currentMinutes = Math.floor(this.state.currentTime / 60);
    var currentSeconds = Math.round(
      this.state.currentTime - currentMinutes * 60
    );

    var formattedTotalMinutes = ("0" + totalMinutes).slice(-2);
    var formattedTotalSeconds = ("0" + totalSeconds).slice(-2);
    var formattedCurrentMinutes = ("0" + currentMinutes).slice(-2);
    var formattedCurrentSeconds = ("0" + currentSeconds).slice(-2);

    var audioBox;
    if (this.state.showAudioBox)
      audioBox = (
        <Text style={{ backgroundColor: "gray" }}>Hide Audio Box</Text>
      );
    else
      audioBox = (
        <Text style={{ backgroundColor: "gray" }}>Show Audio Box</Text>
      );

    var aduioControlButtons;
    if (this.state.showAudioBox)
      aduioControlButtons = (
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            borderWidth: 0.5,
            borderColor: "black"
          }}
        >
          <TouchableHighlight
            style={styles.HighlightProperties}
            onPress={() => this.soundBackward()}
          >
            <Image
              style={styles.RowImage}
              resizeMode="contain"
              source={iconBackward}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.HighlightProperties}
            onPress={() => this.onPlayPause()}
          >
            {soundIcon}
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.HighlightProperties}
            onPress={() => this.soundForward()}
          >
            <Image
              style={styles.RowImage}
              resizeMode="contain"
              source={iconForward}
            />
          </TouchableHighlight>
        </View>
      );
    else aduioControlButtons = <View></View>;

    var audioPlayProgressBar;
    if (this.state.showAudioBox)
      audioPlayProgressBar = (
        <View style={{ flex: 0.4 }}>
          <View style={styles.controls}>
            <View style={styles.progress}>
              <View style={{ flex: 0.2 }}>
                <Text>
                  {formattedCurrentMinutes}:{formattedCurrentSeconds}
                </Text>
              </View>
              {/* <View
                style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
              />
              <View
                style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
              /> */}

              <View style={{ flex: 0.6 }}>
                <Slider
                  minimumValue={0}
                  maximumValue={this.state.duration}
                  value={this.state.currentTime}
                  step={1}
                  onValueChange={this.onSeek}
                  onSlidingStart={() => { this.setState({ paused: !this.state.paused }) }}
                  onSlidingComplete={() => { this.setState({ paused: !this.state.paused }) }}
                  minimumTrackTintColor="gray"
                  maximumTrackTintColor="black"
                />
              </View>
              <View style={{ flex: 0.2 }}>
                <Text>
                  {formattedTotalMinutes}:{formattedTotalSeconds}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    else audioPlayProgressBar = <View></View>;


    var videoSetup;
    if (this.state.isDownloadDone)
      videoSetup = (
        <Video
          source={{ uri: this.state.audioPath }}
          ref={ref => {
            this.player = ref;
          }}
          onBuffer={this.onBuffer}
          paused={this.state.paused}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          repeat={true}
          onError={this.videoError}
          playWhenInactive={true}
          playInBackground={true}
        />
      );
    else videoSetup = null;

    return (
      <View style={styles.MainContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                backgroundColor: "skyblue",
                alignItems: "center",
                width: 180,
                height: 50
              }}
            >
              <Text>
                Download Percentage: {this.state.progressDownloadPercent}
              </Text>
            </View>
          </View>
        </Modal>

        {videoSetup}

        <View style={{ flex: 2 }}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {itemDownload}
          </ScrollView>
        </View>

        <View style={{ flex: 0.1, alignItems: "flex-end" }}>
          <TouchableHighlight
            onPress={() =>
              this.setState({ showAudioBox: !this.state.showAudioBox })
            }
          >
            {audioBox}
          </TouchableHighlight>
        </View>

        {aduioControlButtons}
        {audioPlayProgressBar}
      </View>
    );
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  RenderedText: {
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "center",
    padding: 2,
    fontSize: 18
  },

  MainContainer: {
    flex: 1
  },
  HighlightProperties: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    margin: 1
  },
  RowImage: {
    flex: 1
  },
  controls: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center"
  },
  progress: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden",
    marginLeft: 10
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: "#f1a91b"
  },

  innerProgressRemaining: {
    height: 10,
    backgroundColor: "#2C2C2C"
  }
});

export default PoemPage;
