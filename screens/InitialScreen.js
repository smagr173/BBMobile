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
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default class InitialScreen extends Component {
  static navigationOptions = {
    title: 'Welcome!',    // displayed at top of screen
 };

render() {
  const {navigate} = this.props.navigation;
  return (
  <View style={styles.container}>

  <TouchableOpacity
  onPress={() => navigate('Register')}
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Create Account</Text>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={() => navigate('SignIn')}
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Sign In</Text>
  </TouchableOpacity>

   </View>
 );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
});