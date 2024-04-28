const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    const { rate, order_id, product_id, user_id } = newReview;
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

      // Kiểm tra xem user_id có khớp với user của đơn hàng không
      if (order.user.toString() !== user_id) {
        resolve({
          status: "ERR",
          message: "User ID does not match the order",
        });
        return;
      }

      // Kiểm tra xem product_id có trong danh sách sản phẩm của đơn hàng không
      const productExists = order.orderItems.some(
        (item) => item.product._id.toString() === product_id
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

const deleteReview = (id) => {
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

      await Review.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Review success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllReview = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allReview = await Review.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
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
};
