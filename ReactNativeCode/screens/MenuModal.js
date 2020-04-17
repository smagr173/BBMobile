/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Filename:   MenuModal.js                                        */
/*  Purpose:    This file contains the user dashboard or home       */
/*              screen. Once a user has logged into their           */
/*              existing account this screen is displayed.          */
/*              It contains information such as previous orders     */
/*              and favorite items.                                 */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Image, ActivityIndicator, TouchableOpacity, View, Text, StyleSheet,TextInput, TouchableWithoutFeedback, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const bagels = [
	{
	  label: 'Plain',
	  value: 'Plain Bagel',
	},
	{
	  label: 'Asiago',
	  value: 'Asiago Bagel',
	},
	{
	  label: 'Egg',
	  value: 'Egg Bagel',
	},
	{
	  label: 'Salt',
	  value: 'Salt Bagel',
	},
    {
	  label: 'Multi-Grain',
	  value: 'Multi-Grain Bagel',
	},
	{
	  label: 'Everything',
	  value: 'Everything Bagel',
	},
	{
	  label: 'Garlic',
	  value: 'Garlic Bagel',
	},
	{
	  label: 'Onion',
	  value: 'Onion Bagel',
	},
	{
	  label: 'Sesame',
	  value: 'Sesame Bagel',
	},
];

const placeBag = {
	label: 'Select bagel...',
	value: ''
  };

const creamCheese = [
	{
	  label: 'Plain',
	  value: 'Plain Cream Cheese',
	},
	{
	  label: 'Blueberry',
	  value: 'Blueberry Cream Cheese',
	},
	{
	  label: 'Nova Lox',
	  value: 'Nova Lox Cream Cheese',
	},
	{
	  label: 'Strawberry',
	  value: 'Strawberry Cream Cheese',
	},
    {
	  label: 'Garlic & Herb',
	  value: 'Garlic & Herb Cream Cheese',
	},
	{
	  label: 'Veggie',
	  value: 'Veggie Cream Cheese',
	},
];

const placeCream = {
	label: 'Select cream cheese...',
	value: ''
  };

  const wraps = [
	{
	  label: 'Plain',
	  value: 'Plain Tortilla',
	},
	{
	  label: 'Whole Wheat',
	  value: 'Whole Wheat Tortilla',
	},
	{
	  label: 'Sun Dried Tomato',
	  value: 'Sun Dried Tomato Tortilla',
	},
];

const placeWrap = {
	label: 'Select wrap...',
	value: ''
  };

  const sizes = [
	{
	  label: 'Small',
	  value: 'Small',
	},
	{
	  label: 'Medium',
	  value: 'Medium',
	},
	{
	  label: 'Large',
	  value: 'Large',
	},
	{
	  label: 'Extra Large',
	  value: 'Extra Large',
	},
];

const placeSize = {
	label: 'Select size...',
	value: ''
  };

export default class SubMenu extends Component {
	static navigationOptions= ({navigation}) =>({ 
		headerLeft:
		<View style ={styles.closeIcon}>
			<Ionicons
			   name={'ios-close'}
			   size={Dimensions.get('window').height*.075}
			   color={'darkgray'}
			   onPress={() => navigation.navigate('MenuDetail')}
			/>
		</View>
	});
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isVisible: false,
			itemID: '',
			itemName: '',
			itemPrice: '',
			itemDescription: '',
			itemQuantity: 1,
			itemNotes: '',
			option1:'',
			option2:'',
			extra1: null,
			extra2: null,
			extra3: null,
			checkboxClicked1: false,
			checkboxClicked2: false,
			checkboxClicked3: false,
			checkboxShape1: 'ios-radio-button-off',
			checkboxShape2: 'ios-radio-button-off',
			checkboxShape3: 'ios-radio-button-off'
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

	handlePress1 = () => {
		if (this.state.checkboxClicked1 == false) {
			this.setState({
				checkboxClicked1: true,
				checkboxShape1: 'ios-radio-button-on',
				extra1: "Extra Cheese"
		    })
		}
		else {
			this.setState({
				checkboxClicked1: false,
				checkboxShape1: 'ios-radio-button-off',
				extra1: null
		    })
		}
	};

