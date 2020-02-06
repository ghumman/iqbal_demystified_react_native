import { Platform } from 'react-native';

const RNFS = require('react-native-fs');
const YAML = require('yaml');

export default {
  async getPoemList(listId) {
    try {
      let path = '';
      let yamlFile = '';

      if (Platform.OS == 'ios') {
        path = `${RNFS.MainBundlePath}/src/assets/lists/${listId}.yaml`;
        yamlFile = await RNFS.readFile(path, 'utf8');
      } else if (Platform.OS == 'android') {
        path = `lists/${listId}.yaml`;
        yamlFile = await RNFS.readFileAssets(path, 'utf8');
      }
      return yamlFile;
    } catch (e) {
      console.log(`${e}`);
    }
  },

  async getPoemListSearch(listId) {
    try {
      const path = Array(11);
      const yamlFile = Array(11);
      const yamlObject = Array(11);
      let i; let j; let
        k;
      const newList = { poems: [] };

      for (i = 1; i <= 11; i++) {
        if (i <= 9) {
        // yamlFile[i-1] = require('!raw-loader!./assets/lists/List_00' + i + '.yaml');
          if (Platform.OS == 'ios') {
            path[i - 1] = `${RNFS.MainBundlePath}/src/assets/lists/List_00${i}.yaml`;
            yamlFile[i - 1] = await RNFS.readFile(path[i - 1], 'utf8');
          } else if (Platform.OS == 'android') {
            path[i - 1] = `lists/List_00${i}.yaml`;
            yamlFile[i - 1] = await RNFS.readFileAssets(path[i - 1], 'utf8');
          }

          // yamlObject[i-1] = YAML.parse(yamlFile[i-1].default);
          yamlObject[i - 1] = YAML.parse(yamlFile[i - 1]);
        } else {
        // yamlFile[i-1] = require('!raw-loader!./assets/lists/List_0' + i + '.yaml');
          if (Platform.OS == 'ios') {
            path[i - 1] = `${RNFS.MainBundlePath}/src/assets/lists/List_0${i}.yaml`;
            yamlFile[i - 1] = await RNFS.readFile(path[i - 1], 'utf8');
          } else if (Platform.OS == 'android') {
            path[i - 1] = `lists/List_0${i}.yaml`;
            yamlFile[i - 1] = await RNFS.readFileAssets(path[i - 1], 'utf8');
          }

          // yamlObject[i-1] = YAML.parse(yamlFile[i-1].default);
          yamlObject[i - 1] = YAML.parse(yamlFile[i - 1]);
        }
      }

      console.log('Testing');
      for (k = 0; k < yamlObject.length; k++) {
        for (i = 0; i < yamlObject[k].sections.length; i++) {
          if (Object.keys(yamlObject[k].sections[i]) == 'poems') {
            for (j = 0; j < yamlObject[k].sections[i].poems.length; j++) {
              if (
                JSON.stringify(
                  yamlObject[k].sections[i].poems[j].poemName[0].text,
                ).match(listId)
              ) {
                newList.poems.push(yamlObject[k].sections[i].poems[j]);

                console.log('Inside second for');
                console.log(
                  yamlObject[k].sections[i].poems[j].poemName[0].text,
                );
              }
            }
          }
        }
      }

      console.log('Testing Finished');

      return newList;

      if (
        JSON.stringify(
          yamlObject[0].sections[1].poems[0].poemName[0].text,
        ).match(listId)
      ) {
        console.log('Found');
        console.log(yamlObject[0].sections[1].poems[0]);
        return newList;
      }
      console.log('Not Found');

      return { poems: [] };
    } catch (e) {
      console.log(`${e}`);
    }
  },

  async getPoemSearch(poemId) {
    try {
      const path = Array(1440);
      const yamlFile = Array(1440);
      const yamlObject = Array(1440);

      // var yamlFile = Array(2);
      // var yamlObject = Array(2);

      let i; let ii; let j; let k; let
        l;
      const numberOfFiles = [172, 179, 202, 43, 19, 31, 163, 153, 61, 25, 392];
      const sumOfFiles = [0, 172, 351, 553, 596, 615, 646, 809, 962, 1023, 1048];
      const newList = { sher: [] };

      // calculate number of files inside a folder
      const total_files = 0;

      // for (i=1; i<=172; i++){
      for (l = 1; l <= numberOfFiles.length; l++) {
        for (i = 1; i <= numberOfFiles[l - 1]; i++) {
          if (l <= 9) {
            // if l/books number is between 1-9
            if (i <= 9) {
              if (Platform.OS == 'ios') {
                path[i - 1 + sumOfFiles[l - 1]] = `${RNFS.MainBundlePath
                }/src/assets/poems/00${
                  l
                }/00${
                  l
                }_00${
                  i
                }.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFile(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              } else if (Platform.OS == 'android') {
                path[i - 1 + sumOfFiles[l - 1]] = `poems/00${l}/00${l}_00${i}.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFileAssets(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              }

              yamlObject[i - 1 + sumOfFiles[l - 1]] = YAML.parse(
                yamlFile[i - 1 + sumOfFiles[l - 1]],
              );
            } else if (i <= 99) {
              if (Platform.OS == 'ios') {
                path[i - 1 + sumOfFiles[l - 1]] = `${RNFS.MainBundlePath
                }/src/assets/poems/00${
                  l
                }/00${
                  l
                }_0${
                  i
                }.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFile(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              } else if (Platform.OS == 'android') {
                path[i - 1 + sumOfFiles[l - 1]] = `poems/00${l}/00${l}_0${i}.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFileAssets(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              }

              yamlObject[i - 1 + sumOfFiles[l - 1]] = YAML.parse(
                yamlFile[i - 1 + sumOfFiles[l - 1]],
              );
            } else {
              if (Platform.OS == 'ios') {
                path[i - 1 + sumOfFiles[l - 1]] = `${RNFS.MainBundlePath
                }/src/assets/poems/00${
                  l
                }/00${
                  l
                }_${
                  i
                }.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFile(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              } else if (Platform.OS == 'android') {
                path[i - 1 + sumOfFiles[l - 1]] = `poems/00${l}/00${l}_${i}.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFileAssets(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              }

              yamlObject[i - 1 + sumOfFiles[l - 1]] = YAML.parse(
                yamlFile[i - 1 + sumOfFiles[l - 1]],
              );
            }
          } // if l <= 9 ends
          else {
            // else if l/books nubmer is between 10-11
            if (i <= 9) {
              if (Platform.OS == 'ios') {
                path[i - 1 + sumOfFiles[l - 1]] = `${RNFS.MainBundlePath
                }/src/assets/poems/0${
                  l
                }/0${
                  l
                }_00${
                  i
                }.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFile(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              } else if (Platform.OS == 'android') {
                path[i - 1 + sumOfFiles[l - 1]] = `poems/0${l}/0${l}_00${i}.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFileAssets(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              }

              yamlObject[i - 1 + sumOfFiles[l - 1]] = YAML.parse(
                yamlFile[i - 1 + sumOfFiles[l - 1]],
              );
            } else if (i <= 99) {
              if (Platform.OS == 'ios') {
                path[i - 1 + sumOfFiles[l - 1]] = `${RNFS.MainBundlePath
                }/src/assets/poems/0${
                  l
                }/0${
                  l
                }_0${
                  i
                }.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFile(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              } else if (Platform.OS == 'android') {
                path[i - 1 + sumOfFiles[l - 1]] = `poems/0${l}/0${l}_0${i}.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFileAssets(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              }

              yamlObject[i - 1 + sumOfFiles[l - 1]] = YAML.parse(
                yamlFile[i - 1 + sumOfFiles[l - 1]],
              );
            } else {
              if (Platform.OS == 'ios') {
                path[i - 1 + sumOfFiles[l - 1]] = `${RNFS.MainBundlePath
                }/src/assets/poems/0${
                  l
                }/0${
                  l
                }_${
                  i
                }.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFile(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              } else if (Platform.OS == 'android') {
                path[i - 1 + sumOfFiles[l - 1]] = `poems/0${l}/0${l}_${i}.yaml`;
                yamlFile[i - 1 + sumOfFiles[l - 1]] = await RNFS.readFileAssets(
                  path[i - 1 + sumOfFiles[l - 1]],
                  'utf8',
                );
              }
              yamlObject[i - 1 + sumOfFiles[l - 1]] = YAML.parse(
                yamlFile[i - 1 + sumOfFiles[l - 1]],
              );
            }
          } // else if l > 9 ends
        }
      }
      console.log('Testing');
      console.log(yamlObject.length);
      for (k = 0; k < yamlObject.length; k++) {
        for (i = 0; i < yamlObject[k].sher.length; i++) {
          if (
            JSON.stringify(yamlObject[k].sher[i].sherContent[0].text).match(
              poemId,
            )
          ) {
            newList.sher.push(yamlObject[k].sher[i]);

            console.log('Inside second for');
            console.log(yamlObject[k].sher[i]);
          }
        }
      }

      console.log('Testing Finished');

      return newList;
    } catch (e) {
      console.log(`${e}`);
    }
  },

  async getPoem(poemId) {
    try {
      const arr = poemId.split('_');

      // print both parts of string
      console.log(`arr[0]: ${arr[0]}`);
      console.log(`arr[1]: ${arr[1]}`);

      let path = '';
      let yamlFile = '';

      if (Platform.OS == 'ios') {
        path = `${RNFS.MainBundlePath
        }/src/assets/poems/${
          arr[0]
        }/${
          poemId
        }.yaml`;
        yamlFile = await RNFS.readFile(path, 'utf8');
      } else if (Platform.OS == 'android') {
        path = `poems/${arr[0]}/${poemId}.yaml`;
        yamlFile = await RNFS.readFileAssets(path, 'utf8');
      }

      return yamlFile;
    } catch (e) {
      console.log(`${e}`);
    }
  },

  async getRecentSher(sherList) {
    try {
      console.log('Inside getRecentSher');
      console.log(sherList);

      const newList = { sher: [] };
      let i;
      const sherArray = sherList.split(',');
      console.log('sherArray');
      console.log(sherArray);
      for (i = 0; i < sherArray.length - 1; i++) {
        const arr = sherArray[i].split('_');

        let path = '';
        let yamlFile = '';

        if (Platform.OS == 'ios') {
          path = `${RNFS.MainBundlePath
          }/src/assets/poems/${
            arr[0]
          }/${
            arr[0]
          }_${
            arr[1]
          }.yaml`;
          yamlFile = await RNFS.readFile(path, 'utf8');
        } else if (Platform.OS == 'android') {
          path = `poems/${arr[0]}/${arr[0]}_${arr[1]}.yaml`;
          yamlFile = await RNFS.readFileAssets(path, 'utf8');
        }

        const sherIndex = arr[2] - 1;
        const yamlObject = YAML.parse(yamlFile);

        newList.sher.push(yamlObject.sher[sherIndex]);
      } // for number of total shers ends

      console.log(
        'newList at the end of Static getRecentSher sending it back to function call',
      );
      console.log(newList);

      return newList;
    } catch (e) {
      console.log(
        'Inside catch inside StaticContentServiceYaml inside getRecentSher',
      );
      console.log(`${e}`);
    }
  }, // function getRecent Sher ends

  async getSherDiscussion(sherGeneralDiscussionServerResponse) {
    try {
      console.log(
        'Inside getSherDiscussion inside StaticContentServiceYaml, Value of sherGeneralServerResponse: ',
      );

      console.log(sherGeneralDiscussionServerResponse);
      return sherGeneralDiscussionServerResponse;
    } catch (e) {
      console.log(`${e}`);
    }
  }, // function getSherDiscussion Sher
}; // default ends
