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
import { Ionicons } from '@expo/vector-icons';
import { AppRegistry, StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default class SignInScreen extends Component {
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
        emailErrOccur: false,
        passErrOccur: false,
        eyeIcon: "ios-eye",
        hidden: true
      };
  }  // End constructor

  componentDidMount() {
		// Networking for retrieving the user information
		fetch('https://smagr173.heliohost.us/public/fetchRecord.php', {
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
      this.setState({ placeTextEmail: 'brown'})
      this.setState({ passErrOccur: true })
    }
    else if(userPassword.length < 6 && reg.test(userEmail) === false && userEmail!="" && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ emailErrOccur: true })
      this.setState({ passErrOccur: true })
    }
    else if(userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password is at least 6 characters'})
      this.setState({ passErrOccur: true })
    }
    else if(userPassword.length >= 6 && reg.test(userEmail) === false && userEmail!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ emailErrOccur: true })
    }

    else if(reg.test(userEmail) === false && userPassword=="" && userEmail!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ passPlace:'Password is required'})
      this.setState({ placeTextPass: 'brown'})
      this.setState({ emailErrOccur: true })
      return false;
      }
    else if(userEmail=="" && userPassword=="") {
		  this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'brown'})
      this.setState({ passPlace:'Password is required'})
      this.setState({ placeTextPass: 'brown'})
    }
    else if(userEmail=="") {
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'brown'})
    }
    else if(userPassword=="") {
      this.setState({ passPlace:'Password is required'})
      this.setState({ placeTextPass: 'brown'})
    }
    else if(userEmail=="" && userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ placeTextEmail: 'brown'})
      this.setState({ passErrOccur: true })
    }
    else if(userPassword.length < 6 && reg.test(userEmail) === false && userEmail!="") {
      this.setState({ invalidPass:'Password must be at least 6 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ emailErrOccur: true })
      this.setState({ passErrOccur: true })
    }
    else if(userPassword.length < 6 && userPassword!="") {
      this.setState({ invalidPass:'Password is at least 6 characters'})
      this.setState({ passErrOccur: true })
    }
    else{
    // Networking for sending user inputs to PHP server
    fetch('https://smagr173.heliohost.us/public/sign_in.php', {
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
        const {navigate} = this.props.navigation;
        navigate('Home')
        }
        if(responseJson.emailErr == "Email address is required") {
          this.setState({ emailPlace: responseJson.emailErr})
          this.setState({ placeTextEmail: 'brown'})
        }
        if(responseJson.passErr == "Password is required") {
          this.setState({ passPlace: responseJson.passErr})
          this.setState({ placeTextPass: 'brown'})
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
    this.setState({ userEmail: text.replace(/\s/g, '') })
    this.setState({ invalidCombo: ''})
    this.setState({ invalidEmail: ''})
    this.setState({ emailErrOccur: false })
  }
  handlePass = (text) => {
    this.setState({ userPassword: text.replace(/\s/g, '') })
    this.setState({ invalidCombo: ''})
    this.setState({ invalidPass: ''})
    this.setState({ passErrOccur: false })
  }
  handleIcon = () => {
    this.state.eyeIcon != "ios-eye-off"
      ? this.setState({ eyeIcon: "ios-eye-off", hidden: false})
      : this.setState({ eyeIcon: "ios-eye", hidden: true})
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
        {(true == this.state.emailErrOccur) ?  <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholder={emailPlace}
          placeholderTextColor={placeTextEmail}
          style={{marginBottom: 5,paddingHorizontal:5,marginTop:7,width:Dimensions.get('window').width*.93,
          height:Dimensions.get('window').height*.058,margin:10, borderColor:"#FF5733",borderWidth:2,
          fontSize:Dimensions.get('window').height*.023}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handleEmail}  // On event set value for email
          value= {this.state.userEmail}
        /> : 
        
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
        }
        </View>
        
        <View style={{ alignItems: 'flex-start'}}>
          <Text style={styles.errorText}>{invalidEmail}</Text>
        </View>

        <View style={{ alignItems: 'center'}}>
        {(true == this.state.passErrOccur) ?  
        <View style={{ flexDirection: 'row', marginTop:13,paddingHorizontal:5,marginBottom:5,width:Dimensions.get('window').width*.93,
        height:Dimensions.get('window').height*.058,margin:10, borderColor:"#FF5733",borderWidth:2}}>
        <TextInput
          autoCorrect={false}
          returnKeyType='done'
          placeholderTextColor={placeTextPass}
          placeholder={passPlace} secureTextEntry={this.state.hidden}
          style={{flex: 1, fontSize:Dimensions.get('window').height*.023}}	
          underlineColorAndroid="transparent"
          onChangeText= {this.handlePass}  // On event set value for password
        /> 
        <View style={{ marginRight: Dimensions.get('window').width*.015, justifyContent: 'center'}}>
        <Ionicons
        name={this.state.eyeIcon}
        size={Dimensions.get('window').height*.043}
        color={'brown'}
        onPress={() => this.handleIcon()}
        />
        </View>
        </View>
        :

          <View style={{ flexDirection: 'row',marginTop:13,paddingHorizontal:5,marginBottom:5,
          width:Dimensions.get('window').width*.93, height:Dimensions.get('window').height*.058,borderColor:"gray",borderWidth:2}}>
            <TextInput   // Password input field
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={placeTextPass}
            placeholder={passPlace} secureTextEntry={this.state.hidden}
            style={{flex: 1, fontSize:Dimensions.get('window').height*.023}}	
            underlineColorAndroid="transparent"
            onChangeText= {this.handlePass}  // On event set value for password
            />
            <View style={{ marginRight: Dimensions.get('window').width*.015, justifyContent: 'center'}}>
            <Ionicons
			    	name={this.state.eyeIcon}
				    size={Dimensions.get('window').height*.043}
				    color={'brown'}
				    onPress={() => this.handleIcon()}
			      />
            </View>
          </View>
    
        }
        </View>

        <View style={{ alignItems: 'flex-start'}}>
          {('' != invalidPass) ? <Text style={styles.errorText}>{invalidPass}</Text> : null}
        </View>


        <View style={{ alignItems: 'flex-start'}}>
           <TouchableOpacity  // Button for sign in
           
          onPress={() => navigate('Forgot')}
           style={{marginTop: Dimensions.get('window').height*.015, marginLeft: Dimensions.get('window').width*.04, justifyContent:'center'}}>
          <Text style={{ color: '#4169E1',fontSize: Dimensions.get('window').height*.021,}}>Forgot password?</Text>
          </TouchableOpacity>
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
  },
  pageText: {
    marginTop: Dimensions.get('window').height*.03,
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
    color: '#FF5733',
    marginLeft: Dimensions.get('window').width*.04,
    fontSize: Dimensions.get('window').height*.021,
  },
});