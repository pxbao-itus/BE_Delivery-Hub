const addressAPI = require('express').Router();
const addressController = require('../controllers/address.controller');


addressAPI.get('/province',addressController.getProvince);
 
addressAPI.post('/district',addressController.getDistrict);

addressAPI.post('/ward', addressController.getStreetWard);


module.exports = addressAPI;
