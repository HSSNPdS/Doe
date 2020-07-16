//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos extras
server.use(express.static('public'))

//habilitar body do formulário
server.use(express.urlencoded({extended: true}))

// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache: true,
})

// lista de doadores
const donors = [
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
]

// configurar a apresentação da página
server.get("/", function(req,res) {
  return res.render("index.html", {donors})
})

server.post("/", function(req,res){
  // pegar dados dos formulário
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood

  // colocando valores dentro do vetor
  donors.push({
    name: name,
    blood: blood,
  })

  return res.redirect("/")
})

// ligar o servido na porta 3000
server.listen(3000, function() {
  console.log("Iniciei o servidor.")
})