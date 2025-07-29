const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category =  sequelize.define('Category',{
    category_id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name: DataTypes.STRING
},{
    tableName: 'categories',
    timestamps: false
}
);

module.exports = Category;