// Procurar o botão na DOM
const btnAddField = document.querySelector("#add-time");
// Procurar o fieldset schedule items
const scheduleItems = document.querySelector("#schedule-items");

// Adiciona um evento quando clicar no botão
btnAddField.addEventListener("click", () => { addField(); });  

// Função criar um campo field
function addField() {
    // Copiar o schedule Item
    const newScheduleItem = document.querySelector('.schedule-item').cloneNode(true);
    //Limpar os campos
    const scheduleItem = newScheduleItem.querySelectorAll('input');
    // Percorrer cada campo do schedule item
    scheduleItem.forEach((field) => {
        // Limpa o campo
        field.value = "";
    });
    // Adicionar ao fieldset o elemento clonado
    scheduleItems.appendChild(newScheduleItem);
}  