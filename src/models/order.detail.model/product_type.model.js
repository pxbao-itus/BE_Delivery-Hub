const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const productTypeSchema = new Schema({
    _id : Number,
    productTypeName: String,
    price: Number,
    unit: String 

},{versionKey: false}) ;

const ProductTypeModel = mongoose.model('ProductTypeModel', productTypeSchema, 'ProductType');

module.exports = ProductTypeModel;
