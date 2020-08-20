import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = () => {

  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Muestra u oculta el DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarDate = (date) => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' }
    const selectedDate = date.toLocaleDateString('es-ES', opciones)
    setFecha(selectedDate);
    hideDatePicker();
  };

  // Muestra u oculta el TimePicker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarTime = (time) => {
    console.log(time)
    const opciones = { hour: 'numeric', minute: '2-digit' }
    const selectedTime = time.toLocaleTimeString('en-US', opciones)
    setHora(selectedTime);
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    // Validaciones
    if(paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      // Falla la validación
      mostrarAlerta();
      return;
    }
  };

  // Muestra la alerta si falla la validación
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', // Título
      'Todos los campos son obligatorios', // Mensaje o cuerpo de la alerta
      [{
        text: 'OK' // Arreglo de botones
      }]
    )
  }

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono de contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setTelefono(texto)}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarDate}
            onCancel={hideDatePicker}
            locale='es_ES'
            headerTextIOS='Elige una Fecha'
            cancelTextIOS='Cancelar'
            confirmTextIOS='Confirmar'
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarTime}
            onCancel={hideTimePicker}
            locale='es_ES'
            headerTextIOS='Elige una Hora'
            cancelTextIOS='Cancelar'
            confirmTextIOS='Confirmar'
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => setSintomas(texto)}
            keyboardType='numeric'
          />
        </View>
        <View>
          <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  btnSubmit: {
      padding: 10,
      backgroundColor: '#005aa3',
      marginVertical: 10
  },
  textoSubmit: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase'
  }
})

export default Formulario;

