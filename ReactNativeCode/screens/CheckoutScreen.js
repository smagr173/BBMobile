/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   CheckoutScreen.js                                   */
/*  Purpose:    This file contains the user dashboard or home       */
/*              screen. Once a user has logged into their           */
/*              existing account this screen is displayed.          */
/*              It contains information such as previous orders     */
/*              and favorite items.                                 */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity,View,Text,StyleSheet,TextInput,FlatList,ActivityIndicator } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

export default class CartScreen extends Component {
	static navigationOptions= ({navigation}) =>({ 
		headerLeft:
		<View style ={styles.closeIcon}>
			<Ionicons
			   name={'ios-close'}
			   size={Dimensions.get('window').height*.075}
			   color={'darkgray'}
			   onPress={() => navigation.navigate('Cart')}
			/>
		</View>
	});
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			itemName: '',
			itemPrice: '',
			itemDescription: '',
			itemQuantity: '',
			isDatePickerVisible: false,
			day: '',
			month: '',
			year: '',
			pickUpText: 'ASAP (15-20 mins)',
			newQuant: '',
			dataSource: '',
			promoCode: '',
			subTotal: '',
			salesTax: '',
		}
	}

	componentDidMount() {
		var dayVar = new Date().getDate();
		var monthVar = new Date().getMonth();
		var yearVar = new Date().getFullYear();
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
				dataSource: responseJson,
		  });
		}) // End first then
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/fetchCart.php', {
				method:'POST',
				header:{
				  'Accept': 'application/json',
				  'Content-type': 'application/json'
				},
				body: JSON.stringify({
					getCart: 'getTotal'
				  })
			  }) // End fetch
			  // Handle the response from PHP
			  .then((response) => response.json())
				.then((responseJson) => {
					this.setState({
					  subTotal: responseJson.toFixed(2),
					  salesTax: (responseJson*.06).toFixed(2),
					  combineTotal: (responseJson*.06+responseJson).toFixed(2),
					  isLoading: false,
				});
			})
		}) // End second then
		.catch((error) => {
			console.log(error);
		});
		this.setState({
			day: dayVar+4, //Current Date
			month: monthVar, //Current Month
			year: yearVar, //Current Year
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
			  marginTop: 10
			}}
		  />
		);
	};

	renderFooter = () => {
		return (
			<View>
	 			<View style={{backgroundColor: 'darkgray',width: Dimensions.get('window').width *.9,height: 1,alignSelf: 'center',marginTop:13}}/>

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

	handleCode = (text) => {
		this.setState({ promoCode: text })
	  }

	showDatePicker = (visible) => {
		this.setState({
			isDatePickerVisible: visible
	    });
	};
	  
	hideDatePicker = () => {
		this.setState({
			isDatePickerVisible: false
		});
	};
	  
	handleConfirm = date => {
		date = String(date).split(' ');
		var TimeType, hour, minutes, fullTime, str;
		str = date[4];
		// Getting current hour from Date object.
		hour = str.substring(0,2); 
		// Checking if the Hour is less than equals to 11 then Set the Time format as AM.
		if(hour <= 11) { 
			TimeType = 'AM'}
		else {
		  // If the Hour is Not less than equals to 11 then Set the Time format as PM.
		  TimeType = 'PM';}
		// IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
		if( hour > 12 ) {
			hour = hour - 12; }
		// If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
		if( hour == 0 ) {
			hour = 12; } 
		// Getting the current minutes from date object.
		minutes = str.substring(3,5);

		// Adding all the variables in fullTime variable.
		fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();

		this.setState({ pickUpText: date[1] + ' ' + date[2] + ', ' + fullTime});
	    this.hideDatePicker();
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
		return (
	 		<View style={styles.container}>
				<View style={{ backgroundColor: '#F0F0F0'}}>
					<View style={{ flexDirection: 'row',marginTop: 13, marginLeft: 10}}>
						<View style={{ alignItems: 'flex-start'}}>
							<Text style={styles.title}>Pickup, {this.state.pickUpText}</Text>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end', marginTop: -6}}>
							<TouchableOpacity style={styles.link}  // Sign in button
        						onPress={() => {this.showDatePicker(true)}}>
         						<Text style={styles.linkText}>Change</Text>
        					</TouchableOpacity>
						</View>
					</View>

					<View>
      					<DateTimePickerModal
       						isVisible={this.state.isDatePickerVisible}
							mode="time"
							minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes())}
							minuteInterval={15}
       						onConfirm={this.handleConfirm}
        					onCancel={this.hideDatePicker}
     					/>
    				</View>

					<View style={{ flexDirection: 'row', marginTop: 18, marginLeft: 10}}>
						<View style={{ alignItems: 'flex-start'}}>
					      <Text style={styles.PromoText}>Promo Code</Text>
						</View>
					    <View style={{ marginLeft: 7, marginBottom: 15,marginTop: -7}}>
								   <TextInput
									 autoCorrect={false}
									   returnKeyType='done'
									  placeholder="Enter code here"
									  placeholderTextColor='#606060'
									  style={{paddingHorizontal:7, width:Dimensions.get('window').width*.4,
									  height:Dimensions.get('window').height*.054, borderColor: '#404040',borderWidth:2,
									  fontSize:Dimensions.get('window').height*.022,backgroundColor: 'white'}}	
									 underlineColorAndroid="transparent"
									 onChangeText={this.handleCode}
									 value={this.state.promoCode}
									/>
					    </View>
						<View style={{ marginLeft: 13, marginBottom: 15,marginTop: -8}}>
						   <TouchableOpacity
          			     	onPress={() => navigate('Menu')}  // when pressed call the userRegister function
         				    style={{width: Dimensions.get('window').width*.2,height:Dimensions.get('window').height*.057,padding:10,
						    justifyContent:'center',backgroundColor:'#800000',alignItems:'center'}}>
         					<Text style={styles.buttonText2}>Apply</Text>
      		    	       </TouchableOpacity>
						</View>
                    </View>

				</View>
					<FlatList
						data={ this.state.dataSource }
						renderItem={({ item }) => (
						<View>
							<View style={{flexDirection: 'row'}}>
								<View style={{ alignItems: 'flex-start'}}>
								    <Text style={styles.itemQuantity}>{item.quantity}</Text>
								</View>
								<View style={{ alignItems: 'flex-start'}}>
									<Text style={styles.itemName}>{item.name}</Text>
								</View>
								<View style={{ flex: 1, alignItems: 'flex-end'}}>
									<Text style={styles.itemPrice}>${(item.price*item.quantity).toFixed(2)}</Text>
								</View>
							</View>

							<View style={{ alignItems: 'flex-start', marginBottom: 5}}>
									<Text style={styles.itemOpts}>{item.option1}</Text>
							</View>
							<View style={{ alignItems: 'flex-start', marginBottom: 3}}>
									<Text style={styles.itemOpts}>{item.option2}</Text>
							</View>
							<View style={{ alignItems: 'flex-start', marginBottom: 3}}>
									<Text style={styles.itemOpts}>{item.extra1}</Text>
							</View>
							<View style={{ alignItems: 'flex-start', marginBottom: 5}}>
									<Text style={styles.itemOpts}>{item.extra2}</Text>
							</View>
							<View style={{ alignItems: 'flex-start', marginBottom: 5}}>
									<Text style={styles.itemOpts}>{item.extra3}</Text>
							</View>
							<View style={{ alignItems: 'flex-start'}}>
									<Text style={styles.itemNotes}>{item.notes}</Text>
							</View>
						</View>
						)}
						ItemSeparatorComponent={this.renderSeparator}
						ListFooterComponent={this.renderFooter}
						keyExtractor={item => item.item_id}
	 				/>	

				<View style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white',
					height: Dimensions.get('window').height * .1, width: Dimensions.get('window').width}}>
					<TouchableOpacity
          				onPress={() => navigate('Home')}  // when pressed call the userRegister function
         				style={styles.button}>
         				<Text style={styles.buttonText}>Place Order</Text>
      		    	</TouchableOpacity>
				</View>
      		</View>
		);  // End return
	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	settingsIcon: {
		marginRight: 13,
	},
	item: {
		backgroundColor: 'white',
		padding: 15,
	},
	itemName: {
		marginTop: 10,
		marginBottom: 4,
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	PromoText: {
		fontWeight: 'bold',
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	link: {
		width: Dimensions.get('window').width*.3,
		padding: 10,
		alignItems: 'center'
	  },
	linkText: {
		color: 'blue',
		fontSize: Dimensions.get('window').height*.023,
	  },
	  linkTextRem: {
		marginTop: 2,
		color: 'blue',
		fontSize: Dimensions.get('window').height*.023,
	  },
	itemPrice: {
		marginTop: 10,
		marginRight: 18,
		fontSize: Dimensions.get('window').height*.026,
		color: 'black',
	},
	itemOpts: {
		marginLeft: 42,
		marginBottom: -5,
		marginTop: -3,
		fontSize: Dimensions.get('window').height*.023,
		color: '#303030',
	},
	itemNotes: {
		marginLeft: 42,
		marginTop: -15,
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
	itemTax: {
		marginTop: 10,
		marginRight: 18,
		fontSize: Dimensions.get('window').height*.0272,
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
		color: 'white',
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
	  closeIcon: {
		marginTop: -1,
		marginLeft: 15,
	},
});
