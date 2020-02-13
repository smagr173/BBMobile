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
import { Dimensions } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {
  static navigationOptions = ({
    title: 'Update Info'   // displayed at top of screen
  }); 

  constructor(props) {
    super(props)
      this.state = {
        fName: '',
        lName: '',
        fnamePlace: '',
        lnamePlace: '',
        email: '',
        pass: '',
        passPlace: 'Enter current password',
        emailPlace: '',
        invalidCombo: '',
        emailTaken: '',
        newPassPlace: 'Enter new password',
        passPlace2: 'Enter current password',
        pass2: '',
        NewPass: '',
        wrongCurr: '',
        newPassPlaceText: 'gray',
        currPlaceText: 'gray',
        curr2PlaceText: 'gray',
        invalidEmail: '',
        invalidNew: '',
      };
  }  // end constructor

  // Gets the user information for input field values
  componentDidMount() {
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/fetchRecord.php', {
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },  
    }) // end fetch
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ fName: responseJson.fname})
        this.setState({ lName: responseJson.lname})
        this.setState({ email: responseJson.email})
      })
  }

  updateNames = () => {
    const {fName,lName} = this.state;
    if(fName=="" && lName==""){
      this.setState({ fnamePlace: 'First name is required'})
      this.setState({ lnamePlace: 'Last name is required'})
    }
    else if(fName=="") {
      this.setState({ fnamePlace: 'First name is required'})
    }
    else if(lName=="") {
      this.setState({ lnamePlace: 'Last name is required'})
    }
    else {
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/update.php', {
      method:'POST',
      header: {
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
      .then((responseJson) => {
        if(responseJson.succ == "Successfully Updated"){
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
      .catch((error) => {
      console.error(error);
      });
    } // end else
      Keyboard.dismiss();
  }

  updateEmail = () => {
    const {email, pass} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (email!="" && pass!="" && reg.test(email) === false && pass.length < 8){
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ passPlace: 'Password is required'})
      this.setState({ currPlaceText: 'red'})
      this.setState({ invalidCombo:'Password is at least 8 characters'})
      return false;
    }
    else if(pass.length < 8 && reg.test(email) === false && email!="") {
      this.setState({ invalidPass:'Password must be at least 8 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
    }
    else if(pass.length >= 8 && reg.test(email) === false && email!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
    }

    else if(pass.length < 8 && pass!="") {
      this.setState({ invalidCombo:'Password is at least 8 characters'})
    }
    else if(reg.test(email) === false && pass=="" && email!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ passPlace:'Password is required'})
      this.setState({ currPlaceText: 'red'})
      return false;
    }
    else if(email=="" && pass=="") {
		  this.setState({ emailPlace: 'Email address is required'})
      this.setState({ passPlace:'Password is required'})
      this.setState({ currPlaceText: 'red'})
    }
    else if(email=="") {
      this.setState({ emailPlace: 'Email address is required'})
    }
    else if(pass=="") {
      this.setState({ passPlace:'Password is required'})
      this.setState({ currPlaceText: 'red'})
    }
    else if(email=="" && pass.length < 8 && pass!="") {
      this.setState({ invalidCombo:'Password must be at least 8 characters'})
      this.setState({ emailPlace: 'Email address is required'})
    }
    else if(pass.length < 8 && reg.test(email) === false && email!="") {
      this.setState({ invalidCombo:'Password must be at least 8 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
      return false;
    }
    else if(pass.length < 8 && pass!="") {
      this.setState({ invalidCombo:'Password is at least 8 characters'})
    }
    else{
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/updateEmail.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        emailUp: this.state.email,
        currPass: this.state.pass,
      })
    }) // end fetch
    .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.succ == "Successfully Updated"){
          alert(responseJson.succ);
        }
        if(responseJson.eErr == "Valid email address is required") {
          this.setState({ emailPlace: responseJson.eErr})
        }
        if(responseJson.eTaken == "The email address entered is already taken") {
          this.setState({ emailTaken: responseJson.eTaken})
        }
        if(responseJson.emptPass == "Current password is required") {
          this.setState({ passPlace: responseJson.emptPass})
          this.setState({ currPlaceText: 'red'})
        }
        if(responseJson.incorPass == "Invalid email/password combo") {
          this.setState({ invalidCombo: responseJson.incorPass})
        }
        if(responseJson.fail == "Could not insert") {
          alert(responseJson.fail);
        }
      })
      .catch((error)=>{
      console.error(error);
      });
    } // end else
      Keyboard.dismiss();
  }

  updatePass = () => {
    const {NewPass, pass2} = this.state;
    if(pass2.length < 8 && pass2!="" && NewPass.length < 8 && NewPass !="") {
      this.setState({ wrongCurr:'Current password is at least 8 characters'})
      this.setState({ invalidNew:'New password must be at least 8 characters'})
    }
    else if(pass2.length < 8 && pass2!="" && NewPass=="") {
      this.setState({ wrongCurr:'Current password is at least 8 characters'})
      this.setState({ newPassPlace:'New password is required'})
          this.setState({ newPassPlaceText: 'red'})
    }
    else if(NewPass.length < 8 && pass2=="" && NewPass!="") {
      this.setState({ invalidNew:'New password must be at least 8 characters'})
      this.setState({ passPlace2:'Current password is required'})
      this.setState({ curr2PlaceText: 'red'})
    }
    else if(NewPass.length >= 8 && pass2=="") {
      this.setState({ passPlace2:'Current password is required'})
      this.setState({ curr2PlaceText: 'red'})
    }
    else if(pass2.length >= 8 && NewPass=="") {
      this.setState({ newPassPlace:'New password is required'})
      this.setState({ newPassPlaceText: 'red'})
    }
    else if(pass2.length >= 8 && NewPass.length < 8 && NewPass != '') {
      this.setState({ invalidNew:'New password must be least 8 characters'})
    }
    else if(NewPass.length >= 8 && pass2.length < 8 && pass2 != '') {
      this.setState({ wrongCurr:'Current password is at least 8 characters'})
    }
    else {
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/updatePass.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        currPass2: this.state.pass2,
        NewPass: this.state.NewPass,
      })
    }) // end fetch
    .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.succ == "Successfully Updated"){
          alert(responseJson.succ);
        }
        if(responseJson.curErr == "Current password is required") {
          this.setState({ passPlace2: responseJson.curErr})
          this.setState({ curr2PlaceText: 'red'})
        }
        if(responseJson.newErr == "New password is required") {
          this.setState({ newPassPlace: responseJson.newErr})
          this.setState({ newPassPlaceText: 'red'})
        }
        if(responseJson.wrongPass == "Current password is incorrect") {
          this.setState({ wrongCurr: responseJson.wrongPass})
        }
        if(responseJson.fail == "Could not insert") {
          alert(responseJson.fail);
        }
      })
      .catch((error)=>{
      console.error(error);
      });
    } // end else
      Keyboard.dismiss();
  }

  handleFname = (text) => {
    this.setState({ fName: text })
  }
  handleLname = (text) => {
    this.setState({ lName: text })
  }
  handleEmail = (text) => {
    this.setState({ email: text })
    this.setState({ invalidCombo: ''})
    this.setState({ emailTaken: ''})
    this.setState({ invalidEmail: ''})
  }
  handlePass= (text) => {
    this.setState({ pass: text })
    this.setState({ invalidCombo: ''})
    this.setState({ invalidPass: ''})
  }
  handlePass2= (text) => {
    this.setState({ pass2: text })
    this.setState({ wrongCurr: ''})
  }
  handleNewPass= (text) => {
    this.setState({ NewPass: text })
    this.setState({ invalidNew: '' })
  }

  render() { 
    const { fName } = this.state;
    const { lName } = this.state;
    const { fnamePlace } = this.state;
    const { lnamePlace } = this.state;
    const { email } = this.state;
    const { emailPlace } = this.state;
    const { passPlace } = this.state;
    const { invalidCombo } = this.state;
    const { emailTaken } = this.state;
    const { passPlace2 } = this.state;
    const { newPassPlace } = this.state;
    const { wrongCurr } = this.state;
    const { newPassPlaceText } = this.state;
    const { currPlaceText } = this.state;
    const { curr2PlaceText } = this.state;
    const { invalidEmail } = this.state;
    const { invalidNew } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerContent}>
          <Text style={styles.pageTextTop}>Alter Your Name</Text>

          <Text style={styles.inputAbove}>First name</Text>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor="red"
            placeholder={fnamePlace}
            style={{paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02, marginBottom:5}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleFname}
            value={fName}
          />

          <Text style={styles.inputAbove}>Last name</Text>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor="red"
            placeholder={lnamePlace}
            style={{paddingHorizontal:5,marginTop:8,width:300,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleLname}
            value={lName}
          />

          <TouchableOpacity
            onPress={this.updateNames}   // when pressed call the userSignIn function
            style={{marginTop:26,padding:10, justifyContent:'center',backgroundColor:'black',
            alignItems:'center', width: Dimensions.get('window').width*.5,height:Dimensions.get('window').height*.06}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/divider.png'}}
  	   			style={styles.divider} />
     
          <Text style={styles.pageText}>Alter Your Email Address</Text>

          <Text style={styles.errorText}>{invalidCombo}</Text>
          <Text style={styles.errorText}>{emailTaken}</Text>
          <Text style={styles.errorText}>{invalidEmail}</Text>

          <Text style={styles.inputAbove}>Email Address</Text>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor="red"
            placeholder={emailPlace}
            style={{paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleEmail}
            value={email}
          />

          <Text style={styles.inputAbove}>Current Password</Text>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={currPlaceText}
            placeholder={passPlace}
            style={{paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handlePass}
          />

          <TouchableOpacity
            onPress={this.updateEmail}   // when pressed call the userSignIn function
            style={{marginTop:20,width: Dimensions.get('window').width*.5,height:Dimensions.get('window').height*.06,
            padding:10, justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/divider.png'}}
  	   			style={styles.divider} />

          <Text style={styles.pageText}>Alter Your Current Password</Text>

          <Text style={styles.errorText}>{wrongCurr}</Text>
          <Text style={styles.errorText}>{invalidNew}</Text>

          <Text style={styles.inputAboveCurr}>Current Password</Text>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={curr2PlaceText}
            placeholder={passPlace2}
            style={{paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handlePass2}
          />

          <Text style={styles.inputAbove}>New Password</Text>
          <TextInput
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={newPassPlaceText}
            placeholder={newPassPlace}
            style={{paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleNewPass}
          />

          <TouchableOpacity
            onPress={this.updatePass}   // when pressed call the userSignIn function
            style={{marginTop:20,width: Dimensions.get('window').width*.5,height:Dimensions.get('window').height*.06,
            padding:10, justifyContent:'center',marginBottom: Dimensions.get('window').height*.35,backgroundColor:'black',alignItems:'center'}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    ); // end return
  } // end render
} // end class component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    marginBottom:7,
    fontWeight:'bold',
    color:'gray',
    textAlign:'center',
    fontSize:Dimensions.get('window').height*.025,
  },
  pageTextTop: {
    marginTop:10,
    marginBottom:18,
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
    fontSize:Dimensions.get('window').height*.02,
  },
  divider: {
    marginTop:25,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .003,
    marginBottom:20,
  },
  dividerBot: {
    marginTop:10,
    marginBottom: Dimensions.get('window').height*.35,
    color:'black',
    textAlign:'center',
    fontSize:Dimensions.get('window').height*.025,
  },
  buttonText: {
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontSize:Dimensions.get('window').height*.022,
  },
  inputAbove: {
    fontWeight:'bold',
    color:'black',
    fontSize:Dimensions.get('window').height*.024,
  },
  inputAboveCurr: {
    marginTop: 10,
    fontWeight:'bold',
    color:'black',
    fontSize:Dimensions.get('window').height*.024,
  },
});