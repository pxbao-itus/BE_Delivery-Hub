const individualOrderModel = require('../models/order.model/individual_customer.order.model');
const saleOrderModel = require('../models/order.model/sale_business.order.model');
const DetailOrderModel = require('../models/order.detail.model/individual_customer.order.detail.model');
const saleDetailOrderModel = require('../models/order.detail.model/sale_business.order.detail.model');
const Account = require('../models/account.model/account.model');
const CategoryModel = require('../models/order.detail.model/category.model');
const ProductTypeModel = require('../models/order.detail.model/product_type.model');

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
    var detail = [];
    if(req.body.detail) {
      detail = req.body.detail;
    }
    const user = await Account.findOne({id: order.accountID});

    // Tao don hang ca nhan
    if(user.type === "Individual") {
      const listOrder = await individualOrderModel.find({}).select('_id');
      var orderID = 1;
      for(let element of listOrder){
        if(element._id){
          orderID = orderID < parseInt(element._id) ? parseInt(element._id) : orderID;
        }          
      }
      orderID++;
      order._id = orderID;
      const response = await individualOrderModel.create(order);
   
      for(const item of detail){
        const listDetail = await DetailOrderModel.find({}).select('_id');
        var id = 1;
        for(let element of listDetail){
          if(element._id){
              id = id < parseInt(element._id) ? parseInt(element._id) : id;
          }         
        }
        id++;
        item._id = id;
        item.individual_OrderID = order._id;
        const result = await DetailOrderModel.create(item);
      }
      return res.status(200).json({status: "success"});
    }

    // Tao don hang sale business
    if(user.type === "Sale") {
      const listOrder = await saleOrderModel.find({}).select('_id');
      var orderID2 = 1;
      for(let element of listOrder){
        if(element._id){
          orderID2 = orderID2 < parseInt(element._id) ? parseInt(element._id) : orderID2;
        }          
      }
      orderID2++;
      order._id = orderID2;
      const response = await saleOrderModel.create(order);
   
      for(const item of detail){
        const listDetail = await saleDetailOrderModel.find({}).select('_id');
        var id2 = 1;
        for(let element of listDetail){
          if(element._id){
              id2 = id2 < parseInt(element._id) ? parseInt(element._id) : id2;
          }         
        }
        id2++;
        item._id = id2;
        item.saleBusiness_OrdersID = orderID2;
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


