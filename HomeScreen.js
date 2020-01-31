/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   HomeScreen.js                                       */
/*  Purpose:    This file contains the user dashboard or home       */
/*              screen. Once a user has logged into their           */
/*              existing account this screen is displayed.          */
/*              It contains information such as previous orders     */
/*              and favorite items.                                 */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Image, TouchableOpacity,AppRegistry,View,Text,StyleSheet } from 'react-native';

export default class homeScreen extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Welcome',	
	});  
  
	profileView = () => {
  
		// Networking for sending user inputs to PHP server
		  fetch('http://csitrd.kutztown.edu/~smagr173/index.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  }
		  
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
			console.warn(responseJson);  // gets displayed as console msg
		   })
		 .catch((error)=>{
		 console.error(error);
		 });
	
	  }
  
	render(){
		return(
	 	 <View style={styles.container}>
	    <TouchableOpacity
 		 onPress={this.profileView}  // when pressed call the userRegister function
  		style={{marginTop:50,width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
  		alignItems:'center'}}>
  		<Text style={styles.buttonText}>View User</Text>
  		</TouchableOpacity>  

      </View>
		);
	}
} // end homeScreen component

const styles = StyleSheet.create({
	container:{
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor: 'white'
	},
	pageText: {
		margin:10,
		fontWeight:'bold',
		color:'gray',
		textAlign:'center',
		fontSize:15
	  },
	  buttonText: {
		fontWeight:'bold',
		color:'white',
		textAlign:'center',
		fontSize:14
	  }
});

AppRegistry.registerComponent('profile', () => profile);