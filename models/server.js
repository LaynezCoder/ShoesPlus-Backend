const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { connection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.paths = {
            users: '/v1/users',
            shoes: '/v1/shoes',
            categories: '/v1/categories',
            brands: '/v1/brands',
            sizes: '/v1/sizes',
            collections: '/v1/collections',
            orders: '/v1/orders'
        }

        //Connect to DB
        this.connectDB();

        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.brands, require('../routes/brands.routes'));
        this.app.use(this.paths.sizes, require('../routes/sizes.routes'));
        this.app.use(this.paths.collections, require('../routes/collections.routes'));
        this.app.use(this.paths.shoes, require('../routes/shoes.routes'));
        this.app.use(this.paths.orders, require('../routes/orders.routes'));
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