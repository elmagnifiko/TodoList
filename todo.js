
const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let addButton = document.getElementById('Ajouter');
let addButton2 = document.querySelector('.button2');
let categorySelect = document.getElementById('inputGroupSelect01');
let titleInput = document.getElementById('inputGroupSelect02');
let dateInput = document.getElementById('inputGroupSelect03');
let descriptionInput = document.getElementById('inputGroupSelect04');
let statusSelect = document.getElementById('inputGroupSelect05');
let enregistrement = document.querySelector('.enregistrement');
let element = document.querySelector('.element');
let information = document.querySelector('.card-body');
const details = document.querySelector('.affiche');
let tboby = document.getElementById('tboby');
let t = 1;
let myChart;
addButton2.style.display = 'none';
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}


const order = (tableau) => {
    tableau.forEach((element, index) => {
        element.id = index + 1
    })
    return tableau
}

function updateChart() {
    const completedTasks = taskList.filter(task => task.status === 'Terminé').length;
    const enCourTasks = taskList.filter(task => task.status === 'En cours').length;
    const NewTasks = taskList.filter(task => task.status === 'Nouveau').length;

    const ctx = document.getElementById('myChart');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Nouveau', 'En cours', 'Terminé'],
            datasets: [{
                data: [NewTasks, enCourTasks, completedTasks],
                backgroundColor: ['green', 'blue', 'red'],
            }],
        },
        options: {
            circumference: 360,
            rotation: 360,
            cutout: 0,
        },
    });

    myChart.update();
}

addButton.addEventListener('click', function (event) {
    event.preventDefault();

    let categoryValue = categorySelect.value;
    let titleValue = titleInput.value;
    let dateValue = dateInput.value;
    let descriptionValue = descriptionInput.value;
    let statusValue = statusSelect.value;

    if (categoryValue === 'Categorie' || titleValue === '' || dateValue === '' || statusValue === 'statut') {
        setTimeout(function () {
            element.style.display = 'block';
            enregistrement.textContent = "Veuillez remplir tous les champs obligatoirement";
        }, 1000);
        setTimeout(function () {
            element.style.display = 'none';
        }, 5000);
    } else {




        const task = {
            category: categoryValue,
            title: titleValue,
            id: t++,
            date: dateValue,
            description: descriptionValue,
            status: statusValue,
        };

        taskList.push(task);
        order(taskList)

        categorySelect.value = 'Categorie';
        titleInput.value = '';
        dateInput.value = '';
        descriptionInput.value = '';
        statusSelect.value = 'statut';
        Ajouter()
        setTimeout(function () {
            element.style.display = 'block';
            enregistrement.textContent = "L'enregistrement s'est effectué avec succès.";
        }, 1000);
        setTimeout(function () {
            element.style.display = 'none';
        }, 5000);

        updateLocalStorage();
        updateChart();
    }
});

function showDetails(index) {
    if (index >= 0 && index < taskList.length) {

        details.style.display = 'block';
        details.innerHTML = `<h1 class="bg-success text-center">Information</h1>
    <p>Date: <strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${taskList[index].date}</strong></p>
    <p>Titre: <strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${taskList[index].title}</strong></p>
    <p>Categorie: <strong>&nbsp&nbsp&nbsp${taskList[index].category}</strong></p>
    <p>Description: <strong>${taskList[index].description}</strong></p>
    <p>Statut: <strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${taskList[index].status}</strong></p>`;
        details.addEventListener('click', function () { details.style.display = 'none'; })
    }
}

function editTask(index) {
    addButton.style.display = 'none';
    addButton2.style.display = 'block';

    categorySelect.value = taskList[index].category;
    titleInput.value = taskList[index].title;
    dateInput.value = taskList[index].date;
    descriptionInput.value = taskList[index].description;
    statusSelect.value = taskList[index].status;

    // taskList.splice(index, 1);
    updateLocalStorage();
    // tboby.deleteRow(index);
    details.style.display = 'none';

    addButton2.addEventListener('click', function (event) {
        event.preventDefault();

        taskList[index].category = categorySelect.value
        taskList[index].title = titleInput.value
        taskList[index].date = dateInput.value
        taskList[index].description = descriptionInput.value
        taskList[index].status = statusSelect.value
        addButton.style.display = 'block';
        addButton2.style.display = 'none';
        updateLocalStorage();
        console.log(titleInput.value + "csdfs")
        Ajouter()
        categorySelect.value = 'Categorie';
        titleInput.value = '';
        dateInput.value = '';
        descriptionInput.value = '';
        statusSelect.value = 'statut';
        updateChart();
        setTimeout(function () {
            element.style.display = 'block';
            enregistrement.textContent = "La mise à jour s'est effectué avec succès.";
        }, 1000);
        setTimeout(function () {
            element.style.display = 'none';
        }, 5000);

    })

}


function deleteTask(index) {
    taskList.splice(index, 1);
    order(taskList)
    updateLocalStorage();
    details.style.display = 'none';
    Ajouter()
    updateChart()
    information.innerHTML = '';
    setTimeout(function () {
        element.style.display = 'block';
        enregistrement.textContent = "La tache a été supprimé avec succès.";
    }, 1000);
    setTimeout(function () {
        element.style.display = 'none';
    }, 5000);
}


function showDescription(index) {

    information.textContent = taskList[index].description;
}
updateChart();






document.addEventListener('DOMContentLoaded', function () {
    updateLocalStorage()
    Ajouter();
})

function Ajouter() {
    tboby.innerHTML = '';
    taskList.forEach((element, index) => {

        tboby.innerHTML +=
            `
     <tr  onclick ="showDescription(${index})">
        <th scope="row">${element.id}</th>
        <td>${element.date}</td>
        <td>${element.title}</td>
        <td>${element.category}</td>
        <td>
            <i class="fa-solid fa-eye bg-primary p-2" onclick ="showDetails(${index})"></i>
            <i class="fa-solid fa-pen bg-success p-2" onclick ="editTask(${index})"></i>
            <i class="fa-solid fa-trash bg-danger p-2" onclick ="deleteTask(${index})"></i>
        </td>
    </tr>
    `;
    });
}

// document.onload =
