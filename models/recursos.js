var sequelize = require('sequelize');
var banco = require('../configs/bancoConfig');

var recurso = banco.define('recurso',{
    
    id:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: sequelize.STRING,
        allowNull: false,
    },
    tipo:{
        type: sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: sequelize.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false    
})

recurso.sync();
module.exports = recurso;