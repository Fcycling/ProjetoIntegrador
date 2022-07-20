var localStrategy = require("passport-local").Strategy
var banco = require("mysql2")
var bcrypt = require("bcryptjs")

//modelo do usuário
var usuario = require('../models/professor');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'email',passwordField:'senha'},async(email,senha,done) => {
        console.log("Chegou")
        usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null,false,{message:"Esta conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha incorreta!"})
                }
            })
        })
    }))

    passport.serializeUser((user,done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        try{
            const user = await usuario.findByPk(id)
            done(null, user)
        }catch(erro){
            done(erro, user)
        }
       
    })
}