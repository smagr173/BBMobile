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
import { Image, ActivityIndicator, TouchableOpacity, FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';

export default class SubMenu extends Component {
	render() {
		const {navigate} = this.props.navigation;
		return (
			<ScrollView style={styles.container}>
				<Image source={require('../assets/images/bagels.jpg')} style={styles.image1} />
				<View style={styles.categoryHeader}>
					<Text style={styles.categoryTitle}>Breakfast</Text>
				</View>
				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Classic Breakfast Bagelwiches</Text>
					<Text style={styles.subtitle}>With a wide selection of bagels, you can't go wrong with a classic</Text>
	  			</TouchableOpacity>

				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Speciality Breakfast Bagelwiches</Text>
					<Text style={styles.subtitle}>Available only at the Bagel Bar Cafe</Text>
	  			</TouchableOpacity>
				
				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Toasted Bagels, Split & Topped</Text>
					<Text style={styles.subtitle}>Your favorite bagel toasted and topped with your favorite spread</Text>
	  			</TouchableOpacity>

				<Image source={require('../assets/images/lox.jpg')} style={styles.image1} />
				<View style={styles.categoryHeader}>
					<Text style={styles.categoryTitle}>Lunch</Text>
				</View>
				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Lunch Bagelwiches</Text>
					<Text style={styles.subtitle}>The perfect lunch break sandwich</Text>
	  			</TouchableOpacity>
				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Pizza Bagels</Text>
					<Text style={styles.subtitle}>A Bagel Bar specialty: open-faced bagel with all kinds of goodies freshly oven-baked on top</Text>
	  			</TouchableOpacity>
				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Wraps</Text>
					<Text style={styles.subtitle}>12" wraps stuff with all kinds of goodness</Text>
	  			</TouchableOpacity>

				<Image source={require('../assets/images/coffeeTea.png')} style={styles.image1} />
				<View style={styles.categoryHeader}>
					<Text style={styles.categoryTitle}>Beverages</Text>
				</View>
				<TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Hot Coffees & Steamers</Text>
					<Text style={styles.subtitle}>Coffee, Espresso, and whatnot. And we've got plenty of whatnot to offer</Text>
	  		</TouchableOpacity>
        <TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Iced Coffees</Text>
					<Text style={styles.subtitle}>From cold brew to iced lattes, we've got your covered</Text>
	  		</TouchableOpacity>
        <TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Frozen Beverages</Text>
					<Text style={styles.subtitle}>Frappes, smoothies, and other frozen whatnot</Text>
	  		</TouchableOpacity>
        <TouchableOpacity
	 			 onPress={() => navigate('BreakfastDetail')}
	 			 style={styles.item}>
		
					<Text style={styles.title}>Teas & Tea Lattes</Text>
					<Text style={styles.subtitle}>Who knew you could do so much with tea?!</Text>
	  		</TouchableOpacity>
      		</ScrollView>
			
		);  // End return
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#404040',
	},
	categoryHeader: {
		backgroundColor: 'brown',
		width: Dimensions.get('window').width*.995,
		height: Dimensions.get('window').height*.1,
		alignSelf: 'center',
    marginBottom: Dimensions.get('window').width*.004,
    justifyContent: 'center'
	},
	categoryTitle: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.038,
		color: 'white',
		textAlign: 'center'
	  },
	image1: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width*.4,
		borderWidth: 2,
		borderColor: '#404040',
	  },
	item: {
		backgroundColor: '#202020',
		padding: 30,
		marginBottom: 1,
		alignItems: 'center',
	  },
	  title: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.028,
		color: 'white',
		alignItems: 'center',
		marginBottom: 5
	  },
	  subtitle: {
		color: 'darkgray',
		fontSize: Dimensions.get('window').height*.023,
		textAlign: 'center',
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
	  },
	  subtitleTop: {
		marginTop: 10,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.03,
		marginBottom: 0,
	  },
});