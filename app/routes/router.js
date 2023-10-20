var express = require("express");
const { body } = require("express-validator");
var router = express.Router();
var mysql = require("mysql");
const uuid = require('uuid');
const bcrypt = require('bcrypt');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "starlight",
    port: 3306
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Conectado ao MySQL');
  });


  var { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticador_middleware");

  const {validationResult } = require("express-validator");

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


router.get("/formenviado", function(req, res){
    res.render("pages/formenviado", {retorno: null, erros: null})}
);


// router.post('/formadd', (req, res) => {
//     res.redirect('/');
// });

// application.get('/postagem/:id', (req, res) =>{
//     res.render('/postagem');
// });

// app.get('editar-mensagem/:id', (req, res) =>{
//     res.render('Editar postagem');
// });

// app.post('/atualizar-postagem/:id', (req, res) =>{
//     res.redirect('/');
// });

// app.post('/excluir-postagem/:id', (req, res) =>{
//     res.redirect('/')
// })

// app.post('/adicionar', (req, res) => {
//     cont {titulo, conteudo} = req.body;
    
//     if (!titulo || !conteudo) {
//         res.status(400).send('Título e conteúdo são obrigatórios.');
//         return;

//     }

//     const postagem = {titulo, conteudo};
    
// })   

// router.post("/cadastrar", function(req, res){
//     var dadosForm = {
//         email: req.body.email
//     }.then(function(){
//         res.render("pages/formenviado")
//     }).catch(function(erro){
//         res.send("Houve um erro: " + erro)
//     })
// });


router.post("/cadastrar", function (req, res) {
    
    const dadosForm = {
        nome: req.body.nome,
        usuario: req.body.usuario,
        email: req.body.email,
        senha: req.body.senha,
      
    
    };

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.send('Por favor, preencha todos os campos.');
      }
    
      const id = uuid.v4();

    const query = 'INSERT INTO usuarios (id, nome, usuario, email, senha) VALUES (?, ?, ?, ?, ?)';
    const values = [id, dadosForm.nome, dadosForm.usuario, dadosForm.email, dadosForm.senha];


    db.query(query, values, (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados no banco de dados:', err);
        } else {
          console.log('Dados inseridos com sucesso!');
        }
      });


    setTimeout(function () {
      res.render("pages/formenviado", { email: dadosForm.email });
    }, 1000); 
  
   
    // catch(function (erro) {
    //   res.send("Houve um erro: " + erro);
    // });
    console.log(dadosForm)
  });

  router.post(
    "/login",
    body("email")
        .isEmail({min:5, max:50})
        .withMessage("O email deve ser válido"),
    body("senha")
        .isStrongPassword()
        .withMessage("A senha deve ser válida"),



    // gravarUsuAutenticado(usuarioDAL, bcrypt),
    function(req, res){

        const dadosForm = {
            email: req.body.email,
            senha: req.body.senha
        }
        if (!dadosForm.email || !dadosForm.senha) {
            return res.status(400).send('Por favor, preencha todos os campos.');
        }
         const errors = validationResult(req)
         if(!errors.isEmpty()){
             console.log(errors);    
             return res.render("pages/login", {retorno: null, listaErros: errors, valores: req.body});
         }
        // if(req.session.autenticado != null) {
        //    res.redirect("/");
        // } else {
        //      res.render("pages/login", { listaErros: null, retorno: null, valores: req.body})
        //  }

        setTimeout(function () {
             res.render("pages/home", { email: dadosForm.email });
           }, 1000); 
    });



module.exports = router;