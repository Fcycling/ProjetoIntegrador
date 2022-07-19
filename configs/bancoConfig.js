var sequelize = require('sequelize');

var conexao = new sequelize ("bancopi","root","nicaslo@07",{
    host:"localhost",
    dialect: "mysql"
})

conexao.authenticate().then(function(){
    console.log("Conectado ao banco com sucesso")
}).catch(function(erro){
    console.log("Erro ao conectar-se ao banco" + erro)
})

module.exports = conexao