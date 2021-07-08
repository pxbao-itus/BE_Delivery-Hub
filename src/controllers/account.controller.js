const Accounts = require('../models/account.model/account.model');
const md5 = require('md5');

// Đăng kí tài khoản
const postSignUp = async (req,res,next)=>{
    try{
        const email = req.body.email;
        var password = req.body.password;
        const type = req.body.type;
        // Mặc định tài khoản là unlock
        const lock = false;
        const accountFound = await Accounts.findOne({email});
        if(accountFound)
        {
            // email đã tồn tại 
            return res.status(400).json({status: "Failed"});
        }
        password = md5(password);
        var id = 1;
        const listAccount = await Accounts.find({}).select('id');
        console.log(listAccount);
        for(let element of listAccount){
            if(element.id){
                id = id < parseInt(element.id) ? parseInt(element.id) : id;
            }          
        }
        id++;
        const createAcc = await Accounts.create({
            id,
            email,
            password,
            type,
            lock
        });
        if(createAcc)
            return res.status(200).json({status: "success"});

    }catch(error){
        return res.status(400).json({status: "Failed"});
    }
}


// Thay đổi mật khẩu
const modifyPassword = async (req, res, next) => {
    try{
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        var oldPassword = req.body.oldPassword;
        const accountFound = await Accounts.findOne({email});
        if(md5(oldPassword) == accountFound.password) {
            oldPassword = md5(newPassword);
            const reponse = await Accounts.updateOne({email: email}, { password: oldPassword});
            return res.status(200).json({message: "success"});
        } else {
            return res.status(400).json({message: "Mật khẩu cũ không chính xác"});
        } 
    } catch (error) {
        return res.status(400).json({message: "failed"});
    }
}


module.exports = {
    postSignUp,
    modifyPassword,
}
