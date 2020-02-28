/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 20, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
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
        placeTextEmail: 'gray',
        placeTextPass: 'gray',
        invalidEmail: '',
        invalidPass: '',
      };
  }  // End constructor

// On text change userSignIn gets called
// Inputs get checked, then sent as JSON to PHP file, error msgs sent back
  SignIn = () => {
    const {userEmail,userPassword} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(userEmail=="" && userPassword.length < 8 && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 8 characters'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'red'})
    }
    else if(userPassword.length < 8 && reg.test(userEmail) === false && userEmail!="" && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 8 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
    }
    else if(userPassword.length < 8 && userPassword!="") {
      this.setState({ invalidPass:'Password is at least 8 characters'})
    }
    else if(userPassword.length >= 8 && reg.test(userEmail) === false && userEmail!="") {
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
    else if(userEmail=="" && userPassword.length < 8 && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 8 characters'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'red'})
    }
    else if(userPassword.length < 8 && reg.test(userEmail) === false && userEmail!="") {
      this.setState({ invalidPass:'Password must be at least 8 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
    }
    else if(userPassword.length < 8 && userPassword!="") {
      this.setState({ invalidPass:'Password is at least 8 characters'})
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

        <Text style={styles.errorText}>{invalidCombo}</Text>
        
        <TextInput   // Email input field
          autoCorrect={false}
          returnKeyType='done'
          placeholder={emailPlace}
          placeholderTextColor={placeTextEmail}
          style={{marginBottom: 5,paddingHorizontal:5,marginTop:7,width:Dimensions.get('window').width*.75,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
          fontSize:Dimensions.get('window').height*.02}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handleEmail}  // On event set value for email
        />
  
        <Text style={styles.errorText}>{invalidEmail}</Text>

        <TextInput   // Password input field
          autoCorrect={false}
          returnKeyType='done'
          placeholderTextColor={placeTextPass}
          placeholder={passPlace} secureTextEntry={true}
          style={{marginTop:13,paddingHorizontal:5,marginBottom:5,width:Dimensions.get('window').width*.75,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
          fontSize:Dimensions.get('window').height*.02}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handlePass}  // On event set value for password
        />

        <Text style={styles.errorText}>{invalidPass}</Text>
  
        <TouchableOpacity  // Button for sign in
          onPress={this.SignIn}   // When pressed call the userSignIn function
          style={{ marginTop: 20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
          justifyContent:'center',backgroundColor:'black', alignItems:'center',marginBottom:7}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity  // Create account link
          onPress={() => navigate('Register')}
          style={{marginBottom:275, width:Dimensions.get('window').width*.5, padding:10, alignItems:'center'}}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>

      </View>    // End style view
    );  // End return
  }   // End render
}   // End SignIn class component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageText: {
    marginBottom: 20,
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
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.02,
  },
});

AppRegistry.registerComponent('SignIn', () => SignIn);