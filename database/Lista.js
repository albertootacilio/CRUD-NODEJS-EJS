
const Sequelize = require("sequelize");
const connection = require("./database");

const Lista = connection.define('listas',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },status:{
        type: Sequelize.STRING,
        allowNull: false
    },calendario:{
        type: Sequelize.DATE,
        allowNull: false
    },observacao:{
        type: Sequelize.TEXT,
        allowNull: true
    }   
})

Lista.sync({force: false}).then(()=>{
    console.log('table rules create!')
})

module.exports = Lista;


