import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const App = () => {

  const [inputTexto, setInputTexto] = useState('');
  const [nombreStorage, setNombreStorage] = useState('');

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      setNombreStorage(inputTexto);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setNombreStorage('');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <View style={styles.contenedor}>
        {nombreStorage ? <Text>Hola: {nombreStorage}</Text> : null}

        <TextInput
          placeholder="Escribe tu Nombre"
          style={styles.input}
          onChangeText={texto => setInputTexto(texto)}
        />

        <Button
          title="Guardar"
          color="#333"
          onPress={() => guardarDatos()}
        />

        {nombreStorage ? (
          <TouchableHighlight
            onPress={() => eliminarDatos()}
            style={styles.btnEliminar}
          >
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ) : null}

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    textAlign: 'center',
    width: 300,
    height: 40,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 280,
  },
});

export default App;
