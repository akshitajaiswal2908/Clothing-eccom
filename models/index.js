const sequelize = require('../config/db');
const User = require('./user');
const Address = require('./address');
const Category = require('./category');
const Product = require('./product');
const ProductVariant = require('./productVariant');

User.hasMany(Address, { foreignKey: 'user_id' });
Address.belongsTo(User, { foreignKey: 'user_id' });

Product.belongsTo(Category, { foreignKey: 'category_id'} );
Product.hasMany(ProductVariant, { foreignKey: 'product_id'} );


const db = { sequelize, User, Address, Category, Product, ProductVariant };

module.exports = db;
