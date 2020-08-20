import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {

  // Definir el state de citas
  const [citas, setCitas] = useState([
    { id: "1", paciente: "Hook", propietario: "Fede", sintomas: "No Come" },
    { id: "2", paciente: "Redux", propietario: "Yami", sintomas: "No Duerme" },
    { id: "3", paciente: "Native", propietario: "Lucy", sintomas: "No Canta" },
  ]);

  // Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <Formulario>

      </Formulario>
      <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
      <FlatList
        data={citas}
        renderItem={({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
        keyExtractor={cita => cita.id}
      />
    </View>
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
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
