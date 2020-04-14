/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    Febuary 1, 2020                                     */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   SettingsScreen.js                                   */
/*  Purpose:    This file contains the user options for either      */
/*              logging out of an account or updating account       */
/*              information.                                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {

  constructor(props) {
		super(props)
		  this.state = {
      loggedIn: false,
      isLoading: true,
		  };
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
          <TouchableOpacity  // Update information button
          onPress={() => navigate('Update')}  // When pressed navigate to the update info page
         style={{marginTop:20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,
         padding:10, justifyContent:'center',backgroundColor:'black',alignItems:'center'}}>
         <Text style={styles.buttonText}>Update Info</Text>
       </TouchableOpacity> 

<Image source={require('../assets/images/divider.png')}
style={styles.divider} />

<TouchableOpacity  // Log out button
onPress={this.LogOut}  // When pressed, call the log out function
style={{marginTop:20,width: Dimensions.get('window').width*.55,height:Dimensions.get('window').height*.065,padding:10,
justifyContent:'center',backgroundColor:'black', alignItems:'center'}}>
<Text style={styles.buttonText}>Log Out</Text>
</TouchableOpacity> 
</View>
        );
      } else {
        return (
          <View style={styles.container}>
          <Text style={styles.pageText}>
            Sign in or create an account to view full features
          </Text>

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
    fetch('http://csitrd.kutztown.edu/BBmobile/ReactBackend/log_out.php', {
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  pageText: {
      color: 'gray',
      textAlign: 'center',
      fontSize: Dimensions.get('window').height*.025,
      marginBottom: 5,
  },
  buttonText: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height*.023,
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
});