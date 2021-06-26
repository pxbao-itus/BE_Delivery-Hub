const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryBusinessSchema = new Schema({
  _id: String,
  address: String,
  infoOfPresentative :{
      name: String,
      phone: String,
      sex: String,
  },
  deliveryBusinessName: String,
  phone: String
},{versionKey: false});

const deliveryBusinessModel = mongoose.model('deliveryBusiness', deliveryBusinessSchema, 'DeliveryBusiness');

module.exports = deliveryBusinessModel;