/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const App = () => {
  return (
    <>
      <Text style={styles.encabezado} >Hola Mundo!</Text>
    </>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    textAlign: 'center',
    marginTop: 100
  }
});

export default App;
