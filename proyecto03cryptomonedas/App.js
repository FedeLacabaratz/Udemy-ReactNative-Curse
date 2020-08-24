import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [cryptomoneda, setCryptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCryptomoneda = async () => {
      if (consultarAPI) {
        // Consultar la API para obtener la cotización
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        // Activando el spinner
        setCargando(true);

        //Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[cryptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 1500);
      }
    }
    cotizarCryptomoneda();
  }, [consultarAPI]);

  // mostrar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5e49e2" style={{ marginTop: 30 }} /> : <Cotizacion resultado={resultado} />

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            cryptomoneda={cryptomoneda}
            setMoneda={setMoneda}
            setCryptomoneda={setCryptomoneda}
            setConsultarAPI={setConsultarAPI}
          />
        </View>
        <View style={{ marginTop: 30}}>
          {componente}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginRight: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
