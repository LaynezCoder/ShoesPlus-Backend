const mongoose = require('mongoose');
const route = 'mongodb://localhost:27017/ShoesPlus';

const connection = async() => {
    try {
        await mongoose.connect(route, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Error in the database');
    }
}

module.exports = {
    connection
}