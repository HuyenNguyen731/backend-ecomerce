const Feedback = require("../models/FeedbackModel");

const createFeedback = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("service");
    const { name, email, phone, note } = data;
    try {
      const createdFeedback = await Feedback.create({
        name,
        email,
        phone,
        note,
      });
      if (createdFeedback) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdFeedback,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllFeedback = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allFeedback = await Feedback.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: allFeedback,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createFeedback,
  getAllFeedback,
};
