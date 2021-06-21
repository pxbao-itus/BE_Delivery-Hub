const inCustomerModel = require('../models/account.model/user.model');
const Account = require('../models/account.model/account.model');

// control: get infor user
const getIndividualCustomer = async (req, res,next) => {
    try {
        const inCustomer = await inCustomerModel.findOne({_id : req.body.id});
        if (inCustomer){
          return res.status(200).json(inCustomer);
        } else {
          return res.status(409).json({message: "Tài khoản chưa có thông tin"});
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