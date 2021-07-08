const Account = require('../models/account.model/account.model');
const IndividualOrderModel = require('../models/order.model/individual_customer.order.model');
const SaleBusinessOrderModel = require('../models/order.model/sale_business.order.model');

const getUser = async (req, res, next) => {
    try{
        const listUser = await Account.find({});
        return res.status(200).json(listUser);
    }  catch (error) {
        return res.status(400).json({message: "Failed"});
    }
}

const getOrder = async (req, res, next) => {
    try{
        const individualOrder = await IndividualOrderModel.find({});
        const saleBusinessOrder = await SaleBusinessOrderModel.find({});
        return res.status(200).json({individualOrder, saleBusinessOrder});
    } catch (error) {
        return res.status(400).json({message: "Failed"});
    }
}

module.exports = {
    getUser,
    getOrder,
}