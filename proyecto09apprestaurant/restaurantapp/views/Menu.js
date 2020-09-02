import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Separator, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

    // Context de Firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    // Context de pedido
    const { seleccionarPlatillo } = useContext(PedidoContext);

    // Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, index) => {

        if (index > 0) {
            const categoriaAnterior = menu[index - 1].categoria;
            if (categoriaAnterior !== categoria) {
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>{categoria}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                </Separator>
            )
        }

    };

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#fff' }}>
                <List>
                    {menu.map((platillo, index) => {
                        const { imagen, nombre, descripcion, categoria, precio, id } = platillo;
                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, index)}
                                <ListItem 
                                    style={{ marginRight: '4%' }}
                                    onPress={() => {

                                        // Eliminar algunas propiedades del platillo
                                        const { existencia, ...platillo2 } = platillo;
                                        
                                        seleccionarPlatillo(platillo2);
                                        navigation.navigate("DetallePlatillo");
                                    }}
                                >
                                    <Thumbnail
                                        large square
                                        source={{ uri: imagen }}
                                    />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            style={{ marginVertical: 7 }}
                                            note
                                            numberOfLines={2}
                                        >
                                            {descripcion}
                                        </Text>
                                        <Text>Precio: {precio} €</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container >
    );
};

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000'
    },
    separadorTexto: {
        color: '#ffda00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Menu;