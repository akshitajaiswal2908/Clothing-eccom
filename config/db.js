const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'ecommerce',       
  'root',             
  'Anju@1976',                 
  {
    host: 'localhost', 
    dialect: 'mysql', 
    logging: false    
  }
);

module.exports = sequelize;
