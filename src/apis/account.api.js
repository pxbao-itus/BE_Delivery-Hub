const accountAPI = require('express').Router();
const accountController = require('../controllers/account.controller');

accountAPI.post('/',accountController.postSignUp);

accountAPI.post('/changepassword', accountController.modifyPassword);

module.exports = accountAPI;