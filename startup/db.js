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
  };

  mongoose.connect('mongodb+srv://nwldev:Gd6PVhISTtJZNCoO@nwleafdb.9j2yyia.mongodb.net/?retryWrites=true&w=majority', options)
    .then(() => {
      console.log('Connected to MongoDB | Server is up and running.');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });
};
