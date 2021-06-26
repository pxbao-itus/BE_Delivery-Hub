const inCustomerModel = require('../models/account.model/individual_customer.user.model');
const Account = require('../models/account.model/account.model');
const saleBusinessModel = require('../models/account.model/salebusiness.user.model');

// control: get infor user
const getIndividualCustomer = async (req, res,next) => {
    try {
      const user = await Account.findOne({_id: req.body.id});
      switch(user.type.parseInt()){        
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
          break;
        }
        case 4: { // Thông tin của người dùng là admin
          break;
        }
        default: break;
      }    
    } catch (error) {
       return res.status(409).json({ message: "Lấy thông tin không thành công"});
    }

}

// control: update user
const putUpdateIndividualCustomer = async (req, res, next) => {
  console.log(req.body);
    try {
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
    getIndividualCustomer,
    putUpdateIndividualCustomer,
  };