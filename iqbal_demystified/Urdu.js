import React from "react";
import {TouchableHighlight, Alert, Button, View, Text, Image, StyleSheet } from 'react-native';
import {createBottomTabNavigator, createAppContainer } from "react-navigation";


// following are books in first tab - Urdu
import urduBook1 from './assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg';
import urduBook2 from './assets/android_app_assets/book_bang_ae_dara_urdu_1.jpg';
import urduBook3 from './assets/android_app_assets/book_armaghan_ae_hijaz_urdu_4.jpg';
import urduBook4 from './assets/android_app_assets/book_zarb_ae_kaleem_urdu_3.jpg';


class Urdu extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      signinConfirmation: "",
	      username: "", 
	      password: ""
	    }
	  }


    onSubmit = (bookNumber) => {
	  const { navigate } = this.props.navigation;
	
	  console.log('You are inside onSubmit Going to ListPoem');
	  // Alert.alert('You are inside onSubmit Going to ListPoem');
	  // Alert.alert('Value of this.state.username');
	  console.log('Value of this.state.username');
	  const localUsername = 'test2'
	  // Alert.alert(localUsername);
	  console.log(localUsername);
	  console.log('Value of this.state.signinConfirmation');
	  console.log(this.state.signinConfirmation);
	  navigate('ListPoem', {detailBook: bookNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password});
	  // Alert.alert('You are inside onSubmit');
	/*
          this.props.navigation({
                    pathname: '/ListPoem',
                    state: { detailBook: bookNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
          })
	*/
        }


        componentDidMount() {
                try {
                        this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
                        this.setState({username: this.props.navigation.getParam('profileUsername')});
                        this.setState({password: this.props.navigation.getParam('profilePassword')});
                }
                catch(e) {
                        // Alert.alert("Inside catch");
                        console.log("Inside catch");
                        console.log("Error");
                        console.log(e);
                }
        }
  render() {
/*

	<View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
	<View sytle={styles.RowSpace}>
		<TouchableHighlight onPress={()=> this.onSubmit("List_002")}>	
			<Image style={styles.RowImage} source={urduBook1} />
		</TouchableHighlight>
	</View>
	<View sytle={styles.RowSpace}>
		<TouchableHighlight onPress={()=> this.onSubmit("List_001")}>	
			<Image style={styles.RowImage} source={urduBook2} />
		</TouchableHighlight>
	</View>
	</View>
      <View style={{flex: 1, flexDirection: 'row'}}>
	<View sytle={styles.RowSpace}>
		<TouchableHighlight onPress={()=> this.onSubmit("List_004")}>	
			<Image style={styles.RowImage} source={urduBook3}/>
		</TouchableHighlight>
	</View>
	<View sytle={styles.RowSpace}>
		<TouchableHighlight onPress={()=> this.onSubmit("List_003")}>	
			<Image style={styles.RowImage} source={urduBook4}/>
		</TouchableHighlight>
	</View>
      </View>
	</View>

*/
    return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
	<View style={{flex: 1, flexDirection: 'column'}}>

	      <View style={{flex: 1, flexDirection: 'row', padding: 1,  justifyContent: 'space-around'}}>

			<TouchableHighlight style={styles.HighlightProperties} onPress={() =>this.onSubmit("List_002")} >
				<Image style={styles.RowImage} resizeMode='contain' source={urduBook1}/>
			</TouchableHighlight>


			<TouchableHighlight  style={styles.HighlightProperties} onPress={() => this.onSubmit("List_001")}>
				<Image style={styles.RowImage} resizeMode="contain" source={urduBook2}/>
			</TouchableHighlight>


      </View>
	
	      <View style={{flex: 1, flexDirection: 'row', padding: 1,  justifyContent: 'space-around'}}>

			<TouchableHighlight style={styles.HighlightProperties} onPress={() =>this.onSubmit("List_004")} >
				<Image style={styles.RowImage} resizeMode='contain' source={urduBook3}/>
			</TouchableHighlight>


			<TouchableHighlight  style={styles.HighlightProperties} onPress={() => this.onSubmit("List_003")}>
				<Image style={styles.RowImage} resizeMode="contain" source={urduBook4}/>
			</TouchableHighlight>

      </View>
	</View>
      </View>
      </View>
	
    );
  }
}



const styles = StyleSheet.create({

  HighlightProperties: {
    flex: 1,
    // alignItems: 'center',
    // width: 80, 
    // height: 80, 
    // width: undefined, 
    // height: undefined, 
    // width: null, 
    // height: null, 
	overflow: 'hidden', 
	alignItems: 'center', 
	// position: 'relative', 
	margin: 10
},

  RowSpace: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    margin: 15 

  },

  RowImage: {
    flex: 1,
    // margin: 30,
    // width: 100, 
    // height: 200, 
    // resizeMode: 'contain'
  }
})


export default Urdu;
