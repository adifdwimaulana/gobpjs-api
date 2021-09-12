const { Requestmedicine } = require('../models');

async function list(req, res) {
    const body = { ...req.body };
    try {
        const reqmeds = await Requestmedicine.findAll({
            where: body,
        });

        let i = 1;
        reqmeds.forEach((reqmed) => {
            // eslint-disable-next-line no-plusplus
            reqmed.no = i++;
        });

        return res.status(200).json({
            status: 200,
            result: reqmeds,
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
}

async function add(req, res) {
    const { request_id, medicine_id, quantity } = req.body;

    try {
        const reqmed = await Requestmedicine.create({
            request_id,
            medicine_id,
            quantity,
        });

        return res.status(200).json({
            status: 200,
            result: reqmed,
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
}

async function update(req, res) {
    const { id, request_id, medicine_id, quantity } = req.body;

    try {
        const reqmed = await Requestmedicine.findByPk(id);
        if (!reqmed) {
            return res.status(404).json({
                status: 404,
                message: 'Request medicine Not Found!',
            });
        }

        const updatedReqmed = await reqmed.update({
            request_id: request_id || reqmed.request_id,
            medicine_id: medicine_id || reqmed.medicine_id,
            quantity: quantity || reqmed.quantity,
        });

        return res.status(200).json({
            status: 200,
            result: updatedReqmed,
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
        const reqmed = await Requestmedicine.findByPk(id);
        if (!reqmed) {
            return res.status(404).json({
                status: 404,
                message: 'Requested Medicine Not Found!',
            });
        }

        const deletedReqmed = await reqmed.destroy();

        return res.status(200).json({
            status: 200,
            result: deletedReqmed,
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
