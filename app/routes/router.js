var express = require("express");
const { body } = require("express-validator");
var router = express.Router();

function myMiddleware(req, res, next) {
    // Your middleware logic here
    next(); // Call next to continue to the next middleware or route handler
  }

  router.use(myMiddleware);

router.get("/", function(req, res){
    res.render("pages/home")}
);

router.get("/home", function(req, res){
    res.render("pages/home")}
);

router.get("/cadastro", function(req, res){
    res.render("pages/cadastro", {retorno: null, erros: null})}
);

router.get("/eventos", function(req, res){
    res.render("pages/eventos", {retorno: null, erros: null})}
);

router.get("/index-adm", function(req, res){
    res.render("pages/index-adm", {retorno: null, erros: null})}
);

router.get("/login", function(req, res){
    res.render("pages/login", {retorno: null, erros: null})}
);

router.get("/noticias-form", function(req, res){
    res.render("pages/noticias-form", {retorno: null, erros: null})}
);

router.get("/noticias", function(req, res){
    res.render("pages/noticias", {retorno: null, erros: null})}
);

router.get("/restaurantes", function(req, res){
    res.render("pages/restaurantes", {retorno: null, erros: null})}
);

router.get("/sobre", function(req, res){
    res.render("pages/sobre", {retorno: null, erros: null})}
);

router.get("/loja", function(req, res){
    res.render("pages/loja", {retorno: null, erros: null})}
);

router.get("/comoajudar", function(req, res){
    res.render("pages/comoajudar", {retorno: null, erros: null})}
);

router.get("/formadd", function(req, res){
    res.render("pages/formadd", {retorno: null, erros: null})}
);

router.post (
    "/adicionar",

    body("tnoticia").isLength({ min: 5, max: 25}),
    body("nassunto").isLength({min: 10, max: 250}),
    body("data").isDate(),
    body("situacao").isNumeric(),

    async function (req, res) {
        var dadosForm = {
            nome_noticia: req.body.tnoticia,
            assunto_noticia: req.body.nassunto,
            data_noticia: req.body.data,
            situacao_noticia: req.body.situacao,
            
        }
    }
)

module.exports = router;