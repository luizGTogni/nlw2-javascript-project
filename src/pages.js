// Importar o bando de dados
const Database = require("./database/db");

// Importar os dados e a função
const { subjects, weekdays, getSubject, getTotalRegister, convertHoursToMinutes } = require("./utils/format");
const { queryTotalRegister, queryAll, queryFilters } = require("./database/query");

async function pageLanding(req, res) {
    try {
        const db = await Database;
        const proffys = await db.all(queryTotalRegister);
        const totalRegisterProffys = getTotalRegister(proffys); 
        return res.render("index.html", { totalRegisterProffys });
    } catch (err) {
        console.log("Erro Landing: " + err);
    }
    return res.render("index.html");
}

async function pageStudy(req, res) {
    const filters = req.query;
    const hasFilters = !filters.subject || !filters.weekday && !filters.time;

    if (hasFilters) {
        // Caso haja erro na hora da consulta do banco de dados
        try {
            const db = await Database;
            const proffys = await db.all(queryAll);

            // Mudar a máteria de número para o nome dela
            proffys.map((proffy) => {
                proffy.subject = getSubject(proffy.subject);
            });

            return res.render("study.html", { proffys, subjects, filters, weekdays });
        } catch (err) {
            console.log(err);
        }

        //return res.render("study.html", { filters, subjects, weekdays });
    }
    // Converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time);
    let = timeQuery = ``;

    if (!!filters.time) {
        timeQuery = `
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        `
    }
    
    // Caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database;
        const proffys = await db.all(queryFilters(filters));

        // Mudar a máteria de número para o nome dela
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        });

        return res.render("study.html", { proffys, subjects, filters, weekdays });
    } catch (err) {
        console.log(err);
    }
}

function pageSuccessProffy(req, res) {
    return res.render("success-proffy.html");
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays });
}

async function saveClasses(req, res) {
    const createProffy = require("./database/createProffy");
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    });

    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classScheduleValues });

        let queryString = "?subject=" + req.body.subject;
        queryString += "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0];

        return res.redirect("/success-proffy" + queryString);
    } catch (err) {
        console.log(err);
    }
}

// Exportar as funções das rotas das páginas
module.exports = {
    pageLanding,
    pageStudy,
    pageSuccessProffy,
    pageGiveClasses,
    saveClasses,
}