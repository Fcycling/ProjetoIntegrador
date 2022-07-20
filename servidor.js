var express = require("express");
var handlebars = require("express-handlebars");
var rotas = require("./routes/rotas");
var sesion = require ("express-session");
var flash = require("connect-flash");
var passport = require("passport")
require("./configs/seguranca")(passport)
var servidor = express();

const PORTA= 3000

servidor.use(sesion({
    secret: 'aulanode',
    resave: true,
    saveUninitialized: true
}))
servidor.use(passport.initialize())
servidor.use(passport.session())
servidor.use(flash())

servidor.use((req,res, next) => {
    res.locals.success_msg = req.flash("succes_msg")
    res.locals.error_msg = req.flash("error_msg")
    next() 
    
})


servidor.engine("handlebars", handlebars.engine({defaultLayout:"main"}));
servidor.set("view engine","handlebars");

servidor.use(express.urlencoded({extended:true}));
servidor.use(rotas);
servidor.use(express.static("images"))
servidor.use(express.static("style"))
servidor.use(express.static("movies"))
servidor.use(express.static("helpers"))



servidor.listen(PORTA, function(){
    console.log("Sevidor está rodando na porta" + PORTA)
});