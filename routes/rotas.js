const express = require('express')
const passport = require('passport')
const professor = require('../controllers/controladorProfessor')
const recursos = require('../controllers/controladorRecursos')
const reserva = require('../controllers/controladorReserva')

const rotas = express.Router()

//rota pagina inicial
rotas.get('/', professor.inicio)
//rotas controlador professores
rotas.get('/cadastroP', professor.cadastroP)
rotas.get('/loginP', professor.loginP)
rotas.get('/paginaP', professor.inicioP)
rotas.post('/pagina/professor', professor.inserirProfessorBanco)

rotas.post("/logar", (req,res,next) => {
    passport.authenticate("local",{
        successRedirect:"/paginaP",
        failureRedirect:"/loginP",
        failureFlash: true,
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout()
    req.flash('success_msg',"Você saiu!")
    res.redirect("/")
})


//rotas controlador recursos
rotas.get('/inicioRecursos', recursos.renderizarPaginaRecursos)
rotas.get('/cadastrar', recursos.cadastroRecursos)
rotas.post('/edicaoR', recursos.montarReqEdicao)
rotas.get("/removerRecurso/:id", recursos.montarReqDelete);
rotas.post("/pesquisaRecurso", recursos.pesquisarRecurso)
rotas.delete("/apagar", recursos.apagarRecursos);
rotas.get("/excluirRecursos", recursos.montarReqDelete); 




































module.exports = rotas;

