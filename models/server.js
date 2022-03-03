const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        
        // Server app
        this.app = express();
        // Database
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas del servidos
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // Cors
        this.app.use( cors() );
        // Read and Parse - Body 
        this.app.use( express.json() );
        // Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {
        // User Routes
        this.app.use( this.usuariosPath , require( '../routes/user' ) )
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log(`Running on Port ${ this.port }`);
        });
    }

}

module.exports = Server;