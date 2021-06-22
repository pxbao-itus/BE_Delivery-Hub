const express = require('express');
const orderApi = express.Router();
const orderController = require('../controllers/order.controller');

orderApi.get('/list', orderController.getOrderList);

orderApi.post('/create',orderController.createOrder);

orderApi.get('/detail', orderController.getOrderDetail);

module.exports = orderApi;