const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    images: [{
        url:{
            type: String,
            require: true
        },
        publicId: {
            type: String,
            require: true
        }
    }]
},{timestamps: true})

const productmodel = mongoose.model('product', productSchema)

module.exports = productmodel