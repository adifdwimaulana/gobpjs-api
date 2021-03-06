const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'role',
            });

            User.belongsTo(models.Organization, {
                foreignKey: 'organization_id',
                as: 'organization',
            });

            User.hasMany(models.Request, {
                foreignKey: 'user_id',
                as: 'requests',
            });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            nik: DataTypes.STRING,
            no_bpjs: DataTypes.STRING,
            faskes: DataTypes.STRING,
            role_id: DataTypes.INTEGER,
            organization_id: DataTypes.INTEGER,
            ttl: DataTypes.DATE,
            name: DataTypes.STRING,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
