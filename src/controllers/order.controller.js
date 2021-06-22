const OrderModel = require('../models/order.model');
const DetailOrderModel = require('../models/order.detail.model');

// Lấy ra danh sách tất cả các đơn hàng của 1 khách hàng cá nhân
const getOrderList = async (req, res, next) => {
    try {
      const orderList = await OrderModel.find({ customerID: req.body.id });
      if (orderList) {
        return res.status(200).json({ list: orderList });
      }
      return res.status(200).json({ list: [] });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ list: [] });
    }
  };


// tạo một đơn hàng cho một khách hàng cá nhân
const createOrder = async (req, res, next) => {
  try{
    const order = req.body.order;
    var detail = null;
    if(req.body.detail) {
      detail = req.body.detail;
    }
    const response = await OrderModel.create(order);
    const orderCreated = await OrderModel.findOne(order);
    console.log(orderCreated._id);
    for(const item of detail){
 
      item.orderID = orderCreated._id;
      const result = await DetailOrderModel.create(item);
    }
    if(response){
      return res.status(200).json({status: "success"});

    } else {
        throw "exception";
    }
  } catch(error) {
    console.log(error);
    return res.status(400).json({status: "failed"})
  }
}

// Xem chi tiết 1 đơn hàng
const getOrderDetail = async (req, res, next) => {
  try{
    const orderId = req.body.id;
    const response = await DetailOrderModel.find({orderID: orderId});
    if(response) {
      return res.status(200).json({response});
    } else {
       throw "exception";
    }
  } catch(error) {
    return res.status(400).json({message: "Lỗi khi xem chi tiết"});
  }
}

module.exports = {
    getOrderList,
    createOrder,
    getOrderDetail,
}


