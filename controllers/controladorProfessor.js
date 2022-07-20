var professor = require('../models/professor')
var axios = require("axios")
var qs = require("querystring")

const controladorProfessor = {};
var cripto= require("bcryptjs")

controladorProfessor.inicio = function(req,res) {
    try{
        res.render("paginaInicial")
    }catch(error){
        res.status(500).send("Erro ao renderizar página inicial" + error)
    }
}

controladorProfessor.cadastroP = function(req,res){
    try{
        res.render("cadastroProfessor")
    }catch(error){
        res.status(500).send("Erro ao renderizar página dos professores" + error)
    }
}

controladorProfessor.loginP = function(req,res){
    try{
        res.render("loginProfessor")
    }catch(error){
        res.status(500).send("Erro ao fazer login " + error)
    }
}





controladorProfessor.inicioP = function(req,res){
    try{
        res.render("paginaP")
    }catch(error){
        res.status(500).send("Erro ao renderizar página do docente " + error)
    }
}

controladorProfessor.inserirProfessorBanco = async function (req, res) {
    var erros = []

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }

    if(req.body.senha.length < 6){
        erros.push({texto: "Senha muito pequena!"})
    }

    if(erros.length > 0){//se existe algum erro
        res.render("cadastroProfessor",{errosNaPagina: erros})
    }else{
        var pass = await cripto.hash(req.body.senha,8)
        
        professor.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: pass,
            eAdmin: req.body.eAdmin,
            matricula: req.body.matricula
        }).then(
            function(){
                req.flash("success_msg","Professor cadastrado com sucesso!")
                res.status(200).redirect("/loginP");
            }
        ).catch(
            function(error){
                req.flash("error_msg","Erro ao cadastrar professor!" + error)
                //res.status(500).send("Erro ao criar usuário: " + error);
                res.redirect("/cadastroP")
            }
        )
    }
    
}


    





module.exports = controladorProfessor