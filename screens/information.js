/********************************************************************/
/*  Author:     Tyler Kurzawa                                       */
/*  Created:    January 25, 2020                                    */
/*  Filename:   AboutScreen.js                                      */
/*  Purpose:    This file contains information about the Bagel      */
/*              Bar Cafe. This includes their address, hours of     */
/*              operation, and phone number.                        */
/*                                                                  */
/********************************************************************/

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { ScrollView, StyleSheet, Text, View, Image} from 'react-native';

export default class AboutScreen extends Component {
  render() {
    // Set the map view location using coordinates
    var region = {
      latitude: 40.5170,
      longitude: -75.7771,
      latitudeDelta: .03,
      longitudeDelta: .03,
    }
    // Set a pin on the map using coordinates
    var pin = {
      latitude: 40.5171,
      longitude: -75.7772,
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={require('../assets/images/mainLogo.png')}
            style={styles.image1} />
      
          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.divider} />

          <Text style={styles.subtitle}>Contact</Text>
          <Text style={styles.bodyText}>610-683-5440</Text>
 
          <Text style={styles.subtitle}>Hours of Operation</Text>
          <Text style={styles.bodyText}>Weekdays: 8:00 AM - 3:00 PM</Text>
          <Text style={styles.bodyText}>Weekends: 7:00 AM - 3:00 PM</Text>

          <Text style={styles.subtitle}>Address</Text>
          <Text style={styles.bodyText}>214 W. Main St. Kutztown, PA 19530</Text>

          <Image source={require('../assets/images/divider.png')}
  	   			style={styles.dividerBottom} />

          <Text style={styles.subtitle}>Map Location</Text>

          <MapView style= 
            {styles.mapStyle}
            region={region} 
          >
            <MapView.Marker
              coordinate={pin}
               title={'The Bagel Bar Cafe'}
            />
          </MapView>
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
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.025,
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: Dimensions.get('window').height*.03,
    marginBottom: 10,
  },
  image1: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * .5
  },
  divider: {
		marginTop: 15,
		width: Dimensions.get('window').width *.5,
		height: Dimensions.get('window').width * .003,
		marginBottom: 25,
    },
    dividerBottom: {
      marginTop: 15,
      width: Dimensions.get('window').width *.85,
      height: Dimensions.get('window').width * .003,
      marginBottom: 20,
    },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .62,
    marginTop: 10,
  },
});