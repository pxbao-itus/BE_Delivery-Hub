const adminAPI = require('express').Router();
const accountController = require('../controllers/account.controller')

adminAPI.post('/user/lock', accountController.updateAccountStatus);

module.exports = adminAPI;