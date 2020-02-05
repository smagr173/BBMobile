import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {
  static navigationOptions = ({
    title: 'Settings'   // displayed at top of screen
 });


  render() {
    const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>

        <TouchableOpacity
 	    	 onPress={() => navigate('Update')}
  		  style={{marginTop:20,width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
  	   	alignItems:'center'}}>
  	  	<Text style={styles.buttonText}>Update Info</Text>
  	  	</TouchableOpacity> 

        <Text style={styles.divider}>_____________________________</Text>

        <TouchableOpacity
 	    	 onPress={() => navigate('Update')}
  		  style={{marginTop:20,width:250,height:42,padding:10, justifyContent:'center',backgroundColor:'black',
  	   	alignItems:'center'}}>
  	  	<Text style={styles.buttonText}>Log Out</Text>
  	  	</TouchableOpacity>  

         </View>
      
       );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  pageText: {
    margin:10,
    fontWeight:'bold',
    color:'gray',
    textAlign:'center',
    fontSize:12
  },
  buttonText: {
		fontWeight:'bold',
		color:'white',
		textAlign:'center',
		fontSize:14
	  },
  link: {
    width:100,
    padding:10,
    alignItems:'center'
  },
  divider: {
    fontWeight:'bold',
    color:'black',
    textAlign:'center',
    fontSize:17
  }
  
  });