const mongoose = require('mongoose');
const md5 = require('md5');

const accountSchema = new mongoose.Schema({
    email : String,
    password : String
})


const Account = mongoose.model('Account',accountSchema,'accounts');
module.exports = Account;