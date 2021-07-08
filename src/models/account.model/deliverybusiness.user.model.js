const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryBusinessSchema = new Schema({
  accountID: Number,
  address: String,
  inforOfRepresentative :{
      repName: String,
      repPhone: String,
  },
  deliveryBusinessName: String,
},{versionKey: false});

const deliveryBusinessModel = mongoose.model('deliveryBusiness', deliveryBusinessSchema, 'DeliveryBusiness');

module.exports = deliveryBusinessModel;