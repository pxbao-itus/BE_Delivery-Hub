
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const detailOrderSchema = new Schema({
    _id : String, 
},{versionKey: false}) ;

const DetailOrderModel = mongoose.model('detaiOrder', detailOrderSchema, 'Individual_OrderDetail');

module.exports = DetailOrderModel;
