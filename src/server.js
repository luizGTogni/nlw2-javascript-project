// Servidor
const express = require("express");
const server = express();

// Importar as pages
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require("./pages");

// Configurar Nunjucks (Template Engine)
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
});

// Inicio e configuração do servidor
server
// Receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// Iniciar o servidor
.listen(3000, () => {
    console.log("Server Started");
});