/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    Febuary 1, 2020                                     */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   MenuScreen.js                                       */
/*  Purpose:    This file contains the Bagel Bar menu organized     */
/*              by category.                                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { ScrollView, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';

export default class MenuScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tileContainer}>
        
          <TouchableWithoutFeedback 
            onPress={() => navigate('Home')}>
              <View style={{backgroundColor:'black',marginBottom:10}}>
             <Text style={styles.buttonText}>Breakfast</Text>
             <Image source={require('../assets/images/breakfast.png')} style={styles.image1} />
          </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity style={{backgroundColor:'gray', marginBottom:10}}
            onPress={() => navigate('Home')}>
            <Text style={styles.buttonText}>Lunch</Text>
            <Image source={require('../assets/images/grounds.png')} style={styles.image1} />
          </TouchableOpacity>
 

        <TouchableOpacity style={{backgroundColor:'gray', marginBottom:10}}
          onPress={() => navigate('Home')}>
          <Text style={styles.buttonText}>Coffee</Text>
          <Image source={require('../assets/images/coffee.png')} style={styles.image1} />
        </TouchableOpacity>

          
        <TouchableOpacity style={{backgroundColor:'black'}}
          onPress={() => navigate('Home')}>
          <Text style={styles.buttonText}>Speciality Drinks</Text>
          <Image source={require('../assets/images/special.png')} style={styles.image1} />
        </TouchableOpacity>
   
       </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tileContainer: {
    margin: 20,
  },
  image1: {
    width: Dimensions.get('window').width * .9,
    height: Dimensions.get('window').width * .7
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.022,
  },
  topButton: {
    width: Dimensions.get('window').width*.5,
    height: Dimensions.get('window').height*.25,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center'
  },
})

MenuScreen.navigationOptions = {
  title: 'Menu',   /** Title Top of Page */
};