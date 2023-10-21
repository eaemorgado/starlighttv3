const express = require("express");
const app = express();
const port = 21045
const bodyParser = require('body-parser')

app.use(express.static('app/public'));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({ extended: true }));

var rotas = require('./app/routes/router');
app.use("/", rotas);

app.listen(port, () =>{
    console.log(`Site Online`)
});


