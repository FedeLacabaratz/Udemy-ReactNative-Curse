import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({navigation, route}) => {

    const { setConsultarAPI } = route.params;
    const { id, nombre, telefono, correo, empresa } = route.params.item;

    const mostrarConfirmacion = () => {
        Alert.alert(
            'Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                {text: 'Si, eliminar', onPress: () => eliminarContacto() },
                {text: 'Cancelar', style: 'cancel'}
            ]
        )
    };

    const eliminarContacto = async () => {
        try {
            if (Platform.OS === 'ios') {
                // Para ios
                await axios.delete(`http://localhost:3000/clientes/${id}`);
                setConsultarAPI(false);
            } else {
                //Para android
                await axios.delete(`http://10.0.2.2:3000/clientes/${id}`);
                setConsultarAPI(false);
            }

        } catch (error) {
            console.log(error);
        }

        // redireccionar
        navigation.navigate("Inicio");

        // Volver a consultar la API
        setConsultarAPI(true)
    }

    return (  
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading></Text>

            <Button
                mode="contained"
                icon="cancel"
                style={styles.boton}
                onPress={() => mostrarConfirmacion()}
            >
                Eliminar Cliente
            </Button>
            <FAB 
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", { cliente: route.params.item, setConsultarAPI })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18,
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
});
 
export default DetallesCliente;