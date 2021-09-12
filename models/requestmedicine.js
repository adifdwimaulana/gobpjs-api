const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Requestmedicine extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Requestmedicine.init(
        {
            request_id: DataTypes.INTEGER,
            medicine_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Requestmedicine',
        }
    );
    return Requestmedicine;
};
