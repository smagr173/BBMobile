/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    October 18, 2021                                    */
/*  Filename:   ListItem.js                                         */
/*  Purpose:    Used in MapScreen and DiscoverScreen. Reusable      */
/*              component for search filter buttons.                */
/*                                                                  */
/********************************************************************/

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = ({ item, onPress, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  button: {
    padding: 10
  },
});
