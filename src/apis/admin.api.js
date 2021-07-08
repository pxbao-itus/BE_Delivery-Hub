const adminAPI = require('express').Router();
const accountController = require('../controllers/account.controller')
const adminController  =require('../controllers/admin.controller');


adminAPI.post('/user/lock', accountController.updateAccountStatus);

adminAPI.get('/user', adminController.getUser);

adminAPI.get('/order', adminController.getOrder);

module.exports = adminAPI;