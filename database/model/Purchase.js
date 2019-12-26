const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    size: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    product_url: {
        type: String,
        required: true
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

PurchaseSchema.methods.recordSold = function(){
    var user = this;
    var sold = 0;
    sold += 1;

    user.sold = sold;
}


const Purchase = mongoose.model('Purchase', PurchaseSchema);


module.exports = { Purchase };