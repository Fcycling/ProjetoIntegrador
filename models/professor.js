var sequelize = require('sequelize');
var banco = require('../configs/bancoConfig');

var teacher = banco.define('teacher',{
    
    id:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    matricula:{
        type: sequelize.INTEGER,
        allowNull: false,
    },
    nome:{
        type: sequelize.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    
    senha: {
        type: sequelize.STRING(50),
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

teacher.sync()
module.exports = teacher;