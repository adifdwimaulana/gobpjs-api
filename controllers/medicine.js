const { Medicine, Organization } = require('../models');

async function list(req, res) {
    const { userToken } = req;
    let body = {};

    if (userToken.role_id > 0) {
        body.organization_id = userToken.organization_id;
    }

    body = {
        ...body,
        ...req.body,
    };

    try {
        const medicines = await Medicine.findAll({
            where: body,
            include: [
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['id', 'name'],
                },
            ],
            raw: true,
            order: [['name', 'ASC']],
        });

        let i = 1;
        medicines.forEach((medicine) => {
            // eslint-disable-next-line no-plusplus
            medicine.setDataValue('no', i++);
        });

        return res.status(200).json({
            status: 200,
            result: medicines,
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
    const { name, description, price, quantity, dose } = req.body;

    try {
        const medicine = await Medicine.create({
            name,
            description,
            price,
            quantity,
            dose,
            organization_id: userToken.organization_id,
        });

        return res.status(200).json({
            status: 200,
            result: medicine,
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
    const { id, name, description, price, quantity, dose } = req.body;

    try {
        const medicine = await Medicine.findByPk(id);
        if (!medicine) {
            return res.status(404).json({
                status: 404,
                message: 'Medicine Not Found!',
            });
        }

        const updatedMedicine = await medicine.update({
            name: name || medicine.name,
            description: description || medicine.description,
            price: price || medicine.price,
            quantity: quantity || medicine.quantity,
            dose: dose || medicine.dose,
            organization_id: userToken.organization_id,
        });

        return res.status(200).json({
            status: 200,
            result: updatedMedicine,
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
        const medicine = await Medicine.findByPk(id);
        if (!medicine) {
            return res.status(404).json({
                status: 404,
                message: 'Medicine Not Found!',
            });
        }

        const deletedMedicine = await medicine.destroy();

        return res.status(200).json({
            status: 200,
            message: deletedMedicine,
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
