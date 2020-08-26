const queryTotalRegister = 
`
    SELECT count(*) FROM proffys; 
`

// Pesquisa no banco de dados todos proffys
const queryAll =
`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
    )
`
// Pesquisa no banco de dados só os proffys que se encaixam no filtros
function queryFilters(filters) {
    return(
    `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            ${timeQuery}
        )
        AND classes.subject = "${filters.subject}"
    `
    )
}

module.exports = {
    queryTotalRegister,
    queryAll,
    queryFilters,
}