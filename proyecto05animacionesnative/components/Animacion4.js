import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const Animacion4 = () => {

    const [animacion] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            animacion, {
            toValue: 360, // al valor que llega 360 grados
            duration: 500, // cantidad de tiempo que tarda en llegar
            useNativeDriver: false
        }
        ).start(); // iniciar la animación
    }, []);

    const interpolacion = animacion.interpolate({
        inputRange: [0, 360], // Rango de que valor a que valor va... en este caso de 0 grados a 360 grados
        outputRange: ['0deg', '360deg'] // Como quiero que se transforme cada resultado en este caso en valores aplicables a CSS... en este caso '0deg' = 0 grados y '360deg' = 360 grados, siendo cada valor que sale 'xdeg' = x grados de 0 a 360
    });

    const estiloAnimacion = {
        transform: [{ rotate: interpolacion }]
    }

    return (
        <View>
            <Animated.View
                style={[styles.texto, estiloAnimacion]}
            ></Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    texto: {
        width: 100,
        height: 100,
        backgroundColor: 'cornflowerblue',
    }
});

export default Animacion4;