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
  static navigationOptions = ({
    title: 'Sign In'  // displayed at top of screen
  });

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
      };
  }  // end constructor

// On text change userSignIn gets called
// Inputs get sent as JSON to PHP file, error msgs sent back
  SignIn = () => {
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/sign_in.php', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        email: this.state.userEmail,
        password: this.state.userPassword
      })
    
    }) // End fetch
    .then((response) => response.json())
      .then((responseJson)=> {
       if(responseJson.succ == "Success"){
        // redirect to home page
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
      Keyboard.dismiss();
  }

  handleEmail = (text) => {
    this.setState({ userEmail: text })
    this.setState({ invalidCombo: ''})
  }
  handlePass = (text) => {
    this.setState({ userPassword: text })
    this.setState({ invalidCombo: ''})
  }

  // display input fields and buttons
  render() {
    const {placeTextEmail} = this.state;
    const {placeTextPass} = this.state;
    const { emailPlace } = this.state;
    const { passPlace } = this.state;
    const { invalidCombo } = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.pageText}>Sign in to your Bagel Bar Account</Text>

        <Text style={styles.errorText}>{invalidCombo}</Text>

        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholder={emailPlace}
          placeholderTextColor={placeTextEmail}
          style={{paddingHorizontal:5,marginTop:17,width:Dimensions.get('window').width*.75,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
          fontSize:Dimensions.get('window').height*.02}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handleEmail}  // on event set value for email
        />
  
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholderTextColor={placeTextPass}
          placeholder={passPlace}
          style={{paddingHorizontal:5,marginBottom:27,width:Dimensions.get('window').width*.75,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
          fontSize:Dimensions.get('window').height*.02}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handlePass}  // on event set value for password
        />
  
        <TouchableOpacity
          onPress={this.SignIn}   // when pressed call the userSignIn function
          style={{ width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
          justifyContent:'center',backgroundColor:'black', alignItems:'center',marginBottom:7}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('Register')}
          style={{marginBottom:275, width:Dimensions.get('window').width*.43, padding:10, alignItems:'center'}}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>

      </View>    // end style view
    ); // end return
  }   // end render
}   // end SignIn class component

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
pageText: {
  marginBottom:10,
  fontWeight:'bold',
  color:'gray',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.025,
},
link: {
  margin:10,
  fontWeight:'bold',
  color:'gray',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.025,
},
buttonText: {
  fontWeight:'bold',
  color:'white',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.023,
},
errorText: {
  fontWeight:'bold',
  color:'red',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.02,
},
});

AppRegistry.registerComponent('SignIn', () => SignIn);