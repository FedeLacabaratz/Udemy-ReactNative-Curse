const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB connectada');
    } catch (error) {
        console.log('Hubo un error')
        console.log(error.message);
        process.exit(1); // Esto es para detener la app
    }
};

module.exports = conectarDB;