const Category = require("../models/CategoryModal");
const bcrypt = require("bcrypt");

const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newCategory;
    try {
      const checkCategory = await Category.findOne({
        name: name,
      });
      if (checkCategory !== null) {
        resolve({
          status: "ERR",
          message: "The Category name already exists",
        });
      }
      const createdCategory = await Category.create({ name });
      if (createdCategory) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCategory = await Category.findOne({
        _id: id,
      });
      if (checkCategory === null) {
        resolve({
          status: "ERR",
          message: "The category is not defined",
        });
      }

      await Category.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete category success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allCategory = await Category.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allCategory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategory,
};
