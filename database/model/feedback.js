const mongoose = require('mongoose');

const FeedBackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const FeedBack = mongoose.model('FeedBack' , FeedBackSchema);

module.exports = { FeedBack }