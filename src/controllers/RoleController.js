const RoleService = require("../services/RoleService");

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await RoleService.createRole(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      return res.status(200).json({
        status: "ERR",
        message: "The roleId is required",
      });
    }
    const response = await RoleService.deleteRole(roleId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllRole = async (req, res) => {
  try {
    const response = await RoleService.getAllRole();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createRole,
  deleteRole,
  getAllRole,
};
