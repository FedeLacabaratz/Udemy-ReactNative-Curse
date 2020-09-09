import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';

// Apollo
import { gql, useMutation } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input){
            token
        }
    }
`;

const Login = () => {

    // State del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mensaje, setMensaje] = useState(null);

    // React navigation
    const navigation = useNavigation();

    // Mutation de Apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    // Cuando el usuario presiona en Iniciar Sesión
    const handleSubmit = async () => {
        // Validar
        if (email.trim() === '' || password.trim() === '') {
            // mostrar un error
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        try {
            const { data } = await autenticarUsuario({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });

            const { token } = data.autenticarUsuario;
            
            // Colocar el token en storage
            await AsyncStorage.setItem('token', token);

            // Redireccionar a Proyectos
            navigation.navigate("Proyectos");

        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ',''))
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
                            placeholder="Email"
                            onChangeText={texto => setEmail(texto.toLowerCase())}
                            value={email}
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
                    <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
                </Button>
                <Text
                    style={globalStyles.enlace}
                    onPress={() => navigation.navigate("CrearCuenta")}
                >Crear Cuenta</Text>
                {mensaje && mostrarAlerta()}
            </View>
        </Container>
    );
};

export default Login;
