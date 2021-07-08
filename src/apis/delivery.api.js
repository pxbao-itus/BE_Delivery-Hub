const deliveryAPI = require('express').Router();
const deliveryController = require('../controllers/delivery.controller');

deliveryAPI.post('/orders', deliveryController.getListOrder);

module.exports = deliveryAPI;