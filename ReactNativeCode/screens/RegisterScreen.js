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
import { Dimensions } from 'react-native';
import { Keyboard, AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class register extends Component {
  static navigationOptions = ({
    title: 'Register'  // displayed at top of screen
  });

  constructor(props) {
    super(props)
      this.state = {
        userFname: '',
        userLname: '',
        userEmail: '', 
        userPassword1: '',
        fnamePlace: 'First Name',	
        lnamePlace: 'Last Name',
        emailPlace: 'Email Address',
        passPlace: 'Password',
        invalidEmail: '',
        regFail: '',
        fnamePlaceText: 'gray',
        lnamePlaceText: 'gray',
        emailPlaceText: 'gray',
        passPlaceText: 'gray',
      }
  }  // end constructor

  // On text change userRegister gets called
  // Inputs get sent as JSON to PHP file, error msgs sent back
  userRegister = () => {
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/create_account.php', {
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
    
    }) // End fetch
    // handle response from PHP
    .then((response) => response.json())
      .then((responseJson) => {      // responseJson contains error msgs
        if(responseJson.suc == "Success") {
          const {navigate} = this.props.navigation;
          navigate('SignIn') // redirect to sign in page
        }
        if(responseJson.fnameErr == "First name is required") {
          this.setState({ fnamePlace: responseJson.fnameErr})
          this.setState({ fnamePlaceText: 'red'})
        }
        if(responseJson.lnameErr == "Last name is required") {
          this.setState({ lnamePlace: responseJson.lnameErr})
          this.setState({ lnamePlaceText: 'red'})
        }
        if(responseJson.eErr == "Email address is required") {
          this.setState({ emailPlace: responseJson.eErr})
          this.setState({ emailPlaceText: 'red'})
        }
        if(responseJson.passReq == "Password is required") {
          this.setState({ passPlace: responseJson.passReq})
          this.setState({ passPlaceText: 'red'})
        }
        if(responseJson.eTaken == "The email you entered is already being used") {
          this.setState({ invalidEmail: responseJson.eTaken})
        }
        if(responseJson.fail == "Register failed: Check connection") {
          this.setState({ regFail: responseJson.fail})
        }
      })
      .catch((error) => {
        console.error(error);
      });
      Keyboard.dismiss();
  }  // End userRegister

  handleEmail = (text) => {
    this.setState({ userEmail: text })
    this.setState({ invalidEmail: ''})
  }
  handlePass = (text) => {
    this.setState({ userPassword1: text })
  }
  handleFname = (text) => {
    this.setState({ userFname: text })
  }
  handleLname = (text) => {
    this.setState({ userLname: text })
  }

  // display input fields and buttons
  render() {
    const { fnamePlaceText } = this.state;
    const { lnamePlaceText } = this.state;
    const { emailPlaceText } = this.state;
    const { passPlaceText } = this.state;
    const { fnamePlace } = this.state;
    const { lnamePlace } = this.state;
    const { emailPlace } = this.state;
    const { passPlace } = this.state;
    const { invalidEmail } = this.state;
    const { regFail } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.pageText}>Create a Bagel Bar Account</Text>
    
        <Text style={styles.errorText}>{invalidEmail}</Text>
        <Text style={styles.errorText}>{regFail}</Text>

        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholder={ fnamePlace }
          placeholderTextColor={fnamePlaceText}
          style={{paddingHorizontal:5,marginTop:0,width:Dimensions.get('window').width*.75,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
          fontSize:Dimensions.get('window').height*.02}}	
          underlineColorAndroid="transparent"
          onChangeText = {this.handleFname}  // on event set value for userName
        />
  
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholder={ lnamePlace }
          placeholderTextColor={lnamePlaceText}
          style={styles.inField}	
          underlineColorAndroid="transparent"
          onChangeText = {this.handleLname}  // on event set value for userName
        />

        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholder={ emailPlace }
          placeholderTextColor={emailPlaceText}
          style={styles.inField}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handleEmail} // on event set value for email
        />
  
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholder={ passPlace }
          placeholderTextColor={passPlaceText}
          style={{paddingHorizontal:5,marginBottom:27,width:Dimensions.get('window').width*.75,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
          fontSize:Dimensions.get('window').height*.02}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handlePass} // on event set value for password1
        />

        <TouchableOpacity
          onPress={this.userRegister}  // when pressed call the userRegister function
          style={{width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
          justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => navigate('SignIn')}
          style={{marginBottom:260, width:Dimensions.get('window').width*.24, padding:10, alignItems:'center'}}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>

      </View>

    ); // end return
  } // end render
} // end register class component

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
inField: {
  paddingHorizontal:5,
  width:Dimensions.get('window').width*.75,
  height:Dimensions.get('window').height*.058,
  margin:10,
  borderColor:"gray",
  borderWidth:2,
  fontSize:Dimensions.get('window').height*.02,
},
pageText: {
  marginTop:35,
  marginBottom:10,
  fontWeight:'bold',
  color:'gray',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.025,
},
buttonText: {
  fontWeight:'bold',
  color:'white',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.021,
},
errorText: {
  fontWeight:'bold',
  color:'red',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.02,
},
link: {
  margin:10,
  fontWeight:'bold',
  color:'gray',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.024,
},
});

AppRegistry.registerComponent('register', () => register);