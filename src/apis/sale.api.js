const saleAPI = require('express').Router();
const saleController = require('../controllers/sale.controller');

saleAPI.post('/add', saleController.addProduct);

saleAPI.post('/update', saleController.updateProduct);

saleAPI.post('/list', saleController.getProduct);

module.exports = saleAPI;







