import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({ moneda, cryptomoneda, setMoneda, setCryptomoneda, setConsultarAPI }) => {

    const [cryptomonedas, setCryptomonedas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setCryptomonedas(resultado.data.Data)

        }
        consultarAPI();
    }, []);

    // Almacena las elecciones del usuario
    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    };
    
    const obtenerCryptomoneda = crypto => {
        setCryptomoneda(crypto)
    };

    // Funcion para cotizar precio
    const cotizarPrecio = () => {
        if(moneda.trim() === '' || cryptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }

        // Cambiar el state de consultarAPI
        setConsultarAPI(true)
    };

    const mostrarAlerta = () => {
        Alert.alert(
            'No podemos cotizar...',
            'Debes de seleccionar ambos campos antes de pulsar en "Cotizar"',
            [
                {text: 'OK'}
            ]
        )
    }
    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 100 }}
            >
                <Picker.Item label="-- Seleccione Moneda --" value="" />
                <Picker.Item label="Dólar Australiano" value="AUD" />
                <Picker.Item label="Dólar EEUU" value="USD" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Franco Suizo" value="CHF" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
                <Picker.Item label="Peso Argentino" value="ARS" />
                <Picker.Item label="Real Brasilero" value="BRL" />
                <Picker.Item label="Rublo Ruso" value="RUB" />
                <Picker.Item label="Rupia India" value="INR" />
                <Picker.Item label="Yen Japonés" value="JPY" />
                <Picker.Item label="Yuan Chino" value="CNY" />
            </Picker>
            <Text style={styles.label}>Cryptomoneda</Text>
            <Picker
                selectedValue={cryptomoneda}
                onValueChange={crypto => obtenerCryptomoneda(crypto)}
                itemStyle={{ height: 100 }}
            >
                <Picker.Item label="-- Seleccione Cryptomoneda --" value="" />
                { cryptomonedas.map(crypto => (
                    <Picker.Item 
                        key={crypto.CoinInfo.Id} 
                        label={crypto.CoinInfo.FullName} 
                        value={crypto.CoinInfo.Name} 
                    />
                )) }
            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={() => cotizarPrecio()}
            >
                <Text
                    style={styles.textoCotizar}
                >Cotizar</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        fontSize: 20,
        textTransform: 'uppercase',
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5e49e2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});

export default Formulario;
