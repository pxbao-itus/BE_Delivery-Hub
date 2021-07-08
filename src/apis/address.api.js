const addressAPI = require('express').Router();
const addressController = require('../controllers/address.controller');


addressAPI.get('/province',addressController.getProvince);
 
addressAPI.get('/district',addressController.getDistrict);

addressAPI.get('/ward', addressController.getStreetWard);


module.exports = addressAPI;
