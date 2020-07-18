//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos extras
server.use(express.static('public'))

//habilitar body do formulário
server.use(express.urlencoded({extended: true}))

//configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  password: '0000',
  host: 'localhost',
  port: 5432,
  database: 'doe',
})


// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache: true, 
})

// lista de doadores foi apagada
/*const donors = [
  {
    name: "José da SIlva",
    blood: "AB+"
  },
  {
    name: "Matheus Roberto",
    blood: "B+"
  },
  {
    name: "Alan Souza",
    blood: "O-"
  },
  {
    name: "Victor Coen",
    blood: "A+"
  },
  {
    name: "Alan Souza",
    blood: "O-"
  },
  {
    name: "Alan Souza",
    blood: "O-"
  },
  {
    name: "Alan Souza",
    blood: "O-"
  },
  {
    name: "Alan Souza",
    blood: "O-"
  },
]*/

// configurar a apresentação da página
server.get("/", function(req,res) {

  db.query("SELECT * FROM donors", function(err, result){
    if (err) return res.send("Erro na amostragem dos dados")

    const donors = result.rows
    return res.render("index.html", {donors})
  })

})

server.post("/", function(req,res){
  // pegar dados dos formulário
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood

  // colocando valores dentro do vetor APAGADO
  /*donors.push({
    name: name,
    blood: blood,
  })*/

  // Verificando se o formulário possui registro nulo
  if (name == "" || email == "" || blood == "") {
    return res.send("Todos os campos são obrigatórios")
  }

  // colocando valores dentro do banco de dados
  const query = `
    INSERT INTO donors ("name", "email", "blood") 
    VALUES ($1, $2, $3)`

  const values = [name, email, blood]

  db.query(query, values, function(err){
    //fluxo de erro
    if (err) return res.send("erro no banco de dados")

    //fluxo ideal
    return res.redirect("/")
  })

})

// ligar o servidor na porta 3000
server.listen(3000, function() {
  console.log("Iniciei o servidor.")
})