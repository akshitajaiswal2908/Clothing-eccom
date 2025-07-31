module.exports = (sequelize , DataTypes) => {
    const WishlistItem = sequelize.define('WishlistItem',{
        wishlist_item_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
    wishlist_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    variant_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }
    },{
        tableName : 'wishlist_items',
        timestamps : false
    });

    WishlistItem.associate = (models) => {
        WishlistItem.belongsTo( models.Wishlist , { foreignKey : 'wishlist_id'});
        WishlistItem.belongsTo( models.ProductVariant , { foreignKey : 'variant_id'});
    };
    return WishlistItem;
}