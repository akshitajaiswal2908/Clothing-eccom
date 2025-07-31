module.exports = (sequelize , DataTypes) => {
    const Wishlist = sequelize.define('Wishlist',
        {
            wishlist_id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
            },
            user_id : {
                type : DataTypes.INTEGER,
                allowNull : false,
            },
        },
        {
            tableName : 'wishlists',
            timestamps : false
        }

    )

    Wishlist.associate = (models) =>{
        Wishlist.belongsTo(models.User, { foreignKey: 'user_id'});
        Wishlist.hasMany(models.WishlistItem, { foreignKey: 'wishlist_id'});
    };
    return Wishlist;
}