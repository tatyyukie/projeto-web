const mongoose = require('../database');

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true,
    },
    img: {
        type: String,
        required: true,
    }
});

const Publication = mongoose.model('Publication', PublicationSchema);
module.exports = Publication;