/********************************************************************/
/*  Author:     Tyler Kurzawa                                       */
/*  Created:    January 25, 2020                                    */
/*  Filename:   AboutScreen.js                                      */
/*  Purpose:    This file contains information about the Bagel      */
/*              Bar Cafe. This includes their address, hours of     */
/*              operation, and phone number.                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity} from 'react-native';

export default class FeedbackScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkboxClicked1: false,
			checkboxClicked2: false,
      checkboxClicked3: false,
      checkboxClicked4: false,
      checkboxClicked5: false,
			checkboxShape1: 'ios-radio-button-off',
			checkboxShape2: 'ios-radio-button-off',
      checkboxShape3: 'ios-radio-button-off',
      checkboxShape4: 'ios-radio-button-off',
      checkboxShape5: 'ios-radio-button-off',
      checkboxClicked10: false,
			checkboxClicked20: false,
      checkboxClicked30: false,
      checkboxClicked40: false,
      checkboxClicked50: false,
			checkboxShape10: 'ios-radio-button-off',
			checkboxShape20: 'ios-radio-button-off',
      checkboxShape30: 'ios-radio-button-off',
      checkboxShape40: 'ios-radio-button-off',
      checkboxShape50: 'ios-radio-button-off',
      userFeed: ''
		}
	}

	handlePress1 = () => {
		if (this.state.checkboxClicked1 == false) {
			this.setState({
        checkboxClicked1: true,
        checkboxClicked2: false,
        checkboxClicked3: false,
        checkboxClicked4: false,
        checkboxClicked5: false,
        checkboxShape1: 'ios-radio-button-on',
        checkboxShape2: 'ios-radio-button-off',
        checkboxShape3: 'ios-radio-button-off',
        checkboxShape4: 'ios-radio-button-off',
        checkboxShape5: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked1: false,
				checkboxShape1: 'ios-radio-button-off',
		    })
		}
	};

	handlePress2 = () => {
		if (this.state.checkboxClicked2 == false) {
			this.setState({
        checkboxClicked2: true,
        checkboxClicked1: false,
        checkboxClicked3: false,
        checkboxClicked4: false,
        checkboxClicked5: false,
        checkboxShape2: 'ios-radio-button-on',
        checkboxShape1: 'ios-radio-button-off',
        checkboxShape3: 'ios-radio-button-off',
        checkboxShape4: 'ios-radio-button-off',
        checkboxShape5: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked2: false,
				checkboxShape2: 'ios-radio-button-off',
		    })
		}
	};

	handlePress3 = () => {
		if (this.state.checkboxClicked3 == false) {
			this.setState({
        checkboxClicked3: true,
        checkboxClicked2: false,
        checkboxClicked1: false,
        checkboxClicked4: false,
        checkboxClicked5: false,
        checkboxShape3: 'ios-radio-button-on',
        checkboxShape2: 'ios-radio-button-off',
        checkboxShape1: 'ios-radio-button-off',
        checkboxShape4: 'ios-radio-button-off',
        checkboxShape5: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked3: false,
				checkboxShape3: 'ios-radio-button-off',
		    })
    }
  };

  handlePress4 = () => {
		if (this.state.checkboxClicked4 == false) {
			this.setState({
        checkboxClicked4: true,
        checkboxClicked2: false,
        checkboxClicked1: false,
        checkboxClicked3: false,
        checkboxClicked5: false,
        checkboxShape4: 'ios-radio-button-on',
        checkboxShape2: 'ios-radio-button-off',
        checkboxShape3: 'ios-radio-button-off',
        checkboxShape1: 'ios-radio-button-off',
        checkboxShape5: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked4: false,
				checkboxShape4: 'ios-radio-button-off',
		    })
    }
  };
  handlePress5 = () => {
		if (this.state.checkboxClicked5 == false) {
			this.setState({
        checkboxClicked5: true,
        checkboxClicked2: false,
        checkboxClicked1: false,
        checkboxClicked3: false,
        checkboxClicked4: false,
        checkboxShape5: 'ios-radio-button-on',
        checkboxShape2: 'ios-radio-button-off',
        checkboxShape3: 'ios-radio-button-off',
        checkboxShape4: 'ios-radio-button-off',
        checkboxShape1: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked5: false,
				checkboxShape5: 'ios-radio-button-off',
		    })
    }
	};

	handlePress10 = () => {
		if (this.state.checkboxClicked10 == false) {
			this.setState({
        checkboxClicked10: true,
        checkboxClicked20: false,
        checkboxClicked30: false,
        checkboxClicked40: false,
        checkboxClicked50: false,
        checkboxShape10: 'ios-radio-button-on',
        checkboxShape20: 'ios-radio-button-off',
        checkboxShape30: 'ios-radio-button-off',
        checkboxShape40: 'ios-radio-button-off',
        checkboxShape50: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked10: false,
				checkboxShape10: 'ios-radio-button-off',
		    })
		}
	};

	handlePress20 = () => {
		if (this.state.checkboxClicked20 == false) {
			this.setState({
        checkboxClicked20: true,
        checkboxClicked10: false,
        checkboxClicked30: false,
        checkboxClicked40: false,
        checkboxClicked50: false,
        checkboxShape20: 'ios-radio-button-on',
        checkboxShape10: 'ios-radio-button-off',
        checkboxShape30: 'ios-radio-button-off',
        checkboxShape40: 'ios-radio-button-off',
        checkboxShape50: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked20: false,
				checkboxShape20: 'ios-radio-button-off',
		    })
		}
	};

	handlePress30 = () => {
		if (this.state.checkboxClicked30 == false) {
			this.setState({
        checkboxClicked30: true,
        checkboxClicked20: false,
        checkboxClicked10: false,
        checkboxClicked40: false,
        checkboxClicked50: false,
        checkboxShape30: 'ios-radio-button-on',
        checkboxShape20: 'ios-radio-button-off',
        checkboxShape10: 'ios-radio-button-off',
        checkboxShape40: 'ios-radio-button-off',
        checkboxShape50: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked30: false,
				checkboxShape30: 'ios-radio-button-off',
		    })
    }
  };

  handlePress40 = () => {
		if (this.state.checkboxClicked40 == false) {
			this.setState({
        checkboxClicked40: true,
        checkboxClicked20: false,
        checkboxClicked10: false,
        checkboxClicked30: false,
        checkboxClicked50: false,
        checkboxShape40: 'ios-radio-button-on',
        checkboxShape20: 'ios-radio-button-off',
        checkboxShape30: 'ios-radio-button-off',
        checkboxShape10: 'ios-radio-button-off',
        checkboxShape50: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked40: false,
				checkboxShape40: 'ios-radio-button-off',
		    })
    }
  };
  handlePress50 = () => {
		if (this.state.checkboxClicked50 == false) {
			this.setState({
        checkboxClicked50: true,
        checkboxClicked20: false,
        checkboxClicked10: false,
        checkboxClicked30: false,
        checkboxClicked40: false,
        checkboxShape50: 'ios-radio-button-on',
        checkboxShape20: 'ios-radio-button-off',
        checkboxShape30: 'ios-radio-button-off',
        checkboxShape40: 'ios-radio-button-off',
        checkboxShape10: 'ios-radio-button-off',
		    })
		}
		else {
			this.setState({
				checkboxClicked50: false,
				checkboxShape50: 'ios-radio-button-off',
		    })
    }
	};

  handleFeed = (text) => {
    this.setState({ userFeed: text})
  }

  handleSubmit= () => {
    if (this.state.checkboxClicked1 == true || this.state.checkboxClicked2 == true || this.state.checkboxClicked3 == true || this.state.checkboxClicked4 == true
         || this.state.checkboxClicked5 == true || this.state.checkboxClicked10 == true || this.state.checkboxClicked20 == true || this.state.checkboxClicked30 == true
         || this.state.checkboxClicked40 == true || this.state.checkboxClicked50 == true || this.state.userFeed != '') {
       alert("Thank you for your feedback!")
    }
    else{
      alert("Please respond to at least one question to submit")
    }
	};

  render() {
    return (
        <View style={styles.container}>

         <Text style={{ marginLeft: Dimensions.get('window').width*.025,fontWeight: 'bold',
                         color: 'black',fontSize: Dimensions.get('window').height*.03,
                         marginTop: Dimensions.get('window').height*.025}}>Comments or suggestions?</Text>
          <Text style={styles.bodyText}>There are no wrong answers, if there's a feature you love or hate please feel free to let us know.</Text>

          <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height*.02, marginBottom: Dimensions.get('window').height*.025}}>
            <TextInput  // Input field for first name
               returnKeyType='done'
               blurOnSubmit={true}
               autoCorrect={false}
               multiline={true}
               textAlignVertical='top'
               placeholderTextColor="brown"
               placeholder="Enter your feedback here..."
               onChangeText={this.handleFeed}  // On event set value for password
               style={{width: Dimensions.get('window').width*.95, height: Dimensions.get('window').height*.1, borderColor:"gray", borderWidth:2,
               fontSize: Dimensions.get('window').height*.02, paddingHorizontal: Dimensions.get('window').width*.01, paddingVertical: Dimensions.get('window').height*.006}}	
               underlineColorAndroid="transparent"
            />
          </View>

          <Text style={{ marginLeft: Dimensions.get('window').width*.025,fontWeight: 'bold',
                         color: 'black',fontSize: Dimensions.get('window').height*.03}}>Ordering experience</Text>
          <Text style={styles.bodyText}>Placing an order for pickup was clear an easy to understand.</Text>

          <View style={{flexDirection: 'row', marginTop: Dimensions.get('window').height*.03, marginBottom: Dimensions.get('window').height*.003}}>
						<View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape1} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress1}/>
						</View>
	          <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape2} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress2}/>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape3} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress3}/>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape4} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress4}/>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape5} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress5}/>
						</View>
					</View>

					<View style={{flexDirection: 'row'}}>
						<View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress1()}}>
							  <Text style={styles.responseText}>Strongly Agree</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress2()}}>
							  <Text style={styles.responseText}>Agree</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress3()}}>
							  <Text style={styles.responseText}>Neutral</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress4()}}>
							  <Text style={styles.responseText}>Disagree</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center' }}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress5()}}>
							  <Text style={styles.responseText}>Strongly Disagree</Text>
						  </TouchableWithoutFeedback>
						</View>
					</View>

          <Text style={{ marginLeft: Dimensions.get('window').width*.025,fontWeight: 'bold',
                         color: 'black',fontSize: Dimensions.get('window').height*.03,
                         marginTop: Dimensions.get('window').height*.025}}>App features</Text>
          <Text style={styles.bodyText}>How often will you use the other app features such as favorites and order history?</Text>

          <View style={{flexDirection: 'row', marginTop: Dimensions.get('window').height*.03, marginBottom: Dimensions.get('window').height*.003}}>
						<View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape10} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress10}/>
						</View>
	          <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape20} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress20}/>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape30} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress30}/>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape40} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress40}/>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
							<Ionicons name={this.state.checkboxShape50} size={Dimensions.get('window').width*.06} color="brown" onPress={this.handlePress50}/>
						</View>
					</View>

					<View style={{flexDirection: 'row'}}>
						<View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress10()}}>
							  <Text style={styles.responseText}>Never</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress20()}}>
							  <Text style={styles.responseText}>Rarely</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress30()}}>
							  <Text style={styles.responseText}>Sometimes</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress40()}}>
							  <Text style={styles.responseText}>Often</Text>
						  </TouchableWithoutFeedback>
						</View>
            <View style={{ flex: 1, alignItems: 'center'}}>
						  <TouchableWithoutFeedback
				        	onPress={() => {this.handlePress50()}}>
							  <Text style={styles.responseText}>Always</Text>
						  </TouchableWithoutFeedback>
						</View>
					</View>

          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity  // Button for sign in
              onPress={this.handleSubmit}   // When pressed call the userSignIn function
              style={{ marginTop: Dimensions.get('window').height*.045,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,
              justifyContent:'center',backgroundColor:'black', alignItems:'center'}}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

        </View>
    );  // End return
  }  // End render
}  // End class component

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  bodyText: {
    color: 'gray',
    fontSize: Dimensions.get('window').height*.025,
    marginLeft: Dimensions.get('window').width*.025,
    marginTop: Dimensions.get('window').height*.006,
    marginRight: Dimensions.get('window').width*.02
  },
  subtitle: {
    marginLeft: Dimensions.get('window').width*.02,
    marginTop: Dimensions.get('window').height*.015,
    fontWeight: 'bold',
    color: 'black',
    fontSize: Dimensions.get('window').height*.03,
  },
  responseText: {
    textAlign: 'center',
		color: 'brown',
		fontSize: Dimensions.get('window').height*.018,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.023,
  },
});