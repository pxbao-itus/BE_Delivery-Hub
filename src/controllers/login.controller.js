const Account = require('../models/account.model/account.model');
const md5 = require('md5');
const express = require('express');
const mongoose = require('mongoose');

const postLogin = async (req, res, next) =>{
    try{
        const email = req.body.email;
        const password =req.body.password;
        const account = await Account.findOne({email});
        if(!account){
            // email doesn't exist!
            return res.status(406).json({status : 'Failed'});
        }
        const checkPassword = await md5(password) === account.password;
        if(!checkPassword){
            // password incorrect!
            return res.status(401).json({status : 'Failed'});
        }
        else{
            res.cookie('user-cookie',account.id,{
                signed:true,
                httpOnly : true
            });
            return res.status(200).json({status : 'Success'});
        }
    }catch(error){
        return res.status(401).json({message : 'Login failed. Please try again!'});
    }
}
module.exports = {
    postLogin

}