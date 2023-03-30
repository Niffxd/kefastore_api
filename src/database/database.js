import { Sequelize } from 'sequelize';
import './../config.js';

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false,
  native: false
});

export default sequelize;
