/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <View>
      <Text style ={styles.helloText}>Hello</Text>
      <Text style ={styles.helloText}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  helloText: {
    fontSize: 20,
    marginLeft:20,
    backgroundColor:"yellow",
  },
});

export default App;
