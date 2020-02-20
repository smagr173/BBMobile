/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    Febuary 1, 2020                                     */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   SettingsScreen.js                                   */
/*  Purpose:    This file contains the user options for either      */
/*              logging out of an account or updating account       */
/*              information.                                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Image,StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {

  LogOut = () => {
    // Networking for logging out of the session
    fetch('http://csitrd.kutztown.edu/~smagr173/backend/log_out.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    
    }) // End fetch
      .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson == 0) {
            const {navigate} = this.props.navigation;
            navigate('Initial')  // Navigate to the initial screen if log out succeeds
          }
          else {
            console.warn(responseJson);
          }
        })
        .catch((error)=>{
        console.error(error);
        });
  }  // End log out function
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity  // Update information button
 	    	  onPress={() => navigate('Update')}  // When pressed navigate to the update info page
          style={{marginTop:20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,
          padding:10, justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
  	  	  <Text style={styles.buttonText}>Update Info</Text>
  	  	</TouchableOpacity> 

        <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

        <TouchableOpacity  // Log out button
          onPress={this.LogOut}  // When pressed, call the log out function
          style={{marginTop:20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
          justifyContent:'center',backgroundColor:'black', alignItems:'center'}}>
  	  	  <Text style={styles.buttonText}>Log Out</Text>
  	  	</TouchableOpacity>  
      </View>
    );  // End return 
  }  // End render
}  // End class component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  pageText: {
    margin:10,
    fontWeight:'bold',
    color:'gray',
    textAlign:'center',
    fontSize:12
  },
  buttonText: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
	  },
  link: {
    width: 100,
    padding: 10,
    alignItems: 'center'
  },
  divider: {
    marginTop: 25,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .003,
    marginBottom: 5,
    },
});