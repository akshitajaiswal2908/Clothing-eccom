const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category');


const Product = sequelize.define('Product',{
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
    },{
        tableName: 'products',
        timestamps: false
    });


    Product.belongsTo(Category, { foreignKey: 'category_id' });
    module.exports = Product;