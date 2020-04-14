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
import { Image,TouchableOpacity,View,Text,StyleSheet,ScrollView } from 'react-native';

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

	constructor(props) {
		super(props);
		    this.state = {
			   userName: '',
		    }
	}  // End constructor
 
	componentDidMount() {
		// Networking for retrieving the user information
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchRecord.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  },  
		}) // End fetch
		// Handle the response from PHP
		.then((response) => response.json())
		  .then((responseJson) => {
				this.setState ({ 
					userName: responseJson.fname,
        })
      })
      .catch((error)=>{
        console.log(error);
        });
	  }  // End componentDidMount

	render() {
		const {navigate} = this.props.navigation;
		return (
			<ScrollView style={styles.container}>
				<View style={{backgroundColor: 'white',width: Dimensions.get('window').width,
				      height: Dimensions.get('window').width*.35}}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
						<Image source={require('../assets/images/icon.png')}
  	   				 	 style={styles.image1} />
						<View style={{ marginLeft: 25, marginTop: -30}}>
					    	<Text style={styles.subtitle}>Welcome, {this.state.userName}!</Text>
						</View>
					</View>
				</View>

				<View style={{justifyContent: 'flex-end',backgroundColor: '#D8D8D8',width: Dimensions.get('window').width,
				      height: Dimensions.get('window').width*.7, borderTopWidth: 1.25, borderColor: '#404040'}}>
					<View style={{ alignItems: 'flex-start', marginLeft: 20, marginBottom: 10}}>
						<Text style={styles.bodyText}>Your orders</Text>
					</View>
					<View style={{ alignItems: 'center'}}>
						<View style={{width: Dimensions.get('window').width*.9, height: Dimensions.get('window').width*.6,
					  	    borderWidth: 2,borderColor: '#404040',borderRadius: 8}}>

						</View>
					</View>
				</View>
			</ScrollView>
		);  // End return
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white',
	},
	settingsIcon: {
		marginRight: 13,
	},
	  buttonText: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
	  },
	  image1: {
		marginLeft: 10,
		width: Dimensions.get('window').width *.3,
		height: '100%',
	  },
	  divider: {
		marginTop: 15,
		width: Dimensions.get('window').width *.8,
		height: Dimensions.get('window').width * .003,
		marginBottom: 30,
	  },
	  bodyText: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: Dimensions.get('window').height*.025,
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
		fontSize: Dimensions.get('window').height*.029,
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