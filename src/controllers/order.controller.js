const individualOrderModel = require('../models/order.model/individual_customer.order.model');
const saleOrderModel = require('../models/order.model/sale_business.order.model');
const DetailOrderModel = require('../models/order.detail.model/individual_customer.order.detail.model');
const saleDetailOrderModel = require('../models/order.detail.model/sale_business.order.detail.model');
const Account = require('../models/account.model/account.model');
const CategoryModel = require('../models/order.detail.model/category.model');
const ProductTypeModel = require('../models/order.detail.model/product_type.model');
const { response } = require('express');
// Lấy ra danh sách tất cả các đơn hàng 
const getOrderList = async (req, res, next) => {
    try {
      const user = await Account.findOne({id: req.body.id});
      // Danh sách tất cả đơn hàng của 1 khách hàng cá nhân
      if(user.type === "Individual")
      { 
        const orderList = await individualOrderModel.find({ accountID: req.body.id });
        if (orderList) {
          return res.status(200).json(orderList);
        } else {
          return res.status(401).json({message: "Failed"});
        }     
      }    

      // Danh sách tất cả đơn hàng của 1 doanh nghiep ban hang
      if(user.type === "Sale") {
        const orderList = await saleOrderModel.find({ accountID: req.body.id });
        if (orderList) {
          return res.status(200).json(orderList);
        } else {
          return res.status(401).json({message: "Failed"});
        }  
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Failed"});
    }
    
  };


// tạo một đơn hàng 
const createOrder = async (req, res, next) => {
  try{
    const order = req.body.order;
    var detail = null;
    if(req.body.detail) {
      detail = req.body.detail;
    }
    const user = await Account.findOne({id: req.body.id});
    if(user.type === "Individual") {
      const response = await individualOrderModel.create(order);
      const orderCreated = await individualOrderModel.findOne(order);
      console.log(orderCreated._id);
      for(const item of detail){
   
        item.individual_OrderID = orderCreated._id;
        const result = await DetailOrderModel.create(item);
      }
      return res.status(200).json({status: "success"});
    }
    if(user.type === "Sale") {
      const response = await saleOrderModel.create(order);
      const orderCreated = await saleOrderModel.findOne(order);
      console.log(orderCreated._id);
      for(const item of detail){
   
        item.saleBusiness_OrdersID = orderCreated._id;
        const result = await saleDetailOrderModel.create(item);
      }
      return res.status(200).json({status: "success"});
    }
   
  } catch(error) {
    console.log(error);
    return res.status(400).json({status: "failed"})
  }
}

// Xem chi tiết 1 đơn hàng
const getOrderDetail = async (req, res, next) => {
  try{
    const orderID = req.body.orderID;
    const user = await Account.findOne({id: req.body.id});
    var response = [];

    // Chi tiet don hang ca nhan
    if(user.type === "Individual") {
      const detail = await DetailOrderModel.find({individual_OrderID: orderID});
      for(let item of detail) {
        const productType = await ProductTypeModel.findOne({_id: item.productTypeID});
        response.push({item, productType});
      }
      return res.status(200).json(response);
    }

    // Chi tiet don hang doanh nghiep ban hang
    if(user.type === "Sale") {
      const detail = await saleDetailOrderModel.find({saleBusiness_OrdersID: orderID})
      for(let item of detail){
        const product = await CategoryModel.findOne({_id: item.categoryOfProductsID});       
        response.push({item,product});
      }
      return res.status(200).json(response);
    }
  } catch(error) {
    return res.status(400).json({message: "Failed"});
  }
}

module.exports = {
    getOrderList,
    createOrder,
    getOrderDetail,
}


