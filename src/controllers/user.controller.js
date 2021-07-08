const inCustomerModel = require('../models/account.model/individual_customer.user.model');
const Account = require('../models/account.model/account.model');
const saleBusinessModel = require('../models/account.model/salebusiness.user.model');
const deliveryBusinessModel = require('../models/account.model/deliverybusiness.user.model');
// control: get infor user
const getUserInformation = async (req, res,next) => {
    try {
      const user = await Account.findOne({id: req.body.id});     
      if(user.type === "Individual")       
        { // Thông tin của người dùng là khách hàng cá nhân
        const inCustomer = await inCustomerModel.findOne({accountID : req.body.id});
        if (inCustomer){
          return res.status(200).json(inCustomer);
        } else {
          return res.status(409).json({message: "Account does not have information"});
        } 
      }
      if(user.type === "Sale")
      { // Thông tin của người dùng là doanh nghiệp bán hàng
        const saleBusiness = await saleBusinessModel.findOne({accountID: req.body.id});
        if (saleBusiness){
          return res.status(200).json(saleBusiness);
        } else {
          return res.status(409).json({message: "Account does not have information"});
        }  
      }
      if(user.type === "Delivery")
      { // Thông tin của người dùng là đơn vị cung cấp dịch vụ vận chuyển
        const deliverybusiness = await deliveryBusinessModel.findOne({accountID : req.body.id});
        if (deliverybusiness){
          return res.status(200).json(deliverybusiness);
        } else {
          return res.status(409).json({message: "Account does not have information"});
        }  
      }
         
    } catch (error) {
       return res.status(409).json({ message: "Faild"});
    }

}

// control: update user
const putUpdateIndividualCustomer = async (req, res, next) => {

    try {
      const user = await Account.findOne({id: req.body.id});
      // Cập nhật thông tin của người dùng cá nhân
      if(user.type === "Individual")    
      { 
        const response = await inCustomerModel.updateOne({ accountID: req.body.id }, {
          name: req.body.name, 
          sex: req.body.sex,
          dateOfBirth: req.body.dateOfBirth,
          address: req.body.address,
          phone: req.body.customerPhone
        },{upsert: true});
        if(response) {
          return res.status(200).json({ status: 'Success' });
        } else {
          throw "exeption";
        }  
      }
      // Cập nhật thông tin của người dùng là doanh nghiệp bán hàng
      if(user.type === "Sale")    
      { 
        const response = await saleBusinessModel.updateOne({ accountID: req.body.id }, {
          address: req.body.address,
          infoOfPresentative: {
            repName: req.body.inforOfRepresentative.repName,
            repPhone: req.body.inforOfRepresentative.repPhone,
          },
          saleBusinessName: req.body.saleBusinessName
        },{upsert: true});
        if(response) {
          return res.status(200).json({ status: 'Success' });
        } else {
          throw "exeption";
        }  
      }
      // Cập nhật thông tin của người dùng là đơn vị vận chuyển
      if(user.type === "Delivery")    
      { 
        const response = await deliveryBusinessModel.updateOne({ accountID: req.body.id }, {
          address: req.body.address,
          infoOfPresentative: {
            repName: req.body.inforOfRepresentative.name,
            repPhone: req.body.inforOfRepresentative.phone,
          },
          deliveryBusinessName: req.body.deliveryBusinessName,
        },{upsert: true});
        if(response) {
          return res.status(200).json({ status: 'Success' });
        } else {
          throw "exeption";
        }  
      }   
    } catch (error) {
      return res.status(409).json({ status: 'Failed' });
    }
  };
  
  //export
  module.exports = {
    getUserInformation,
    putUpdateIndividualCustomer,
  };