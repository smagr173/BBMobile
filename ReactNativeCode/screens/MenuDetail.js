/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Filename:   MenuDetail.js                                       */
/*  Purpose:    This file contains the user dashboard or home       */
/*              screen. Once a user has logged into their           */
/*              existing account this screen is displayed.          */
/*              It contains information such as previous orders     */
/*              and favorite items.                                 */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, TouchableOpacity, FlatList, View, Text, StyleSheet } from 'react-native';

export default class SubMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		}
	}
	renderSeparator = () => {
		return (
		  <View
			style={{
			  backgroundColor: '#404040',
			  width: Dimensions.get('window').width,
			  height: 1,
			}}
		  />
		);
	  };
	componentDidMount() {
		// Networking for retrieving the user information
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchMenu.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  },
		  body: JSON.stringify({
			category: global.category,
		  })
		}) // End fetch
		// Handle the response from PHP
		.then((response) => response.json())
		  .then((responseJson) => {
			  this.setState({
				isLoading: false,
				dataSource: responseJson
		  });
		})
		.catch((error) => {
			console.error(error);
		});
	  }  // End componentDidMount()

	  sendChoice(name,price,description) {
		global.itemName = name;
		global.itemPrice = price;
		global.itemDescription = description;
		const {navigate} = this.props.navigation;
        navigate('MenuModal') // Redirect to sign in page
	  }  // end SendChoice

	handleNotes = (text) => {
		this.setState({ itemNotes: text })
	  }

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20, backgroundColor: 'black'}}>
					<ActivityIndicator />
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<FlatList
					data={ this.state.dataSource }
					renderItem={({ item }) => (
						<TouchableOpacity
						    onPress={() => {this.sendChoice(item.name,item.price,item.description)}}
	  						style={styles.item}>
								<View style={{flexDirection: 'row'}}>
									<View style={{ flex: 1, alignItems: 'flex-start', flexWrap: 'wrap'}}>
										<Text style={styles.title}>{item.name}</Text>
									</View>
									<View style={{ alignItems: 'flex-end', marginLeft: Dimensions.get('window').width*.04}}>
										<Text style={styles.price}>${item.price}</Text>
									</View>
								</View>
								<View style={{ marginLeft: Dimensions.get('window').width*.01, marginRight: Dimensions.get('window').width*.1,
								marginTop: Dimensions.get('window').height*.01}}>
									<Text style={styles.subtitle}>{item.description}</Text>
								</View>
	  					</TouchableOpacity>	
					)}
					keyExtractor={item => item.id}
	 			/>
		    </View>	
		);  // End return
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#404040',
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	button: {
		marginBottom: 5,
		width: Dimensions.get('window').width*.55,
		height: Dimensions.get('window').height*.065,
		padding: 10,
		justifyContent: 'center',
		backgroundColor: 'black',
		alignItems: 'center'
	  },
	closeIcon: {
		marginTop: 17,
		marginLeft: 20
	},
	modalHeader: {
		backgroundColor: '#202020',
		width: Dimensions.get('window').width,
		height: '10%'
	},
	modalTitle: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.027,
		color: 'white',
		marginTop: 35,
	  },
	item: {
		backgroundColor: '#202020',
		padding: 15,
		marginTop:6,
		marginRight:6,
		marginLeft: 6,
		marginBottom: 0,
		margin: 20
	},
	title: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.028,
		color: 'white',
	},
	itemName: {
		marginTop: 15,
		marginLeft: 13,
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.028,
		color: 'black',
	},
	quantity: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.027,
		color: 'black',
	},
	itemDescription: {
		color: '#505050',
		fontSize: Dimensions.get('window').height*.023,
	},
	price: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'white'
	}, 
	subtitle: {
		color: 'darkgray',
		fontSize: Dimensions.get('window').height*.023,
	},
	buttonText: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
	  },
	divider: {
		marginTop: 15,
		marginBottom: 20,
		width: Dimensions.get('window').width *.95,
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