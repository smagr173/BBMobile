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
import { AppRegistry,View,Text,StyleSheet } from 'react-native';

export default class homeScreen extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Welcome',	
	});  
  
  
  
	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View style={styles.container}>	
	  
	   <Text style={styles.pageName}>profile</Text>
	   

      </View>
		);
	}
} // end homeScreen component

const styles = StyleSheet.create({
	container:{
		display:'flex',alignItems:'center',
		justifyContent:'center'
	},

	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},

	
});


AppRegistry.registerComponent('profile', () => profile);
