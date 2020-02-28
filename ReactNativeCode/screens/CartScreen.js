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
import { Image,TouchableOpacity,View,Text,StyleSheet,ActivityIndicator,FlatList } from 'react-native';

export default class CartScreen extends Component {


	

	render() {
		
		const {navigate} = this.props.navigation;
		return (
	 		<View style={styles.container}>
				<Text style={styles.subtitleTop}>Your bag is empty</Text>
				<Text style={styles.bodyTextBottom}>View the menu to add an item to your bag</Text>
				<Image source={require('../assets/images/divider.png')}
  	   			 style={styles.divider} />
          		
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
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	settingsIcon: {
		marginRight: 13,
	},
	item: {
		backgroundColor: 'white',
		padding: 15,
	},
	itemName: {
		marginTop: 15,
		marginLeft: 13,
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.028,
		color: 'black',
	},
	itemPrice: {
		marginTop: 15,
		marginRight: 13,
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
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
