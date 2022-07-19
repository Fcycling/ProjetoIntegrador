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


controladorProfessor.encontrarLogin = function(req,res){
    professor.findOne({
        raw: true,
        where:{
            email: req.body.email
        }
    }).then(
        function(user){
            cripto.compare(req.body.senha, user.senha).then(function(result){
                req.flash('success_msg', "Login realizado com sucesso!")
                console.log(result);
                if(result){
                    res.status(200).redirect('/pagina/professor');
                }else{
                    res.status(500).send("Erro ao realizar login!")
                }
            }
            ).catch(function(error){
                req.flash("error_msg","Erro ao logar")
                req.status(500).send("Erro: " + error)
            })
        }
    ).catch(function(error){
        res.status(500).send("Erro ao procurar usuário: " + error)
    })
}


controladorProfessor.inicioP = function(req,res){
    try{
        res.render("paginaP")
    }catch(error){
        res.status(500).send("Erro ao renderizar página do docente " + error)
    }
}

controladorProfessor.inserirProfessorBanco=  async function(req,res){
    var erros = []
    
    if(!req.body.email|| typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.nome|| typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    
    if(!req.body.senha|| typeof req.body.senha == undefined || req.body.senha == null){
     erros.push({texto:"Senha Inválida"})   
    }
    if(req.body.senha.length<6){
        erros.push({texto:"Senha Pequena"})
    }
    if(erros.length>0){
        res.render("cadastroProfessor",{errosNaPagina: erros})
    }else{
     var password = await cripto.hash(req.body.senha,8)
     
     usuario.create({
         email: req.body.email,
         senha: password
         }).then(function(){
             req.flash("success_msg","Cadastro realizado com Sucesso")
             res.status(200).redirect("/loginP");
         }
         ).catch(function(error){
             req.flash("error_msg","Erro ao cadastrar usuário")
             res.redirect("/cadastroP")
             //res.status(500).send("Erro ao criar Usuário:"+error)
         })
     }
 }



    





module.exports = controladorProfessor