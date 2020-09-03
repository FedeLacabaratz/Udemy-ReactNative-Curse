import React, { useContext, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Grid, Col, Icon, Left, Body, Button, H1, Footer, FooterTab } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import firebase from '../firebase';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const navigation = useNavigation();

    // Leer los datos del context
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoOrdenado } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
    };

    // Redirecciona a progreso de pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu Pedido',
            'Una vez que realizad tu pedido no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        // crear un objeto
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        }
                        
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoOrdenado(pedido.id)

                            // Redireccionar a Progreso pedido
                            navigation.navigate("ProgresoPedido")
                        } catch (error) {
                            console.log(error)
                        }

                        // Escribir el pedido en Firebase

                    }
                },
                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        )
    };

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = (id) => {
        Alert.alert(
            'Deseas eliminar este artículo?',
            'Una vez eliminado no podrás deshacer esta acción',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                            eliminarProducto(id)
                    }
                },
                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        )
    };

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen de su Pedido:</H1>
                {pedido.map((platillo, index) => {
                    const { cantidad, nombre, id, precio, imagen } = platillo;
                    return (
                        <List
                            key={id + index}
                        >
                            <ListItem
                                thumbnail
                            >
                                <Left>
                                    <Thumbnail
                                        large
                                        square
                                        style={{ marginLeft: -13 }}
                                        source={{ uri: imagen }}
                                    />
                                </Left>
                                <Body>
                                    <Grid>
                                        <Col style={{ flex: 1 }}>
                                            <Text>{nombre}</Text>
                                            <Text>Cantidad: {cantidad}</Text>
                                            <Text>Precio: {precio} €</Text>
                                        </Col>
                                        <Col style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Button
                                                danger
                                                style={{ height: '100%' }}
                                                onPress={() => confirmarEliminacion(id)}
                                            >
                                                <Icon
                                                    style={{ fontSize: 40 }}
                                                    name="remove"
                                                />
                                            </Button>
                                        </Col>
                                    </Grid>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.cantidad}>Total a Pagar: {total} €</Text>
                <Button
                    onPress={() => navigation.navigate("Menu")}
                    style={{ marginTop: 30 }}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#fff' }]}>Quieres agregar algo mas?</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => progresoPedido()}
                        style={globalStyles.boton}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default ResumenPedido;
