const mongoose = require('mongoose');
const md5 = require('md5');

const accountSchema = new mongoose.Schema({
    id: Number,
    email : String,
    password : String,
    type: String,
    lock: Boolean
},{
    versionKey: false
})

const Account = mongoose.model('Account',accountSchema,'Accounts');
module.exports = Account;