const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inCustomerSchema = new Schema({
  _id: String,
  name: String,
  sex: String,
  dateOfBirth: String,
  address: String,
  phone: String
},{versionKey: false});

const inCustomerModel = mongoose.model('individualCustomer', inCustomerSchema, 'Individual_Customer');

module.exports = inCustomerModel;