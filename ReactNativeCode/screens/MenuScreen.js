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

          <Text style={styles.subtitleTop}>Breakfast Bagelwiches</Text>
          <Text style={styles.bodyText}>Choose from our selection of breakfast sandwiches</Text>

          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between", }}>
           <TouchableWithoutFeedback 
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/breakSand.jpg')} style={styles.image1} />
            </View>
            </TouchableWithoutFeedback>
          </View>
       
          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

          <Text style={styles.subtitle}>Lunch Bagelwiches & Wraps</Text>
          <Text style={styles.bodyText}>Grab an afternoon bagel sandwich or wrap</Text>

          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between",}}>
          <TouchableWithoutFeedback
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/wrap.jpg')} style={styles.image1} />
            </View>
          </TouchableWithoutFeedback>
          </View>

          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

          <Text style={styles.subtitle}>Fresh Baked Bagels</Text>
          <Text style={styles.bodyText}>Choose from a variety of bagels and toppings</Text>

          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between",}}>
          <TouchableWithoutFeedback
            onPress={() => navigate('Home')}>
            <View style={styles.tileStlye}>
              <Image source={require('../assets/images/bagels.jpg')} style={styles.image1} />
            </View>
          </TouchableWithoutFeedback>
          </View>
          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />
          
          <Text style={styles.subtitle}>Beverages</Text>
          <Text style={styles.bodyText}>A range of iced or hot beverages await you</Text>

          <View style={{flex:2,flexDirection:'row',justifyContent: "space-between",marginBottom:Dimensions.get('window').height*.05,}}>
            <TouchableWithoutFeedback
              onPress={() => navigate('Home')}>
              <View style={styles.tileStlye}>
                <Image source={require('../assets/images/coffeeTea.png')} style={styles.image1} />
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>

        <View style={styles.cornerBLeft}>
          <Image source={require('../assets/images/decoCornerBL.png')}
  	   			  style={styles.decoCorner} /> 
        </View>

        <View style={styles.cornerBRight}>
          <Image source={require('../assets/images/decoCornerBR.png')}
  	   			  style={styles.decoCorner} /> 
        </View>

      </ScrollView>
    );  // End return
  }  // End render
}  // End class component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10
  },
  tileContainer: {
    alignItems: 'center',
    borderWidth: Dimensions.get('window').width*.0033,
    borderColor: 'black',
    marginRight: 10,
    marginLeft: 10
  },
  cornerRight: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop:0
  },
  cornerLeft: {
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop:10
  },
  cornerBRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom:0
  },
  cornerBLeft: {
    justifyContent: 'flex-end',
    marginLeft: 9.5,
    marginBottom:0
  },
  image1: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.022,
  },
  tileStlye: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width*.7,
    height: Dimensions.get('window').width*.7,
    borderWidth: 5,
    borderColor: '#404040',
    marginBottom: Dimensions.get('window').height*.013,
  },
  divider: {
    marginTop: 20,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .003,
    marginBottom: Dimensions.get('window').height*.02,
  },
  decoDivider: {
    marginTop: 20,
    width: Dimensions.get('window').width *.85,
    height: Dimensions.get('window').width * .09,
    marginBottom: Dimensions.get('window').height*.02,
  },
  bodyText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.03,
    marginBottom: 7,
    marginTop: 10,
  },
  subtitleTop: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.03,
    marginBottom: 7,
    marginTop: 25,
  },
  decoCorner: {
    width: Dimensions.get('window').width * .2,
    height: Dimensions.get('window').width * .2,
    position: 'absolute'
  },
})

