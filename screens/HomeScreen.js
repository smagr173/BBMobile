import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Links',
 };

render() {
  const {navigate} = this.props.navigation;
  return (
  <View style={styles.container}>

  <TouchableOpacity
  onPress={() => navigate('Settings')}
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Create Account</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
  onPress={() => navigate('SignIn')}
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Sign In</Text>
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
});