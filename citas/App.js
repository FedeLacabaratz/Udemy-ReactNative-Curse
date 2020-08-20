import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {

  const [mostrarForm, setMostrarForm] = useState(false)

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
  };

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm);
  };

  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.subtitulo}>Crear Nueva Cita</Text>
              <View style={styles.contenido} onStartShouldSetResponder={() => true}>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  setMostrarForm={setMostrarForm}
                />
              </View>
            </>
          ) : (
              <>
                <Text style={styles.subtitulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                  keyExtractor={cita => cita.id}
                />
              </>
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#0580e3',
    flex: 1
  },
  titulo: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#005aa3',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default App;
