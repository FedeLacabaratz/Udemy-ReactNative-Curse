const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' })
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const conectarDB = require('./config/db');


// Conectar a la base de datos
conectarDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
                return {
                    usuario
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Servidor listo en la URL ${url}`);
});