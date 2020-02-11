/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   InitialScreen.js                                    */
/*  Purpose:    This file contains the first screen that is shown   */
/*              to the user when they open the app. It contains     */
/*              links to create a new account or to sign into an    */
/*              existing account.                                   */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class InitialScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/BagelTest.png'}}
  	    style={styles.image1} />
  
        <Text style={styles.divider}>_____________________________</Text>
  
        <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/Order.png'}}
	      style={styles.image2} />

        <TouchableOpacity style={styles.topButton}
          onPress={() => navigate('Register')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link}
          onPress={() => navigate('SignIn')}>
          <Text style={styles.linkText}>Sign In</Text>
        </TouchableOpacity>

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
  fontSize: Dimensions.get('window').height*.022,
},
topButton: {
  marginTop: 130,
  marginBottom: 10,
  width: Dimensions.get('window').width*.55,
  height: Dimensions.get('window').height*.065,
  padding: 10,
  justifyContent: 'center',
  backgroundColor: 'black',
  alignItems: 'center'
},
button: {
  width: 300,
  height: 47,
  padding: 10,
  justifyContent: 'center',
  backgroundColor: 'black',
  alignItems: 'center'
},
link: {
  width: Dimensions.get('window').width*.3,
  padding: 10,
  alignItems: 'center'
},
image1: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width * .5,
},
image2: {
  marginTop: 32,
  width: Dimensions.get('window').width * .63,
  height: Dimensions.get('window').width * .101
},
divider: {
  color: 'black',
  textAlign: 'center',
  fontSize: Dimensions.get('window').height*.021,
  marginBottom: 10,
}

});