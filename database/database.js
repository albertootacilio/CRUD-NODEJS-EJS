
const Sequelize = require('sequelize');

const connection = new Sequelize('tarefas','sa','SQL_2017',{
    host: 'localhost',
    dialect:'mssql'
});

module.exports = connection;
