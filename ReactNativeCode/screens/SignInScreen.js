/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 20, 2020                                    */
/*  Filename:   SignInScreen.js                                     */
/*  Purpose:    This file contains the user sign in screen to       */
/*              log into an existing account. It allows the user    */
/*              to enter their email and password credentials       */
/*              into the input fields.                              */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { AppRegistry, StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';

export default class SignIn extends Component {
  // Initialize default states for variables
  constructor(props) {
    super(props)
      this.state = {
        userEmail: '', 
        userPassword: '',
        emailPlace: 'Email Address',
        passPlace: 'Password',
        invalidCombo: '',
        placeTextEmail: '#606060',
        placeTextPass: '#606060',
        invalidEmail: '',
        invalidPass: '',
      };
  }  // End constructor

  componentDidMount() {
		// Networking for retrieving the user information
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchRecord.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  }
		}) // End fetch
		// Handle the response from PHP
		.then((response) => response.json())
		  .then((responseJson) => {
        if(responseJson.email != null) {
			  this.setState({
				 userEmail: responseJson.email
      });
    }
		})
		.catch((error) => {
			console.error(error);
		});
	  }  // End componentDidMount()

// On text change userSignIn gets called
// Inputs get checked, then sent as JSON to PHP file, error msgs sent back
  SignIn = () => {
    const {userEmail,userPassword} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(userEmail=="" && userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'red'})
    }
    else if(userPassword.length < 6 && reg.test(userEmail) === false && userEmail!="" && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
    }
    else if(userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password is at least 6 characters'})
    }
    else if(userPassword.length >= 6 && reg.test(userEmail) === false && userEmail!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
    }

    else if(reg.test(userEmail) === false && userPassword=="" && userEmail!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ passPlace:'Password is required'})
      this.setState({ placeTextPass: 'red'})
      return false;
      }
    else if(userEmail=="" && userPassword=="") {
		  this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'red'})
      this.setState({ passPlace:'Password is required'})
      this.setState({ placeTextPass: 'red'})
    }
    else if(userEmail=="") {
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'red'})
    }
    else if(userPassword=="") {
      this.setState({ passPlace:'Password is required'})
      this.setState({ placeTextPass: 'red'})
    }
    else if(userEmail=="" && userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'red'})
    }
    else if(userPassword.length < 6 && reg.test(userEmail) === false && userEmail!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
    }
    else if(userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password is at least 6 characters'})
    }
    else{
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/sign_in.php', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // Inputs converted to JSON here
        email: this.state.userEmail,
        password: this.state.userPassword
      })
    
    }) // End fetch
    // Handle response from PHP
    .then((response) => response.json())
      .then((responseJson)=> {
       if(responseJson.succ == "Success"){
        // If the login succeeds, redirect to home page
        const {navigate} = this.props.navigation;
        navigate('Home')
        }
        if(responseJson.emailErr == "Email address is required") {
          this.setState({ emailPlace: responseJson.emailErr})
          this.setState({ placeTextEmail: 'red'})
        }
        if(responseJson.passErr == "Password is required") {
          this.setState({ passPlace: responseJson.passErr})
          this.setState({ placeTextPass: 'red'})
        }
        if(responseJson.incorrect == "Incorrect Email/Password Entry") {
          this.setState({ invalidCombo: responseJson.incorrect})
        }
      })
      .catch((error)=>{
      console.error(error);
      });
    } // end else
      Keyboard.dismiss();
  }

  handleEmail = (text) => {
    this.setState({ userEmail: text })
    this.setState({ invalidCombo: ''})
    this.setState({ invalidEmail: ''})
  }
  handlePass = (text) => {
    this.setState({ userPassword: text })
    this.setState({ invalidCombo: ''})
    this.setState({ invalidPass: ''})
  }

  // Display input fields and buttons
  render() {
    const {placeTextEmail} = this.state;
    const {placeTextPass} = this.state;
    const { emailPlace } = this.state;
    const { passPlace } = this.state;
    const { invalidCombo } = this.state;
    const { invalidEmail } = this.state;
    const { invalidPass } = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.pageText}>Sign in to your Bagel Bar Account</Text>

        <View style={{ alignItems: 'flex-start'}}>
          <Text style={styles.errorText}>{invalidCombo}</Text>
        </View>
        
        <View style={{ alignItems: 'center'}}>
        <TextInput   // Email input field
          autoCorrect={false}
          returnKeyType='done'
          placeholder={emailPlace}
          placeholderTextColor={placeTextEmail}
          style={{marginBottom: 5,paddingHorizontal:5,marginTop:7,width:Dimensions.get('window').width*.93,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
          fontSize:Dimensions.get('window').height*.023}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handleEmail}  // On event set value for email
          value= {this.state.userEmail}
        />
        </View>
        
        <View style={{ alignItems: 'flex-start'}}>
          <Text style={styles.errorText}>{invalidEmail}</Text>
        </View>

        <View style={{ alignItems: 'center'}}>
        <TextInput   // Password input field
          autoCorrect={false}
          returnKeyType='done'
          placeholderTextColor={placeTextPass}
          placeholder={passPlace} secureTextEntry={true}
          style={{marginTop:13,paddingHorizontal:5,marginBottom:5,width:Dimensions.get('window').width*.93,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
          fontSize:Dimensions.get('window').height*.023}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handlePass}  // On event set value for password
        />
        </View>

        <View style={{ alignItems: 'flex-start'}}>
          <Text style={styles.errorText}>{invalidPass}</Text>
        </View>

        <View style={{ alignItems: 'center'}}>
        <TouchableOpacity  // Button for sign in
          onPress={this.SignIn}   // When pressed call the userSignIn function
          style={{ marginTop: 20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
          justifyContent:'center',backgroundColor:'black', alignItems:'center',marginBottom:7}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity  // Create account link
          onPress={() => navigate('Register')}
          style={{padding:10, alignItems:'center'}}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
        </View>

      </View>    // End style view
    );  // End return
  }   // End render
}   // End SignIn class component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: Dimensions.get('window').height*.03
  },
  pageText: {
    marginBottom: Dimensions.get('window').height*.03,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
  },
  link: {
    margin: 10,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.023,
  },
  errorText: {
    color: 'red',
    marginLeft: Dimensions.get('window').width*.04,
    fontSize: Dimensions.get('window').height*.021,
  },
});

AppRegistry.registerComponent('SignIn', () => SignIn);