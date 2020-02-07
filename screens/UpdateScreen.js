/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    February 3, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   UpdateScreen.js                                     */
/*  Purpose:    This file contains input fields for viewing and     */
/*              updating user account information.                  */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {

  static navigationOptions = ({
    title: 'Update Info'   // displayed at top of screen
 }); 

 constructor(props) {
  super(props)
  this.state = {
    fName: null,
    lName: null,
    fnamePlace: '',
    lnamePlace: '',
  };
}  // end constructor

componentDidMount() {
  // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/update.php', {
    method:'POST',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    
  })
  .then((response) => response.json())
   .then((responseJson)=>{
    this.setState({ fName: responseJson.fname})
    this.setState({ lName: responseJson.lname})
   })
}

updateFields = () => {
  
  // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/update.php', {
    method:'POST',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      // we will pass our input data to server
      fNameUp: this.state.fName,
      lNameUp: this.state.lName,
    })
    
  })
  .then((response) => response.json())
   .then((responseJson)=>{
     if(responseJson.succ == "Success"){
      alert(responseJson.succ);
     }
     if(responseJson.FnameErr == "Valid first name is required") {
      this.setState({ fnamePlace: responseJson.FnameErr})
     }
     if(responseJson.LnameErr == "Valid last name is required") {
      this.setState({ lnamePlace: responseJson.LnameErr})
     }
     if(responseJson.fail == "Could not insert") {
      alert(responseJson.fail);
     }
   })
   .catch((error)=>{
   console.error(error);
   });
  Keyboard.dismiss();
}

handleFname = (text) => {
  this.setState({ fName: text })
}
handleLname = (text) => {
  this.setState({ lName: text })
}

  render() { 
   const { fName } = this.state;
   const { lName } = this.state;
   const { fnamePlace } = this.state;
   const { lnamePlace } = this.state;

      return (
      <View style={styles.container}>
      
      <Text style={styles.pageText}>Update your account information</Text>

     
      <Text style={styles.inputTop}>First name</Text>
      <TextInput
      autoCorrect={false}
      returnKeyType='done'
      placeholderTextColor="red"
      placeholder={fnamePlace}
      style={{paddingHorizontal:5,marginTop:8,width:300,height:35,margin:10, borderColor:"gray", 
      borderWidth:2}}	
      underlineColorAndroid="transparent"
      onChangeText={this.handleFname}
      value={fName}
      
     />

      <Text style={styles.inputTop}>Last name</Text>
     <TextInput
     autoCorrect={false}
     returnKeyType='done'
     placeholderTextColor="red"
    placeholder={lnamePlace}
     style={{paddingHorizontal:5,marginTop:8,width:300,height:35,margin:10, borderColor:"gray", 
     borderWidth:2}}	
     underlineColorAndroid="transparent"
     onChangeText={this.handleLname}
     value={lName}
     />

    <TouchableOpacity
    onPress={this.updateFields}   // when pressed call the userSignIn function
     style={{width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
     alignItems:'center'}}>
     <Text style={styles.buttonText}>Save</Text>
     </TouchableOpacity>

     <Text style={styles.divider}>_____________________________</Text>
     
     
     
     <Text style={styles.divider}>_____________________________</Text>
         </View>
       );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageText: {
    marginBottom:40,
    fontWeight:'bold',
    color:'gray',
    textAlign:'center',
    fontSize:20
  },
  link: {
    margin:10,
    fontWeight:'bold',
    color:'gray',
    textAlign:'center',
    fontSize:16
  },
  buttonText: {
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontSize:14
  },
  errorText: {
    fontWeight:'bold',
    color:'red',
    textAlign:'center',
    fontSize:15
  },
  divider: {
    fontWeight:'bold',
    color:'black',
    textAlign:'center',
    fontSize:17
  },
  buttonText: {
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontSize:14
  },
  inputTop: {
    marginRight:220,
    fontWeight:'bold',
    color:'black',
    fontSize:16,
  },
  });