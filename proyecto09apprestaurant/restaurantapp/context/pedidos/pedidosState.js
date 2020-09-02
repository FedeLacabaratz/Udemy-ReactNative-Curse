import React, { useReducer } from 'react';

import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import { SELECCIONAR_PRODUCTO } from '../../types';

const PedidoState = props => {

    // Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null
    };

    // useReducer con dispatch para ejecutar las funcions
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    // Selecciona el producto que el usuario desea ordenar
    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    return (
        <PedidoContext.Provider
        value={{
            pedido: state.pedido,
            platillo: state.platillo,
            seleccionarPlatillo
          }}  
        >
            {props.children}
        </PedidoContext.Provider>
    )
};

export default PedidoState;