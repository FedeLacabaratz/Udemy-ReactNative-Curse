import { 
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN 
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            }
        case CONFIRMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }

        default:
            return state;
    }
};

