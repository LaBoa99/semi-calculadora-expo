import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Calculadora from './components/Calculadora';
// You can import from local files

// or any pure javascript modules available in npm

export default function App() {
  return (
    <View style={styles.container}>
      <Calculadora/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
