import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

const Cita = ({ item, eliminarPaciente }) => {

    const dialogoEliminar = id => {
        eliminarPaciente(id)
    }

    return (
        <View style={styles.cita} onStartShouldSetResponder={() => true}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.texto}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Síntomas: </Text>
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> Eliminar Cita &times; </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#fff',
        marginBottom: 15,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 15
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    texto: {
        fontSize: 16,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginTop: 30,
        marginBottom: 10
    },
    textoEliminar: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});

export default Cita;