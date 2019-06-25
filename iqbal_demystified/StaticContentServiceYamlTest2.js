// import helloText from 'raw-loader!./hello.txt';
// import yamlFile from 'raw-loader!./List_001.yaml'; 

var RNFS = require('react-native-fs');
var  YAML = require('yaml');



export default {

  async getPoemList (listId) {
	// var  YAML = require('yamljs');
        // const yamlFile = require('raw-loader!./' + listId + '.yaml');
        // const yamlFile = require('!raw-loader!./assets/lists/' + listId + '.yaml');
        // const yamlFile = require('raw-loader!./assets/lists/' + listId + '.yaml');
        
	const path = RNFS.MainBundlePath + '/assets/lists/' + listId + '.yaml';
        
	const yamlFile = await RNFS.readFile(path, "utf8");


        // require('./bgs/' + this.id + '.jpg')
        // console.log({yamlFile});
        // console.log("yamlFile: ");
        // console.log(yamlFile);

    var yamlObject = YAML.parse(contents)
    console.log("yamlObject : ")
    console.log(yamlObject)

        // return yamlFile;
        return yamlObject;

  }

}
