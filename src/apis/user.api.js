const express = require('express');
const userApi = express.Router();
const userController = require('../controllers/user.controller');

// api: get  user
userApi.get('/info', userController.getIndividualCustomer);
// api: update user
userApi.post('/update', userController.putUpdateIndividualCustomer);

module.exports = userApi;
