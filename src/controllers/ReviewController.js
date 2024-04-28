const ReviewService = require("../services/ReviewService");

const createReview = async (req, res) => {
  try {
    const { rate, order_id, product_id, user_id } = req.body;
    if (!rate || !order_id || !product_id || !user_id) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ReviewService.createReview(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllReview = async (req, res) => {
  try {
    const response = await ReviewService.getAllReview();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(200).json({
        status: "ERR",
        message: "id review is required",
      });
    }
    const response = await ReviewService.deleteReview(reviewId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createReview,
  getAllReview,
  deleteReview,
};
