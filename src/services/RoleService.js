const Role = require("../models/RoleModal");
const bcrypt = require("bcrypt");

const createRole = (newRole) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newRole;
    try {
      const checkRole = await Role.findOne({
        name: name,
      });
      if (checkRole !== null) {
        resolve({
          status: "ERR",
          message: "The role name already exists",
        });
      }
      const createdRole = await Role.create({ name });
      if (createdRole) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdRole,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRole = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkRole = await Role.findOne({
        _id: id,
      });
      if (checkRole === null) {
        resolve({
          status: "ERR",
          message: "The role is not defined",
        });
      }

      await Role.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete role success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRole = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allRole = await Role.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allRole,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createRole,
  deleteRole,
  getAllRole,
};
