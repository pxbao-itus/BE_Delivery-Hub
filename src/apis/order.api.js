const express = require('express');
const orderApi = express.Router();
const orderController = require('../controllers/order.controller');

orderApi.post('/list', orderController.getOrderList);

orderApi.post('/create',orderController.createOrder);

orderApi.post('/detail', orderController.getOrderDetail);

orderApi.post('/update', orderController.updateStatus);

orderApi.get('/delivery', orderController.getDelivery);

orderApi.get('/producttype', orderController.getProductType);

module.exports = orderApi;