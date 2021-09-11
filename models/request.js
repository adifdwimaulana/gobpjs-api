const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsToMany(models.Medicine, {
        through: 'Requestmedicine',
        foreignKey: 'request_id',
        as: 'requests',
      });

      Request.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  Request.init(
    {
      date: DataTypes.DATE,
      nurse_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      organization_id: DataTypes.INTEGER,
      drugstore_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      bp: DataTypes.STRING,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Request',
    }
  );
  return Request;
};
