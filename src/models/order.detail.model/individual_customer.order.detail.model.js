
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const detailOrderSchema = new Schema({
    _id: Number,
    productName: String,
    individual_OrderID: Number,
    weight: Number,
    productTypeID: Number
},{versionKey: false}) ;

const DetailOrderModel = mongoose.model('detaiOrder', detailOrderSchema, 'Individual_OrderDetail');

module.exports = DetailOrderModel;
