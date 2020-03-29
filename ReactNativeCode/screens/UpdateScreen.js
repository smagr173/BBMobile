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
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {
  // Initialize default states for variables
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
        invalidLen: '',
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
        isLoading: true,
      };
  }  // End constructor

  // Gets the user information for input field values
  componentDidMount() {
    // Networking for retrieving the user information
    fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchRecord.php', {
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },  
    }) // End fetch
    // Handle the response from PHP
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState ({
          fName: responseJson.fname,
          lName: responseJson.lname,
          email: responseJson.email,
          isLoading: false,
        });
      })
  }  // End componentDidMount()

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
    fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/update.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      // Convert inputs to JSON
      body: JSON.stringify({
        fNameUp: this.state.fName,
        lNameUp: this.state.lName,
      })  
    })
    // Handle the response from PHP
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
    }  // End else
      Keyboard.dismiss();
  }

  // On text change updateEmail gets called
  // Inputs get checked, then sent as JSON to PHP file, error msgs sent back
  updateEmail = () => {
    const {email, pass} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (email!="" && pass!="" && reg.test(email) === false && pass.length < 6){
      this.setState({ invalidEmail: 'Email address must be valid'})
      this.setState({ emailPlace: 'Email address is required'})
      this.setState({ passPlace: 'Password is required'})
      this.setState({ currPlaceText: 'red'})
      this.setState({ invalidLen:'Password is at least 6 characters'})
      return false;
    }
    else if(pass.length < 6 && reg.test(email) === false && email!="" && pass!="") {
      this.setState({ invalidLen:'Password must be at least 6 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
    }
    else if(pass.length >= 6 && reg.test(email) === false && email!="") {
      this.setState({ invalidEmail: 'Email address must be valid'})
    }

    else if(pass.length < 6 && pass!="") {
      this.setState({ invalidLen:'Password is at least 6 characters'})
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
    else if(email=="" && pass.length < 6 && pass!="") {
      this.setState({ invalidLen:'Password must be at least 6 characters'})
      this.setState({ emailPlace: 'Email address is required'})
    }
    else if(pass.length < 6 && reg.test(email) === false && email!="" && pass!="") {
      this.setState({ invalidLen:'Password must be at least 6 characters'})
      this.setState({ invalidEmail: 'Email address must be valid'})
      return false;
    }
    else if(pass.length < 6 && pass!="") {
      this.setState({ invalidCombo:'Password is at least 6 characters'})
    }
    else{
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/updateEmail.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      // Convert inputs to JSON
      body: JSON.stringify({
        emailUp: this.state.email,
        currPass: this.state.pass,
      })
    })  // End fetch
    // Handle response from PHP
    .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.succ == "Successfully Updated"){
          alert(responseJson.succ);
        }
        if(responseJson.eErr == "Valid email address is required") {
          this.setState({ emailPlace: responseJson.eErr})
        }
        if(responseJson.eTaken == "The email address entered is already taken") {
          this.setState({ invalidEmail: responseJson.eTaken})
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
    }  // End else
      Keyboard.dismiss();
  }

  // On text change updatePass gets called
  // Inputs get checked, then sent as JSON to PHP file, error msgs sent back
  updatePass = () => {
    const {NewPass, pass2} = this.state;
    if(pass2.length < 6 && pass2!="" && NewPass.length < 6 && NewPass !="") {
      this.setState({ wrongCurr:'Current password is at least 6 characters'})
      this.setState({ invalidNew:'New password must be at least 6 characters'})
    }
    else if(pass2.length < 6 && pass2!="" && NewPass=="") {
      this.setState({ wrongCurr:'Current password is at least 6 characters'})
      this.setState({ newPassPlace:'New password is required'})
          this.setState({ newPassPlaceText: 'red'})
    }
    else if(NewPass.length < 6 && pass2=="" && NewPass!="") {
      this.setState({ invalidNew:'New password must be at least 6 characters'})
      this.setState({ passPlace2:'Current password is required'})
      this.setState({ curr2PlaceText: 'red'})
    }
    else if(NewPass.length >= 6 && pass2=="") {
      this.setState({ passPlace2:'Current password is required'})
      this.setState({ curr2PlaceText: 'red'})
    }
    else if(pass2.length >= 6 && NewPass=="") {
      this.setState({ newPassPlace:'New password is required'})
      this.setState({ newPassPlaceText: 'red'})
    }
    else if(pass2.length >= 6 && NewPass.length < 6 && NewPass != '') {
      this.setState({ invalidNew:'New password must be least 6 characters'})
    }
    else if(NewPass.length >= 6 && pass2.length < 6 && pass2 != '') {
      this.setState({ wrongCurr:'Current password is at least 6 characters'})
    }
    else {
    // Networking for sending user inputs to PHP server
    fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/updatePass.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      // Convert inputs to JSON
      body: JSON.stringify({
        currPass2: this.state.pass2,
        NewPass: this.state.NewPass,
      })
    })  // End fetch
    // Handle response from PHP
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
    }  // End else
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
    this.setState({ invalidEmail: ''})
  }
  handlePass= (text) => {
    this.setState({ pass: text })
    this.setState({ invalidCombo: ''})
    this.setState({ invalidPass: ''})
    this.setState({ invalidLen: ''})
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
    if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}
    const { fName } = this.state;
    const { lName } = this.state;
    const { fnamePlace } = this.state;
    const { lnamePlace } = this.state;
    const { email } = this.state;
    const { emailPlace } = this.state;
    const { passPlace } = this.state;
    const { invalidCombo } = this.state;
    const { invalidLen } = this.state;
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
          <TextInput  // Input field for first name
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor="red"
            placeholder={fnamePlace}
            style={{paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02, marginBottom:5}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleFname}  // On event, set the new value for first name
            value={fName}  // Set the input field value to the response from PHP
          />

          <Text style={styles.inputMiddle}>Last name</Text>
          <TextInput  // Last name input field
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor="red"
            placeholder={lnamePlace}
            style={{paddingHorizontal:5,marginTop:8,width:300,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleLname}  // On event, set the new value for last name
            value={lName}  // Set the input field value to the response from PHP
          />

          <TouchableOpacity  // Button for saving the name fields
            onPress={this.updateNames}   // When pressed call the updateNames function
            style={{marginTop:26,padding:10, justifyContent:'center',backgroundColor:'black',
            alignItems:'center', width: Dimensions.get('window').width*.5,height:Dimensions.get('window').height*.06}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />
     
          <Text style={styles.pageText}>Alter Your Email Address</Text>

          <Text style={styles.errorText}>{invalidCombo}</Text>
          
          <Text style={styles.inputAbove}>Email Address</Text>
          <TextInput  // Input field for email address
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor="red"
            placeholder={emailPlace}
            style={{marginBottom: 5,paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleEmail}  // On event, set the new value for email
            value={email}  // Set the input field value to the response from PHP
          />

          <Text style={styles.errorText}>{invalidEmail}</Text>

          <Text style={styles.inputMiddle}>Current Password</Text>
          <TextInput  // Input field for current password
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={currPlaceText}
            placeholder={passPlace}
            style={{marginBottom: 5,paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handlePass}  // On event, set value for current password
          />

          <Text style={styles.errorText}>{invalidLen}</Text>

          <TouchableOpacity  // Button for saving the email address field
            onPress={this.updateEmail}   // when pressed call the userSignIn function
            style={{marginTop:8,width: Dimensions.get('window').width*.5,height:Dimensions.get('window').height*.06,
            padding:10, justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

          <Text style={styles.pageText}>Alter Your Current Password</Text>

          <Text style={styles.inputAboveCurr}>Current Password</Text>
          <TextInput  // Input field for altering current password
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={curr2PlaceText}
            placeholder={passPlace2}
            style={{marginBottom: 5,paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handlePass2}  // On event, set value for the current password
          />

          <Text style={styles.errorText}>{wrongCurr}</Text>

          <Text style={styles.inputMiddle}>New Password</Text>
          <TextInput  // Input field for new password
            autoCorrect={false}
            returnKeyType='done'
            placeholderTextColor={newPassPlaceText}
            placeholder={newPassPlace}
            style={{marginBottom: 5,paddingHorizontal:5,marginTop:8,width:Dimensions.get('window').width*.75,
            height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray", borderWidth:2,
            fontSize:Dimensions.get('window').height*.02}}	
            underlineColorAndroid="transparent"
            onChangeText={this.handleNewPass}  // On event, set value for the new password
          />

          <Text style={styles.errorText}>{invalidNew}</Text>

          <TouchableOpacity  // Button for saving the password field
            onPress={this.updatePass}   // When pressed call the updatePass function
            style={{marginTop:8,width: Dimensions.get('window').width*.5,height:Dimensions.get('window').height*.06,
            padding:10, justifyContent:'center',marginBottom: Dimensions.get('window').height*.35,backgroundColor:'black',alignItems:'center'}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );  // End return
  }  // End render
}  // End class component

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
    marginBottom: 7,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
  },
  pageTextTop: {
    marginTop: 10,
    marginBottom: 18,
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
    fontSize: 16
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.02,
  },
  divider: {
    marginTop: 25,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .003,
    marginBottom: 20,
  },
  dividerBot: {
    marginTop: 10,
    marginBottom: Dimensions.get('window').height*.35,
    color: 'black',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.022,
  },
  inputAbove: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: Dimensions.get('window').height*.024,
  },
  inputMiddle: {
    marginTop: 6,
    fontWeight: 'bold',
    color: 'black',
    fontSize: Dimensions.get('window').height*.024,
  },
  inputAboveCurr: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: Dimensions.get('window').height*.024,
  },
});