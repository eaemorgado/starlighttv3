var express = require("express");
const { body } = require("express-validator");
var router = express.Router();
var mysql = require("mysql");
const uuid = require('uuid');
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const multer = require('multer');
const path = require('path');
// ****************** Versão com armazenamento em diretório
// Definindo o diretório de armazenamento das imagens
var storagePasta = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './app/public/img/noticias/') // diretório de destino  
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //renomeando o arquivo para evitar duplicidade de nomes
  }
})

var upload = multer({ storage: storagePasta });



const db = mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  password: "DGaAhcG3FfG5-Gd5dcehgCB14heA3eE5",
  database: "railway",
  port: "54209"  
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Conectado ao MySQL');
  });


  var { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticador_middleware");
  var UsuarioDAL = require("../models/UsuarioDAL");
    var usuarioDAL = new UsuarioDAL(db);



    var NoticiaDAL = require("../models/NoticiaDAL");
    var noticiaDAL = new NoticiaDAL(db);

    var ComentarioDAL = require("../models/ComentarioDAL");
    var comentarioDAL = new ComentarioDAL(db);

    var ProdutosDAL = require("../models/ProdutosDAL");
    var produtosDAL = new ProdutosDAL(db);


  const {validationResult } = require("express-validator");

function myMiddleware(req, res, next) {
    // Your middleware logic here
    next(); // Call next to continue to the next middleware or route handler
  }

  router.use(myMiddleware);


  router.get("/sair", limparSessao, function (req, res) {
    res.redirect("/");
  });
  
  router.get("/", verificarUsuAutenticado, async function (req, res) {
    try {

      let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
        
      inicio = parseInt(pagina - 1) * 5
      results = await comentarioDAL.FindPage(inicio, 5);
      totReg = await comentarioDAL.TotalReg();
      console.log(results)
  
      totPaginas = Math.ceil(totReg[0].total / 5);
  
      var paginador = totReg[0].total <= 5 ? null : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas }
  
      console.log("auth --> ")
      console.log(req.session.autenticado)
      res.render("pages/home",{ comentarios: results, paginador: paginador, autenticado:req.session.autenticado, login: req.res.autenticado} );
      req.session.autenticado.login = req.query.login;
    } catch (e) {
      console.log(e); // console log the error so we can see it in the console
      res.json({ erro: "Falha ao acessar dados" });
    }    
    
  });

  router.get("/home", verificarUsuAutenticado, async function (req, res) {
    try {

      let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
        
      inicio = parseInt(pagina - 1) * 5
      results = await comentarioDAL.FindPage(inicio, 5);
      totReg = await comentarioDAL.TotalReg();
      console.log(results)
  
      totPaginas = Math.ceil(totReg[0].total / 5);
  
      var paginador = totReg[0].total <= 5 ? null : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas }
  
      console.log("auth --> ")
      console.log(req.session.autenticado)
      res.render("pages/home",{ comentarios: results, paginador: paginador, autenticado:req.session.autenticado, login: req.res.autenticado, dadosNotificacao: {
        titulo: "login realizado!", mensagem: "Usuário logado com sucesso!", tipo: "success"
      } } );
      req.session.autenticado.login = req.query.login;
    } catch (e) {
      console.log(e); // console log the error so we can see it in the console
      res.json({ erro: "Falha ao acessar dados" });
    }    
    
  });

  router.get("/usuario", verificarUsuAutenticado, function (req, res) {
    if (req.session.autenticado.autenticado == null) {
      res.render("pages/login", { listaErros: null, dadosNotificacao: null})
  } else {
      res.render("pages/usuario",{autenticado: req.session.autenticado, retorno: null, erros: null})}
  
  });

  
  router.get("/cadastro", function(req, res){
    res.render("pages/cadastro", { listaErros: null, dadosNotificacao: null})}
);

router.get("/eventos", function(req, res){
    res.render("pages/eventos", {retorno: null, erros: null})}
);

router.get("/index-adm", function(req, res){
    res.render("pages/index-adm", {retorno: null, erros: null})}
);

router.get("/login", function(req, res){
    res.render("pages/login", { listaErros: null, dadosNotificacao: null})}
);

router.get("/noticias-form", function(req, res){
    res.render("pages/noticias-form", {retorno: null, erros: null})}
);

