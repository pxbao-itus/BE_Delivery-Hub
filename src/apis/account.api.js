const accountAPI = require('express').Router();
const accountController = require('../controllers/account.controller');

accountAPI.post('/',accountController.postSignUp);

module.exports = accountAPI;