const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.User, {
        foreignKey: 'organization_id',
        as: 'users',
      });

      Organization.hasMany(models.Medicine, {
        foreignKey: 'organization_id',
        as: 'medicines',
      });
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Organization',
    }
  );
  return Organization;
};
