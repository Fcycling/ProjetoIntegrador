var sequelize = require('sequelize');
var banco = require('../configs/bancoConfig');
const professor = require('./professor');
const recursos = require('./recursos');

var reserva = banco.define('reserva', {
    
    id:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        
    },
    
    dataInicial:{
        type: sequelize.DATE,
        allowNull: false,
        },
    dataFinal:{
            type: sequelize.DATE,
            allowNull: false,
        }
    
    
        
   
    },{
    freezeTableName: true,
    timestamps: false,    
})


recursos.hasMany(reserva)

reserva.belongsTo(recursos)

professor.hasMany(reserva)

reserva.belongsTo(professor)



reserva.sync();
module.exports = reserva;