router.get("/noticias", async function(req, res){
  try {

    let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
      
    inicio = parseInt(pagina - 1) * 5
    results = await noticiaDAL.FindPage(inicio, 5);
    totReg = await noticiaDAL.TotalReg();
    console.log(results)

    totPaginas = Math.ceil(totReg[0].total / 5);

    var paginador = totReg[0].total <= 5 ? null : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas }

    console.log("auth --> ")
    console.log(req.session.autenticado)
    res.render("pages/noticias",{ noticias: results, paginador: paginador, autenticado:req.session.autenticado, login: req.res.autenticado} );
  } catch (e) {
    console.log(e); // console log the error so we can see it in the console
    res.json({ erro: "Falha ao acessar dados" });
  }    
}
);

// router.get("/addproduto", verificarUsuAutenticado, function (req, res) {
//   if (req.session.autenticado.autenticado == null) {
//     res.render("pages/login", { listaErros: null, dadosNotificacao: null})
// } else {
//     res.render("pages/addproduto",{autenticado: req.session.autenticado, retorno: null, erros: null})}

// });

// router.post("/publicarproduto",
//   upload.single('img_produto'),
//   async function(req, res){
//     const formProduto = {
//         nome_produto: req.body.nome_produto,
//         valor_produto: req.body.valor_produto,
//         link_produto: req.body.link_produto,
//         img_produto: req.body.img_produto
//     }
//     if (!req.file) {
//       console.log("Falha no carregamento");
//     } else {
//       caminhoArquivo = "img/noticias/" + req.file.filename;
//       formProduto.img_produto = caminhoArquivo
//       console.log(req.file)
//     }
//     try {
//       let insert = await produtosDAL.create(formProduto);
//       console.log(insert);
//       res.render("pages/addproduto", {
//         autenticado: req.session.autenticado,
//         listaErros: null, dadosNotificacao: {
//           titulo: "Produto Publicado!", mensagem: "Produto publicado com o id " + insert.insertId + "!", tipo: "success"
//         }, valores: req.body
//       })
//     } catch (e) {
//       res.render("pages/addproduto", {
//         autenticado: req.session.autenticado,
//         listaErros: erros, dadosNotificacao: {
//           titulo: "Erro ao publicar!", mensagem: "Verifique os valores digitados!", tipo: "error"
//         }, valores: req.body
//       })
//     }
//   }
  
//   )

router.get("/produtosadm", async function(req, res){
  try {

    let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
      
    inicio = parseInt(pagina - 1) * 5
    results = await noticiaDAL.FindPage(inicio, 5);
    totReg = await noticiaDAL.TotalReg();
    console.log(results)

    totPaginas = Math.ceil(totReg[0].total / 5);

    var paginador = totReg[0].total <= 5 ? null : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas }

    console.log("auth --> ")
    console.log(req.session.autenticado)
    res.render("pages/produtosadm",{ noticias: results, paginador: paginador, autenticado:req.session.autenticado, login: req.res.autenticado} );
  } catch (e) {
    console.log(e); // console log the error so we can see it in the console
    res.json({ erro: "Falha ao acessar dados" });
  }    
}
);


router.get("/paineladministrativo", verificarUsuAutorizado([2, 3], ("pages/restrito")), function (req, res){
  req.session.autenticado.login = req.query.login;
  res.render("pages/paineladministrativo", req.session.autenticado)
}
)



router.get("/noticiasadm", verificarUsuAutorizado([2, 3], ("pages/restrito")), async function(req, res){
  try {

    let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
      
    inicio = parseInt(pagina - 1) * 10
    results = await noticiaDAL.FindPage(inicio, 10);
    totReg = await noticiaDAL.TotalReg();
    console.log(results)

    totPaginas = Math.ceil(totReg[0].total / 10);

    var paginador = totReg[0].total <= 10 ? null : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas }

    console.log("auth --> ")
    console.log(req.session.autenticado)
    res.render("pages/noticiasadm",{ noticias: results, paginador: paginador, autenticado:req.session.autenticado, login: req.res.autenticado} );
  } catch (e) {
    console.log(e); // console log the error so we can see it in the console
    res.json({ erro: "Falha ao acessar dados" });
  }    
}
);

