const IndividualOrderModel = require('../models/order.model/individual_customer.order.model');
const SaleBusinessOrderModel = require('../models/order.model/sale_business.order.model');

const getListOrder = async (req, res, next) => {
    try{
        const listIndividualOrder = await IndividualOrderModel.find({deliveryBusinessID: req.body.id});
        const listSaleBusinessOrder = await SaleBusinessOrderModel.find({deliveryBusinessID: req.body.id});
        return res.status(200).json({listIndividualOrder, listSaleBusinessOrder});
    } catch (error) {
        return res.status(400).json({message: "Failed"});
    }
}



module.exports = {
    getListOrder,
    
}