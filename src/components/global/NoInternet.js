import React from 'react';

import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {Colors} from './Colors';

export const NoInternet = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.noInternetForm}>
        <Text style={styles.text}>Интернэт холболтоо шалгаад </Text>
        <Text style={styles.text}>дахин оролдоно уу.</Text>
        <Image
          resizeMode="stretch"
          source={require('../../assets/internet.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noInternetForm: {
    height: '100%',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    color: '#000',
  }
});

export default NoInternet;
