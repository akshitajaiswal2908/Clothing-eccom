module.exports = (sequelize , DataTypes ) => {
    const Review = sequelize.define('Review', {
        review_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5 
           }
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    },{
        tableName :'reviews',
        timestamps : false
    }
);

Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'user_id'   
    });
    Review.belongsTo(models.Product, {
      foreignKey: 'product_id'   
    });
};
    return Review;
};