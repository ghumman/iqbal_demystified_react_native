import React from "react";
import { Alert, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class ListPoemScreen extends React.Component {
        constructor(props) {
    super(props);   
    this.state = {  
                
                        // following three are normally passed to every page
            username: "hello",
            password: "",
            signinConfirmation: "",
          
            pictures: [],
            listId: "List_001",
            poemList: [],
            poemListName: [],
            bookName: [],
            bookNameUrdu: "",
            bookNameEnglish: "",
            bookSections: [],
            onePoem: "",
            poemText: [],
            poemObjects: []
    }   // this.state ends
        }       // constructor ends
        componentDidMount() {
	// Alert.alert('inside componentDidMount')
	console.log('inside componentDidMount')
        // retrive the data
                try {
			console.log('value of this.props.navigation.getParam(profileSigninConfirmation)')
			console.log(this.props.navigation.getParam('profileSigninConfirmation'))
                        this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
	console.log('setState signin confirmation passed')
                        this.setState({username: this.props.navigation.getParam('profileUsername')});
	console.log('setState username passed')
                        this.setState({password: this.props.navigation.getParam('profilePassword')});
	console.log('setState password passed')
                        let bookName = this.props.navigation.getParam('detailBook');
	console.log('setState bookName passed')
                        this.getPoemList(bookName);
	console.log('setState getPoemList passed')
                }
                catch(e) {
                        // Alert.alert("Inside catch");
                        console.log("Inside catch");
                        console.log("Error");
                        console.log(e);
                }
        }

	getPoemList(bookName) {
		// Alert.alert('bookName reaceived is {bookname}')
		console.log('Inside getPoemList')
		console.log('bookName reaceived is {bookName}')
		// Alert.alert(bookname)
		console.log(bookName)
	}



  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>List Poem Page</Text>

        <Text>Username</Text>
        <Text>{this.state.username}</Text>
        {/*<Text>{this.state.navigation.getParam(profileUsername)}</Text>*/}
      </View>
    );
  }
}


export default ListPoemScreen;
