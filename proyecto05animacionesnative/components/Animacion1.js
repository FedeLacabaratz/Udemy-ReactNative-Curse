import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

const Animacion1 = () => {

    const [animacion] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            animacion, {
            toValue: 1, // al valor que llega va de 0 seg a 1 seg 
            duration: 500, // cantidad de tiempo que tarda en llegar
            useNativeDriver: true
        }
        ).start(); // iniciar la animación
    }, []);

    return (
        <Animated.View
            style={{
                opacity: animacion
            }}
        >
            <Text style={styles.texto}>Animacion1</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    texto: {
        fontSize: 30,
        textAlign: 'center',
    }
});

export default Animacion1;
