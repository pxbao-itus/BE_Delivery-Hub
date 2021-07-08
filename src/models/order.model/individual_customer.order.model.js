
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đơn hàng
const inOrderSchema = new Schema({
    _id: Number,
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



const OrderModel = mongoose.model('OrderModel',inOrderSchema,'Individual_Orders');

module.exports = OrderModel;
