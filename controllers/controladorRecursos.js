var recursos = require('../models/recursos');
var axios = require("axios")
var qs = require("querystring");

const controladorRecursos = {}; 

controladorRecursos.consultarRecursos = function(req,res){
    professor.findAll({
        raw: true,
        where:{
            tipo: req.body.tipo
        }
    }).then(function(dados) {
        res.render("paginaPesquisa",{recursos: dados})
        console.log(dados)
    }).catch(function(error){
        
        res.status(500).send(`Erro ao buscar Ingresso: ${error}` )
    })
}  

module.exports = controladorRecursos