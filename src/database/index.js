const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-web');
mongoose.Promise = global.Promise;

module.exports = mongoose;