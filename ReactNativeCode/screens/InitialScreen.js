/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Filename:   InitialScreen.js                                    */
/*  Purpose:    This file contains the first screen that is shown   */
/*              to the user when they open the app. It contains     */
/*              links to create a new account or to sign into an    */
/*              existing account.                                   */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class InitialScreen extends Component {
  // Static logo at top of page
  static navigationOptions= ({navigation}) =>({ 
    headerRight:
			<View style={styles.navBar}>
          <Image source={require('../assets/images/bagelIcon.jpg')}
        style={styles.logo} />
			</View>
  });
  

  startSesh = () => {
  fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/startGuest.php', {
    method:'POST',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    }) // End fetch
    // Handle the response from PHP
    .then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.succ == "Success") {
      // If the add item succeeds, close modal
      const {navigate} = this.props.navigation;
      navigate('Menu') // Redirect to sign in page
    }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      // Image of the main logo and Bagel Bar name
      <View style={styles.container}>
        <Image source={require('../assets/images/mainLogo.png')}
  	      style={styles.image1} />
  
        <Image source={require('../assets/images/divider.png')}
  	    style={styles.divider} />
  
        <Image source={require('../assets/images/grayOrder.png')}
	      style={styles.image2} />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 43}}>
           <TouchableOpacity style={styles.topButton}  // Create account button
              onPress={this.startSesh}>
              <Text style={styles.buttonText}>View Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}  // Create account button
              onPress={() => navigate('Register')}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link}  // Sign in button
              onPress={() => navigate('SignIn')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
        </View>
      </View>  // end style container
    );
  }  // end render
}  // end component

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white'
},
linkText: {
  fontWeight: 'bold',
  color: 'gray',
  textAlign: 'center',
  fontSize: Dimensions.get('window').height*.025,
},
buttonText: {
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  fontSize: Dimensions.get('window').height*.022,
},
topButton: {
  marginBottom: 17,
  width: Dimensions.get('window').width*.55,
  height: Dimensions.get('window').height*.065,
  padding: 10,
  justifyContent: 'center',
  backgroundColor: 'black',
  alignItems: 'center'
},
button: {
  marginBottom: 10,
  width: Dimensions.get('window').width*.55,
  height: Dimensions.get('window').height*.065,
  padding: 10,
  justifyContent: 'center',
  backgroundColor: 'black',
  alignItems: 'center'
},
link: {
  padding: 10,
  alignItems: 'center',
},
image1: {
  marginTop: 30,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width * .5,
},
image2: {
  marginTop: Dimensions.get('window').height*.075,
  width: Dimensions.get('window').width * .63,
  height: Dimensions.get('window').width * .101
},
divider: {
  marginTop: Dimensions.get('window').height*.03,
  width: Dimensions.get('window').width *.5,
  height: Dimensions.get('window').width * .003,

},
navBar: {
  marginRight: Dimensions.get('window').width *.438,
},
logo: {
  width: Dimensions.get('window').width *.13,
  height: Dimensions.get('window').width * .094,
},

});