router.get("/excluirnoticia/:id", function (req, res) {
  var query = db.query(
    "DELETE FROM noticia WHERE ?",
    { id_noticia: req.params.id },
    function (error, results, fields) {
      if (error) throw error;
    }
  );  

  res.redirect("/noticiasadm");
});


router.get("/formadd", verificarUsuAutorizado([2, 3], ("pages/restrito")), function (req, res){
  req.session.autenticado.login = req.query.login;
  res.render("pages/formadd", req.session.autenticado)
}
);


router.get("/politicapriv", function(req, res){
  res.render("pages/politicapriv", {retorno: null, erros: null})}
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




router.get("/formenviado", function(req, res){
    res.render("pages/formenviado", {retorno: null, erros: null})}
);

router.get("/adm", verificarUsuAutorizado([3], "pages/restrito"), async function(req, res){
    try {

        let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
          
        inicio = parseInt(pagina - 1) * 5
        results = await usuarioDAL.FindPage(inicio, 5);
        totReg = await usuarioDAL.TotalReg();
        console.log(results)
    
        totPaginas = Math.ceil(totReg[0].total / 5);
    
        var paginador = totReg[0].total <= 5 ? null : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas }
    
        console.log("auth --> ")
        console.log(req.session.autenticado)
        res.render("pages/adm",{ usuarios: results, paginador: paginador, autenticado:req.session.autenticado} );
      } catch (e) {
        console.log(e); // console log the error so we can see it in the console
        res.json({ erro: "Falha ao acessar dados" });
      }
    
    
     res.render("pages/adm", {usuarios: results, retorno: null, erros: null, autenticado: req.session.autenticado})
} );

router.get("/excluir/:id", function (req, res) {
    var query = db.query(
      "DELETE FROM usuarios WHERE ?",
      { id: req.params.id },
      function (error, results, fields) {
        if (error) throw error;
      }
    );  
  
    res.redirect("/adm");
  });
  

  router.post("/publicarproduto", async function(req, res){
    if (req.session.autenticado.autenticado == null) {
      res.render("pages/login")
  } else {
    const dadosComentario = {
      nome_produto: req.body.nome_produto,
      comentario: req.body.comentario
    }
  
    const {nome_comentario, comentario} = req.body;
  
    if (!nome_comentario || !comentario) {
      return res.send('Por favor, preencha todos os campos.');
    }
  
    const id_comentario = uuid.v4();
  
    const query = 'INSERT INTO comentarios (id_comentario, nome_comentario, comentario) VALUES (?, ?, ?)';
    const values = [id_comentario, dadosComentario.nome_comentario, dadosComentario.comentario];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
      } else {
        console.log('Dados inseridos com sucesso!');
      }
    });
  
    setTimeout(function () {
      res.redirect("/")
    }, 1000); 
  
    console.log(dadosComentario);    
  }
  
    
  
  
  })


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

router.post("/comentar", async function(req, res){
  if (req.session.autenticado.autenticado == null) {
    res.render("pages/login")
} else {
  const dadosComentario = {
    nome_comentario: req.body.nome_comentario,
    comentario: req.body.comentario
  }

  const {nome_comentario, comentario} = req.body;

  if (!nome_comentario || !comentario) {
    return res.send('Por favor, preencha todos os campos.');
  }

  const id_comentario = uuid.v4();

  const query = 'INSERT INTO comentarios (id_comentario, nome_comentario, comentario) VALUES (?, ?, ?)';
  const values = [id_comentario, dadosComentario.nome_comentario, dadosComentario.comentario];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
    } else {
      console.log('Dados inseridos com sucesso!');
    }
  });

  setTimeout(function () {
    res.redirect("/")
  }, 1000); 

  console.log(dadosComentario);    
}

  


})


