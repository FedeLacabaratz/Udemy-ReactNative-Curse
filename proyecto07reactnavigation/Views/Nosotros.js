import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const Nosotros = ({ navigation, route }) => {

    const { clienteId, totalPagar } = route.params;

    const volver = () => {
        navigation.navigate('Inicio'); // Volviendo a una pagina determinada
        // navigation.goBack(); // Idem a la funcion de arriba pero volviendo siempre a la Home
        // navigation.push('Inicio'); // Otra manera de volver a Inicio pero con un selector de flecha arriba y en la forma en la que vuelve de izq a derecha... otra variante mas
    };

    return (
        <View style={styles.contenedor}>
            <Text>{clienteId}</Text>
            <Text>{totalPagar}</Text>
            <Button
                title="Volver"
                onPress={() => volver()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
 
export default Nosotros;