	handlePress2 = () => {
		if (this.state.checkboxClicked2 == false) {
			this.setState({
				checkboxClicked2: true,
				checkboxShape2: 'ios-radio-button-on',
				extra2: "Extra Egg"
		    })
		}
		else {
			this.setState({
				checkboxClicked2: false,
				checkboxShape2: 'ios-radio-button-off',
				extra2: null
		    })
		}
	};

	handlePress3 = () => {
		if (this.state.checkboxClicked3 == false) {
			this.setState({
				checkboxClicked3: true,
				checkboxShape3: 'ios-radio-button-on',
				extra3: "Cream Cheese"
		    })
		}
		else {
			this.setState({
				checkboxClicked3: false,
				checkboxShape3: 'ios-radio-button-off',
				extra3: null
		    })
		}
	};

	componentDidMount() {
		this.setState({
			isLoading: false,
			itemName: global.itemName,
			itemPrice: global.itemPrice,
			itemDescription: global.itemDescription,
			itemQuantity: 1
		});
	}  // End componentDidMount()

	  sendToCart = () => {
		  if (this.state.option1 != '' && this.state.option2 != '') {
		fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/addBag.php', {
			method:'POST',
			header:{
			  'Accept': 'application/json',
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
			  name: this.state.itemName,
			  quantity: this.state.itemQuantity,
			  price: this.state.itemPrice,
			  notes: this.state.itemNotes,
			  option1: this.state.option1,
			  option2: this.state.option2,
			  extra1: this.state.extra1,
			  extra2: this.state.extra2,
			  extra3: this.state.extra3,
			}) 
		  }) // End fetch
		  // Handle the response from PHP
		  .then((response) => response.json())
			.then((responseJson) => {
			if(responseJson.succ == "Success") {
				// If the add item succeeds, close modal
				const {navigate} = this.props.navigation;
				navigate('MenuDetail') // Redirect to sign in page
				alert("Item was added to cart");
			}
			else {
				alert(responseJson.noRecord);
			}
		  })
		  .catch((error) => {
			  console.error(error);
		  });
		}
		else {
			alert("Please make required choices");
		}
	  }

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

		const {navigate} = this.props.navigation;
		if (global.category == 'Classic Breakfast Bagelwiches' || global.category =='Speciality Breakfast Bagels' ||
		global.category =='Lunch Bagelwiches' || global.category =='Pizza Bagels') {
		return (
			<View style={styles.container}>
			<ScrollView style={styles.container}>
					<View style={{flexDirection: 'row'}}>
						<View style={{ flex: 1, alignItems: 'flex-start', flexWrap: 'wrap'}}>
							<Text style={styles.itemName}>{this.state.itemName}</Text>
						</View>
						<View style={{ alignItems: 'flex-end'}}>
							<Text style={styles.itemPrice}>${(this.state.itemPrice * this.state.itemQuantity).toFixed(2)}</Text>
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
					
					<View style={{ marginLeft: 15, marginBottom: 5}}>
					   	<Text style={styles.quantity}>Special instructions</Text>
					</View>
					<View style={{ marginLeft: 5, marginBottom: 7}}>
					   <TextInput
					     autoCorrect={false}
          			     returnKeyType='done'
         				 placeholder="Add special requests here"
         				 placeholderTextColor='#606060'
         				 style={{marginBottom: 5,paddingHorizontal:7,marginTop:7,width:Dimensions.get('window').width*.93,
         				 height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
         				 fontSize:Dimensions.get('window').height*.023,borderRadius: 8}}	
						 underlineColorAndroid="transparent"
						 onChangeText= {this.handleNotes}
						 value= {this.state.itemNotes}
        				/>
					</View>

					<View style={{ marginLeft: 15, marginBottom: 2}}>
						<Text style={styles.quantity}>Select Bagel</Text>
					</View>
					<View style={{ marginLeft: 15, marginBottom: 5}}>
					   <Text style={styles.optionTitle}>Choose one (Required)</Text>
					</View>

					<View style={styles.selectionBox}>
				    <RNPickerSelect
					  placeholder={placeBag}
					  useNativeAndroidPickerStyle={false}
					  items={bagels}
					  onValueChange={value => {
						this.setState({
						  option1: value,
						  option2: null
						});
					  }}
					  style={{
						placeholder: {
						  color: '#606060',
						  fontSize: Dimensions.get('window').height*.023
						},
						inputIOS: {
							fontSize: Dimensions.get('window').height*.023,
							color: 'black',
						},
						inputAndroid: {
							fontSize: Dimensions.get('window').height*.023,
							color: 'black',
						}
					  }}
					  Icon={() => {
						return <View style={{ marginTop: -1}}><Ionicons name="ios-arrow-down" size={Dimensions.get('window').height*.03} color="#606060" /></View>
					  }}
                    />
					</View>
			
					<View style={{ marginLeft: 15, marginBottom: 11}}>
						<Text style={styles.quantity}>Extras</Text>
					</View>

					<View style={{flexDirection: 'row', marginBottom: 7}}>
						<View style={{ alignItems: 'flex-start', marginLeft: 17, marginTop: -5}}>
							<Ionicons name={this.state.checkboxShape1} size={29} color="black" onPress={this.handlePress1}/>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 7}}>
						<TouchableWithoutFeedback
				        	onPress={() => {this.handlePress1()}}>
							<Text style={styles.itemDescription}>Extra Cheese</Text>
						</TouchableWithoutFeedback>
						</View>
					</View>

					<View style={{flexDirection: 'row', marginBottom: 7}}>
						<View style={{ alignItems: 'flex-start', marginLeft: 17, marginTop: -5}}>
							<Ionicons name={this.state.checkboxShape2} size={29} color="black" onPress={this.handlePress2}/>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 7}}>
						<TouchableWithoutFeedback
				        	onPress={() => {this.handlePress2()}}>
							<Text style={styles.itemDescription}>Extra Egg</Text>
						</TouchableWithoutFeedback>
						</View>
					</View>

					<View style={{flexDirection: 'row', marginBottom: 7}}>
						<View style={{ alignItems: 'flex-start', marginLeft: 17, marginTop: -5}}>
							<Ionicons name={this.state.checkboxShape3} size={29} color="black" onPress={this.handlePress3}/>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 7}}>
						<TouchableWithoutFeedback
				        	onPress={() => {this.handlePress3()}}>
							<Text style={styles.itemDescription}>Add Cream Cheese</Text>
						</TouchableWithoutFeedback>
						</View>
					</View>
				</ScrollView>	
				<View style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'white',
								height: Dimensions.get('window').height * .1, width: Dimensions.get('window').width, marginBottom: Dimensions.get('window').height * .003}}>
				    <TouchableOpacity style={styles.button}
						onPress={this.sendToCart}>
						<Text style={styles.buttonText}>Add to Bag</Text>
					</TouchableOpacity>
				</View>
			</View>
		  );  // End return
		} // end classic/speciality if

		if (global.category == 'Toasted Bagels, Split & Topped') {
			return (
				<View style={styles.container}>
						<View style={{flexDirection: 'row'}}>
							<View style={{ flex: 1, alignItems: 'flex-start', flexWrap: 'wrap'}}>
								<Text style={styles.itemName}>{this.state.itemName}</Text>
							</View>
							<View style={{ alignItems: 'flex-end'}}>
								<Text style={styles.itemPrice}>${(this.state.itemPrice * this.state.itemQuantity).toFixed(2)}</Text>
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
						
						<View style={{ marginLeft: 15, marginBottom: 5}}>
							   <Text style={styles.quantity}>Special instructions</Text>
						</View>
						<View style={{ marginLeft: 5, marginBottom: 7}}>
						   <TextInput
							 autoCorrect={false}
							   returnKeyType='done'
							  placeholder="Add special requests here"
							  placeholderTextColor='#606060'
							  style={{marginBottom: 5,paddingHorizontal:7,marginTop:7,width:Dimensions.get('window').width*.93,
							  height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
							  fontSize:Dimensions.get('window').height*.023,borderRadius: 8}}	
							 underlineColorAndroid="transparent"
							 onChangeText= {this.handleNotes}
							 value= {this.state.itemNotes}
							/>
						</View>
	
						<View style={{ marginLeft: 15, marginBottom: 2}}>
							<Text style={styles.quantity}>Select Bagel</Text>
						</View>
						<View style={{ marginLeft: 15, marginBottom: 5}}>
						   <Text style={styles.optionTitle}>Choose one (Required)</Text>
						</View>
	
						<View style={styles.selectionBox}>
						<RNPickerSelect
						  placeholder={placeBag}
						  useNativeAndroidPickerStyle={false}
						  items={bagels}
						  onValueChange={value => {
							this.setState({
							  option1: value,
							});
						  }}
						  style={{
							placeholder: {
							  color: '#606060',
							  fontSize: Dimensions.get('window').height*.023
							},
							inputIOS: {
								fontSize: Dimensions.get('window').height*.023,
								color: 'black',
							},
							inputAndroid: {
								fontSize: Dimensions.get('window').height*.023,
								color: 'black',
							}
						  }}
						  Icon={() => {
							return <View style={{ marginTop: -1}}><Ionicons name="ios-arrow-down" size={Dimensions.get('window').height*.03} color="#606060" /></View>
						  }}
						/>
						</View>

						<View style={{ marginLeft: 15, marginBottom: 2}}>
							<Text style={styles.quantity}>Select Cream Cheese</Text>
						</View>
						<View style={{ marginLeft: 15, marginBottom: 5, marginTop: 5}}>
						   <Text style={styles.optionTitle}>Choose one (Required)</Text>
						</View>
	
						<View style={styles.selectionBox}>
						<RNPickerSelect
						  placeholder={placeCream}
						  useNativeAndroidPickerStyle={false}
						  items={creamCheese}
						  onValueChange={value => {
							this.setState({
							  option2: value,
							});
						  }}
						  style={{
							placeholder: {
							  color: '#606060',
							  fontSize: Dimensions.get('window').height*.023
							},
							inputIOS: {
								fontSize: Dimensions.get('window').height*.023,
								color: 'black',
							},
							inputAndroid: {
								fontSize: Dimensions.get('window').height*.023,
								color: 'black',
							}
						  }}
						  Icon={() => {
							return <View style={{ marginTop: -1}}><Ionicons name="ios-arrow-down" size={Dimensions.get('window').height*.03} color="#606060" /></View>
						  }}
						/>
						</View>
	
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
						  <TouchableOpacity style={styles.button}
							onPress={this.sendToCart}>
							<Text style={styles.buttonText}>Add to Bag</Text>
						  </TouchableOpacity>
						</View>
				</View>	
			  );  // End return
			} // end toasted bagels split and topped if

			if (global.category == 'Wraps') {
				return (
					<View style={styles.container}>
							<View style={{flexDirection: 'row'}}>
								<View style={{ flex: 1, alignItems: 'flex-start', flexWrap: 'wrap'}}>
									<Text style={styles.itemName}>{this.state.itemName}</Text>
								</View>
								<View style={{ alignItems: 'flex-end'}}>
									<Text style={styles.itemPrice}>${(this.state.itemPrice * this.state.itemQuantity).toFixed(2)}</Text>
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
							
							<View style={{ marginLeft: 15, marginBottom: 5}}>
								   <Text style={styles.quantity}>Special instructions</Text>
							</View>
							<View style={{ marginLeft: 5, marginBottom: 7}}>
							   <TextInput
								 autoCorrect={false}
								   returnKeyType='done'
								  placeholder="Add special requests here"
								  placeholderTextColor='#606060'
								  style={{marginBottom: 5,paddingHorizontal:7,marginTop:7,width:Dimensions.get('window').width*.93,
								  height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
								  fontSize:Dimensions.get('window').height*.023,borderRadius: 8}}	
								 underlineColorAndroid="transparent"
								 onChangeText= {this.handleNotes}
								 value= {this.state.itemNotes}
								/>
							</View>
		
							<View style={{ marginLeft: 15, marginBottom: 2}}>
								<Text style={styles.quantity}>Select Wrap</Text>
							</View>
							<View style={{ marginLeft: 15, marginBottom: 5}}>
							   <Text style={styles.optionTitle}>Choose one (Required)</Text>
							</View>
		
							<View style={styles.selectionBox}>
							<RNPickerSelect
							  placeholder={placeWrap}
							  useNativeAndroidPickerStyle={false}
							  items={wraps}
							  onValueChange={value => {
								this.setState({
								  option1: value,
								});
							  }}
							  style={{
								placeholder: {
								  color: '#606060',
								  fontSize: Dimensions.get('window').height*.023
								},
								inputIOS: {
									fontSize: Dimensions.get('window').height*.023,
									color: 'black',
								},
								inputAndroid: {
									fontSize: Dimensions.get('window').height*.023,
									color: 'black',
								}
							  }}
							  Icon={() => {
								return <View style={{ marginTop: -1}}><Ionicons name="ios-arrow-down" size={Dimensions.get('window').height*.03} color="#606060" /></View>
							  }}
							/>
							</View>
		
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
							  <TouchableOpacity style={styles.button}
								onPress={this.sendToCart}>
								<Text style={styles.buttonText}>Add to Bag</Text>
							  </TouchableOpacity>
							</View>
					</View>	
				  );  // End return
				} // end wraps if

				if (global.category == 'Hot Coffee & Steamers' || global.category=='Iced Coffees' || global.category=='Frozen Beverages' || global.category=='Teas & Tea Lattes') {
					return (
						<View style={styles.container}>
								<View style={{flexDirection: 'row'}}>
									<View style={{ flex: 1, alignItems: 'flex-start', flexWrap: 'wrap'}}>
										<Text style={styles.itemName}>{this.state.itemName}</Text>
									</View>
									<View style={{ alignItems: 'flex-end'}}>
										<Text style={styles.itemPrice}>${(this.state.itemPrice * this.state.itemQuantity).toFixed(2)}</Text>
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
								
								<View style={{ marginLeft: 15, marginBottom: 5}}>
									   <Text style={styles.quantity}>Special instructions</Text>
								</View>
								<View style={{ marginLeft: 5, marginBottom: 7}}>
								   <TextInput
									 autoCorrect={false}
									   returnKeyType='done'
									  placeholder="Add special requests here"
									  placeholderTextColor='#606060'
									  style={{marginBottom: 5,paddingHorizontal:7,marginTop:7,width:Dimensions.get('window').width*.93,
									  height:Dimensions.get('window').height*.058,margin:10, borderColor:"gray",borderWidth:2,
									  fontSize:Dimensions.get('window').height*.023,borderRadius: 8}}	
									 underlineColorAndroid="transparent"
									 onChangeText= {this.handleNotes}
									 value= {this.state.itemNotes}
									/>
								</View>
			
								<View style={{ marginLeft: 15, marginBottom: 2}}>
									<Text style={styles.quantity}>Select Size</Text>
								</View>
								<View style={{ marginLeft: 15, marginBottom: 5}}>
								   <Text style={styles.optionTitle}>Choose one (Required)</Text>
								</View>
			
								<View style={styles.selectionBox}>
								<RNPickerSelect
								  placeholder={placeSize}
								  useNativeAndroidPickerStyle={false}
								  items={sizes}
								  onValueChange={value => {
									this.setState({
									  option1: value,
									  option2: null
									});
								  }}
								  style={{
									placeholder: {
									  color: '#606060',
									  fontSize: Dimensions.get('window').height*.023
									},
									inputIOS: {
										fontSize: Dimensions.get('window').height*.023,
										color: 'black',
									},
									inputAndroid: {
										fontSize: Dimensions.get('window').height*.023,
										color: 'black',
									}
								  }}
								  Icon={() => {
									return <View style={{ marginTop: -1}}><Ionicons name="ios-arrow-down" size={Dimensions.get('window').height*.03} color="#606060" /></View>
								  }}
								/>
								</View>
			
								<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
								  <TouchableOpacity style={styles.button}
									onPress={this.sendToCart}>
									<Text style={styles.buttonText}>Add to Bag</Text>
								  </TouchableOpacity>
								</View>
						</View>	
					  );  // End return
					} // end hot coffee steamers if


	}  // End render
}  // End homeScreen component

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
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
	closeIcon: {
		marginTop: -1,
		marginLeft: 15,
	},
	selectionBox: {
		marginLeft: 15, 
		marginBottom: 10,
		paddingHorizontal:7,
		marginTop:7,
		width: Dimensions.get('window').width*.55,
		height: Dimensions.get('window').height*.058,
		margin:10, 
		borderColor:"gray",
		borderWidth:2,
		borderRadius: 8,
		justifyContent: 'center',
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
	optionTitle: {
		color: 'brown',
		fontSize: Dimensions.get('window').height*.021,
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