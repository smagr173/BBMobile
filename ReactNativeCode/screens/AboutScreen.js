/********************************************************************/
/*  Author:     Tyler Kurzawa                                       */
/*  Created:    January 25, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   AboutScreen.js                                      */
/*  Purpose:    This file contains information about the Bagel      */
/*              Bar Cafe. This includes their address, hours of     */
/*              operation, and phone number.                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class AboutScreen extends Component {
  static navigationOptions = {
    title: 'Information',
 };

render() {
  return (
    <View style={styles.container}>
  
    <Image source={{uri: 'http://csitrd.kutztown.edu/~smagr173/BagelTest.png'}}
     style={styles.image1} />
    <Text style={styles.divider}>_____________________________</Text>
    
    <Text style={styles.subtitle}>Address</Text>
    <Text style={styles.bodyText}>214 W. Main St. Kutztown, PA 19530</Text>

    <Text style={styles.subtitle}>Contact</Text>
    <Text style={styles.bodyText}>610-683-5440</Text>
 
    <Text style={styles.subtitle}>Hours of Operation</Text>
    <Text style={styles.bodyText}>Weekdays: 8:00 AM - 3:00 PM</Text>
    <Text style={styles.bodyText}>Weekends: 7:00 AM - 3:00 PM</Text>
    </View>
  
   );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
bodyText:{
  color:'gray',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.025,
  marginBottom:5,
},
subtitle:{
  fontWeight:'bold',
  color:'black',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.03,
  marginBottom: 10,

},
image1: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width * .5
},
divider: {
  marginTop: 5,
  color:'black',
  textAlign:'center',
  fontSize:Dimensions.get('window').height*.021,
  marginBottom: 40
},
});