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
import { AppRegistry, StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';

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

// On text change userSignIn gets called
// Inputs get sent as JSON to PHP file, error msgs sent back
SignIn = () => {
  
  const {userEmail} = this.state;
  const {userPassword} = this.state;
  
  // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/sign_in.php', {
    method:'POST',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      // we will pass our input data to server
      email: this.state.userEmail,
      password: this.state.userPassword
    })
    
  })
  .then((response) => response.json())
   .then((responseJson)=>{
     if(responseJson == "Success"){
       
       //alert("Successfully Login");
       // redirect to profile page
       const {navigate} = this.props.navigation;
    navigate('Home')
      // this.props.navigation.navigate("Home");
     }else{
      //alert("Errors");
      console.warn(responseJson);  // gets displayed as console msg
     }
   })
   .catch((error)=>{
   console.error(error);
   });
  
  
  Keyboard.dismiss();
}

// display input fields and buttons
render() {
  const {navigate} = this.props.navigation;
  return (
  <View style={styles.container}>
  <Text style={styles.pageText}>Sign into your Bagel Bar account</Text>

  <TextInput
  placeholder="Email Address"
  style={{marginTop:40,width:300,height:35,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userEmail => this.setState({userEmail})}  // on event set value for email
  />
  
  <TextInput
  placeholder="Password"
  style={{marginBottom:27,width:300,height:35,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword => this.setState({userPassword})}  // on event set value for password
  />
  

  <TouchableOpacity
  onPress={this.SignIn}   // when pressed call the userSignIn function
  style={{width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
  alignItems:'center'}}>
  <Text style={styles.buttonText}>Sign In</Text>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={() => navigate('Register')}
  style={{marginBottom:275, width:165, padding:10, alignItems:'center'}}>
  <Text style={styles.pageText}>Create Account</Text>
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
  backgroundColor: 'white',
},
pageText: {
  margin:10,
  fontWeight:'bold',
  color:'gray',
  textAlign:'center',
  fontSize:15
},
buttonText: {
  fontWeight:'bold',
  color:'white',
  textAlign:'center',
  fontSize:14
}
});

AppRegistry.registerComponent('SignIn', () => SignIn);