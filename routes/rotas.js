const express = require('express')
const passport = require('passport')
const professor = require('../controllers/controladorProfessor')
const recursos = require('../controllers/controladorRecursos')
const reservas = require('../controllers/controladorReserva')
const {autenticado}= require("../helpers/acesso")
const {admin}= require("../helpers/acesso")

const rotas = express.Router()

//rota pagina inicial
rotas.get('/', professor.inicio)
//rotas controlador professores
rotas.get('/cadastroP', professor.cadastroP)
rotas.get('/loginP', professor.loginP)

rotas.post('/pagina/professor', professor.inserirProfessorBanco)

//rotas controlador recursos
rotas.put("/recurso/:id",recursos.atualizarRecursoBanco)
rotas.get('/paginaP',recursos.pesquisarRecursoBanco)
rotas.get('/inicioRecursos',recursos.renderizarPaginaRecursos)
rotas.get('/cadastrar', admin,recursos.cadastroRecursos)

rotas.post('/recurso/:id',admin,recursos.montarReqEdicao)
rotas.get('/recursos/:id',admin,recursos.editarRecursoBanco)


rotas.put("/reservarRecurso", reservas.atualizarReserva)
rotas.get("/paginaEditar/reserva", reservas.paginaEditarReserva)

rotas.delete("/apagar/:id", recursos.removerRecursoBanco)
rotas.get("/removerRecurso/:id",admin, recursos.montarReqDelete);
rotas.post("/pesquisaRecurso", recursos.pesquisarRecurso)
rotas.delete("/apagar",recursos.apagarRecursos);
rotas.get("/excluirRecursos",recursos.montarReqDelete); 
rotas.post("/recursos", recursos.inserirRecursosBanco)

rotas.post("/reservar/recurso/:id",reservas.inserirReservaBanco)

rotas.post("/logar", (req,res,next) => {
    passport.authenticate("local",{
        successRedirect:"/paginaP",
        failureRedirect:"/loginP",
        failureFlash: true,
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout(req.user, err =>{
        if(err) return next(err)
        req.flash('success_msg',"Você saiu!")
        res.redirect("/")
    })
})



//rotas.get("/paginaR", reservas.paginaR)


































module.exports = rotas;

