const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleBusinessSchema = new Schema({
  _id: String,
  address: String,
  infoOfPresentative :{
      repName: String,
      repPhone: String,

  },
  saleBusinessName: String
},{versionKey: false});

const saleBusinessModel = mongoose.model('saleBusiness', saleBusinessSchema, 'SaleBusiness');

module.exports = saleBusinessModel;