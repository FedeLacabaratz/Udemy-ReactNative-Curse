import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Form, Icon, Input, Button, Grid, Col, Text, Footer, FooterTab } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {

    // State para cantidades
    const [cantidad, setCantidad] = useState(1);
    const [total, setTotal] = useState(0);

    // Context
    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;

    // Redireccionar
    const navigation = useNavigation();

    // En cuanto el componente carga calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    // Calcula el total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        setTotal(totalPagar);
    };

    // incrementa en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        setCantidad(nuevaCantidad);
    };

    // decrementa en uno la cantidad
    const decrementarUno = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            setCantidad(nuevaCantidad);
        }
    };

    // confirma si una orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            'Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Almacenar el pedido al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido)

                        // Navegar hacia el resumen
                        navigation.navigate("ResumenPedido")
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    };

    return (
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid>
                        <Col style={{ flex: 1 }}>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center', width: '100%' }}
                                onPress={() => decrementarUno()}
                            >
                                <Icon
                                    style={{ fontSize: 40 }}
                                    name="remove"
                                />
                            </Button>
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Input
                                style={{ textAlign: 'center', fontSize: 20 }}
                                value={cantidad.toString()}
                                keyboardType='numeric'
                                onChangeText={cantidad => setCantidad(cantidad)}
                            />
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center', width: '100%' }}
                                onPress={() => incrementarUno()}
                            >
                                <Icon
                                    style={{ fontSize: 40 }}
                                    name="add"
                                />
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.cantidad}>Subtotal: {total} €</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => confirmarOrden()}
                    >
                        <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default FormularioPlatillo;