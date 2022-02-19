const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-s18290', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;