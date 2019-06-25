// import helloText from 'raw-loader!./hello.txt';
// import yamlFile from 'raw-loader!./List_001.yaml'; 

// import * as RNFS from 'react-native-fs';

// import * as tools from "./utilsFunction";

 // in my utilsFunction.js 

// import someText from "./test"; 

	  var RNFS = require('react-native-fs');
	  var  YAML = require('yaml');

export default {

  async getPoemList (listId) {

        try {
          const path = RNFS.MainBundlePath + "/assets/lists/List_001.yaml";
          // const path = RNFS.MainBundlePath + "/test.txt";
          // const path = RNFS.MainBundlePath + "/test/test.txt";
          // const path = RNFS.DocumentDirectoryPath + '/test/test.txt';
          // const path = RNFS.MainBundlePath + '/test.txt';
          // const path = RNFS.MainBundlePath + '/assets/allam_iqbal_pic.jpg';
          // const path = RNFS.MainBundlePath + '/Media/List_001.yaml';
          // const path = RNFS.MainBundlePath + '/List_001.yaml';
          // const path = RNFS.MainBundlePath + '/test3/test3.txt';
          const contents = await RNFS.readFile(path, "utf8");
          // console.log("" + contents);

    // var yamlObject = YAML.parse(contents)

    // console.log("yamlObject : ")
    // console.log(yamlObject)
    // return yamlObject
    return contents
        } catch (e) {
          console.log("" + e);
        }


// yaml = require('js-yaml');
// fs   = require('fs');
/*
	var readYaml = require('read-yaml');
	readYaml('List_001.yaml', function(err, data) {
  		if (err) throw err;
  		console.log(data);
	});	
*/


/*
    const res = await tools.writeFile(    "testfile.js",    'Lorem ipsum dolor sit amet ' );
    console.log("res", res);
*/
//     const content = await tools.readFile("testfile.js");
//     console.log("content", content);


/*
// require the module
var RNFS = require('react-native-fs');

RNFS.MainBundlePath('/Users/ghumman/programming/react_native/iqbal_demystified');
// create a path you want to write to
var path = RNFS.DocumentDirectoryPath + '/test_created.txt';

// write the file
RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });
*/

/*
// require the module
var RNFS = require('react-native-fs');
 
// get a list of files and directories in the main bundle
const MainBundlePath = '/Users/ghumman/programming/react_native/iqbal_demystified/'
RNFS.readDir(RNFS.MainBundlePath)
  .then((result) => {
    console.log('GOT RESULT', result);
 
    // stat the first file
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }
 
    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });
*/
	// var RNFS = require('react-native-fs');
	// var  YAML = require('yamljs');
        // const yamlFile = require('raw-loader!./' + listId + '.yaml');
        // const yamlFile = require('!raw-loader!./assets/lists/' + listId + '.yaml');
        // const yamlFile = require('raw-loader!./assets/lists/' + listId + '.yaml');

	// RNFS.readFile('./assets/lists/' + listId + '.yaml' , 'utf8')
// RNFS.readFile('test.txt', 'ascii').then(res => {
//     console.log(res) 
// })
// .catch(err => {
//     console.log(err.message, err.code);
// });
	// console.log("var RNFS declared")
	// const fileContext = RNFS.readFile('./test.txt', 'utf8');
    		// .then((contents) => {
      		// console.log("fileContext: ")
      		// console.log(fileContext)
		// return fileContext;
    	// })

        // require('./bgs/' + this.id + '.jpg')
        // console.log({yamlFile});
        // console.log("yamlFile: ");
        // console.log(yamlFile.default);
        // return yamlFile.default;

  }

}	// default ends
