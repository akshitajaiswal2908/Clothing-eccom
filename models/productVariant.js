const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');

const ProductVariant = sequelize.define('ProductVariant',{
    variant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    product_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
},{
    tableName:'product_variants',
    timestamps: false
});

ProductVariant.belongsTo(Product, { foreignKey: 'product_id'} );
Product.hasMany(ProductVariant, { foreignKey: 'product_id'} );

module.exports = ProductVariant;