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
        console.log("yamlFile: ");
        console.log(yamlFile.default);
        return yamlFile.default;

  },

  getPoemListSearch (listId) {
	var  YAML = require('yamljs');
	  	
        // const yamlFile = require('raw-loader!./' + listId + '.yaml');

      	// var poemListSearch =  [];
	var yamlFile = Array(11);
	var yamlObject = Array(11);
	var i, j, k;
	var newList =  {poems: []};

	///////////////////////////
	//
	// We have to look into list(yamlObject).
        // const yamlFile = require('raw-loader!./../assets/lists/List_001.yaml');

	for (i=1; i<=11; i++)

		if (i <= 9){
        		yamlFile[i-1] = require('!raw-loader!./assets/lists/List_00' + i + '.yaml');
      			yamlObject[i-1] = YAML.parse(yamlFile[i-1].default);
		}
		else{
	       		yamlFile[i-1] = require('!raw-loader!./assets/lists/List_0' + i + '.yaml');
      			yamlObject[i-1] = YAML.parse(yamlFile[i-1].default);
		}
			

        // const yamlFile2 = require('raw-loader!./../assets/lists/List_002.yaml');
        // const yamlFile3 = require('raw-loader!./../assets/lists/List_003.yaml');
        // const yamlFile4 = require('raw-loader!./../assets/lists/List_004.yaml');

	
      	// var yamlObject = YAML.parse(yamlFile[0]);
      	// var yamlObject = YAML.parse(yamlFile[0]);
        // poemListSearch = yamlObject
      	// console.log("Value of yamlObject.name.text" + poemListSearch.name.text);
      	// console.log("Value of yamlObject.name.text" + yamlObject);
      	// console.log("Hello" + JSON.stringify(yamlObject.name[1].text));
      	// console.log("Hello" + JSON.stringify(yamlObject.sections[1].poems[0].poemName[0].text));

      	console.log("Testing");

// 'use strict';
/*

// const object = {'a': 1, 'b': 2, 'c' : 3};
for (const [key0, value0] of Object.entries(yamlObject.sections)) {
	// if (key0 == "poems")
		// for (const [key1, value1] of Object.entries(value0)) {
			// if (key1 == "poems")
		
  				// console.log(key1, value1);
				
  				console.log(key0, value0);
		
  		// console.log(key, value[1].poems[0].poemName[0].text);
		// }	// for
}	// for
*/
for (k =0; k<yamlObject.length; k++){
// for (k =0; k<1; k++){
for (i=0; i<(yamlObject[k].sections).length; i++) {
	// if (JSON.stringify(yamlObject.sections[i]) == "poems")
	/* if (JSON.stringify('key' in yamlObject.sections[i]) == "poems")

      		console.log(yamlObject.sections[i]);
	else {
      		console.log("key");
      		console.log(yamlObject.sections[i]);
      		// console.log(key);
	}
	*/
	if(Object.keys(yamlObject[k].sections[i]) == "poems"){
		// console.log(Object.keys(yamlObject.sections[i]));
		// console.log(yamlObject.sections[i]);
		for (j=0; j<(yamlObject[k].sections[i].poems).length; j++) {
			if (JSON.stringify(yamlObject[k].sections[i].poems[j].poemName[0].text).match(listId)){
				// newList['poems'].push(yamlObject.sections[1].poems[0]);
				newList['poems'].push(yamlObject[k].sections[i].poems[j]);
		
				console.log("Inside second for");
				console.log(yamlObject[k].sections[i].poems[j].poemName[0].text);
				//if(Object.keys(yamlObject.sections[i]) == "poems")
				// console.log(yamlObject.sections[i]);
			}
		}
	}
}
}

      	console.log("Testing Finished");

return newList;



	if ((JSON.stringify(yamlObject[0].sections[1].poems[0].poemName[0].text)).match(listId)){
      		console.log("Found");
		console.log(yamlObject[0].sections[1].poems[0]);
		// return yamlObject.sections[1].poems[0];
		// var newList = {poems : [yamlObject.sections[1].poems[0], yamlObject.sections[1].poems[0]]};
		// newList = {poems : [yamlObject.sections[1].poems[0], yamlObject.sections[1].poems[0]]};
		// var newList = [yamlObject.sections[1].poems[0]];
		// return yamlObject.sections[1].poems[0];
		return newList;
		// return yamlObject.sections[1];
	}
	else{
      		console.log("Not Found");
	}
	return {poems: []};



      	// console.log({yamlObject.name[0].text});
      	// console.log({yamlObject});
      	// console.log(yamlObject);
      	// console.log("Value of yamlObject.name.text" + poemListSearch);

        // poemListSearch = yamlObject
        // const yamlFile = require('raw-loader!./../assets/lists/' + listId + '.yaml');
        // require('./bgs/' + this.id + '.jpg')
        // console.log({yamlFile});
        // return (yamlFile + yamlFile2 + yamlFile3 + yamlFile4);
        // return yamlFile;

  },

  getPoemSearch (poemId) {
	var  YAML = require('yamljs');
        // const yamlFile = require('raw-loader!./' + listId + '.yaml');

      	// var poemListSearch =  [];
	// var yamlFile = Array(11);
	// var yamlObject = Array(11);

	// var yamlFile = Array(351);
	// var yamlObject = Array(351);

	// var yamlFile = Array(553);
	// var yamlObject = Array(553);

	// var yamlFile = Array(596);
	// var yamlObject = Array(596);

	// var yamlFile = Array(615);
	// var yamlObject = Array(615);

	// var yamlFile = Array(646);
	// var yamlObject = Array(646);

	var yamlFile = Array(1440);
	var yamlObject = Array(1440);

	// var yamlFile = Array(2);
	// var yamlObject = Array(2);

	var i, ii, j, k, l;
	var numberOfFiles = [172, 179, 202, 43, 19, 31, 163, 153, 61, 25, 392];
	// var numberOfFiles = [172, 179];
	// var numberOfFiles = [172, 179, 202];
	// var numberOfFiles = [172, 179, 202, 43, 19, 31];
	// sumOfFiles[x] = numberOfFiles[x] + numberOfFiles[x-1]+ ...+ 0
	var sumOfFiles = [0, 172, 351, 553, 596, 615, 646, 809, 962, 1023, 1048];
	// var sumOfFiles = [0, 172, 351, 553, 596, 615];

	// var newList =  {poems: []};
	var newList =  {sher: []};

	///////////////////////////
	//
	// We have to look into list(yamlObject).
        // const yamlFile = require('raw-loader!./../assets/lists/List_001.yaml');

	// calculate number of files inside a folder
	var total_files = 0;
	// var folderFiles = require(./../assets/poems/001/);


	/*
	folderFiles.keys().forEach(function (key) {
		total_files++;
	});
		console.log("total_files");
		console.log(total_files);
	*/


	// for (i=1; i<=172; i++){
	for (l=1; l<=numberOfFiles.length; l++){
	for (i=1; i<=numberOfFiles[l-1]; i++){
		if (l <=9 ){	// if l/books number is between 1-9
		if (i <= 9){
        		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!./assets/poems/00' + l + '/00' + l + '_00' + i + '.yaml');
      			yamlObject[i-1 + sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else if (i <= 99){
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!./assets/poems/00' + l + '/00' + l + '_0' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else {
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!./assets/poems/00' + l + '/00' + l + '_' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		}	// if l <= 9 ends
		else {	// else if l/books nubmer is between 10-11
		if (i <= 9){
        		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!./assets/poems/0' + l + '/0' + l + '_00' + i + '.yaml');
      			yamlObject[i-1 + sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else if (i <= 99){
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!./assets/poems/0' + l + '/0' + l + '_0' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else {
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!./assets/poems/0' + l + '/0' + l + '_' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}

		}	// else if l > 9 ends
}
}
// console.log("value of i: ");
// console.log(i);
			
/*
	// for (ii=1; ii<=179; ii++){
	for (ii=1; ii<=numberOfFiles[1]; ii++){
		if (ii <= 9){
        		yamlFile[i+ii-2] = require('raw-loader!./../assets/poems/002/002_00' + ii + '.yaml');
      			yamlObject[i+ii-2] = YAML.parse(yamlFile[i+ii-2]);
		}
		else if (ii <= 99){
	       		yamlFile[i+ii-2] = require('raw-loader!./../assets/poems/002/002_0' + ii + '.yaml');
      			yamlObject[i+ii-2] = YAML.parse(yamlFile[i+ii-2]);
		}
		else {
	       		yamlFile[i+ii-2] = require('raw-loader!./../assets/poems/002/002_' + ii + '.yaml');
      			yamlObject[i+ii-2] = YAML.parse(yamlFile[i+ii-2]);
		}
}
*/

// console.log("value of i+ii-3: ");
// console.log(i+ ii -3);

/*
	       		yamlFile[0] = require('raw-loader!./../assets/poems/002/002_001.yaml');
      			yamlObject[0] = YAML.parse(yamlFile[0]);

	       		yamlFile[1] = require('raw-loader!./../assets/poems/002/002_002.yaml');
      			yamlObject[1] = YAML.parse(yamlFile[1]);
*/

        // const yamlFile2 = require('raw-loader!./../assets/lists/List_002.yaml');
        // const yamlFile3 = require('raw-loader!./../assets/lists/List_003.yaml');
        // const yamlFile4 = require('raw-loader!./../assets/lists/List_004.yaml');

	
      	// var yamlObject = YAML.parse(yamlFile[0]);
      	// var yamlObject = YAML.parse(yamlFile[0]);
        // poemListSearch = yamlObject
      	// console.log("Value of yamlObject.name.text" + poemListSearch.name.text);
      	// console.log("Value of yamlObject.name.text" + yamlObject);
      	// console.log("Hello" + JSON.stringify(yamlObject.name[1].text));
      	// console.log("Hello" + JSON.stringify(yamlObject.sections[1].poems[0].poemName[0].text));

      	console.log("Testing");

// 'use strict';
/*

// const object = {'a': 1, 'b': 2, 'c' : 3};
for (const [key0, value0] of Object.entries(yamlObject.sections)) {
	// if (key0 == "poems")
		// for (const [key1, value1] of Object.entries(value0)) {
			// if (key1 == "poems")
		
  				// console.log(key1, value1);
				
  				console.log(key0, value0);
		
  		// console.log(key, value[1].poems[0].poemName[0].text);
		// }	// for
}	// for
*/
console.log(yamlObject.length);
for (k =0; k<yamlObject.length; k++){
// for (k =0; k<1; k++){
for (i=0; i<(yamlObject[k].sher).length; i++) {
	// if (JSON.stringify(yamlObject.sections[i]) == "poems")
	/* if (JSON.stringify('key' in yamlObject.sections[i]) == "poems")

      		console.log(yamlObject.sections[i]);
	else {
      		console.log("key");
      		console.log(yamlObject.sections[i]);
      		// console.log(key);
	}
	*/
	// if(Object.keys(yamlObject[k].sections[i]) == "poems"){
	// if(Object.keys(yamlObject[k].sections[i]) == "poems"){
		// console.log(Object.keys(yamlObject.sections[i]));
		// console.log(yamlObject.sections[i]);
		// for (j=0; j<(yamlObject[k].sher[i].sherContent).length; j++) {
			// if (JSON.stringify(yamlObject[k].sher[i].sherContent[j].text).match(listId)){
			// if (JSON.stringify(yamlObject[k].sher[i].sherContent[j].text).match(poemId)){
			if (JSON.stringify(yamlObject[k].sher[i].sherContent[0].text).match(poemId)){
				// newList['poems'].push(yamlObject.sections[1].poems[0]);
				// newList['poems'].push(yamlObject[k].sections[i].poems[j]);
				newList['sher'].push(yamlObject[k].sher[i]);
		
				console.log("Inside second for");
				// console.log(yamlObject[k].sections[i].poems[j].poemName[0].text);
				console.log(yamlObject[k].sher[i]);
				//if(Object.keys(yamlObject.sections[i]) == "poems")
				// console.log(yamlObject.sections[i]);
			//}
		}
	// }
}
}

      	console.log("Testing Finished");

return newList;

/*

	if ((JSON.stringify(yamlObject[0].sections[1].poems[0].poemName[0].text)).match(listId)){
      		console.log("Found");
		console.log(yamlObject[0].sections[1].poems[0]);
		// return yamlObject.sections[1].poems[0];
		// var newList = {poems : [yamlObject.sections[1].poems[0], yamlObject.sections[1].poems[0]]};
		// newList = {poems : [yamlObject.sections[1].poems[0], yamlObject.sections[1].poems[0]]};
		// var newList = [yamlObject.sections[1].poems[0]];
		// return yamlObject.sections[1].poems[0];
		return newList;
		// return yamlObject.sections[1];
	}
	else{
      		console.log("Not Found");
	}
	return {sher: []};



      	// console.log({yamlObject.name[0].text});
      	// console.log({yamlObject});
      	// console.log(yamlObject);
      	// console.log("Value of yamlObject.name.text" + poemListSearch);

        // poemListSearch = yamlObject
        // const yamlFile = require('raw-loader!./../assets/lists/' + listId + '.yaml');
        // require('./bgs/' + this.id + '.jpg')
        // console.log({yamlFile});
        // return (yamlFile + yamlFile2 + yamlFile3 + yamlFile4);
        // return yamlFile;
*/

  },
  getPoem (poemId) {
	var  YAML = require('yamljs');
        // const yamlFile = require('raw-loader!./' + listId + '.yaml');
	// split the stirng listId
	var arr = poemId.split("_");

	//print both parts of string
	console.log("arr[0]: " + arr[0]);
	console.log("arr[1]: " + arr[1]);


        // const yamlFile = require('raw-loader!./../assets/lists/' + listId + '.yaml');
        const yamlFile = require('!raw-loader!./assets/poems/' + arr[0] + '/' + poemId + '.yaml');
        // const yamlFile = require('raw-loader!./../assets/poems/001/001_001.yaml');
        console.log(yamlFile.default);
        return yamlFile.default;

  },

    getRecentSher (sherList) {
	var  YAML = require('yamljs');
	console.log("Inside getRecentSher");
	console.log(sherList);

	var newList =  {sher: []};
	var i;
	var sherArray = sherList.split(",");
	// for (i=0; i < (sherArray.length); i++){
	for (i=0; i < (sherArray.length - 1); i++){

	console.log("sherArray");
	console.log(sherArray);

	// var arr = sherList.split("_");
	// var arr = sherArray[0].split("_");
	var arr = sherArray[i].split("_");

        // const yamlFile = require('raw-loader!./../assets/poems/' + arr[0] + '/' + sherList + '.yaml');

        const yamlFile = require('!raw-loader!./assets/poems/' + arr[0] + '/' + arr[0] + '_' + arr[1] + '.yaml');

	/*
	console.log("Equal");
	if (arr[2] == 1)
		console.log("Equal");
	else	
		console.log("Not Equal");
	*/
	var sherIndex = arr[2] - 1;

	console.log("sherIndex");
	console.log(sherIndex);

	var yamlObject = YAML.parse(yamlFile.default);

	newList['sher'].push(yamlObject.sher[sherIndex]);
	}	// for number of total shers ends
	
	console.log("newList");
	console.log(newList);

	return newList;
	
	// var yamlSherObject = yamlObject.sher;
	// var yamlSpecificSher = yamlObject.sher[sherIndex].sherContent[0];
        // console.log("yamlObject: ");
        // console.log({yamlSherObject});

        // console.log("yamlSpecificSher: ");
        // console.log({yamlSpecificSher});
        // console.log(JSON.stringify({yamlObject.id}));

        // const yamlFile = require('raw-loader!./../assets/poems/001/001_001.yaml');
        // console.log({yamlFile});
        // return yamlFile;

/*
      	console.log("Testing");
'use strict';
console.log(yamlObject.length);
for (k =0; k<yamlObject.length; k++){
for (i=0; i<(yamlObject[k].sher).length; i++) {
			if (JSON.stringify(yamlObject[k].sher[i].sherContent[0].text).match(poemId)){
				newList['sher'].push(yamlObject[k].sher[i]);
				console.log("Inside second for");
				console.log(yamlObject[k].sher[i]);
		}
}
}
return newList;
  }
  
*/
},	// function getRecent Sher ends

    getSherDiscussion (sherGeneralDiscussionServerResponse) {	
	var  YAML = require('yamljs');
	return sherGeneralDiscussionServerResponse;

/*
	console.log("Inside getRecentSher");
	console.log(sherGeneralDiscussionServerResponse);
	var newList =  {sher: []};
	var i;
	// var sherArray = sherList.split(",");
	var sherArray = sherGeneralDiscussionServerResponse.split(",");
	for (i=0; i < (sherArray.length - 1); i++){
	console.log("sherArray");
	console.log(sherArray);
	var arr = sherArray[i].split("_");
        const yamlFile = require('raw-loader!./../assets/poems/' + arr[0] + '/' + arr[0] + '_' + arr[1] + '.yaml');
	var sherIndex = arr[2] - 1;
	console.log("sherIndex");
	console.log(sherIndex);
	var yamlObject = YAML.parse(yamlFile);
	newList['sher'].push(yamlObject.sher[sherIndex]);
	}	// for number of total shers ends
	console.log("newList");
	console.log(newList);
	return newList;
*/

	}	// function getSherDiscussion Sher
}	// default ends
