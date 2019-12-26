const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const AdminAuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})


AdminAuthSchema.statics.findByCred = function(username , password){
    var User = this;

    return User.findOne({ username }).then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve , reject) => {
            bcrypt.compare(password , user.password , (err , res) => {
                if(res){
                    resolve(user)
                } else{
                    reject();
                }
            })
        })
    })
}

AdminAuthSchema.pre('save' , function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10 , (err , salt) => {
            bcrypt.hash(user.password , salt , (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
})

const AdminAuth = mongoose.model('AdminAuth' , AdminAuthSchema)

module.exports = { AdminAuth }