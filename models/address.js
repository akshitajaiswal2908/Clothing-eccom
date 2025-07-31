module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    tableName: 'addresses',
    timestamps: false
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Address;
};
