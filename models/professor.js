var sequelize = require('sequelize');
var banco = require('../configs/bancoConfig');

var professor = banco.define('teacher',{
    
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
        type: sequelize.STRING,
        allowNull: false,
    },
    eAdmin:{
        type: sequelize.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

professor.sync()
module.exports = professor;