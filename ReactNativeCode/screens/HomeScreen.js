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
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity,AppRegistry,View,Text,StyleSheet } from 'react-native';

export default class homeScreen extends Component {
	static navigationOptions= ({navigation}) =>({ 
		title: 'Home',
		headerRight:
			<View style ={styles.settingsIcon}>
				<Ionicons
					name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
					size={Dimensions.get('window').height*.045}
					color={'brown'}
					onPress={() => navigation.navigate('Settings')}
				/>
			</View>
	});  
 
	render() {
		const {navigate} = this.props.navigation;
		return (
	 		<View style={styles.container}>
		  		<Text style={styles.divider}>_____________________________</Text>

				<TouchableOpacity
 	    			onPress={() => navigate('SignIn')}
  					style={{marginTop:20,width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
  	   				alignItems:'center'}}>
  	  				<Text style={styles.buttonText}>Sign In</Text>
  	  			</TouchableOpacity>  
      		</View>
		); // end return
	} // end render
} // end homeScreen component

const styles = StyleSheet.create({
	container: {
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor: 'white'
	},
	settingsIcon: {
		marginRight:13,
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
	  },
	  divider: {
		fontWeight:'bold',
		color:'black',
		textAlign:'center',
		fontSize:17
	  }
});

AppRegistry.registerComponent('profile', () => profile);