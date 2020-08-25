import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-community/picker';

const Formulario = () => {
    return (  
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput 
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker>
                        <Picker.Item label="-- Seleccione un País --" value="" /> 
                        <Picker.Item label="Alemania" value="DE" /> 
                        <Picker.Item label="Argentina" value="AR" /> 
                        <Picker.Item label="Australia" value="AU" /> 
                        <Picker.Item label="Brasil" value="BR" /> 
                        <Picker.Item label="Canada" value="CA" /> 
                        <Picker.Item label="China" value="CN" /> 
                        <Picker.Item label="España" value="ES" /> 
                        <Picker.Item label="Estados Unidos" value="US" /> 
                        <Picker.Item label="Francia" value="FR" /> 
                        <Picker.Item label="Grecia" value="GR" /> 
                        <Picker.Item label="India" value="IN" /> 
                        <Picker.Item label="Irlanda" value="IE" /> 
                        <Picker.Item label="Italia" value="IT" /> 
                        <Picker.Item label="Japón" value="JP" /> 
                        <Picker.Item label="Noruega" value="NO" /> 
                        <Picker.Item label="Reino Unido" value="GB" /> 
                        <Picker.Item label="Paises Bajos" value="NL" /> 
                        <Picker.Item label="Poland" value="PL" /> 
                        <Picker.Item label="Portugal" value="PT" /> 
                        <Picker.Item label="Russia" value="RU" /> 
                        <Picker.Item label="Suiza" value="SE" /> 
                    </Picker>
                    <TouchableWithoutFeedback>
                        <View>
                            <Text>Buscar Clima</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        marginTop: 100,
    },
});
 
export default Formulario;
