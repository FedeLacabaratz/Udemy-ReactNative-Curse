
const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto');
const tarea = require('../models/tarea');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tarea = require('../models/tarea');
const { findByIdAndDelete } = require('../models/Usuario');
require('dotenv').config({ path: '.env' });

// Crea y firma un jsonwebtoken
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, email } = usuario;

    return jwt.sign({ id, email }, secreta, { expiresIn });
};

const resolvers = {
    Query: {
        obtenerProyectos: async (_, { }, ctx) => {
            try {
                const proyectos = await Proyecto.find({ creador: ctx.usuario.id });
                return proyectos;
            } catch (error) {
                console.log(error.message);
            }
        },
        obtenerTareas: async (_, { input }, ctx) => {
            try {
                const tareas = await Tarea.find({ creador: ctx.usuario.id }).where('proyecto').equals(input.proyecto);
                return tareas;
            } catch (error) {
                console.log(error.message)
            }
        }
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
                console.log(error.message);
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
                token: crearToken(existeUsuario, process.env.SECRET, '24hr')
            }
        },
        nuevoProyecto: async (_, { input }, ctx) => {
            try {
                const proyecto = new Proyecto(input);

                // Asociar al creador
                proyecto.creador = ctx.usuario.id

                // Almacenarlo en la DB
                const resultado = await proyecto.save();
                return resultado;
            } catch (error) {
                console.log(error.message);
            }
        },
        actualizarProyecto: async (_, { id, input }, ctx) => {
            // Revisar si el proyecto existe o no
            let proyecto = await Proyecto.findById(id);

            if (!proyecto) {
                throw new Error('Proyecto no encontrado')
            }

            // Revisar que la persona que trata de editarlo sea el creador
            if (proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar')
            }

            // Guardar el proyecto
            proyecto = await Proyecto.findOneAndUpdate({ _id: id }, input, { new: true, useFindAndModify: false });
            return proyecto;
        },
        eliminarProyecto: async (_, { id }, ctx) => {
            // Revisar si el proyecto existe o no
            let proyecto = await Proyecto.findById(id);

            if (!proyecto) {
                throw new Error('Proyecto no encontrado')
            }

            // Revisar que la persona que trata de borrar sea el creador
            if (proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos necesarios para borrar este proyecto')
            }

            // Eliminar el proyecto
            await Proyecto.findOneAndDelete({ _id: id });
            return "El proyecto ha sido eliminado"
        },
        nuevaTarea: async (_, { input }, ctx) => {
            try {
                const tarea = new Tarea(input);
                tarea.creador = ctx.usuario.id;
                const resultado = await tarea.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        actualizarTarea: async (_, { id, input, estado }, ctx) => {
            // Si la tarea existe o no
            let tarea = await Tarea.findById(id);

            if (!tarea) {
                throw new Error('Tarea no encontrada');
            }
            // Si la persona que edita es el creador
            if (tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar')
            }

            // Asignar estado
            input.estado = estado;

            // Guardar y retornar la tarea
            tarea = await Tarea.findByIdAndUpdate({ _id: id }, input, { new: true, useFindAndModify: false })
            return tarea;
        },
        eliminarTarea: async (_, { id }, ctx) => {
            // Revisar si la tarea existe o no
            let tarea = await Tarea.findById(id);

            if (!tarea) {
                throw new Error('Tarea no encontrada')
            }

            // Revisar que la persona que trata de borrar sea el creador
            if (tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos necesarios para borrar esta tarea')
            }

            // Borrar la tarea
            await Tarea.findOneAndDelete({ _id: id })
            return "La tarea ha sido eliminada"

        }
    }
};

module.exports = resolvers;