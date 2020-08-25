import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import { API_KEY } from '@env';


const App = () => {
  
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })
  
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgcolor, setBgcolor] = useState('rgb(71, 149, 212)');
  
  const { pais, ciudad } = busqueda;
  
  useEffect(() => {
    const consultarClima = async () => {
      if(consultar) {
        const appId = API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);
          
          // Modifica el color de fondo basado en la temperatura
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;
          
          if(actual < 10) {
            setBgcolor('rgb(105, 108, 149)');
          } else if(actual >= 10 && actual < 25) {
            setBgcolor('rgb(71, 149, 212)');
          } else {
            setBgcolor('rgb(178, 28, 61)');
          };

        } catch (error) {
          mostrarAlerta();
        }
      }
    }
    consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultados, intenta con otra ciudad o país',
        [{ text: 'OK' }]
    )
};

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgcolor,
  }


  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => ocultarTeclado()}
      >
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima 
              resultado={resultado}
            />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
