const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: String,
        require: true,
        enum: ['Male','Female']
    },
    profilePicture: {
        url:{
            type: String,
            require: true
        },
        publicId: {
            type: String,
            require: true
        }
    }
},{timestamps: true})

const usermodel = mongoose.model('user', userSchema)

module.exports = usermodel