const { Op } = require('sequelize');
const { User, Role, Organization } = require('../models');

async function list(req, res) {
  const { userToken } = req;
  let body = {};

  if (userToken.role_id > 0) {
    body.organization_id = userToken.organization_id;
  }

  body.role_id = {
    [Op.gte]: userToken.role_id,
  };

  body = {
    ...body,
    ...req.body,
  };

  try {
    const users = await User.findAll({
      where: body,
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
        {
          model: Organization,
          as: 'organization',
          attributes: ['id', 'name'],
        },
      ],
      raw: true,
      attributes: [
        'id',
        'email',
        'name',
        'no_bpjs',
        'role_id',
        'organization_id',
      ],
      order: [['name', 'ASC']],
    });

    let i = 1;
    users.forEach((user) => {
      // eslint-disable-next-line no-plusplus
      user.no = i++;
    });

    return res.status(200).json({
      status: 200,
      result: users,
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

module.exports = {
  list,
};
