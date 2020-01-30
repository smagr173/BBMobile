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
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class InitialScreen extends Component {
  static navigationOptions = {
    title: 'Welcome!',    // displayed at top of screen
 };

render() {
  const {navigate} = this.props.navigation;
  return (
  <View style={styles.container}>
  <TouchableOpacity
  onPress={() => navigate('Menu')}
  style={{marginTop:300,marginBottom:25,height:47,width:300,padding:10,justifyContent:'center',backgroundColor:'black',
  alignItems:'center'}}>  
  <Text style={styles.buttonText}>View Menu</Text>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={() => navigate('Register')}
  style={{width:300,height:47,padding:10, justifyContent:'center',backgroundColor:'black',
  alignItems:'center'}}>
  <Text style={styles.buttonText}>Create Account</Text>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={() => navigate('SignIn')}
  style={{width:100, padding:10, alignItems:'center'}}>
  <Text style={styles.pageText}>Sign In</Text>
  </TouchableOpacity>

   </View>  // end style container
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
}
});