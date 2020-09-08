import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

// Apollo
import { gql, useMutation } from '@apollo/client';

const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
        crearUsuario(input: $input)
    }
`;

const CrearCuenta = () => {

    // State del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mensaje, setMensaje] = useState(null);

    // React navigation
    const navigation = useNavigation();

    // Mutation de Apollo
    const [crearUsuario] = useMutation(NUEVA_CUENTA);

    // Cuando el usuario presiona en CrearCuenta
    const handleSubmit = async () => {
        // Validar
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '') {
            // mostrar un error
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        // Password al menos de 6 caracteres
        if (password.length < 6) {
            setMensaje('El password debe de tener al menos 6 caracteres')
            return;
        }
        // Guardar el usuario
        try {
            const { data } = await crearUsuario({
                variables: {
                    input: {
                        nombre,
                        email: email.toLowerCase(),
                        password
                    }
                }
            });
            setMensaje(data.crearUsuario)
            navigation.navigate("Login")
        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''))
        }
    };

    // Muestra un mensaje toast
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 3000
        })
    };

    return (
        <Container style={[globalStyles.contenedor, { backgroundColor: '#e84347' }]}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>UpTask</H1>

                <Form>
                    <Item
                        inlineLabel
                        last
                        style={globalStyles.input}
                    >
                        <Input
                            placeholder="Nombre"
                            onChangeText={texto => setNombre(texto)}
                        />
                    </Item>
                    <Item
                        inlineLabel
                        last
                        style={globalStyles.input}
                    >
                        <Input
                            placeholder="Email"
                            onChangeText={texto => setEmail(texto)}
                        />
                    </Item>
                    <Item
                        inlineLabel
                        last
                        style={globalStyles.input}
                    >
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={texto => setPassword(texto)}
                        />
                    </Item>
                </Form>
                <Button
                    square
                    block
                    style={globalStyles.boton}
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
                </Button>
                {mensaje && mostrarAlerta()}
            </View>
        </Container>
    );
};

export default CrearCuenta;