/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
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
import { Image,TouchableOpacity,View,Text,StyleSheet,ScrollView,FlatList,Modal } from 'react-native';

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
		super(props)

		this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
			// Networking for retrieving the user information
			fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchOrderInfo.php', {
				method:'POST',
				header:{
				  'Accept': 'application/json',
				  'Content-type': 'application/json'
				},
				body: JSON.stringify({
					option: 'Pending'
				})
			  }) // End fetch
			  // Handle the response from PHP
			  .then((response) => response.json())
				.then((responseJson) => {
					this.setState({
					  dataSource: responseJson,
				});
			  })
			  .catch((error) => {
				  console.log(error);
			  })
			  .then(() => {
				fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchOrderInfo.php', {
					method:'POST',
					header:{
					  'Accept': 'application/json',
					  'Content-type': 'application/json'
					},
					body: JSON.stringify({
						option: 'Complete'
					})
				  }) // End fetch
				  .then((response) => response.json())
					.then((responseJson) => {
						this.setState({
						  dataSource3: responseJson,
					});
				  })
				  .catch((error) => {
					  console.log(error);
				  });
				}) // end second then
				.then(() => {
					fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchFavs.php', {
						method:'POST',
						header:{
						  'Accept': 'application/json',
						  'Content-type': 'application/json'
						},
					  }) // End fetch
					  .then((response) => response.json())
						.then((responseJson) => {
							this.setState({
							  dataSource4: responseJson,
						});
					  })
					  .catch((error) => {
						  console.log(error);
					  });
					}) // end third then
			  }) // end listener event

		    this.state = {
			   userName: '',
			   dataSource: '',
			   dataSource2: '',
			   dataSource3: '',
			   dataSource4: '',
			   combineTotal: '',
			   isVisible: false,
			   order_ID: '',
			   date: '',
			   status:'',
			   time:'',
			   pickup:'',
			   completed: '',
			   visible: false,
			   visible2: false,
			   visible3: false,
			   subTotal: '',
			   salesTax: '',
			   combineTotal: '',
		    }
	}  // End constructor
 
	componentDidMount() {
		// Networking for retrieving the user information
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchRecord.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  }
		}) // End fetch
		// Handle the response from PHP
		.then((response) => response.json())
		  .then((responseJson) => {
				this.setState ({ 
					userName: responseJson.fname,
        });
      })
      .catch((error)=>{
        console.log(error);
		})
		.then(() => {
			fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchOrderInfo.php', {
				method:'POST',
				header:{
				  'Accept': 'application/json',
				  'Content-type': 'application/json'
				},
				body: JSON.stringify({
					option: 'Pending'
				})
			  }) // End fetch
			  .then((response) => response.json())
				.then((responseJson) => {
					this.setState({
					  dataSource: responseJson,
				});
			  })
			  .catch((error) => {
				  console.log(error);
			  });
			}) // end second then
			.then(() => {
				fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchOrderInfo.php', {
					method:'POST',
					header:{
					  'Accept': 'application/json',
					  'Content-type': 'application/json'
					},
					body: JSON.stringify({
						option: 'Complete'
					})
				  }) // End fetch
				  .then((response) => response.json())
					.then((responseJson) => {
						this.setState({
						  dataSource3: responseJson,
					});
				  })
				  .catch((error) => {
					  console.log(error);
				  });
				}) // end third then
				.then(() => {
					fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchFavs.php', {
						method:'POST',
						header:{
						  'Accept': 'application/json',
						  'Content-type': 'application/json'
						},
					  }) // End fetch
					  .then((response) => response.json())
						.then((responseJson) => {
							this.setState({
							  dataSource4: responseJson,
						});
					  })
					  .catch((error) => {
						  console.log(error);
					  });
					}) // end fourth then
	  }  // End componentDidMount

	  removeFav = (favID) => {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/removeFav.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
				sendID: favID,
			})
		  }) // End fetch
		  .then((response) => response.json())
			.then((responseJson) => {
				if (responseJson != '') {
					this.setState({
					  dataSource4: responseJson,
					})
				}
				else {
					this.setState({
						dataSource4: responseJson,
						visible3: false
					  });
				}
		  })
		  .catch((error) => {
			console.log(error);
		});
		alert("Favorite was removed");
	  }

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
		})
		.then(() => {
			fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchFavs.php', {
				method:'POST',
				header:{
				  'Accept': 'application/json',
				  'Content-type': 'application/json'
				},
			  }) // End fetch
			  .then((response) => response.json())
				.then((responseJson) => {
					this.setState({
					  dataSource4: responseJson,
				});
			  })
			  .catch((error) => {
				  console.log(error);
			  });
			}) // end second then
	};

	cancelOrder = () => {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/cancelOrder.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
			  sendOrder: this.state.order_ID,
			})
		  }) // End fetch
		  // Handle the response from PHP
		  .then((response) => response.json())
			.then((responseJson) => {
				this.setState({
				  dataSource: responseJson,
				  status: "Canceled",
				  visible: false
			});
		  })
		  .catch((error) => {
			  console.error(error);
		  })
		  .then(() => {
			fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchOrderInfo.php', {
				method:'POST',
				header:{
				  'Accept': 'application/json',
				  'Content-type': 'application/json'
				},
				body: JSON.stringify({
					option: 'Complete',
					visible2: true
				})
			  }) // End fetch
			  .then((response) => response.json())
				.then((responseJson) => {
					this.setState({
					  dataSource3: responseJson,
				});
			  })
			  .catch((error) => {
				  console.log(error);
			  });
			}) // end third then
			alert("Order #"+this.state.order_ID+" has been canceled");
	}

	renderSeparator = () => {
		return (
		  <View
			style={{
			  backgroundColor: 'darkgray',
			  width: Dimensions.get('window').width,
			  height: 2,
			  alignSelf: 'center',
			  marginTop: Dimensions.get('window').height*.02
			}}
		  />
		);
	};

	renderSeparator2 = () => {
		return (
		  <View
			style={{
			  backgroundColor: 'darkgray',
			  width: '90%',
			  height: 1,
			  alignSelf: 'center',
			  marginTop: 10
			}}
		  />
		);
	};

	renderFooter = () => {
		return (
			<View>
	 			<View style={{backgroundColor: 'darkgray',width: Dimensions.get('window').width *.75,height: 1,alignSelf: 'center',marginTop:13}}/>

                <View style={{flexDirection: 'row'}}>
					<View style={{ alignItems: 'flex-start', marginBottom: 5}}>
						<Text style={styles.itemQuantity}>Sales tax:</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end'}}>
						<Text style={styles.itemTax}>${this.state.salesTax}</Text>
					</View>
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={{ alignItems: 'flex-start'}}>
						<Text style={styles.itemQuantity}>Items subtotal:</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end'}}>
						<Text style={styles.itemPrice}>${this.state.subTotal}</Text>
					</View>
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={{ alignItems: 'flex-start'}}>
						<Text style={styles.itemQuantity}>Total:</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end'}}>
						<Text style={styles.itemPrice}>${this.state.combineTotal}</Text>
					</View>
				</View>
		    </View>
		);
	};

	showPrevOrders = () => {
		return (
			<View>
					<FlatList
						data={ this.state.dataSource3 }
						renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => { this.displayModal(true,item.orderID,item.date_placed,item.status,item.time_placed,
							                 null,item.completed_time,item.subtotal, item.combineTotal); }}>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Order number:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
         							<Text style={styles.orderNum}>{item.orderID}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Date:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
         								<Text style={styles.subtitle}>{item.date_placed} at {item.time_placed}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Status:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
         								<Text style={styles.subtitle}>{item.status}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									{(item.status == "Complete") ? <Text style={styles.subtitle}>Completed at:</Text> : null}
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
									{(item.status == "Complete") ? <Text style={styles.subtitle}>{item.completed_time}</Text> : null}
								</View>
							</View>

						</TouchableOpacity>
						)}
						keyExtractor={item => item.orderID}
						ItemSeparatorComponent={this.renderSeparator}
	 			    />
			
			</View>
		)
	}

	showFavs = () => {
			return (
				<View>
					<FlatList
						data={ this.state.dataSource4 }
						renderItem={({ item }) => (
						<View>
							<View style={{flexDirection: 'row'}}>
								<View style={{ flex: 1, alignItems: 'flex-start',flexWrap: 'wrap',marginLeft: Dimensions.get('window').width*.035,
												marginTop: Dimensions.get('window').height*.015, marginBottom: Dimensions.get('window').height*.007,}}>
									<Text style={styles.favName}>{item.name}</Text>
								</View>
								<View style={{ alignItems: 'flex-end', marginRight: Dimensions.get('window').width*.035,
												marginTop: Dimensions.get('window').height*.015, marginBottom: Dimensions.get('window').height*.007}}>
									<Text style={styles.favPrice}>${item.price}</Text>
								</View>
							</View>

							<View style={{ alignItems: 'flex-start'}}>
									<Text style={styles.favOpts}>{item.option1}</Text>
							</View>
							<View style={{ alignItems: 'flex-start'}}>
							        {(null != item.option2) ? <Text style={styles.favOpts}>{item.option2}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
							        {(null != item.extra1) ? <Text style={styles.favOpts}>{item.extra1}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
							        {(null != item.extra2) ? <Text style={styles.favOpts}>{item.extra2}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
									{(null != item.extra3) ? <Text style={styles.favOpts}>{item.extra3}</Text> : null}
							</View>

							<View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height*.01}}>
								<TouchableOpacity
									onPress={() => {this.removeFav(item.fav_id)}}>
										<Text style={styles.favLink}>Remove</Text>
								</TouchableOpacity>
							</View>
						</View>
						)}
						ItemSeparatorComponent={this.renderSeparator}
						keyExtractor={item => item.fav_id}
	 				    />
						 <View
							style={{
			 				 backgroundColor: 'darkgray',
			 				 width: Dimensions.get('window').width,
			  				height: 2,
			  				alignSelf: 'center',
			 				 marginTop: Dimensions.get('window').height*.02
							}}
		 					 />
				</View>
				
		)
	}

	handleFavPress = () => {
		if (this.state.visible3 == false && this.state.dataSource4 != '') {
			this.setState({ visible3: true, visible2: false, visible: false})
		}
		else {
			this.setState({ visible3: false })
		}
	}

	handleActPress = () => {
		if (this.state.visible == false && this.state.dataSource != '') {
			this.setState({ visible: true, visible2: false, visible3: false})
		}
		else {
			this.setState({ visible: false })
		}
	}

	handlePrevPress = () => {
		if (this.state.visible2 == false && this.state.dataSource3 != '') {
			this.setState({ visible2: true, visible: false, visible3: false })
		}
		else {
			this.setState({ visible2: false })
		}
	}

	showActOrders = () => {
		return (
			<View>
		<FlatList
		data={ this.state.dataSource }
		renderItem={({ item }) => (
		<TouchableOpacity
			onPress={() => { this.displayModal(true,item.orderID,item.date_placed,item.status,item.time_placed,item.pickup,null,item.subtotal,item.combineTotal); }}>
			<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
				<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
					<Text style={styles.subtitle}>Order number:</Text>
				</View>
				<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
					 <Text style={styles.orderNum}>{item.orderID}</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
				<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
					<Text style={styles.subtitle}>Date:</Text>
				</View>
				<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
						 <Text style={styles.subtitle}>{item.date_placed} at {item.time_placed}</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
				<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
					<Text style={styles.subtitle}>Status:</Text>
				</View>
				<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
						 <Text style={styles.subtitle}>{item.status}</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
				<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
					<Text style={styles.subtitle}>Estimated time:</Text>
				</View>
				<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
						 <Text style={styles.subtitle}>{item.pickup}</Text>
				</View>
			</View>

		</TouchableOpacity>
		)}
		keyExtractor={item => item.orderID}
		ItemSeparatorComponent={this.renderSeparator}
		ListFooterComponent={this.renderSeparator}
	 />
	 </View>
		)
	};

	expandOrder = () => {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchOrder.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
				getOrder: this.state.order_ID,
			})
		  }) // End fetch
		  .then((response) => response.json())
			.then((responseJson) => {
				this.setState({
				  dataSource2: responseJson,
			});
		  })
		  .catch((error) => {
			console.log(error);
		});
	};

	displayModal(show,orderNum,date,status,time,pickup,compTime,total,combTotal) {
		this.setState({isVisible: show, order_ID: orderNum, date: date, time: time, status: status,
					   dataSource2: '', pickup: pickup, completed: compTime, subTotal: total, salesTax: (total*.06).toFixed(2), combineTotal: combTotal})
	};

	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
				<Modal
            		animationType = {"fade"}
            		transparent={true}
					visible={this.state.isVisible}
					onShow={() => { this.expandOrder(); }}
					onRequestClose={() => { this.displayModal(false); }}
            	>
				<View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(100,100,100, 0.5)'}}>
					<View style={styles.modalView}>
						<View style={styles.modalTop}>
							<View style={{ alignItems: 'center'}}>
									<Text style={styles.modalTitle}>Order Details</Text>
							</View>
						</View>

						<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Order number:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
								
         								<Text style={styles.orderNum}>{this.state.order_ID}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Placed on:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
         								<Text style={styles.subtitle}>{this.state.date}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Time placed:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
         								<Text style={styles.subtitle}>{this.state.time}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									<Text style={styles.subtitle}>Status:</Text>
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
         								<Text style={styles.subtitle}>{this.state.status}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: Dimensions.get('window').height*.01}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									{(this.state.status == "Complete") ? <Text style={styles.subtitle}>Completed at:</Text> : null}
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
									{(this.state.status == "Complete") ? <Text style={styles.subtitle}>{this.state.completed}</Text> : null}
								</View>
							</View>
							<View style={{ flexDirection: 'row'}}>
								<View style={{ alignItems: 'flex-start',marginLeft: Dimensions.get('window').width*.035}}>
									{(this.state.status == "Pending" || this.state.status == "In Progress") ? <Text style={styles.subtitle}>Estimated time:</Text> : null}
								</View>
								<View style={{marginLeft: Dimensions.get('window').width*.02, alignItems: 'flex-start'}}>
									{(this.state.status == "Pending" || this.state.status == "In Progress") ? <Text style={styles.subtitle}>{this.state.pickup}</Text> : null}
								</View>
							</View>
							<View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height*.01}}>
								<TouchableOpacity
									onPress={() => {this.cancelOrder()}}>
										{(this.state.status == "Pending") ? <Text style={styles.orderNum}>Cancel Order</Text> : null}
								</TouchableOpacity>
							</View>
							<View style={{ justifyContent: 'center', backgroundColor: '#A9A9A9', width: Dimensions.get('window').width*.8,
				                height: Dimensions.get('window').height*.06,alignItems: 'center', marginTop: Dimensions.get('window').height*.02}}>
				
								<Text style={styles.subtitle}>Items Ordered</Text>
				
							</View>

						<FlatList
						data={ this.state.dataSource2 }
						renderItem={({ item }) => (
						<View>
							<View style={{flexDirection: 'row'}}>
								<View style={{ alignItems: 'flex-start'}}>
								    <Text style={styles.itemQuantity}>{item.quantity}</Text>
								</View>
								<View style={{ flex: 1, alignItems: 'flex-start',flexWrap: 'wrap'}}>
									<Text style={styles.itemName}>{item.name}</Text>
								</View>
								<View style={{ alignItems: 'flex-end'}}>
									<Text style={styles.itemPrice}>${(item.price*item.quantity).toFixed(2)}</Text>
								</View>
							</View>

							<View style={{ alignItems: 'flex-start'}}>
									<Text style={styles.itemOpts}>{item.option1}</Text>
							</View>
							<View style={{ alignItems: 'flex-start'}}>
							        {(null != item.option2) ? <Text style={styles.itemOpts}>{item.option2}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
							        {(null != item.extra1) ? <Text style={styles.itemOpts}>{item.extra1}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
							        {(null != item.extra2) ? <Text style={styles.itemOpts}>{item.extra2}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
									{(null != item.extra3) ? <Text style={styles.itemOpts}>{item.extra3}</Text> : null}
							</View>
							<View style={{ alignItems: 'flex-start'}}>
									{('' != item.notes) ? <Text style={styles.itemNotes}>{item.notes}</Text> : null}
							</View>
							<View style={{marginLeft: Dimensions.get('window').width*.08, marginTop: Dimensions.get('window').height*.01}}>
								<TouchableOpacity
        							onPress={() => {this.favItem(item.name,item.price,item.option1,item.option2,item.extra1,item.extra2,item.extra3)}}>
         								<Text style={styles.linkTextRem}>Favorite</Text>
        						</TouchableOpacity>
							</View>
						</View>
						)}
						ItemSeparatorComponent={this.renderSeparator2}
						keyExtractor={item => item.item_id}
						ListFooterComponent={this.renderFooter}
	 				    />
						
						<View style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white',
							height: Dimensions.get('window').height * .1, width: Dimensions.get('window').width*.8}}>
							<TouchableOpacity
          						onPress={() => { this.displayModal(false); }}
         						style={styles.button}>
         						<Text style={styles.buttonText}>Close</Text>
      		    			</TouchableOpacity>
						</View>

					</View>
				</View>
				</Modal>

				<View style={{backgroundColor: 'white',width: Dimensions.get('window').width,
				      height: Dimensions.get('window').width*.35, borderBottomWidth: 1.5, borderColor: 'black'}}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
						<Image source={require('../assets/images/icon.png')}
  	   				 	 style={styles.image1} />
						<View style={{ marginLeft: Dimensions.get('window').width*.09, marginTop: -(Dimensions.get('window').height*.05)}}>
					    	<Text style={styles.subtitle}>Welcome, {this.state.userName}!</Text>
						</View>
					</View>
				</View>

				<ScrollView>
				<TouchableOpacity
						onPress={() => { this.handleFavPress() }}
						style={{ justifyContent: 'center', backgroundColor: '#DCDCDC', width: Dimensions.get('window').width,
				                height: Dimensions.get('window').height*.1,alignItems: 'flex-start', borderBottomWidth: 2,borderColor: 'darkgray'}}>
					<View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width*.035}}>
						<Text style={styles.subtitle}>Favorites</Text>
					</View>
				</TouchableOpacity>

				{this.state.visible3 ? this.showFavs() : null}

				<TouchableOpacity
						onPress={() => { this.handleActPress() }}
						style={{ justifyContent: 'center', backgroundColor: '#DCDCDC', width: Dimensions.get('window').width,
				                height: Dimensions.get('window').height*.1,alignItems: 'flex-start', borderBottomWidth: 2,borderColor: 'darkgray'}}>
					<View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width*.035}}>
						<Text style={styles.subtitle}>Active Orders</Text>
					</View>
				</TouchableOpacity>

				{this.state.visible ? this.showActOrders() : null}

				<TouchableOpacity
						onPress={() => { this.handlePrevPress() }}
						style={{ justifyContent: 'center', backgroundColor: '#DCDCDC', width: Dimensions.get('window').width,
				                height: Dimensions.get('window').height*.1,alignItems: 'flex-start',borderBottomWidth: 1, borderColor: 'darkgray'}}>
					<View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width*.035}}>
						<Text style={styles.subtitle}>Previous Orders</Text>
					</View>
				</TouchableOpacity>

				{this.state.visible2 ? this.showPrevOrders() : null}

				<TouchableOpacity
						 onPress={() => navigate('Menu')}
						style={{ backgroundColor: '#F5F5F5', width: Dimensions.get('window').width,
				                height: Dimensions.get('window').height*.5, borderTopWidth: 1, borderColor: 'darkgray'}}>
					<View style={{ marginLeft:0, marginTop: Dimensions.get('window').height*.025,alignItems: 'center'}}>
						<Text style={styles.subtitle2}>Explore the Menu</Text>
					</View>
					<View style={{alignItems: 'center',marginTop: Dimensions.get('window').height*.022}}>
						<View style={{ backgroundColor: '#F5F5F5', width: Dimensions.get('window').width*.95,
				                height: Dimensions.get('window').height*.4, justifyContent: 'center'}}>
							<Image source={require('../assets/images/variety.jpeg')} style={styles.image2} />
						</View>
					</View>
				</TouchableOpacity>

				</ScrollView>
				
			</View>
		);  // End return
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white',
	},
	modalView: {
		width: Dimensions.get('window').width *.8,
		height: Dimensions.get('window').height *.8,
        backgroundColor: 'white',
	},
	modalTop: {
		width: Dimensions.get('window').width *.8,
		height: Dimensions.get('window').height *.08,
		backgroundColor: 'black',
		justifyContent: 'center'
	},
	settingsIcon: {
		marginRight: 13,
	},
	  buttonText: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.022,
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
	  image1: {
		marginLeft: 10,
		marginBottom: 5,
		width: Dimensions.get('window').width *.3,
		height: '100%',
	  },
	  image2: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderColor: '#DCDCDC',
		borderRadius: 8,
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
	  subtitle2: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: Dimensions.get('window').height*.026,
	  },
	  modalTitle: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: Dimensions.get('window').height*.03,
	  },
	  subtitleTop: {
		marginTop: 100,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.026,
		marginBottom: 10,
	  },
	  itemPrice: {
		marginTop: 10,
		marginRight: 18,
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	favPrice: {
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	itemOpts: {
		marginLeft: 42,
		fontSize: Dimensions.get('window').height*.023,
		color: '#303030',
	},
	favOpts: {
		fontSize: Dimensions.get('window').height*.023,
		color: '#303030',
		marginLeft: Dimensions.get('window').width*.05
	},
	itemNotes: {
		marginLeft: 42,
		fontSize: Dimensions.get('window').height*.023,
		color: 'black',
	},
	itemQuantity: {
		marginTop: 10,
		marginLeft: 12,
		marginRight: 10,
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	itemName: {
		marginTop: 10,
		marginBottom: 4,
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	favName: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	orderNum: {
		color: 'blue',
		fontSize: Dimensions.get('window').height*.029,
	},
	favLink: {
		color: 'blue',
		fontSize: Dimensions.get('window').height*.027,
	},
	itemTax: {
		marginTop: 10,
		marginRight: 18,
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	linkTextRem: {
		color: 'blue',
		fontSize: Dimensions.get('window').height*.023,
	  },
});