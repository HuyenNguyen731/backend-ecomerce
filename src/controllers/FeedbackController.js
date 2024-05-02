const feedbackService = require("../services/FeedbackService");

const createFeedback = async (req, res) => {
  try {
    const { name, email, note } = req.body;
    if (!name || !email || !note) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await feedbackService.createFeedback(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const response = await feedbackService.getAllFeedback();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
};
