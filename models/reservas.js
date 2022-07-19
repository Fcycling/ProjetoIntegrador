var sequelize = require('sequelize');
var banco = require('../configs/bancoConfig');

var reserva = banco.define('reserva', {
    
    dataIncial:{
        type: sequelize.DATE,
        allowNull: false,
        },
        dataFinal:{
            type: sequelize.DATE,
            allowNull: false,
        }
    },
    {
    freezeTableName: true,
    timestamps: false,    
})

//reserva.sync();
module.exports = reserva;