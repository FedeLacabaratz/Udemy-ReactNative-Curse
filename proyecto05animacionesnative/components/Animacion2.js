import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

const Animacion2 = () => {

    const [animacion] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            animacion, {
            toValue: 450, // al valor que llega va de 0px a 450px
            duration: 1000, // cantidad de tiempo que tarda en llegar
            useNativeDriver: false
        }
        ).start(); // iniciar la animación
    }, []);

    return (
        <Animated.View
            style={[
                styles.caja,
                {
                    width: animacion,
                    height: animacion,
                }
            ]}
        >
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    caja: {
        width: 100,
        height: 100,
        backgroundColor: 'cornflowerblue',
    }
});

export default Animacion2;