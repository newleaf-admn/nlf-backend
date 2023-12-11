require('dotenv').config();
const mongoose = require('mongoose');

module.exports = function () {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        dbName: process.env.DB_NAME
    }

    // Updated connection string format
    mongoose.connect(process.env.MONGO_URI, options)
        .then(() => {
            console.log('Connected to MongoDB | Server is up and running.');
        })
        .catch(error => {
            console.log(error);
        });
}
