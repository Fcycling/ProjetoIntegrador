var sequelize = require('sequelize');

var conexao = new sequelize ("projetointegrador","root","123456789",{
    host:"projetointegrador.cysmzdamoc6d.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
})

conexao.authenticate().then(function(){
    console.log("Conectado ao banco com sucesso")
}).catch(function(erro){
    console.log("Erro ao conectar-se ao banco ggg" + erro)
})

module.exports = conexao