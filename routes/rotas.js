const express = require('express')
const professor = require('../controllers/controladorProfessor')
const recursos = require('../controllers/controladorRecursos')
const reserva = require('../controllers/controladorReserva')

const rotas = express.Router()

//rotas controlador professores
rotas.get('/', professor.inicio)
rotas.get('/cadastroP', professor.cadastroP)
rotas.get('/loginP', professor.loginP)
rotas.post('/encontrarL', professor.encontrarLogin)
rotas.get('/pagina/professor', professor.inserirProfessorBanco)



































module.exports = rotas;

