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
            attributes: [
                'id',
                'email',
                'name',
                'no_bpjs',
                'role_id',
                'organization_id',
                'status',
            ],
            order: [['name', 'ASC']],
        });

        let i = 1;
        users.forEach((user) => {
            // eslint-disable-next-line no-plusplus
            user.setDataValue('no', i++);
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

async function update(req, res) {
    const { id } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User Not Found!',
            });
        }

        const updatedUser = await user.update({
            ...req.body,
        });

        return res.status(200).json({
            status: 200,
            result: updatedUser,
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
    update,
};
