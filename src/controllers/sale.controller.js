const Product = require('../models/order.detail.model/category.model');

// Them san pham
const addProduct = async (req, res, next) => {
    try{
        const product = req.body.product;
        const idCategory = 1;
        const listCategory = await Product.find({}).select('_id');
        for(let item of listCategory){
            idCategory = idCategory < item._id ? item_id : idCategory;
        }
        idCategory++;
        product._id = idCategory;
        const response = await Product.create(product);
        return res.status(200).json({message: "Success"});
    } catch (error) {
        return res.status(400).json({message: "Failed"});
    }
}

// Cap nhat thong tin san pham
const updateProduct = async (req, res, next) => { 
    try{
        const response = await Product.updateOne({_id: req.body.id}, {
            productName: req.body.productName,
            quantityStock: req.body.quantityStock,
            color: req.body.color,
            unitPrice: req.body.unitPrice,
            size: req.body.size
        })
        return res.status(200).json({message: "Success"});
    } catch(error) {
        return res.status(400).json({message: "Failed"});
    }
}

// Lay danh sach tat ca san pham
const getProduct = async (req, res, next) => {
    try{
        const listProduct = await Product.find({ownerID: req.body.ownerID});
        return res.status(200).json({message: "Success"});
    } catch(error) {
        return res.status(400).json({message: "Failed"});
    }
}
module.exports = {
    addProduct,
    updateProduct,
    getProduct
}