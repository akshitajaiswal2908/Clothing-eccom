module.exports = ( sequelize , DataTypes ) => {
const Cart = sequelize.define('Cart' , {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    },{
    tableName: 'carts',
    timestamps: false
    });
    Cart.associate = models => {
        Cart.belongsTo(models.User, { foreignKey: 'user_id' });
        Cart.hasMany(models.CartItem, { foreignKey: 'cart_id' });
     };

    return Cart;
}