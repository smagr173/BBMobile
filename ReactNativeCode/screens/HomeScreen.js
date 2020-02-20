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
import { Image,TouchableOpacity,AppRegistry,View,Text,StyleSheet } from 'react-native';

export default class homeScreen extends Component {
	static navigationOptions= ({navigation}) =>({ 
		headerRight:
		// Settings icon at top of page on the right side
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
				<Text style={styles.subtitleTop}>Favorite Items</Text>
				<Text style={styles.bodyText}>You have not added any favorite items</Text>
				
				<Image source={require('../assets/images/divider.png')}
  	   			 style={styles.divider} />

				<Text style={styles.subtitle}>Order History</Text>
          		<Text style={styles.bodyTextBottom}>You have not placed an order yet</Text>

				<TouchableOpacity
          			onPress={() => navigate('Menu')}  // when pressed call the userRegister function
         			style={{width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
         			justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
         			<Text style={styles.buttonText}>View Menu</Text>
      		    </TouchableOpacity>
      		</View>
		);  // End return
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	settingsIcon: {
		marginRight: 13,
	},
	pageText: {
		margin: 10,
		fontWeight: 'bold',
		color: 'gray',
		textAlign: 'center',
		fontSize: 15
	  },
	  buttonText: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
	  },
	  divider: {
		marginTop: 15,
		width: Dimensions.get('window').width *.8,
		height: Dimensions.get('window').width * .003,
		marginBottom: 30,
	  },
	  bodyText: {
		color: 'gray',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
		marginBottom: 20,
	  },
	  bodyTextBottom: {
		color: 'gray',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
		marginBottom: 25,
	  },
	  subtitle: {
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.026,
		marginBottom: 10,
	  },
	  subtitleTop: {
		marginTop: 100,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.026,
		marginBottom: 10,
	  },
});

AppRegistry.registerComponent('profile', () => profile);