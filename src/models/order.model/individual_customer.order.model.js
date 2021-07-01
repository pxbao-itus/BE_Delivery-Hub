const { Double } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đơn hàng
const inOrderSchema = new Schema({
    id: String,
    customerID: String,
    dateOfOrder: Date,
    km: Number,
    sumOfOrder: Number,
    payment: String,
    locationOfDeliveryAndReceive: {
        locationOfReceive:{
            province: String,
            district: String,
            ward: String,
            street: String
        },
        locationOfDelivery: {
            province: String,
            district: String,
            ward: String,
            street: String
        }
    },
    orderStatus: {
        deliveryStatus: Boolean,
        receiveStatus: Boolean,
        orderStatus: Boolean
    },
    transportService: String
},{versionKey: false});



const OrderModel = mongoose.model('inorder',inOrderSchema,'Individual_Orders');

module.exports = OrderModel;