router.post("/adicionar", verificarUsuAutorizado([2, 3], "pages/restrito"), 
    upload.single('img_noticia'),
    async function(req, res){
    const dadosNoticia = {
        titulo_noticia: req.body.titulo_noticia,
        descricao_noticia: req.body.descricao_noticia,
        data_noticia: req.body.data_noticia,
        situacao_noticia: req.body.situacao_noticia,
        img_noticia: req.body.img_noticia
    }

    const {titulo_noticia, descricao_noticia} = req.body;


    if (!titulo_noticia || !descricao_noticia) {
        return res.send('Por favor, preencha todos os campos.');
      }

      if (!req.file) {
        console.log("Falha no carregamento");
      } else {
        caminhoArquivo = "img/noticias/" + req.file.filename;
        dadosNoticia.img_noticia = caminhoArquivo
        console.log(req.file)
      }
    

      const id_noticia = uuid.v4();


      const query = 'INSERT INTO noticia (id_noticia, titulo_noticia, descricao_noticia, data_noticia, situacao_noticia, img_noticia) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [id_noticia, dadosNoticia.titulo_noticia, dadosNoticia.descricao_noticia, dadosNoticia.data_noticia, dadosNoticia.situacao_noticia, dadosNoticia.img_noticia];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados no banco de dados:', err);
        } else {
          console.log('Dados inseridos com sucesso!');
        }
      });

      setTimeout(function () {
        res.redirect("/noticias");
      }, 1000); 

      console.log(dadosNoticia);
  
})


router.post("/cadastrar",
  body("nome")
    .isLength({ min: 3, max: 50 }).withMessage("Mínimo de 3 letras e máximo de 50!"),
  body("usuario")
  .isLength({ min: 3, max: 50 }).withMessage("Mínimo de 3 letras e máximo de 50!"),
  body("email")
    .isEmail().withMessage("Digite um e-mail válido!"),
  body("senha")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 caractere especial e 1 número"),
  async function (req, res) {
    var dadosForm = {
      nome: req.body.nome,
      usuario: req.body.usuario,
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, salt),
    };
    
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/cadastro", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      let insert = await usuarioDAL.create(dadosForm);
      console.log(insert);
      res.render("pages/cadastro", {
        listaErros: null, dadosNotificacao: {
          titulo: "Cadastro realizado!", mensagem: "Usuário criado com o id " + insert.insertId + "!", tipo: "success"
        }, valores: req.body
      })
    } catch (e) {
      res.render("pages/cadastro", {
        listaErros: erros, dadosNotificacao: {
          titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error"
        }, valores: req.body
      })
    }
  });



router.post(
  "/login",
  body("email")
    .isLength({ min: 4, max: 45 })
    .withMessage("O nome de usuário/e-mail esta incorreto!"),
  body("senha")
    .isStrongPassword()
    .withMessage("Verifique novamente a senha digitada!"),

  gravarUsuAutenticado(usuarioDAL, bcrypt),
  function (req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/login", { listaErros: erros, dadosNotificacao: null })
    }
    if (req.session.autenticado != null) {
      //mudar para página de perfil quando existir
      res.render("pages/login", {
        listaErros: null, dadosNotificacao: {
          titulo: "Login realizado!", mensagem: "Usuário logado com sucesso", tipo: "success"
        }, valores: req.body
      })
    } else {
      res.render("pages/login", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" } })
    }
  });
  

//   router.post(
//     "/login",
//     body("email")
//         .isEmail({min:5, max:50})
//         .withMessage("O email deve ser válido"),
//     body("senha")
//         .isStrongPassword()
//         .withMessage("A senha deve ser válida"),



//     // gravarUsuAutenticado(usuarioDAL, bcrypt),
//     function(req, res){

//         const dadosForm = {
//             email: req.body.email,
//             senha: req.body.senha
//         }
//         if (!dadosForm.email || !dadosForm.senha) {
//             return res.status(400).send('Por favor, preencha todos os campos.');
//         }
//          const errors = validationResult(req)
//          if(!errors.isEmpty()){
//              console.log(errors);    
//              return res.render("pages/login", {retorno: null, listaErros: errors, valores: req.body});
//          }
//         // if(req.session.autenticado != null) {
//         //    res.redirect("/");
//         // } else {
//         //      res.render("pages/login", { listaErros: null, retorno: null, valores: req.body})
//         //  }

//         setTimeout(function () {
//              res.render("pages/home", { email: dadosForm.email });
//            }, 1000); 
//     });

router.get("/Alike/:id", async function (req, res) {
  try{
    let result = await comentarioDAL.findID(req.params.id)
    var dadosForm = {
      like_: results[0].like_ + 1
    }

    let resultsUpdate = await comentarioDAL.ALIKE(req.params.id, dadosForm)
    console.log(resultsUpdate)

    res.redirect("/")
  }catch(e){

  }
})




module.exports = router;