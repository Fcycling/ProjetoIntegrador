const express = require('express')
const passport = require('passport')
const professor = require('../controllers/controladorProfessor')
const recursos = require('../controllers/controladorRecursos')
const reserva = require('../controllers/controladorReserva')
const {admin} = require('../helpers/acesso')

const rotas = express.Router()

//rota pagina inicial
rotas.get('/', professor.inicio)
//rotas controlador professores
rotas.get('/cadastroP', professor.cadastroP)
rotas.get('/loginP', professor.loginP)

rotas.post('/pagina/professor', professor.inserirProfessorBanco)

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


//rotas controlador recursos
rotas.put("/:id", recursos.atualizarRecursoBanco)
rotas.get('/paginaP', recursos.pesquisarRecurso)
rotas.get('/inicioRecursos', recursos.renderizarPaginaRecursos)
rotas.get('/cadastrar', recursos.cadastroRecursos)

rotas.get('/recurso/:id', recursos.montarReqEdicao)
rotas.get('/recursos/:id', admin, recursos.editarRecursoBanco)

rotas.get("/removerRecurso/:id", recursos.montarReqDelete);
rotas.post("/pesquisaRecurso", recursos.pesquisarRecurso)
rotas.delete("/apagar",admin,recursos.apagarRecursos);
rotas.get("/excluirRecursos",admin, recursos.montarReqDelete); 
rotas.post("/recursos", recursos.inserirRecursosBanco)




































module.exports = rotas;

