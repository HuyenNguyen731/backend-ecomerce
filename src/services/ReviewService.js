const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    const { rate, note, order_id, product_id, user_id } = newReview;
    try {
      // Tìm kiếm đơn hàng
      const order = await Order.findOne({ _id: order_id });

      if (!order) {
        resolve({
          status: "ERR",
          message: "Order ID is not defined",
        });
        return;
      }

      if (order.user.toString() !== user_id) {
        resolve({
          status: "ERR",
          message: "User ID does not match the order",
        });
        return;
      }

      const productExists = order.orderItems.some(
        (item) => item.product.toString() === product_id
      );
      if (!productExists) {
        resolve({
          status: "ERR",
          message: "Product ID does not exist in the order",
        });
        return;
      }

      // Tạo đánh giá nếu tất cả điều kiện đều đúng
      const createdReview = await Review.create({
        rate,
        note,
        order_id,
        product_id,
        user_id,
      });

      if (createdReview) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdReview,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteReview = (id, hidden) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkReview = await Review.findOne({
        _id: id,
      });
      if (checkReview === null) {
        resolve({
          status: "ERR",
          message: "Id review is not defined",
        });
      }

      await Review.findByIdAndUpdate(id, { delete: hidden });
      resolve({
        status: "OK",
        message: "Marked review as deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllReview = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allReview = await Review.find()
        .sort({ createdAt: -1, updatedAt: -1 })
        .populate("product_id");

      resolve({
        status: "OK",
        message: "Success",
        data: allReview,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReviewByIdProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allReview = await Review.find({ product_id: productId })
        .sort({
          createdAt: -1,
          updatedAt: -1,
        })
        .populate("user_id");

      resolve({
        status: "OK",
        message: "Success",
        data: allReview,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createReview,
  deleteReview,
  getAllReview,
  getReviewByIdProduct,
};
