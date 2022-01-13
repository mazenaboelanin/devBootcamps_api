const mongoose = require('mongoose');
const {Schema } = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type: String,
        required:[ true, "Please add an email"],
        unique: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    role:{
        type: String,
        enum: ['user', 'publisher'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, "Please add an password"],
        minlength: 6,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: String,
        default: Date.now
    }
});



// Sign JWT Token
userSchema.methods.getSignedJwtToken = function(){

    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}


module.exports = mongoose.model('user', userSchema);