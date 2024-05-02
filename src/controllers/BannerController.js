const BannerService = require("../services/BannerService");

const createBanner = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await BannerService.createBanner(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const imgId = req.params.id;
    if (!imgId) {
      return res.status(200).json({
        status: "ERR",
        message: "The imgId is required",
      });
    }
    const response = await BannerService.deleteBanner(imgId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const response = await BannerService.getAllBanner();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createBanner,
  deleteBanner,
  getAllBanner,
};
