import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './Views/Inicio';
import Nosotros from './Views/Nosotros';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>

        <Stack.Navigator
          initialRouteName="Inicio" // Home Page, aqui la seteo
          screenOptions={{ // screenOptions es el equivalente a options de cada StackScreen cuando quiero que los estilos se apliquen a todos los stacks, lo escribo una vez aca en vez de repetir en cada componente
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen  // Aqui seteo la pagina Inicio
            name="Inicio"
            component={Inicio}
            options={{ // Dentro de options podre dar los estilos a esta página solamente (lineas 22 a 29)
              title: "Componente Principal"
            }}
          />
          <Stack.Screen  // Aqui seteo la pagina Nosotros
            name="Nosotros"
            component={Nosotros}
            options={({ route }) => ({
              title: route.params.clienteId,
            })
            }
          />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
};

export default App;
