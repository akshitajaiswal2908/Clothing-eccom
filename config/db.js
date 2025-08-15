const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

let sslOption = {};
if (process.env.DB_SSL_CA) {
  sslOption = { ssl: {rejectUnauthorized: false }};
}


const sequelize = new Sequelize(
  // 'ecommerce',       
  // 'root',             
  // '12345677',                 
  // {
  //   host: 'localhost', 
  //   dialect: 'mysql', 
  //   logging: false    
  // }
  process.env.DB_NAME,       // defaultdb or your ecommerce DB on Aiven
  process.env.DB_USER,       // avnadmin
  process.env.DB_PASSWORD,   // your Aiven password
  {
    host: process.env.DB_HOST, // ecommerce-akshitajaiswal2908-61db.c.aivencloud.com
    port: process.env.DB_PORT, // 13912
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(process.env.DB_SSL_CA)
      }
    },
    logging: false
  }
);

module.exports = sequelize;
