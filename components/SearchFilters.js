/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    June 9, 2021                                        */
/*  Filename:   SearchFilters.js                                    */
/*  Purpose:    Used in MapScreen and DiscoverScreen. Reusable      */
/*              component for search filter buttons.                */
/*                                                                  */
/********************************************************************/

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const FiltersComponent = (props) => {
  // Animated value for fade in effect, used on bottom bar of the selected button
  const fadeAnim = props.firstMount ? 1 : new Animated.Value(0);
  // State for handling the touchable opacity effect for filter buttons
  const [isPressed, setIsPressed] = useState(1);
  // Returns true or false depending on if the button is selected or not
  const isSelected = props.textColor == 'red' ? true : false

  useEffect(() => {
    props.firstMount ? null :
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();
  }, [props.selectedId]);

  return (
    <View style={styles.searchButton}>
      <TouchableWithoutFeedback
          onPress={props.onPress}
          onPressIn={() => setIsPressed(0.6)}
          onPressOut={() => setIsPressed(1)}>
        <View style={[ styles.innerContainer, { bottom: isSelected ? 0 : screenWidth < 670 ? -2.4 : -3 } ]}>
          {( props.category == 'Popular' ) ?
            <Ionicons name={'ios-star'}
              size={(screenWidth < 670 ? 17.5 : 25)}
              color={props.textColor}
              style={[styles.starIcon, { opacity: isPressed, top: -1 } ]}/>
          : null }
          <Text style={[ styles.buttonText, { color: props.textColor, opacity: isPressed } ]}>{props.category}</Text>
        </View>
      </TouchableWithoutFeedback>
      { isSelected ? <Animated.View style={[styles.selectedView, { opacity: fadeAnim } ]}/> : null }
    </View>
  );
}

export default FiltersComponent;

const styles = StyleSheet.create({
  searchButton: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  selectedView: {
    width: '100%',
    height: (screenWidth < 670 ? 2.5 : 3),
    backgroundColor: 'red',
    borderRadius: (screenWidth < 670 ? 1 : 4),
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: (screenWidth < 670 ? 16 : 19),
  },
  innerContainer: {
    paddingLeft: (screenWidth < 670 ? 10 : 15),
    paddingRight: (screenWidth < 670 ? 10 : 15),
    height: (screenWidth < 670 ? 34.5 : 42),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  starIcon: {
    backgroundColor: 'transparent',
    marginRight: (screenWidth < 670 ? 5.5 : 8),
  },
});
