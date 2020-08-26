import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const Animacion3 = () => {

    const [animacion] = useState(new Animated.Value(14));

    useEffect(() => {
        Animated.timing(
            animacion, {
            toValue: 40, // al valor que llega fontSize va de 14 a 40
            duration: 500, // cantidad de tiempo que tarda en llegar
            useNativeDriver: false
        }
        ).start(); // iniciar la animación
    }, []);

    return (
        <View>
            <Animated.Text 
                style={[styles.texto, { fontSize: animacion}]}
            >Animacion 3
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    texto: {
        fontSize: 30,
        textAlign: 'center',
    }
});

export default Animacion3;