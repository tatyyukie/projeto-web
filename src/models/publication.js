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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
});

const Publication = mongoose.model('Publication', PublicationSchema);
module.exports = Publication;