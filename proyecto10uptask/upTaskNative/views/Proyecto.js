import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text, H2, Content, List, Form, Item, Input, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { gql, useMutation, useQuery } from '@apollo/client';
import Tarea from '../components/Tarea';

const NUEVA_TAREA = gql`
    mutation nuevaTarea($input: TareaInput) {
        nuevaTarea(input: $input) {
            nombre
            id
            proyecto
            estado
        }
    }
`;

// Consulta las tareas del proyecto
const OBTENER_TAREAS = gql`
    query obtenerTareas($input: ProyectoIDInput) {
        obtenerTareas(input: $input) {
            id
            nombre
            estado
        }
    }
`;

const Proyecto = ({ route }) => {

    const { id } = route.params;

    // State del componente
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState(null);

    // Apollo obtener tareas

    const { data, loading, error } = useQuery(OBTENER_TAREAS, {
        variables: {
            input: {
                proyecto: id
            }
        }
    });

    // Apollo crear tareas
    const [nuevaTarea] = useMutation(NUEVA_TAREA, {
        update(cache, { data: { nuevaTarea } }) {
            const { obtenerTareas } = cache.readQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id
                    }
                }
            });

            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id
                    }
                },
                data: {
                    obtenerTareas: [...obtenerTareas, nuevaTarea]
                }
            });
        }
    });

    // Validar y crear tareas
    const handleSubmit = async () => {
        if (nombre.trim() === '') {
            setMensaje('El nombre de la tarea es obligatorio');
            return;
        }

        // Almacenarlo en la base de datos
        try {
            const { data } = await nuevaTarea({
                variables: {
                    input: {
                        nombre,
                        proyecto: id
                    }
                }
            });
            setNombre('');
            setMensaje('Tarea creada correctamente');
            setTimeout(() => {
                setMensaje(null)
            }, 3000);
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

    // Si Apollo esta consultando
    if (loading) return <Text>Cargando...</Text>

    return (
        <Container style={[globalStyles.contenedor, { backgroundColor: '#e84347' }]}>
            <Form style={{ marginHorizontal: '2.5%', marginTop: 20 }}>
                <Item
                    inlineLabel
                    last
                    style={globalStyles.input}
                >
                    <Input
                        placeholder="Nombre Tarea"
                        value={nombre}
                        onChangeText={texto => setNombre(texto)}
                    />
                </Item>
                <Button
                    style={globalStyles.boton}
                    squared
                    block
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.botonTexto}>Crear Tarea</Text>
                </Button>
            </Form>
            <H2 style={globalStyles.subtitulo}>Tareas: {route.params.nombre}</H2>
            <Content>
                <List style={styles.contenido}>
                    {data.obtenerTareas.map(tarea => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            proyectoId={id}
                        />
                    ))}
                </List>
            </Content>
            {mensaje && mostrarAlerta()}
        </Container>
    );
};

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#fff',
        marginHorizontal: '2.5%'
    },
})

export default Proyecto;
