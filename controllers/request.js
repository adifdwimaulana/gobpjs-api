const { Op } = require('sequelize');
const { Request, Medicine, Requestmedicine, User } = require('../models');

async function list(req, res) {
    const { userToken } = req;
    let body = {};

    if (userToken.role_id === 4) {
        body.user_id = userToken.id;
    } else if (userToken.role_id === 3) {
        body.drugstore_id = userToken.organization_id;
        body.status = {
            [Op.gt]: 2,
        };
    } else if (userToken.role_id > 0) {
        body.organization_id = userToken.organization_id;
    }

    body = {
        ...body,
        ...req.body,
    };

    try {
        const requests = await Request.findAll({
            where: body,
            include: [
                {
                    model: Medicine,
                    as: 'medicines',
                    attributes: ['id', 'name', 'dose', 'price', 'quantity'],
                    include: [
                        {
                            model: Requestmedicine,
                            as: 'reqmeds',
                            attributes: [
                                'id',
                                'request_id',
                                'medicine_id',
                                'quantity',
                            ],
                        },
                    ],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'no_bpjs'],
                },
            ],
            order: [['date', 'ASC']],
        });

        let i = 1;
        requests.forEach((request) => {
            // eslint-disable-next-line no-plusplus
            request.setDataValue('no', i++);
        });

        return res.status(200).json({
            status: 200,
            result: requests,
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
}

async function add(req, res) {
    const { userToken } = req;
    const {
        date,
        nurse_id,
        doctor_id,
        user_id,
        drugstore_id,
        description,
        bp,
        height,
        weight,
        price,
        status,
    } = req.body;

    try {
        const request = await Request.create({
            date,
            nurse_id,
            doctor_id,
            user_id,
            organization_id: userToken.organization_id,
            drugstore_id,
            description,
            bp,
            height,
            weight,
            price,
            status,
        });

        return res.status(200).json({
            status: 200,
            result: request,
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
}

async function update(req, res) {
    const { userToken } = req;
    const {
        id,
        date,
        nurse_id,
        doctor_id,
        user_id,
        drugstore_id,
        description,
        bp,
        height,
        weight,
        price,
        status,
    } = req.body;

    try {
        const request = await Request.findByPk(id);
        if (!request) {
            return res.status(404).json({
                status: 404,
                message: 'Request Not Found!',
            });
        }

        const updatedRequest = await request.update({
            date: date || request.date,
            nurse_id: nurse_id || request.nurse_id,
            doctor_id: doctor_id || request.doctor_id,
            user_id: user_id || request.user_id,
            organization_id: userToken.organization_id,
            drugstore_id: drugstore_id || request.drugstore_id,
            description: description || request.description,
            bp: bp || request.bp,
            height: height || request.height,
            weight: weight || request.weight,
            price: price || request.price,
            status: status || request.status,
        });

        return res.status(200).json({
            status: 200,
            result: updatedRequest,
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
}

async function remove(req, res) {
    const { id } = req.body;

    try {
        const request = await Request.findByPk(id);
        if (!request) {
            return res.status(404).json({
                status: 404,
                message: 'Request Not Found!',
            });
        }

        const deletedRequest = await request.destroy();

        return res.status(200).json({
            status: 200,
            result: deletedRequest,
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
    add,
    update,
    remove,
};
