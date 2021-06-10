const AddressModel = require('../models/address.model');

// Lấy danh sách tất cả các tỉnh 
const getProvince = async (req, res, next) => {
    try {
      const list = await AddressModel.find({}).select('-districts -_id');
      if (list) {
        return res.status(200).json(list);
      }
    } catch (error) {
      return res.status(400).json({ message: 'failed' });
    }
  };

// Lấy danh sách quận/huyện theo tỉnh 
const getDistrict = async (req, res, next) => {
  try {
    const id = req.query;
 
    const data = await AddressModel.findOne(id).select('districts -_id');
    if (data) {
      const list = data.districts.map((item) => {
        return { id: item.id, name: item.name };
      });
      return res.status(200).json(list);
    }
  } catch (error) {
    return res.status(400).json({ message: 'failed' });
  }
};

// Lấy danh sách đường, phường/xã thuộc từ input là id tỉnh và id huyện
const getStreetWard = async (req, res, next) => {
  try {
    const { id, district } = req.query;
    const data = await AddressModel.findOne({ id }).select('districts -_id');
    if (data) {
      const result = data.districts.find((item) => item.id == district);
      return res
        .status(200)
        .json({ wards: result.wards, streets: result.streets });
    }
  } catch (error) {
    return res.status(400).json({ message: 'failed' });
  }
};
module.exports = {
    getProvince,
    getDistrict,
    getStreetWard
}