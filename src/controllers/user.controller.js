const inCustomerModel = require('../models/account.model/individual_customer.user.model');
const Account = require('../models/account.model/account.model');
const saleBusinessModel = require('../models/account.model/salebusiness.user.model');
const deliveryBusinessModel = require('../models/account.model/deliverybusiness.user.model');
// control: get infor user
const getUserInformation = async (req, res,next) => {
    try {
      console.log(req.body.id);
      const user = await Account.findOne({_id: req.body.id});
      //console.log(user.type);
      
      switch(user.type){        
        case 1: { // Thông tin của người dùng là khách hàng cá nhân
          const inCustomer = await inCustomerModel.findOne({_id : req.body.id});
          if (inCustomer){
            return res.status(200).json(inCustomer);
          } else {
            return res.status(409).json({message: "Tài khoản chưa có thông tin"});
          } 
          break;
        }
        case 2: { // Thông tin của người dùng là doanh nghiệp bán hàng
          const saleBusiness = await saleBusinessModel.findOne({_id : req.body.id});
          if (saleBusiness){
            return res.status(200).json(saleBusiness);
          } else {
            return res.status(409).json({message: "Tài khoản chưa có thông tin"});
          }  
        break;
        }
        case 3: { // Thông tin của người dùng là đơn vị cung cấp dịch vụ vận chuyển
          const deliverybusiness = await deliveryBusinessModel.findOne({_id : req.body.id});
          if (deliverybusiness){
            return res.status(200).json(deliverybusiness);
          } else {
            return res.status(409).json({message: "Tài khoản chưa có thông tin"});
          }  
          break;
        }
        case 4: { // Thông tin của người dùng là admin
          break;
        }
        default: 
          throw 'exception';
          break;
      }    
    } catch (error) {
       return res.status(409).json({ message: "Lấy thông tin không thành công"});
    }

}

// control: update user
const putUpdateIndividualCustomer = async (req, res, next) => {
  console.log(req.body);
    try {
      const user = await Account.findOne({_id: req.body.id});
      switch(user.type){
        case 1: { // Cập nhật thông tin của người dùng cá nhân
          const response = await inCustomerModel.updateOne({ _id: req.body.id }, {
            name: req.body.name, 
            sex: req.body.sex,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            phone: req.body.phone
          },{upsert: true});
          if(response) {
            return res.status(200).json({ status: 'success' });
          } else {
            throw "exeption";
          }  
          break;
        }
        case 2: { // Cập nhật thông tin của người dùng là doanh nghiệp bán hàng
          const response = await saleBusinessModel.updateOne({ _id: req.body.id }, {
            address: req.body.address,
            infoOfPresentative: {
              name: req.body.infoOfPresentative.name,
              phone: req.body.infoOfPresentative.phone,
              sex: req.body.infoOfPresentative.sex
            },
            saleBusinessName: req.body.saleBusinessName
          },{upsert: true});
          if(response) {
            return res.status(200).json({ status: 'success' });
          } else {
            throw "exeption";
          }  
          break;
        }
        case 3: { // Cập nhật thông tin của người dùng là đơn vị vận chuyển
          const response = await deliveryBusinessModel.updateOne({ _id: req.body.id }, {
            address: req.body.address,
            infoOfPresentative: {
              name: req.body.infoOfPresentative.name,
              phone: req.body.infoOfPresentative.phone,
              sex: req.body.infoOfPresentative.sex
            },
            deliveryBusinessName: req.body.deliveryBusinessName,
            phone: req.body.phone
          },{upsert: true});
          if(response) {
            return res.status(200).json({ status: 'success' });
          } else {
            throw "exeption";
          }  
          break;
        }
        case 4: { // Cập nhật thông tin của người dùng là admin

        }
        default: {
          throw "exeption";
          break;
        }
      }
        const response = await inCustomerModel.updateOne({ _id: req.body.id }, {
          name: req.body.name, 
          sex: req.body.sex,
          dateOfBirth: req.body.dateOfBirth,
          address: req.body.address,
          phone: req.body.phone
        },{upsert: true});
        if(response) {
          return res.status(200).json({ status: 'success' });
        } else {
          throw "exeption";
        }      
    } catch (error) {
      return res.status(409).json({ status: 'failed' });
    }
  };
  
  //export
  module.exports = {
    getUserInformation,
    putUpdateIndividualCustomer,
  };