const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { connection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.paths = {
            user: '/v1/users'
        }

        //Connect to DB
        this.connectDB();

        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    routes() {
        this.app.use(this.paths.user, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen server in', this.port);
        })
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Parse and read the data in the body
        this.app.use(express.json());
        //Public directory
        this.app.use(express.static('public'));
        //User urlencoded
        this.app.use(express.urlencoded({ extended: true }));
        //File upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    async connectDB() {
        await connection();
    }
}

module.exports = Server;