import React from 'react'
import { TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

// for formatting
// import './TabView1.css';

// import Divider from '@material-ui/core/Divider';

var  YAML = require('yaml');

class PoemPage extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
		  username: "",
		  password: "",
		  signinConfirmation: "",

		  listId: "List_001",
		  poemList: [],
		  poemNameUrdu: "",
		  poemNameEnglish: "",
		  poemText: [],
		  poemTextNew: [],
		  poemObjects: []
		}
	}

  onSubmit = (sherNumber) => {
	  this.props.navigation.navigate('SherTabs', {detailSher: sherNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});
	/*
	  this.props.history.push({
		    pathname: '/SherPage',
		    state: { detailSher: sherNumber , profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
	  })
	*/
	}

	getPoem (listId) {

		console.log("listId: " + listId);

    	var that = this;
	  // var response = StaticContentService.getPoem(listId);
	  StaticContentService.getPoem(listId).then(function(response){

	  console.log("response: ");
	  console.log(response);


	  var yamlObject = YAML.parse(response)
	  // this.poemList = yamlObject
	  // this.setState({poemList: yamlObject.name});
	    //
	  console.log("yamlObject : ")
	  console.log(yamlObject)

        let newArr = [yamlObject.sher]
        console.log("Value of newArr")
        console.log(newArr)
        console.log("newArr.sherContent[0].text")
        console.log(yamlObject.sher[0].sherContent[0].text)

          yamlObject.sher.map(el => {
	     try{
		    el.sherContent[0].text = el.sherContent[0].text.split('|')
		    console.log(el.sherContent[0].text)
	    }catch (err) {
		    		console.log("zero catch")
	    }
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) { 
		    		console.log("first catch")
				el.sherContent.push({"text": ["#translation missing", "#translation missing"]})

				console.log(el.sherContent[1].text)
	  }
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {
		    		console.log("second catch")
				el.sherContent.push({"text": ["#translation missing", "#translation missing"]})
				console.log(el.sherContent[2].text)
	    
	    }
            return el.sherContent = el.sherContent
          })


        console.log("Value of newArr")
        console.log(newArr)

        console.log("Value of newArr[0]")
        console.log(newArr[0])

        console.log("Value of newArr[1]")
        console.log(newArr[1])

        console.log("Value of newArr.length")
        console.log(newArr[0].length)

        that.setState({
            poemTextNew: newArr[0]
        })
		/*
	  for (var i=0; i<yamlObject.sher.length; i++) {

		  try {
		  	for (var j=0; j<yamlObject.sher[i].sherContent.length; j++){
					that.state.poemText.push({"text" : yamlObject.sher[i].sherContent[j].text[0], "id" : yamlObject.sher[i].id});
					that.state.poemText.push({"text" : yamlObject.sher[i].sherContent[j].text[1], "id" : yamlObject.sher[i].id});
				}
		  }
			catch(e) {
		    console.log("catch caught an error");
			}
	  }
	  	*/
	  that.setState({poemNameUrdu: yamlObject.heading[0].text});
	  that.setState({poemNameEnglish: yamlObject.heading[1].text});

	  console.log("poemNameUrdu: ");
	  console.log(yamlObject.heading[0].text);
	  console.log("poemNameEnglish: ");
	  console.log(yamlObject.heading[1].text);
	});

	}

	componentDidMount() {
		// window.scrollTo(0, 0)
	  // retrive the data
	 	try {

			this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
			this.setState({username: this.props.navigation.getParam('profileUsername')});
			this.setState({password: this.props.navigation.getParam('profilePassword')});

			let poemName = this.props.navigation.getParam('detailPoem');
			console.log("In poempage.js inside componentdidmount");
			this.getPoem(poemName);
		}
		catch(e) {
			console.log("Inside catch");
		}
	}

/*
	signMeIn = () => {

	  if (this.state.username == "") {
	  	this.props.history.push({
		    pathname: '/RegisterPage',
		    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
	  }
	}
*/


	render() {
	/*
		var item3 = this.state.poemTextNew.map( (item, index) =>
			<p key={item.index} onClick={() => this.onSubmit(item.id)}> {item.sherContent[0].text[0]}<br/>{item.sherContent[0].text[1]}<br/>{item.sherContent[1].text[0]}<br/>{item.sherContent[1].text[1]}</p>
		)
		let signinTag
		var signinMessageLocal = ""
		if (this.state.signinConfirmation  === "done") {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase()
		  signinTag = <button type="button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>
		}
		else {
			signinMessageLocal = "Sign In"
		  signinTag = <button type="button" class="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>
		}
	*/
/*

			<div>
			<div class="text-right">
				{signinTag}
			</div>
			<div class="tabTitle">


				<p>
					{this.state.poemNameUrdu}
				</p>

				<p>
					{this.state.poemNameEnglish}
				</p>
			</div>

				<div class="text-center listPoemPageText">
				{item3}
				</div>
			</div>
*/

		return (
      <View style={styles.MainContainer}>
			<View>
                                <Text style={styles.UrduTitle}>
					{this.state.poemNameUrdu}

                                </Text>
			</View>
			<View>
                                <Text style={styles.EnglishTitle}>
					{this.state.poemNameEnglish}
                                </Text>
			</View>
        <FlatList
          data={
		this.state.poemTextNew
          }
          // renderItem={({item}) => <View><Text style={styles.item} onClick={() => this.onSubmit(item.id)}>{item.sherContent[0].text[0]}</Text><Text>{item.sherContent[0].text[1]}</Text><Text>{item.sherContent[1].text[0]}</Text><Text>{item.sherContent[1].text[1]}</Text>}
          renderItem={({item}) => <TouchableHighlight onPress={() => this.onSubmit(item.id)}><View style={styles.RenderedView} ><View><Text style={styles.RenderedText}>{item.sherContent[0].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[0].text[1]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[0]}</Text></View><View><Text style={styles.RenderedText}>{item.sherContent[1].text[1]}</Text></View></View></TouchableHighlight>}
        />

      </View>

		)
	}	// render function ends

}	// class ends


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  RenderedView: {
    // height: 44,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  RenderedText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    // height: 44,
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
  },

  MainContainer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
  }, 
  UrduTitle : {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
   
   
  },
  EnglishTitle : {
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#FF0000',
   
  }
  
})

export default PoemPage
