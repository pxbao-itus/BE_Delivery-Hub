const Accounts = require('../models/account.model/account.model');
const md5 = require('md5');

const postSignUp = async (req,res,next)=>{
    try{
        const email = req.body.email;
        var password = req.body.password;
        const accountFound = await Accounts.findOne({email});
        if(accountFound)
        {
            // email đã tồn tại 
            return res.status(400).json({status: "Failed"});
        }
        password = md5(password);
        const createAcc = await Accounts.create({
            email,
            password
        });
        if(createAcc)
            return res.status(200).json({status: "Success"});

    }catch(error){
        return res.status(400).json({message: "SignUp Failed. Please try again!", error : error});
    }
}

module.exports = {
    postSignUp
}
