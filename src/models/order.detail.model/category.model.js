const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const categoryOfProductsSchema = new Schema({
    _id : Number,
    ownerID: Number,
    productTypeName: String,
    quantityInStock: Number,
    color: String,
    unitPrice: Number,
    size: Number

},{versionKey: false}) ;

const CategoryOfProductsModel = mongoose.model('CategoryOfProductsModel', categoryOfProductsSchema, 'CategoryOfProducts');

module.exports = CategoryOfProductsModel;
