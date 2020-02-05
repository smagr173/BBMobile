import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component {
  static navigationOptions = ({
    title: 'Update Info'   // displayed at top of screen
 });


  render() {
      return (
        <View style={styles.container}>
      
      <Text style={styles.pageText}>Location & Contact</Text>
      
         </View>
      
       );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pageText: {
    margin:10,
    fontWeight:'bold',
    color:'gray',
    textAlign:'center',
    fontSize:15
  }
  });