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

  const connectionString = 'mongodb+srv://nwldev:Gd6PVhISTtJZNCoO@ac-j0n5rc2-shard-00-00.9j2yyia.mongodb.net,ac-j0n5rc2-shard-00-01.9j2yyia.mongodb.net,ac-j0n5rc2-shard-00-02.9j2yyia.mongodb.net/test?authSource=admin&replicaSet=atlas-xbmo30-shard-0&retryWrites=true&w=majority';

  mongoose.connect(connectionString, options)
    .then(() => {
      console.log('Connected to MongoDB | Server is up and running.');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });
};

