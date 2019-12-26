const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    imageURL:{
        type: String,
        required: true
    },

    product_id:{
        type:String,
        required: true
    },

    sold:{
        type: Number,
        required: true
    },
    
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const AdminModel = mongoose.model('Admin' , AdminSchema);


module.exports = { AdminModel }