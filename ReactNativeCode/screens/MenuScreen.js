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
import { SectionList, StyleSheet, Text, View } from 'react-native';

export default class MenuScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'Bagels', data: ['Everything', 'Plain']},
            {title: 'Drinks', data: ['Coffee', 'Tea', 'Water']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>
          {section.title}</Text>}
          keyExtractor={(item, index) => index}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionHeader: {  /** For Category Header */
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {   /** For each item in list */
    padding: 10,
    fontSize: 14,
    height: 44,
  },
})

MenuScreen.navigationOptions = {
  title: 'Menu',   /** Title Top of Page */
};