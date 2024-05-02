const Banner = require("../models/BannerModel");

const createBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    const { image } = data;
    try {
      const createdBanner = await Banner.create({ image });
      if (createdBanner) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdBanner,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteBanner = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkImg = await Banner.findOne({
        _id: id,
      });
      if (checkImg === null) {
        resolve({
          status: "ERR",
          message: "The img is not defined",
        });
      }

      await Banner.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete banner success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBanner = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allBanner = await Banner.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allBanner,
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  createBanner,
  deleteBanner,
  getAllBanner
};
