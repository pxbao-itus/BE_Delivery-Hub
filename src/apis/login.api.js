const loginAPI = require('express').Router();
const loginController = require('../controllers/login.controller');


loginAPI.post('/',loginController.postLogin);

module.exports = loginAPI;
