import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default class register extends Component {
  static navigationOptions = ({
    title: 'Register'
 });
    
constructor(props) {
  super(props)
  this.state = {
    userName: '',
    userEmail: '', 
    userPassword1: '',
    userPassword2: ''				
  }
}

userRegister = () => {
  
  const {userName} = this.state;
  const {userEmail} = this.state;
  const {userPassword1} = this.state;
  const {userPassword2} = this.state;
  
  fetch('http://csitrd.kutztown.edu/~smagr173/create_account.php', {
    method: 'POST',
    header: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: this.state.userName,
      email: this.state.userEmail,
      password1: this.state.userPassword1,
      password2: this.state.userPassword2,
    })
    
  })
  .then((response) => response.json())
    .then((responseJson) => {
      console.warn(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });

}

render() {
  return (
  <View style={styles.container}>
  <TextInput
  placeholder="Enter Name"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText = {userName => this.setState({userName})}
  
  />
  
  <TextInput
  placeholder="Enter Email"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userEmail => this.setState({userEmail})}
  />
  
  <TextInput
  placeholder="Enter Password"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword1 => this.setState({userPassword1})}
  />
  
  <TextInput
  placeholder="Re-enter Password"
  style={{width:250,margin:10, borderColor:"#333", 
  borderWidth:1}}	
  underlineColorAndroid="transparent"
  onChangeText= {userPassword2 => this.setState({userPassword2})}
  />

  <TouchableOpacity
  onPress={this.userRegister}
  style={{width:250,padding:10, backgroundColor:'magenta',
  alignItems:'center'}}>
  <Text style={{color:'#fff'}}>Signup</Text>
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

AppRegistry.registerComponent('register', () => register);