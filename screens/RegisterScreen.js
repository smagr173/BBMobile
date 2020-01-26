/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 15, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   RegisterScreen.js                                   */
/*  Purpose:    This file contains the user registration screen     */
/*              to create an account. It allows the user to         */
/*              enter their name, email, and password into the      */
/*              input fields. These credentials are then sent to    */
/*              a PHP file where they are entered into a database.  */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default class register extends Component {
  static navigationOptions = ({
    title: 'Register'   // displayed at top of screen
 });
    
constructor(props) {
  super(props)
  this.state = {
    userName: '',
    userEmail: '', 
    userPassword1: '',
    userPassword2: ''				
  }
}  // end constructor

// On text change userRegister gets called
// Inputs get sent as JSON to PHP file, error msgs sent back
userRegister = () => {
  
  const {userName} = this.state;
  const {userEmail} = this.state;
  const {userPassword1} = this.state;
  const {userPassword2} = this.state;
  
  fetch('http://csitrd.kutztown.edu/~smagr173/create_account.php', {
    method: 'POST',
    header: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },

    // Input values get converted to JSON here
    body: JSON.stringify({
      name: this.state.userName,
      email: this.state.userEmail,
      password1: this.state.userPassword1,
      password2: this.state.userPassword2,
    })
    
  })
  // handle response from PHP
  .then((response) => response.json())
    .then((responseJson) => {      // responseJson contains error msgs
      console.warn(responseJson);  // gets displayed as console msg
    })
    .catch((error) => {
      console.error(error);
    });

    //const {navigate} = this.props.navigation;
    //navigate('Home')
}

// display input fields and buttons
render() {
  return (
  <View style={styles.container}>
  <TextInput
  placeholder="Enter Name"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText = {userName => this.setState({userName})}  // on event set value for userName
  
  />
  
  <TextInput
  placeholder="Enter Email"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userEmail => this.setState({userEmail})} // on event set value for email
  />
  
  <TextInput
  placeholder="Enter Password"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword1 => this.setState({userPassword1})} // on event set value for password1
  />
  
  <TextInput
  placeholder="Re-enter Password"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword2 => this.setState({userPassword2})} // on event set value for password2
  />

  <TouchableOpacity
  onPress={this.userRegister}  // when pressed call the userRegister function
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Sign up</Text>
  </TouchableOpacity>
  

   </View>

 );
} // end render
} // end register class component

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

AppRegistry.registerComponent('register', () => register);