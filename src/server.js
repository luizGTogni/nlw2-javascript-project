// Servidor
const express = require("express");
const server = express();

// Importar as pages
const { pageLanding, pageStudy, pageSuccessProffy, pageGiveClasses, saveClasses } = require("./pages");

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
.get("/success-proffy", pageSuccessProffy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// Iniciar o servidor
.listen(process.env.PORT || 3000);