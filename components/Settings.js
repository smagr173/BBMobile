/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    Febuary 1, 2020                                     */
/*  Filename:   SettingsScreen.js                                   */
/*  Purpose:    This file contains the user options for either      */
/*              logging out of an account or updating account       */
/*              information.                                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {

  constructor(props) {
		super(props)
		  this.state = {
      loggedIn: false,
      isLoading: true,
      fName: '',
      lName: '',
      userEmail: ''
		  };
	  }  // End constructor
	  componentDidMount() {
		// Networking for retrieving the user information
		fetch('https://smagr173.heliohost.us/public/fetchRecord.php', {
		  method:'POST',
		  header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		  },  
		}) // End fetch
		// Handle the response from PHP
		.then((response) => response.json())
		  .then((responseJson) => {
			if(responseJson.empty == 0) {
				this.setState ({ 
          loggedIn: false,
          isLoading: false,
        })
			  }
			else {
        this.setState ({
          loggedIn: true,
          isLoading: false,
          fName: responseJson.fname,
          lName: responseJson.lname,
          userEmail: responseJson.email
        })
        }
      })
      .catch((error)=>{
        console.error(error);
        });
	  }  // End componentDidMount

    showButtons = () => {
      const {navigate} = this.props.navigation;
      const { loggedIn } = this.state;
      if (loggedIn == true) {
        return (
          <View style={styles.container}>
            <View style={{backgroundColor: '#F0F0F0',width: Dimensions.get('window').width,
				      height: Dimensions.get('window').width*.35, borderBottomWidth: 0, borderColor: 'black'}}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
						<Image source={require('../assets/images/profile.png')}
  	   				 	 style={styles.image1} />
						<View style={{ marginLeft: Dimensions.get('window').width*.08, marginTop: -(Dimensions.get('window').height*.007)}}>
                <Text style={styles.subtitle}>Name:</Text>
					    	<Text style={styles.subtitle2}>{this.state.fName} {this.state.lName}</Text>
              
              <View style={{ marginTop: Dimensions.get('window').height*.01}}>
                <Text style={styles.subtitle}>Email Address:</Text>
                <Text style={styles.subtitle2}>{this.state.userEmail}</Text>
						  </View>
            </View>
					</View>
				</View>

        <View style={{ justifyContent: 'flex-start'}}>
          <TouchableOpacity  // Update information button
          onPress={() => navigate('Update')}  // When pressed navigate to the update info page
         style={{width: '100%',height:Dimensions.get('window').height*.09, borderTopWidth: 1.5, borderColor: 'black',
         justifyContent:'center',backgroundColor:'#686868',alignItems:'flex-start',borderBottomWidth: 1.5, borderColor: 'black'}}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.buttonText2}>Update Account Information</Text>
              <View style={{flex: 1, marginRight: Dimensions.get('window').width *.065,alignItems: 'flex-end'}}>
						    <Ionicons
				                name={'ios-arrow-forward'}
				                size={Dimensions.get('window').width*.065}
				                color={'black'}
			          />
              </View>
        </View>
       </TouchableOpacity> 
       </View>

       <View style={{ justifyContent: 'flex-start'}}>
          <TouchableOpacity  // Update information button
          onPress={() => navigate('About')}  // When pressed navigate to the update info page
         style={{width: '100%',height:Dimensions.get('window').height*.09,
         justifyContent:'center',backgroundColor:'#686868',alignItems:'flex-start',borderBottomWidth: 1.5, borderColor: 'black'}}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.buttonText2}>About the Bagel Bar</Text>
              <View style={{flex: 1, marginRight: Dimensions.get('window').width *.065,alignItems: 'flex-end'}}>
						    <Ionicons
				                name={'ios-arrow-forward'}
				                size={Dimensions.get('window').width*.065}
				                color={'black'}
			          />
              </View>
        </View>
       </TouchableOpacity> 
       </View>

       <View style={{ justifyContent: 'flex-start'}}>
          <TouchableOpacity  // Update information button
          onPress={() => navigate('Feedback')}  // When pressed navigate to the update info page
         style={{width: '100%',height:Dimensions.get('window').height*.09,
         justifyContent:'center',backgroundColor:'#686868',alignItems:'flex-start',borderBottomWidth: 1.5, borderColor: 'black'}}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.buttonText2}>App Feedback</Text>
              <View style={{flex: 1, marginRight: Dimensions.get('window').width *.065,alignItems: 'flex-end'}}>
						    <Ionicons
				                name={'ios-arrow-forward'}
				                size={Dimensions.get('window').width*.065}
				                color={'black'}
			          />
              </View>
        </View>
       </TouchableOpacity> 
       </View>

       <View style={{ justifyContent: 'flex-start'}}>
          <TouchableOpacity  // Update information button
          onPress={() => navigate('Help2')}  // When pressed navigate to the update info page
         style={{width: '100%',height:Dimensions.get('window').height*.09,
         justifyContent:'center',backgroundColor:'#686868',alignItems:'flex-start',borderBottomWidth: 1.5, borderColor: 'black'}}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.buttonText2}>Support & Help</Text>
              <View style={{flex: 1, marginRight: Dimensions.get('window').width *.065,alignItems: 'flex-end'}}>
						    <Ionicons
				                name={'ios-arrow-forward'}
				                size={Dimensions.get('window').width*.065}
				                color={'black'}
			          />
              </View>
        </View>
       </TouchableOpacity> 
       </View>

       <View style={{ justifyContent: 'flex-start'}}>
          <TouchableOpacity  // Update information button
         onPress={this.LogOut}  // When pressed, call the log out function
         style={{width: '100%',height:Dimensions.get('window').height*.09,
         justifyContent:'center',backgroundColor:'#686868',alignItems:'flex-start',borderBottomWidth: 1.5, borderColor: 'black'}}>
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.buttonText2}>Logout</Text>
              <View style={{flex: 1, marginRight: Dimensions.get('window').width *.065,alignItems: 'flex-end'}}>
						    <Ionicons
				                name={'ios-arrow-forward'}
				                size={Dimensions.get('window').width*.065}
				                color={'black'}
			          />
              </View>
        </View>
       </TouchableOpacity> 
       </View>
  </View>
        );
      } 
      else {
        return (
          <View style={{alignItems: 'center',backgroundColor: 'white'}}>
            <View style={{marginTop: Dimensions.get('window').height*.04}}>
               <Text style={styles.pageText}>
                 Sign in to view use all features
              </Text>
            </View>

<TouchableOpacity  // Update information button
onPress={() => navigate('SignIn')}  // When pressed navigate to the update info page
style={{marginTop:20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,
padding:10, justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
<Text style={styles.buttonText}>Sign In</Text>
</TouchableOpacity> 
</View>
        );
      }
    }

  LogOut = () => {
    // Networking for logging out of the session
    fetch('https://smagr173.heliohost.us/public/log_out.php', {
      method:'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    
    }) // End fetch
      .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson == 0) {
            const {navigate} = this.props.navigation;
            navigate('Initial')  // Navigate to the initial screen if log out succeeds
          }
          else if (responseJson != 0) {
            console.warn(responseJson);
          }
        })
        .catch((error)=>{
        console.error(error);
        });
  }  // End log out function
  
  render() {
    if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.showButtons()}

     
      </View>
    );  // End return 
  }  // End render
}  // End class component

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  pageText: {
      color: 'gray',
      textAlign: 'center',
      fontSize: Dimensions.get('window').height*.025,
      marginBottom: 5,
  },
  image1: {
		marginLeft: 10,
		marginBottom: 5,
		width: Dimensions.get('window').width *.25,
		height: '65%',
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
      fontSize: Dimensions.get('window').height*.023,
      marginLeft:Dimensions.get('window').width*.04, 
      marginTop: Dimensions.get('window').height *.0055
      },
  link: {
    width: 100,
    padding: 10,
    alignItems: 'center'
  },
  divider: {
    marginTop: 25,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .003,
    marginBottom: 5,
    },
    subtitle: {
      fontWeight: 'bold',
      color: 'black',
      fontSize: Dimensions.get('window').height*.029,
      },
      subtitle2: {
        color: 'black',
        fontSize: Dimensions.get('window').height*.027,
        },
});