import React, { useContext, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const navigation = useNavigation();

    // Leer los datos del context
    const { pedido, total, mostrarResumen } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
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
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: {precio} €</Text>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.cantidad}>Total a Pagar: {total} €</Text>
                <Button
                    onPress={() => navigation.navigate("Menu")}
                    style={[globalStyles.boton, {marginTop: 30}]}
                    full
                >
                    <Text style={globalStyles.botonTexto}>Quieres agregar algo mas?</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                <Button
                    onPress={() => navigation.navigate("Menu")}
                    style={[globalStyles.boton, {marginTop: 30}]}
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
