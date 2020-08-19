import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Cita from './components/Cita';

const App = () => {

  // Definir el state de citas
  const [citas, setCitas] = useState([
    { id: "1", paciente: "Hook", propietario: "Fede", sintomas: "No Come" },
    { id: "2", paciente: "Redux", propietario: "Yami", sintomas: "No Duerme" },
    { id: "3", paciente: "Native", propietario: "Lucy", sintomas: "No Canta" },
  ]);

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo} >Administrador de Citas</Text>
        <FlatList
          data={citas}
          renderItem={({item}) => (
            <Cita cita={item}/>
          )}
          keyExtractor={ cita => cita.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#0580e3',
    flex: 1
  },
  titulo: {
    color: '#fff',
    marginTop: 40,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
