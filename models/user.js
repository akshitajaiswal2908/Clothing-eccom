module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
    },
    password: DataTypes.STRING,
    isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};
