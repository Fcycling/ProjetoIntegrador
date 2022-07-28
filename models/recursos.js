var sequelize = require('sequelize');
var banco = require('../configs/bancoConfig');

var recursos = banco.define('recurso',{
    
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


//recursos.sync();
module.exports = recursos;