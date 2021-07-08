const Account = require('../models/account.model/account.model');

const getUser = async (req, res, next) => {
    try{
        const listUser = await Account.find({});
        return res.status(200).json(listUser);
    }  catch (error) {
        return res.status(400).json({message: "Failed"});
    }
}


module.exports = {
    getUser,
}