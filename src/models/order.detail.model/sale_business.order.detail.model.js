
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// chi tiết đơn hàng
const detailSaleOrderSchema = new Schema({
    _id : Number,
    saleBusiness_OrdersID: Number,
    categoryOfProductsID: Number
},{versionKey: false}) ;

const DetailOrderModel = mongoose.model('BusinessDetaiOrder', detailSaleOrderSchema, 'SaleBusiness_OrderDetail');

module.exports = DetailOrderModel;
