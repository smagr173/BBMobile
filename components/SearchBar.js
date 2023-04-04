/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    June 27, 2021                                       */
/*  Filename:   SearchBar.js                                        */
/*  Purpose:    Used in MapScreen and DiscoverScreen. Reusable      */
/*              component for search bar.                           */
/*                                                                  */
/********************************************************************/

import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity,
      TouchableWithoutFeedback, Keyboard, Platform, Animated } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useSpring, animated } from 'react-spring';

const screenWidth = Dimensions.get('window').width;

const SearchBarComponent = (props) => {
  // State for whether or not the textInput is focused or not
  const [isInputFocused, setIsFocused] = useState(null);
  // State for handling the touchable opacity effect for textInput field
  const [isPressed, setIsPressed] = useState('#DCDCDC');
  // State for handling the touchable opacity effect for cancel button
  const [isPressed2, setIsPressed2] = useState(1);
  // State for rendering the real textInput (true) or the fake input field (false)
  const [isRendered, setIsRendered] = useState(false);
  
  const AnimatedView = animated(View);
  const searchRef = useRef(null);

  const handleCancel = () => {
    props.clearSearch()
    Keyboard.dismiss()
    setIsFocused(false)
    setIsRendered(false)
  }

  const handleReturn = () => {
    Keyboard.dismiss()
  }

  const handlePress = () => {
    setIsRendered(true)
    setIsFocused(true)
    props.onPress()
  }

  const { barAnim } = useSpring({
    config: { duration: (screenWidth < 670 ? 200 : 90) },
    to: { barAnim: isInputFocused ? (screenWidth < 670 ? 56 : 75) : 0 },
    from: { barAnim: isInputFocused ? 0 : (screenWidth < 670 ? 56 : 75) }
  });

  return (
    <View style={styles.searchBarContainer}>
      <TouchableWithoutFeedback
          disabled={props.opacAnim == 0 ? true : isRendered}
          onPress={handlePress}>
        <Animated.View style={[ styles.searchBar, { backgroundColor: isPressed, opacity: props.opacAnim } ]}>
          <View style={styles.innerPadding}/>
          <View style={styles.searchIconContainer}>
            <FontAwesome
              name={'search'}
              size={(screenWidth < 670 ? 17 : 23)}
              color={'#787878'} />
          </View>

          {!isRendered ? <View style={styles.fakeInputContainer}>
            {( props.searchInput != '' ) ? 
              <Text numberOfLines={1} style={[ styles.fakeInputText, { color: 'black' } ]}>{props.searchInput}</Text>
            : 
              <Text style={[ styles.fakeInputText, { color: '#585858' } ]}>{props.placeHold}</Text>}
          </View> : null}

          {isRendered ? <View style={styles.textInputContainer}>
            <TextInput
              placeholder={props.placeHold}
              placeholderTextColor={'#585858'}
              style={styles.textFieldStyle}
              underlineColorAndroid={'transparent'}
              value={props.searchInput}
              onBlur={() => setIsRendered(false)}
              onSubmitEditing={handleReturn}  // Handle return key
              onChangeText={props.handleSearch}
              ref={searchRef}
              onLayout={() => {searchRef.current.focus()}} />
          </View> : null}

          {( props.searchInput != '' ) ? <View style={styles.closeIconContainer}>
            <TouchableOpacity
                activeOpacity={'0.5'}
                onPress={props.clearSearch}>
              <Ionicons
                name={'ios-close-circle'}
                size={screenWidth < 670 ? 20 : 25}
                color={'#989898'} />
            </TouchableOpacity>
          </View> : null }
        </Animated.View>
      </TouchableWithoutFeedback>

      <AnimatedView>
        <TouchableWithoutFeedback
            onPressIn={() => setIsPressed2(0.5)}
            onPressOut={() => setIsPressed2(1)}
            onPress={handleCancel}>
          <View>
            <Text numberOfLines={Platform.OS === 'ios' ? 0 : 1} ellipsizeMode={'clip'}
              style={[ styles.cancelButtonText, { opacity: isPressed2 } ]}>Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      </AnimatedView>
    </View>  // End searchBarContainer view
  );
}

export default SearchBarComponent;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    paddingLeft: (screenWidth < 670 ? 14 : 15),
    paddingRight: (screenWidth < 670 ? 14 : 15),
    backgroundColor: 'transparent',
    paddingBottom: (screenWidth < 670 ? 2 : 8)
  },
  searchBar: {
    flex: 1,
    height: (screenWidth < 670 ? 37 : 45),
    flexDirection: 'row',
    borderRadius: 10
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingRight: (screenWidth < 670 ? 12 : 17)
  },
  fakeInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingRight: (screenWidth < 670 ? 10 : 15)
  },  
  textFieldStyle: {
    flex: 1,
    fontSize: (screenWidth < 670 ? 18 : 20),
    backgroundColor: 'transparent',
  },
  fakeInputText: {
    fontSize: (screenWidth < 670 ? 18 : 20),
    backgroundColor: 'transparent',
  },
  searchIconContainer: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: (screenWidth < 670 ? 7 : 11)
  },
  innerPadding: {
    height: '100%',
    width: (screenWidth < 670 ? 10 : 15),
    backgroundColor: 'transparent'
  },
  closeIconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingRight: (screenWidth < 670 ? 10 : 15)
  },
  cancelButtonText: {
    fontSize: (screenWidth < 670 ? 17 : 20),
    fontWeight: 'bold',
    color: '#383838'
  },
});
