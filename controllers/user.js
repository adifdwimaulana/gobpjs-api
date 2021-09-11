const { User, Role, Organization } = require('../models');

async function list(req, res) {
  const { userToken } = req;
  try {
    const users = User.findAll();

    return users;
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
}

module.exports = {
  list,
};
