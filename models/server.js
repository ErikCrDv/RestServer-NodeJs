const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.port = process.env.PORT;
        this.paths = {
            authPath: '/api/auth',
            usersPath: '/api/users',
            categoriesPath: '/api/categories',
            productsPath: '/api/products',
            searchPath: '/api/search',
            uploadPath: '/api/uploads',
        }
        
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
        // Files Uploads
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        })); 
    }

    routes() {
        // User Routes
        this.app.use( this.paths.authPath , require( '../routes/auth' ) );
        this.app.use( this.paths.usersPath , require( '../routes/user' ) );
        this.app.use( this.paths.categoriesPath , require( '../routes/category' ) );
        this.app.use( this.paths.productsPath , require( '../routes/product' ) );
        this.app.use( this.paths.searchPath , require( '../routes/search' ) );
        this.app.use( this.paths.uploadPath , require( '../routes/upload' ) );
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log(`Running on Port ${ this.port }`);
        });
    }

}

module.exports = Server;