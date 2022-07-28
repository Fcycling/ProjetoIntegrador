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
       idProfessor: 1     
   }).then(function(){
    res.status(200).redirect("/paginaP");
}
).catch(function(error){
    res.status(500).send("Erro ao reservar Recurso: " + error)
})
}

    


module.exports = controladorReserva;

