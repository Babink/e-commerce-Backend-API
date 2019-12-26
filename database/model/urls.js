const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Urls = mongoose.model('Url' , URLSchema);

module.exports = { Urls };