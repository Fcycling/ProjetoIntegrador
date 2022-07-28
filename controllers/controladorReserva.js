var reserva = require("../models/reservas");
var axios = require("axios");
var qs = require("querystring");

const controladorReserva = {}

controladorReserva.inserirReservaBanco = function(req,res){
    var date = new Date(req.body.data)
    reserva.create({
       dataInicial : req.body.dataInicial,
       dataFinal: req.body.dataFinal,
       idRecurso: req.params.id,
       idProfessor: req.params.id    
   }).then(function(){
    res.status(200).redirect("/paginaP");
}
).catch(function(error){
    res.status(500).send("Erro ao reservar Recurso: " + error)
})
}

controladorReserva.atualizarReserva = function(req,res){
    reserva.update({
        descricao:req.body.descricaoRecurso,
        tipo:req.body.tipoRecurso,
        status:req.body.statusRecurso,
        dataFinal: req.body.dataFinal,
        dataInicial: req.body.dataInicial
    },{
        where: {
            id:req.params.id,}
    }).then(function(){
        res.sendStatus(200);
    }).catch(function(error){
        res.status(500).send("Erro ao reservar: " + error)
    })
}

    


module.exports = controladorReserva;

