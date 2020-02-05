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
import { Keyboard, AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class register extends Component {
    
constructor(props) {
  super(props)
  this.state = {
    userFname: '',
    userLname: '',
    userEmail: '', 
    userPassword1: ''			
  }
}  // end constructor

// On text change userRegister gets called
// Inputs get sent as JSON to PHP file, error msgs sent back
userRegister = () => {
  
  const {userName} = this.state;
  const {userLname} = this.state;
  const {userEmail} = this.state;
  const {userPassword1} = this.state;
  
  // Networking for sending user inputs to PHP server
  fetch('http://csitrd.kutztown.edu/~smagr173/create_account.php', {
    method: 'POST',
    header: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },

    // Input values get converted to JSON here
    body: JSON.stringify({
      fname: this.state.userFname,
      lname: this.state.userLname,
      email: this.state.userEmail,
      password1: this.state.userPassword1,
    })
    
  })
  // handle response from PHP
  .then((response) => response.json())
    .then((responseJson) => {      // responseJson contains error msgs
      // this.saveItem('error', responseJson.error),
      if(responseJson == "User registered Successfully"){
        // redirect to profile page
       // alert("Success");
        const {navigate} = this.props.navigation;
     navigate('SignIn')
       // this.props.navigation.navigate("Home");
      }else{
       // alert("Errors");
        console.warn(responseJson);  // gets displayed as console msg
      }
      //console.warn(responseJson);  // gets displayed as console msg
    })
    .catch((error) => {
      console.error(error);
    });
    Keyboard.dismiss();
}

// display input fields and buttons
render() {
  const {navigate} = this.props.navigation;
  return (
  <View style={styles.container}>

    <Text style={styles.pageText}>Create a Bagel Bar account</Text>
    
  <TextInput
  placeholder="First Name"
  style={{marginTop:20,width:300,height:35,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText = {userFname => this.setState({userFname})}  // on event set value for userName
  />
  
  <TextInput
  placeholder="Last Name"
  style={{width:300,height:35,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText = {userLname => this.setState({userLname})}  // on event set value for userName
  />

  <TextInput
  placeholder="Email Address"
  style={{width:300,height:35,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userEmail => this.setState({userEmail})} // on event set value for email
  />
  
  <TextInput
  placeholder="Password"
  style={{marginBottom:27,width:300,height:35,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword1 => this.setState({userPassword1})} // on event set value for password1
  />

  <TouchableOpacity
  onPress={this.userRegister}  // when pressed call the userRegister function
  style={{width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
  alignItems:'center'}}>
  <Text style={styles.buttonText}>Create Account</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
  onPress={() => navigate('SignIn')}
  style={{marginBottom:260, width:100, padding:10, alignItems:'center'}}>
  <Text style={styles.pageText}>Sign In</Text>
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

AppRegistry.registerComponent('register', () => register);