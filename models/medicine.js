const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Medicine extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Medicine.belongsToMany(models.Request, {
                through: 'Requestmedicines',
                foreignKey: 'medicine_id',
                as: 'requests',
            });

            Medicine.hasOne(models.Requestmedicine, {
                foreignKey: 'medicine_id',
                as: 'reqmeds',
            });

            Medicine.belongsTo(models.Organization, {
                foreignKey: 'organization_id',
                as: 'organization',
            });
        }
    }
    Medicine.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            organization_id: DataTypes.INTEGER,
            dose: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Medicine',
        }
    );
    return Medicine;
};
