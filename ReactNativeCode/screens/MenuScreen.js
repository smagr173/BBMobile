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

// Displays the menu's main categories using a scrollable tile view
export default class MenuScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>

        <View style={styles.cornerLeft}>
          <Image source={require('../assets/images/decoCorner.jpg')}
  	   			style={styles.decoCorner} /> 
        </View>
        <View style={styles.cornerRight}>
          <Image source={require('../assets/images/decoCorner2.jpg')}
  	   			style={styles.decoCorner} /> 
        </View>

        <View style={styles.tileContainer}>
          <Text style={styles.subtitle}>Breakfast & Bagels</Text>
          <Text style={styles.bodyText}>Choose from our selection of bagels and sandwiches</Text>

        <View style={{flex:2,flexDirection:'row',justifyContent: "space-between", marginBottom: Dimensions.get('window').height*.2,}}>
          <TouchableWithoutFeedback 
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/breakfast.png')} style={styles.image1} />
            </View>
          </TouchableWithoutFeedback>
          </View>
       
          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between", marginBottom: Dimensions.get('window').height*.2,}}></View>
          <TouchableWithoutFeedback
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/grounds.png')} style={styles.image1} />
            </View>
          </TouchableWithoutFeedback>

          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between", marginBottom: Dimensions.get('window').height*.2,}}></View>
          <TouchableWithoutFeedback
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/coffee.png')} style={styles.image1} />
            </View>
          </TouchableWithoutFeedback>

          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />
          
          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between", marginBottom: Dimensions.get('window').height*.2,}}></View>
          <TouchableWithoutFeedback
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/special.png')} style={styles.image1} />
            </View>
          </TouchableWithoutFeedback>
   
        </View>
      </ScrollView>
    );  // End return
  }  // End render
}  // End class component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tileContainer: {
    alignItems: 'center'
  },
  cornerRight: {
    alignItems: 'flex-end',
    marginRight: 5
  },
  cornerLeft: {
    alignItems: 'flex-start',
    marginLeft: 5
  },
  image1: {
    width: Dimensions.get('window').width * .6,
    height: Dimensions.get('window').width * .5,
    borderWidth: 10,
    borderColor: '#404040',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.022,
  },
  tileStlye: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width*.7,
    height: Dimensions.get('window').width*.6,
  },
  divider: {
    marginTop: 20,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .003,
    marginBottom: 20,
  },
  bodyText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.03,
    marginBottom: 7,
    marginTop: 14,
  },
  decoCorner: {
    width: Dimensions.get('window').width * .2,
    height: Dimensions.get('window').width * .2,
    position: 'absolute'
  },
})

