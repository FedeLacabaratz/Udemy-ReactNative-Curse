import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({ navigation, route }) => {

    const { setConsultarAPI } = route.params;

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState(''.toLowerCase());
    const [empresa, setEmpresa] = useState('');
    const [alerta, setAlerta] = useState(false);

    // Detectar si estamos editando o no
    useEffect(() => {
        if (route.params.cliente) {
            const { nombre, telefono, correo, empresa } = route.params.cliente;

            setNombre(nombre);
            setTelefono(telefono);
            setCorreo(correo);
            setEmpresa(empresa);
        }
    }, [])

    // Almacena el cliente en la base de datos
    const guardarCliente = async () => {
        // Validar
        if (nombre.trim() === '' || telefono.trim() === '' || correo.trim() === '' || empresa.trim() === '') {
            setAlerta(true);
            return;
        }

        // generar el cliente

        const cliente = { nombre, telefono, correo: correo.toLowerCase(), empresa }

        // Si estamos editando o creando un nuevo cliente
        if (route.params.cliente) {
            const { id } = route.params.cliente;
            cliente.id = id
            try {
                if (Platform.OS === 'ios') {
                    // Para ios
                    await axios.put(`http://localhost:3000/clientes/${id}`, cliente);
                    setConsultarAPI(false);
                } else {
                    //Para android
                    await axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
                    setConsultarAPI(false);
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            // guardar el cliente en la API
            try {
                if (Platform.OS === 'ios') {
                    // Para ios
                    await axios.post('http://localhost:3000/clientes', cliente);
                    setConsultarAPI(false);
                } else {
                    //Para android
                    await axios.post('http://10.0.2.2:3000/clientes', cliente);
                    setConsultarAPI(false);
                }

            } catch (error) {
                console.log(error);
            }
        }

        // redireccionar
        navigation.navigate("Inicio")

        // limpiar el form (opcional)
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEmpresa('');

        // Cambiar a true para traernos el nuevo cliente
        setConsultarAPI(true);
    }

    return (
        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

            <TextInput
                label="Nombre"
                placeholder="Tu nombre aquí..."
                onChangeText={texto => setNombre(texto)}
                value={nombre}
                style={styles.input}
            />
            <TextInput
                label="Teléfono"
                onChangeText={texto => setTelefono(texto)}
                value={telefono}
                placeholder="666 555 444"
                style={styles.input}
            />
            <TextInput
                label="Correo"
                onChangeText={texto => setCorreo(texto)}
                value={correo}
                placeholder="correo@correo.com"
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                onChangeText={texto => setEmpresa(texto)}
                value={empresa}
                placeholder="Tu empresa aquí..."
                style={styles.input}
            />

            <Button
                icon="pencil-circle"
                mode="contained"
                onPress={() => guardarCliente()}
            >
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => setAlerta(false)}
                >
                    <Dialog.Title>Error...</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => setAlerta(false)}
                        >OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent',
    }
});

export default NuevoCliente;