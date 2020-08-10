const Database = require('./db'); // Importar o banco de dados
const createProffy = require("./createProffy"); // Importar função de criar Proffy

Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: "Luiz Togni",
        avatar: "https://avatars1.githubusercontent.com/u/68093698?s=460&u=4282eb920a46d7e49ab54429946e1a2838e766a5&v=4",
        whatsapp: "19999100599",
        bio: "O mundo precisa de mais programadores com vontade de programar o impossível!",
    }

    classValue = {
        subject: 1,
        cost: "35",
        // o proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id viŕa pelo banco de dados
        {
            weekday: 3,
            time_from: 720,
            time_to: 1250
        }, 
        {
            weekday: 0,
            time_from: 520,
            time_to: 1250
        }
    ]
    
    // Esperar criar o proffy
    //await createProffy(db, {proffyValue, classValue, classScheduleValues});

    // Consultar os dados inseridos
    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    //console.log(selectedProffys);

    // Consultar as classes de um determinado professor e trazer juntos os dados deles
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `);
    //console.log(selectedClassesAndProffys);

    // Consultar de forma mais específica os proffy de um horário específico
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "720"
        AND class_schedule.time_to > "720";
    `);
    //console.log(selectedClassesSchedules);
});