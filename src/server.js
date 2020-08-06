// Dados
const proffys = [
    { 
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4", 
        whatsapp: "8998756524", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado pro explodir as coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Danoele Evagelista", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4", 
        whatsapp: "8998756524", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado pro explodir as coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    }
];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funções
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber-1;
    return subjects[arrayPosition];
}

function pageLanding(req, res) {
    return res.render("index.html");
}

function pageStudy(req, res) {
    const filters = req.query;
    return res.render("study.html", { proffys, filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
    const data = req.query
    
    // Verificar se tem dados
    const isNotEmpty = Object.keys(data).length > 0;
    if (isNotEmpty) {
        data.subject = getSubject(data.subject);
        // Adicionar dados ao lista de proffys
        proffys.push(data);

        return res.redirect("/study");
    }
    // Caso não tenha dados, mostrar a página novamente
    return res.render("give-classes.html", { subjects, weekdays });
}

// Servidor
const express = require("express");
const nunjucks = require("nunjucks");
const server = express();

// Configurar Nunjucks (Template Engine)
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
});

// Inicio e configuração do servidor
server
// Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Iniciar o servidor
.listen(5500);