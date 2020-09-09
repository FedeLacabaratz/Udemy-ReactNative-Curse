import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Form, Item, Input, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';

const NUEVO_PROYECTO = gql`
    mutation nuevoProyecto($input: ProyectoInput) {
        nuevoProyecto(input: $input) {
            nombre
            id
        }
    }
`;

// Actualizar el cache
const OBTENER_PROYECTOS = gql`
    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }
`;

const NuevoProyecto = () => {

    const navigation = useNavigation();

    // State del componente
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState(null);

    // Apollo
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
        update(cache, { data: { nuevoProyecto } }) {
            const { obtenerProyectos } = cache.readQuery({ query: OBTENER_PROYECTOS});
            cache.writeQuery({
                query: OBTENER_PROYECTOS,
                data: { obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) }
            })
        }
    });

    // Validar crear proyecto
    const handleSubmit = async () => {
        if (nombre.trim() === '') {
            setMensaje('El nombre del proyecto es obligatorio');
            return;
        }

        // Guardar el Proyecto en la base de datos
        try {
            const { data } = await nuevoProyecto({
                variables: {
                    input: {
                        nombre
                    }
                }
            });
            setMensaje('Proyecto creado correctamente');
            navigation.navigate("Proyectos");
        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''));
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
        <Container style={[globalStyles.contenedor], { backgroundColor: '#e84347' }}>
            <View style={globalStyles.contenido}>

                <H1 style={globalStyles.subtitulo}>Nuevo Proyecto</H1>
                <Form>
                    <Item
                        inlineLabel
                        last
                        style={globalStyles.input}
                    >
                        <Input
                            placeholder="Nombre del Proyecto"
                            onChangeText={texto => setNombre(texto)}
                        />
                    </Item>
                </Form>
                <Button
                    style={[globalStyles.boton, { marginTop: 30 }]}
                    square
                    block
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.botonTexto}>Crear Proyecto</Text>
                </Button>
                {mensaje && mostrarAlerta()}
            </View>
        </Container>
    );
}

export default NuevoProyecto;
