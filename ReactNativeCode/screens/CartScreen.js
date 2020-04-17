/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Filename:   CartScreen.js                                       */
/*  Purpose:    This file contains the user dashboard or home       */
/*              screen. Once a user has logged into their           */
/*              existing account this screen is displayed.          */
/*              It contains information such as previous orders     */
/*              and favorite items.                                 */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity,View,Text,StyleSheet,ActivityIndicator,FlatList,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CartScreen extends Component {
	constructor(props) {
		super(props)
		this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
		// Networking for retrieving the user information
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchCart.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			}
		  }) // End fetch
		  // Handle the response from PHP
		  .then((response) => response.json())
			.then((responseJson) => {
				this.setState({
				  isLoading: false,
				  dataSource: responseJson,
			});
		  })
		  .catch((error) => {
			  console.log(error);
		  });
		  }) // end listener event

		this.state = {
			isLoading: true,
			itemName: '',
			itemPrice: '',
			itemDescription: '',
			itemQuantity: '',
			newQuant: '',
			dataSource: ''
		}
	}

	componentDidMount() {
		// Networking for retrieving the user information
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchCart.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  }
		}) // End fetch
		// Handle the response from PHP
		.then((response) => response.json())
		  .then((responseJson) => {
			  this.setState({
				isLoading: false,
				dataSource: responseJson,
		  });
		})
		.catch((error) => {
			console.log(error);
		});
	}  // End componentDidMount()

	renderSeparator = () => {
		return (
		  <View
			style={{
			  backgroundColor: 'darkgray',
			  width: Dimensions.get('window').width *.9,
			  height: 1,
			  alignSelf: 'center',
			  marginTop: Dimensions.get('window').height*.02
			}}
		  />
		);
	};

	removeItem = (itemID) => {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/editCart.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
				item_id: itemID,
				task: 'delete'
			})
		  }) // End fetch
		  .then((response) => response.json())
			.then((responseJson) => {
				this.setState({
				  isLoading: false,
				  dataSource: responseJson,
			});
		  })
		  .catch((error) => {
			console.log(error);
		});
	};

	favItem = (name,price,option1,option2,extra1,extra2,extra3) => {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/addFav.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				price: price,
				option1: option1,
				option2: option2,
				extra1: extra1,
				extra2: extra2,
				extra3: extra3
			})
		  }) // End fetch
		  .then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.succ == 'Item has been favorited') {
					alert(responseJson.succ);
				}
				if (responseJson.succ == 'Item is already a favorite') {
					alert(responseJson.succ);
				}
				if (responseJson.succ == 'Please sign in to favorite an item') {
					alert(responseJson.succ);
				}
		  })
		  .catch((error) => {
			console.log(error);
		});
	};

	incrementQuantity = (itemID, itemQuant) => {
		var numQ = Number(itemQuant);
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/editCart.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
				item_id: itemID,
				newQuant: numQ+1,
				task: 'changeQ'
			})
		  }) // End fetch
		  .then((response) => response.json())
			.then((responseJson) => {
				this.setState({
				  isLoading: false,
				  dataSource: responseJson,
			});
		  })
		  .catch((error) => {
			console.log(error);
		});
	};
	decreaseQuantity = (itemID, itemQuant) => {
		var numQ = Number(itemQuant);
		if (numQ > 1) {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/editCart.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
				item_id: itemID,
				newQuant: numQ-1,
				task: 'changeQ'
			})
		  }) // End fetch
		  .then((response) => response.json())
			.then((responseJson) => {
				this.setState({
				  isLoading: false,
				  dataSource: responseJson,
			});
		  })
		  .catch((error) => {
			console.log(error);
		});
		}
	};

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20, backgroundColor: 'white'}}>
					<ActivityIndicator />
				</View>
			);
		}
		const {navigate} = this.props.navigation;
		if (this.state.dataSource != '') {
		return (
	 		<View style={styles.container}>
				<View style={{ backgroundColor: '#F0F0F0'}}>
					<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginBottom: 10}}>
						<View style={{ alignItems: 'flex-start'}}>
							<Text style={styles.title}>The Bagel Bar Cafe</Text>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end',marginRight: 20}}>
						    <Text style={styles.title}>View Location</Text>
						</View>
					</View>

					<View style={{ flexDirection: 'row', marginBottom: 15}}>
					  <View style={{ alignItems: 'flex-start'}}>
				    	<TouchableOpacity
          					onPress={() => navigate('Menu')}  // when pressed call the userRegister function
         					style={{width: Dimensions.get('window').width*.4,height:Dimensions.get('window').height*.057,padding:10,
							justifyContent:'center',backgroundColor:'#F0F0F0',alignItems:'center', borderColor: 'brown', borderWidth: 2.5, borderRadius: 8,
						 	marginTop: 10, marginLeft: 20, marginBottom: 10}}>
							<View style={{ justifyContent: 'center'}}>
         						<Text style={styles.buttonText2}>Add more items</Text>
							</View>
      		    		</TouchableOpacity>
					   </View>
					   <View style={{ flex: 1, alignItems: 'flex-end',marginRight: 50}}>
					  	 <TouchableOpacity
          					onPress={() => navigate('About')}  // when pressed call the userRegister function
         					style={{width: Dimensions.get('window').width*.15,height:Dimensions.get('window').height*.075,
							justifyContent:'center',backgroundColor:'white',alignItems:'center'}}>
								<Image source={require('../assets/images/mapThumb.jpg')} style={styles.image1} />
      		    		  </TouchableOpacity>
					   </View>
					</View>
				</View>
					<FlatList
						data={ this.state.dataSource }
						renderItem={({ item }) => (
						<View style={{marginTop: 5}}>
							<View style={{flexDirection: 'row'}}>
								<View style={{ alignItems: 'flex-start', marginLeft: Dimensions.get('window').width*.02}}>
									
										<Ionicons
											name={'ios-arrow-up'}
											size={Dimensions.get('window').height*.03}
											color={'#505050'}
											onPress={() => {this.incrementQuantity(item.item_id, item.quantity)}}
										/>
									
									<View style={{ marginLeft: Dimensions.get('window').width*.003}}>
										<Text style={styles.itemQuantity}>{item.quantity}</Text>
									</View>
									
										<Ionicons
											name={'ios-arrow-down'}
											size={Dimensions.get('window').height*.03}
											color={'#505050'}
											onPress={() => {this.decreaseQuantity(item.item_id, item.quantity)}}
										/>
									
								</View>
								<View style={{ flex: 1,alignItems: 'flex-start', justifyContent: 'center', marginLeft: Dimensions.get('window').width*.03, flexWrap: 'wrap'}}>
									<Text style={styles.itemName}>{item.name}</Text>
								</View>
								<View style={{ alignItems: 'flex-end',justifyContent: 'center'}}>
									<Text style={styles.itemPrice}>${(item.price*item.quantity).toFixed(2)}</Text>
								</View>
							</View>
							
							<View style={{ alignItems: 'flex-start', marginTop: -(Dimensions.get('window').height*.03)}}>
								<View style={{ marginLeft: Dimensions.get('window').width*.1 }}>
									<Text style={styles.itemOpts}>{item.option1}</Text>
								</View>
								<View style={{ marginLeft: Dimensions.get('window').width*.1 }}>
							        {(null != item.option2) ? <Text style={styles.itemOpts}>{item.option2}</Text> : null}
								</View>
								<View style={{ marginLeft: Dimensions.get('window').width*.1 }}>
							        {(null != item.extra1) ? <Text style={styles.itemOpts}>{item.extra1}</Text> : null}
								</View>
								<View style={{ marginLeft: Dimensions.get('window').width*.1}}>
							        {(null != item.extra2) ? <Text style={styles.itemOpts}>{item.extra2}</Text> : null}
								</View>
								<View style={{ marginLeft: Dimensions.get('window').width*.1 }}>
									{(null != item.extra3) ? <Text style={styles.itemOpts}>{item.extra3}</Text> : null}
								</View>
								<View style={{ marginLeft: Dimensions.get('window').width*.1 }}>
									{('' != item.notes) ? <Text style={styles.itemNotes}>{item.notes}</Text> : null}
								</View>
								<View style={{flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
									<View style={{marginLeft: Dimensions.get('window').width*.08}}>
										<TouchableOpacity
        									onPress={() => {this.removeItem(item.item_id)}}>
         									<Text style={styles.linkTextRem}>Remove</Text>
        								</TouchableOpacity>
									</View>
									<View style={{marginLeft: Dimensions.get('window').width*.06}}>
										<TouchableOpacity
        									onPress={() => {this.favItem(item.name,item.price,item.option1,item.option2,item.extra1,item.extra2,item.extra3)}}>
         									<Text style={styles.linkTextRem}>Favorite</Text>
        								</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
						)}
						ItemSeparatorComponent={this.renderSeparator}
						keyExtractor={item => item.item_id}
						
	 				/>
					
				<View style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white',
					height: Dimensions.get('window').height * .1, width: Dimensions.get('window').width, marginBottom: 10}}>
					<TouchableOpacity
          				onPress={() => navigate('Checkout')}  // when pressed call the userRegister function
         				style={styles.button}>
         				<Text style={styles.buttonText}>Continue to checkout</Text>
      		    	</TouchableOpacity>
				</View>
      		</View>
		);  // End return
		} // end if for cart not empty
		else {
			return (
			<View style={{flex: 1,backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
			<Text style={styles.subtitleEmpt}>Your bag is empty</Text>
          		<Text style={styles.bodyTextBottom}>View the menu to add an item</Text>

				<TouchableOpacity
          			onPress={() => navigate('Menu')}  // when pressed call the userRegister function
         			style={{width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
         			justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
         			<Text style={styles.buttonText}>View Menu</Text>
      		    </TouchableOpacity>
      		</View>
			)
		}
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
        flex: 1,
		backgroundColor: 'white'
	},
	image1: {
		width: '100%',
		height: '100%',
		borderColor: '#606060', borderWidth: 2.5, borderRadius: 8
	  },
	settingsIcon: {
		marginRight: 13,
	},
	item: {
		backgroundColor: 'white',
		padding: 15,
	},
	itemName: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	linkText: {
		color: 'blue',
		fontSize: Dimensions.get('window').height*.023,
	  },
	  linkTextRem: {
		color: 'blue',
		fontSize: Dimensions.get('window').height*.023,
	  },
	itemPrice: {
		marginRight: 18,
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	itemOpts: {
		fontSize: Dimensions.get('window').height*.023,
		color: '#303030',
	},
	itemNotes: {
		fontSize: Dimensions.get('window').height*.023,
		color: 'black',
	},
	itemQuantity: {
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	title: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.027,
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
	  buttonText2: {
		fontWeight: 'bold',
		color: 'brown',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.021,
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
	  button: {
		marginBottom: 10,
		width: Dimensions.get('window').width*.65,
		height: Dimensions.get('window').height*.065,
		padding: 10,
		justifyContent: 'center',
		backgroundColor: 'black',
		alignItems: 'center'
	  },
	  bodyTextBottom: {
		color: 'gray',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.026,
		marginBottom: 40,
	  },
	  subtitleEmpt: {
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.03,
		marginBottom: 10,
		marginTop: -20
	  },
});
