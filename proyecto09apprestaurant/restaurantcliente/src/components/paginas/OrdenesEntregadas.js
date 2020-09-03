import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../ui/Orden';

const OrdenesEntregadas = () => {

    // Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // state con las ordenes
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            await firebase.db.collection('ordenes').where('completado', '==', true).onSnapshot(manejarSnapshot)
        }
        obtenerOrdenes();
        // eslint-disable-next-line
    }, []);

    function manejarSnapshot(snapshot) {
        const ordenes = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        setOrdenes(ordenes);
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Ordenes Entregadas</h1>
            <div className="sm:flex sm:flex-wrap -mx-3">
                {ordenes.map(orden => (
                    <Orden
                        key={orden.id}
                        orden={orden}
                    />
                ))}
            </div>
        </>
    );
};

export default OrdenesEntregadas;