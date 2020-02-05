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
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class InitialScreen extends Component {

render() {
  const {navigate} = this.props.navigation;
  return (
  <View style={styles.container}>

  <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/MainLogo.png'}}
	 style={styles.image1} />
  
  <Text style={styles.divider}>_____________________________</Text>
  
  <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/Order.png'}}
	 style={styles.image2} />

  <TouchableOpacity style={styles.topButton}
  onPress={() => navigate('Menu')}>
  <Text style={styles.buttonText}>View Menu</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.button}
  onPress={() => navigate('Register')}>
  <Text style={styles.buttonText}>Create Account</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.link}
  onPress={() => navigate('SignIn')}>
  <Text style={styles.pageText}>Sign In</Text>
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
pageText: {
  margin:10,
  fontWeight:'bold',
  color:'gray',
  textAlign:'center',
  fontSize:17
},
buttonText: {
  fontWeight:'bold',
  color:'white',
  textAlign:'center',
  fontSize:15
},
topButton: {
  marginTop:130,
  marginBottom:25,
  height:47,
  width:300,
  padding:10,
  justifyContent:'center',
  backgroundColor:'black',
  alignItems:'center'
},
button: {
  width:300,
  height:47,
  padding:10,
  justifyContent:'center',
  backgroundColor:'black',
  alignItems:'center'
},
link: {
  width:100,
  padding:10,
  alignItems:'center'
},
image1: {
  width:360,
  height:210
},
image2: {
  marginTop:32,
  width:310,
  height:50
},
divider: {
  fontWeight:'bold',
  color:'black',
  textAlign:'center',
  fontSize:17
}

});