var express = require("express");
var router = express.Router();

function myMiddleware(req, res, next) {
    // Your middleware logic here
    next(); // Call next to continue to the next middleware or route handler
  }

  router.use(myMiddleware);

router.get("/", function(req, res){
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

router.get("/restaurante", function(req, res){
    res.render("pages/restaurante", {retorno: null, erros: null})}
);

module.exports = router;