import React, { useState } from 'react';
import { StyleSheet, Animated, View, Text, TouchableWithoutFeedback } from 'react-native';

const Animacion5 = () => {

    const [animacion] = useState(new Animated.Value(1))

    const presionarBtn = () => {
        Animated.spring(
            animacion, {
                toValue: .8, // Valor al que llega cuando finaliza, comienza con 1 y al presionar la escala va a .8
                useNativeDriver: false
            }).start();
    };

    const soltarBtn = () => {
        Animated.spring(
            animacion, {
                toValue: 1, // Valor al que llega cuando finaliza, comienza con 1, baja a .8 la escala y al soltar vuelve a 1
                friction: 4, // Maneja el rebote del efecto, a menor valor mayor cantidad de rebotes (el default es 7)
                tension: 10, // Maneja la suavidad del efecto rebote, a mayor valor, mas brusco el rebote
                useNativeDriver: false
            }).start();
    };

    const estiloAnimacion = {
        transform: [{ scale: animacion }]
    }
    
    return (
        <View style={styles.contenedor}>
            <TouchableWithoutFeedback
                onPressIn={() => presionarBtn()}
                onPressOut={() => soltarBtn()}
            >
                <Animated.View style={[styles.btn, estiloAnimacion]}>
                    <Text style={styles.texto}>
                        Iniciar Sesión
                     </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 28,
    },
    btn: {
        backgroundColor: 'cornflowerblue',
        width: 280,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Animacion5;
