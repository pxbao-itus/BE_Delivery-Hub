const { Double } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const detailOrderSchema = new Schema({
    id: String,
    productName: String,
    orderID: String,
    weight: Number,
    productType: String,
    price: Number
},{versionKey: false}) ;

const DetailOrderModel = mongoose.model('detaiOrder', detailOrderSchema, 'Individual_OrderDetail');

module.exports = DetailOrderModel;
