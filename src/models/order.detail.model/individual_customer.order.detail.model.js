const { Double } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const detailOrderSchema = new Schema({
    id: String,
    productName: String,
    individual_OrderID: String,
    weight: Number,
    productTypeID: String
},{versionKey: false}) ;

const DetailOrderModel = mongoose.model('detaiOrder', detailOrderSchema, 'Individual_OrderDetail');

module.exports = DetailOrderModel;
