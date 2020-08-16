const btnAddField = document.querySelector("#add-time");
const scheduleItems = document.querySelector("#schedule-items");

btnAddField.addEventListener("click", () => { 
    checkLastField();
});  

function checkLastField() {
    // Get last element do schedule items
    const scheduleItemElement = getLastElement();
    const scheduleField = scheduleItemElement.querySelectorAll("select, input");
    const fields = getValueField(scheduleField);

    const hasValuesFields = fields[0] !== "" && fields[1] !== "" && fields[2] !== "";

    if (hasValuesFields) {
        addField();
    }
}

function getLastElement() {
    return scheduleItems.lastElementChild;
}

function getValueField(scheduleField) {
    let fields = [];
    scheduleField.forEach((field) => {
        fields.push(field.value);
    });

    return fields;
}

function clearField(newScheduleItem) {
    const scheduleItem = newScheduleItem.querySelectorAll("input");
    scheduleItem.forEach((field) => {
        field.value = "";
    });
}

function addField() {
    const newScheduleItem = document.querySelector(".schedule-item").cloneNode(true);
    clearField(newScheduleItem);   
    scheduleItems.appendChild(newScheduleItem);
}  