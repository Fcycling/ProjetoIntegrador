var recursos = require('../models/recursos');
var axios = require("axios")
var qs = require("querystring");


const controladorRecursos = {}; 

controladorRecursos.renderizarPaginaRecursos = function(req,res){
    try {
        res.render("paginaP")
    } catch (error) {
        res.status(500).send("Erro ao renderizar pagina dos recursos " + error)
    }
}


controladorRecursos.inserirRecursosBanco= function(req,res){
    console.log("Erro: " + req.body.descricao)
    recursos.create({
        descricao:req.body.descricao,
        tipo: req.body.tipo,
        status:req.body.status
        }).then(function(){
            res.status(200).redirect("/paginaP");
        }
        ).catch(function(error){
            res.status(500).send("Erro ao cadastrar Recurso: " + error)
        })
        
}

controladorRecursos.atualizarRecursoBanco= function(req,res){
    recursos.update({
        descricao:req.body.descricaoRecurso,
        tipo:req.body.tipoRecurso,
        status:req.body.statusRecurso
    },{
        where: {
            id:req.params.id,}
    }).then(function(){
        res.sendStatus(200);
    }).catch(function(error){
        res.status(500).send("Erro ao atualizar recurso: " + error)
    })
}

controladorRecursos.removerRecursoBanco = function(req,res){
    recursos.destroy({
        where:{
            id:req.params.id
        }
    }).then(function(){
        res.sendStatus(200)
    }).catch(function(error){
        res.status(500).send("Erro ao remover recurso: " + error)
    })
}

controladorRecursos.cadastroRecursos = function(req,res){
    try{
        res.render("cadastroRecurso")
    }catch(error){
        res.status(500).send("Erro ao acessar página de cadastro:" + error)
    }
}

controladorRecursos.editarRecursoBanco = function(req,res){
    recursos.findOne({
        raw:true,
        where:{
            id: req.params.id}
    }).then(function(recursos){
        res.render("editarFormRecursos",{
            idRecurso: req.params.id,
            descricaoRecurso:recursos.descricao,
            tipoRecurso: recursos.tipo,
            statusRecurso: recursos.status,
              
        })
    }).catch(function(error){
        res.status(500).send("Erro ao acessar página de edição:" +error)
    })
}

controladorRecursos.montarReqEdicao = function(req, res){
    axios.put('/recurso/'+ req.params.id,
    qs.stringify({
        descricaoRecurso: req.body.descricao,
        tipoRecurso: req.body.tipo,
        statusRecurso: req.body.status,
    }),{headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    proxy:{
        host: '52.90.187.126',
        port: 3000
    }
}
).then(function(){
    res.status(200).redirect('/paginaP')
}).catch(function(error){
    res.status(500).send("Erro ao editar Recurso " + error)
})
}

controladorRecursos.montarReqDelete = function(req,res){
    
    axios.delete('/apagar/'+req.params.id,{
        proxy:{
            host:'52.90.187.126',
            port:3000
        }
    }).then(function(){
        res.status(200).redirect("/paginaP")
    }).catch(function(error){
        res.status(500).send("Erro ao apagar recurso" + error)
    })
}

controladorRecursos.pesquisarRecursoBanco = function(req,res){
    recursos.findAll({
        raw: true
    }).then(function(dados){
        res.render("paginaP",{recursos:dados})
        console.log(dados)
    }).catch(function(error){
        res.status(500).send(`Erro ao buscar recurso : ${error}`)
  })
}

controladorRecursos.pesquisarRecurso = function(req,res){
    recursos.findAll({
        raw: true,
        where:{
            status:req.body.status  
        }
    }).then(function(dados){
        res.render("paginaP",{recursos:dados})
        console.log(dados)
    }).catch(function(error){
        res.status(500).send(`Erro ao buscar recurso : ${error}`)
  })
}


controladorRecursos.apagarRecursos = function(req,res){
    recursos.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(){
        res.sendStatus(200)
    }).catch(function(error){
        res.status(500).send("Erro ao apagar os Recursos: " + error)
    })
}





module.exports = controladorRecursos