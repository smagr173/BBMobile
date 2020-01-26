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
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default class SignIn extends Component {
  static navigationOptions = ({
    title: 'Sign In'  // displayed at top of screen
 });
    
constructor(props) {
  super(props)
  this.state = {
    userEmail: '', 
    userPassword: ''	
  }
}  // end constructor

userSignIn = () => {
  
  const {userEmail} = this.state;
  const {userPassword} = this.state;
  
  fetch('http://csitrd.kutztown.edu/~smagr173/create_account.php', {
    method: 'POST',
    header: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },

    // Input values get converted to JSON here
    body: JSON.stringify({
      email: this.state.userEmail,
      password: this.state.userPassword,
    })
    
  })
  .then((response) => response.json())
    .then((responseJson) => {   // responseJson contains error msgs
      console.warn(responseJson);   // gets displayed as console msg
    })
    .catch((error) => {
      console.error(error);
    });

}

// display input fields and buttons
render() {
  return (
  <View style={styles.container}>
  
  <TextInput
  placeholder="Enter Email"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userEmail => this.setState({userEmail})}  // on event set value for email
  />
  
  <TextInput
  placeholder="Enter Password"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword => this.setState({userPassword})}  // on event set value for password
  />
  

  <TouchableOpacity
  onPress={this.userSignIn}   // when pressed call the userSignIn function
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Sign In</Text>
  </TouchableOpacity>
  
   </View>    // end style view

 );
}   // end render
}   // end SignIn class component

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
});

AppRegistry.registerComponent('SignIn', () => SignIn);