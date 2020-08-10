// Array de nomes das matérias
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

// Array de nomes dos dias das semanas
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
// Pegar nome da máteria
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber-1;
    return subjects[arrayPosition];
}

// Converter horas para minutos
function convertHoursToMinutes(time) {
  const [ hour, minutes ] = time.split(":");
  return Number((hour * 60) + minutes);
}

// Exportar os dados e a função de pegar o nome da matéria
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}