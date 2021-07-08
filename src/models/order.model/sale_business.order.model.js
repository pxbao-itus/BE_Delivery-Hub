
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đơn hàng
const saleOrderSchema = new Schema({
    _id:Number,
    accountID: Number,
    dateOfOrder: Date,
    km: Number,
    sumOfOrder: Number,
    payment: String,
    locationOfDeliveryAndReceive: {
        locationOfReceive:{
            province: String,
            district: String,
            ward: String,
            detail: String
        },
        locationOfDelivery: {
            province: String,
            district: String,
            ward: String,
            detail: String
        }
    },
    orderStatus: {
        deliveryStatus: Boolean,
        receiveStatus: Boolean,
    },
    deliveryBusinessID: Number,
    transportService: String
},{versionKey: false});



const SaleOrderModel = mongoose.model('SaleOrderModel',saleOrderSchema,'SaleBusiness_Orders');

module.exports = SaleOrderModel;
