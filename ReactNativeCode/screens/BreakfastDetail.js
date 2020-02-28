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
import { Image, Modal, ActivityIndicator, TouchableHighlight, TouchableOpacity, FlatList, View, Text, StyleSheet,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SubMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			modalVisible: false,
			itemID: '',
			itemName: '',
			itemPrice: '',
			itemDescription: '',
			itemQuantity: 1,
			calculatedPrice: ''
		}
	}
	incrementQuantity = () => {
		this.setState({ itemQuantity: this.state.itemQuantity + 1 });
	};
	decreaseQuantity = () => {
		const {itemQuantity} = this.state;
		if (itemQuantity > 1) {
		this.setState({
			itemQuantity: this.state.itemQuantity - 1,
		  });
		}
	};
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
			category: "Classic Breakfast Bagelwiches",
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

	  sendToCart = () => {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/addCart.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
			  name: this.state.itemName,
			  quantity: this.state.itemQuantity,
			  price: this.state.itemPrice,
			}) 
		  }) // End fetch
		  // Handle the response from PHP
		  .then((response) => response.json())
			.then((responseJson) => {
			if(responseJson.succ == "Success") {
				// If the add item succeeds, close modal
				this.setModalVisible(!this.state.modalVisible)
			}
			else {
				alert(responseJson.noRecord);
				this.setModalVisible(!this.state.modalVisible)
			}
		  })
		  .catch((error) => {
			  console.error(error);
		  });

	  }

	setModalVisible(visible,id,name,price,description) {
		this.setState({modalVisible: visible}),
		this.setState({itemID: id})
		this.setState({itemName: name})
		this.setState({itemPrice: price})
		this.setState({itemDescription: description})
		this.setState({calculatedPrice: price})
		this.setState({itemQuantity: 1})
    }

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20, backgroundColor: 'black'}}>
					<ActivityIndicator />
				</View>
			);
		}
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
					<FlatList
						data={ this.state.dataSource }
						renderItem={({ item }) => (
							<TouchableOpacity
	  							onPress={() => {
									this.setModalVisible(true,item.id,item.name,item.price,item.description)}}
	  							style={styles.item}>
									<View style={{flexDirection: 'row'}}>
										<View style={{ alignItems: 'flex-start'}}>
											<Text style={styles.title}>{item.name}</Text>
										</View>
										<View style={{ flex: 1, alignItems: 'flex-end'}}>
											<Text style={styles.price}>${item.price}</Text>
										</View>
									</View>
									<View style={{ marginLeft: 5, marginRight: 50, marginTop: 4}}>
										<Text style={styles.subtitle}>{item.description}</Text>
									</View>
	  						</TouchableOpacity>
							
						)}
						keyExtractor={item => item.id}
						
	 				/>
				<Modal
          			animationType="slide"
         			transparent={false}
         			visible={this.state.modalVisible}
         		>

				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>

						<View style={{flexDirection: 'row'}}>
							<View style ={styles.closeIcon}>
								<Ionicons
									name={'ios-close'}
									size={Dimensions.get('window').height*.075}
									color={'darkgray'}
									onPress={() => this.setModalVisible(!this.state.modalVisible)}
								/>
							</View>
											
							<View style={{ flex: 1,alignItems: 'center', marginRight: Dimensions.get('window').width *.08,}}>
								<Text style={styles.modalTitle}>Menu Item</Text>
							</View>
						</View>
					</View>

					<View style={{flexDirection: 'row'}}>
						<View style={{ alignItems: 'flex-start'}}>
							<Text style={styles.itemName}>{this.state.itemName}</Text>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end'}}>
							<Text style={styles.itemPrice}>${(this.state.calculatedPrice * this.state.itemQuantity).toFixed(2)}</Text>
						</View>
					</View>
					<View style={{ marginLeft: 18, margin: 5, marginBottom: Dimensions.get('window').height*.03, marginRight: 60}}>
						<Text style={styles.itemDescription}>{this.state.itemDescription}</Text>
					</View>
					<View style={{ flexDirection: 'row'}}>
						<View style={{ marginLeft: 13,}}>
							<Text style={styles.quantity}>Quantity</Text>
						</View>
						<View style={{ marginLeft: 25, marginTop: -7}}>
							<Ionicons
								name={'ios-remove-circle'}
								size={Dimensions.get('window').height*.055}
								color={'#505050'}
								onPress={this.decreaseQuantity}
							/>
						</View>
						<View style={{ marginLeft: 15, marginRight: 17}}>
							<Text style={styles.quantity}>{this.state.itemQuantity}</Text>
						</View>
						<View style={{ marginTop: -7}}>
							<Ionicons
								name={'ios-add-circle'}
								size={Dimensions.get('window').height*.055}
								color={'#505050'}
								onPress={this.incrementQuantity}
							
							/>
						</View>
					</View>
					<View style={{ alignItems: 'center'}}>
						<Image source={require('../assets/images/divider.png')}
  	   					style={styles.divider} />
           			</View>
					   <View style={{ marginLeft: 15, marginBottom: 7}}>
					   	<Text style={styles.quantity}>Special instructions</Text>
					   </View>
					   <View style={{ marginLeft: 5, marginBottom: 7}}>
					   <TextInput   // Email input field
        				  autoCorrect={false}
          				  returnKeyType='done'
         				 placeholder='Special instructions'
         				 placeholderTextColor='gray'
         				 style={{marginBottom: 5,paddingHorizontal:5,marginTop:7,width:Dimensions.get('window').width*.93,
         				 height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
         				 fontSize:Dimensions.get('window').height*.02}}	
          				underlineColorAndroid="transparent"
        				/>
							</View>
         		</View>
        		</Modal>
      	
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
    itemPrice: {
		marginTop: 15,
		marginRight: 13,
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	}, 
	price: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'white',
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