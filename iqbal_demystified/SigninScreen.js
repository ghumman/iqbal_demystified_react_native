import React from 'react'

import RegisterPage from './RegisterPage'

import ForgotPasswordPage from './ForgotPasswordPage'

// for formatting
import './TabView1.css';

var $ = require('jquery')
window.jQuery = $

class Signin extends React.Component {

	constructor(props) {
		super(props)
		this.state ={

			errorMessage: '',
			username: '',
			password: '',
		  signinConfirmation: ""

		}

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	login() {
		if(this.state.username != "" && this.state.password != "") {
			this.try_login(this.state.username, this.state.password);
		} else {
			       	alert("A username and password must be present");
			       	this.setState({errorMessage : "A username and password must be present"});
		}       // else if user or password are empty ends
	}      // function login ends

	async try_login (inputUsername, inputPassword) {
  	try{
	    $.ajax({
	      url: 'https://www.icanmakemyownapp.com/iqbal/v3/login.php',
	      type: 'POST',
	      dataType: 'text',
	      data: {username: inputUsername, password: inputPassword},

	      success: (data, status, username, message) => {
	        console.log("data");
	        console.log(data);
	        if (data == "done")     {
	      		console.log("Successfully Logged in");
						this.setState({errorMessage : "Successfully Logged in"});
						this.setState({signinConfirmation: data})

						this.props.history.push({
						pathname: '/',
						state: { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation }
						})
	        }
	        else {
						this.setState({errorMessage : data});
	        }
	      }	// success function ends
			})	// ajax call ends

		}	// try ends
		catch(err){
			this.setState({errorMessage : "API call not successful"});
	    alert("inside catch err");
	    alert(err);
    }	// catch ends
	}	// async try_login ends

	handleChangeUsername(event) {
		this.setState({username: event.target.value})
	}

	handleChangePassword(event) {
		this.setState({password: event.target.value})
	}

	// handleSubmit
	handleSubmit(event) {
		this.login()
		event.preventDefault()
	}

	onSubmitRegister = () => {
		this.props.history.push({
			pathname: 'RegisterPage'
		})
	}

	onSubmitForgot = () => {
		this.props.history.push({
			pathname: 'ForgotPasswordPage'
		})
	}
	componentDidMount() {
		window.scrollTo(0, 0)
	}

	render() {
		return (
			<div class="text-center">
				<h1>Sign In</h1>
				<form onSubmit={this.handleSubmit}>

				  <label>
				    Username:
				    <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
				  </label>
				  <p></p>

				  <label>
				    Password:
				    <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
				  </label>
				  <p></p>

				  <input type="submit" value="SIGN IN" />
				</form>

				<p onClick={() => this.onSubmitForgot()}>
					I Forgot My Password!
				</p>

				<p onClick={() => this.onSubmitRegister()}>
					Do not have an account? {"\n"}
					Register Here
				</p>
				{this.state.errorMessage}
			</div>
		)
	}
}

export default Signin
