import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {

    const { pais, ciudad } = busqueda;

    const [animacionBoton] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }

        // Consultar la API
        setConsultar(true);
    };

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y un país para poder buscar',
            [{ text: 'Entendido' }]
        )
    };

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .75,
            useNativeDriver: true
        }).start();
    };

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction: 3,
            tension: 30,
            useNativeDriver: true
        }).start();
    };

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    };

    return (
        <>
            <View>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => setBusqueda({ ...busqueda, ciudad })}
                        placeholder="Escribe una Ciudad del País elegido..."
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <View style={{ backgroundColor: '#fff' }}>
                        <Picker
                            selectedValue={pais}
                            onValueChange={pais => setBusqueda({ ...busqueda, pais })}
                            itemStyle={{ height: 120, backgroundColor: '#fff' }}
                        >
                            <Picker.Item label="-- Seleccione un País --" value="" />
                            <Picker.Item label="Alemania" value="DE" />
                            <Picker.Item label="Argentina" value="AR" />
                            <Picker.Item label="Australia" value="AU" />
                            <Picker.Item label="Brasil" value="BR" />
                            <Picker.Item label="Canada" value="CA" />
                            <Picker.Item label="China" value="CN" />
                            <Picker.Item label="España" value="ES" />
                            <Picker.Item label="Estados Unidos" value="US" />
                            <Picker.Item label="Francia" value="FR" />
                            <Picker.Item label="Grecia" value="GR" />
                            <Picker.Item label="India" value="IN" />
                            <Picker.Item label="Irlanda" value="IE" />
                            <Picker.Item label="Italia" value="IT" />
                            <Picker.Item label="Japón" value="JP" />
                            <Picker.Item label="Noruega" value="NO" />
                            <Picker.Item label="Reino Unido" value="GB" />
                            <Picker.Item label="Paises Bajos" value="NL" />
                            <Picker.Item label="Poland" value="PL" />
                            <Picker.Item label="Portugal" value="PT" />
                            <Picker.Item label="Russia" value="RU" />
                            <Picker.Item label="Suiza" value="SE" />
                        </Picker>
                    </View>
                    <TouchableWithoutFeedback
                        onPressIn={() => animacionEntrada()}
                        onPressOut={() => animacionSalida()}
                        onPress={() => consultarClima()}
                    >
                        <Animated.View
                            style={[styles.btnBuscar, estiloAnimacion]}
                        >
                            <Text style={styles.textoBuscar}>Buscar Clima</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Formulario;
