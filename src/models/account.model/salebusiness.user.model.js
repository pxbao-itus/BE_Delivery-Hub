const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleBusinessSchema = new Schema({
  _id: String,
  address: String,
  infoOfPresentative :{
      name: String,
      phone: String,
      sex: String,
  },
  saleBusinessName: String
},{versionKey: false});

const saleBusinessModel = mongoose.model('saleBusiness', saleBusinessSchema, 'SaleBusiness');

module.exports = saleBusinessModel;