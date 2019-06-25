 var RNFS = require('react-native-fs');
 const rootPath = RNFS.MainBundlePath; //= (os == "android") ? RNFS.DocumentDirectoryPath :RNFS.MainBundlePath

 export function writeFile(filename, content) {
    var path = rootPath + '/' + filename;
    return RNFS.writeFile(path, content, 'utf8').then(() => {
      console.log('FILE WRITTEN!');
      return true;
    }).catch((err) => {
      console.log(err.message);
      return false;
    });
  }

  export async function readFile(filename) {
    var path = rootPath + '/' + filename;
    var content = await RNFS.readFile(path, 'utf8');
    return content;
  }

