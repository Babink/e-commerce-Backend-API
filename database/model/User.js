const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is invalid'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },

    tokens: [{
        access: {
            type: String,
            required: true  
        },

        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateToken = function(){
    var user = this;
    var access = "auth";
    var token = jwt.sign({ _id: user._id.toHexString() , access } , 'salt').toString();

    user.tokens.push({ access , token });

    return user.save().then(() => {
        return token;
    })
}

UserSchema.statics.findByCred = function(email , password){
    var User = this;

    return User.findOne({ email }).then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve , reject) => {
            bcrypt.compare(password , user.password , (err , res) => {
                if(res){
                    resolve(user);
                }
                else {
                    reject();
                }
            })
        })
    })
}

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decode;

    try{
        decode = jwt.verify(token , 'salt');
    }catch(e){
        return Promise.reject(e);
    }

    return User.findOne({
        _id: decode._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}


UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        $pull:{
            tokens: {
                token: token
            }
        }
    })
}

UserSchema.pre('save' , function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10 , (err , salt) => {
            bcrypt.hash(user.password , salt , (err , hash) => {
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
})

const User = mongoose.model('Users' , UserSchema);

module.exports = { User }