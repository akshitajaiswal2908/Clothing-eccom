const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'ecommerce',       
  'root',             
  '12345677',                 
  {
    host: 'localhost', 
    dialect: 'mysql', 
    logging: false    
  }
);

module.exports = sequelize;
