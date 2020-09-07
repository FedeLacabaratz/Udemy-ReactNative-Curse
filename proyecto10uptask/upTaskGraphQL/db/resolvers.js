
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

// Crea y firma un jsonwebtoken
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, email } = usuario;

    return jwt.sign({ id, email }, secreta, { expiresIn });
};

const resolvers = {
    Query: {

    },
    Mutation: {
        crearUsuario: async (_, { input }) => {
            const { password, email } = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });

            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            try {
                // Hashear password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);

                // Registrar nuevo usuario
                const nuevoUsuario = new Usuario(input);

                nuevoUsuario.save();
                return "Usuario creado correctamente";
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { password, email } = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });

            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }

            // Si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error('Credenciales incorrectas');
            }

            // Dar acceso a la app
            return {
                token: crearToken(existeUsuario, process.env.SECRET, '2hr')
            }
        }
    }
};

module.exports = resolvers;