module.exports = {
    autenticado: function(req,res,next){
        if(req.isAuthenticated() && req.user.eAdmin == 0){
            return next()
        }
        req.flash("error_msg","Você precisa realizar login!")
        res.redirect("/paginaP")
    },
    //aa
    admin: function(req,res,next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }else if(!req.isAuthenticated()){
            req.flash("error_msg","Você precisa realizar login!")
        }else{
            req.flash("error_msg","Você precisa ser um administrador!")
        }
        res.redirect("/paginaP")
    }
}