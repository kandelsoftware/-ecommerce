const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 1000
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    shipping: {
        require: true,
        type: Boolean
    },
    available: {
        require: true,
    },
    wood: {
        type: Schema.Types.ObjectId,
        ref: 'Wood',
        require: true
    },
    frets: {
        required: true,
        type: Number
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }

}, { timestamps: true })
const Product = mongoose.model('product', productSchema);
module.exports = {
    Product
};