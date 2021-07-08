const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inCustomerSchema = new Schema({
  name: String,
  sex: String,
  dateOfBirth: String,
  address: String,
  customerPhone: String
},{versionKey: false});

const inCustomerModel = mongoose.model('individualCustomer', inCustomerSchema, 'Individual_Customers');

module.exports = inCustomerModel;