module.exports = (sequelize , DataTypes) => {
    const CartItem = sequelize.define('CartItem' , {
        cart_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
    },
    },{
        tableName: 'cart_items',
        timestamps: false});

    CartItem.associate = models => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });
    CartItem.belongsTo(models.ProductVariant, { foreignKey: 'variant_id' });
  };
return CartItem;

}