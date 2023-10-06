
const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let addButton = document.getElementById('Ajouter');
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

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
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
                data: [NewTasks , enCourTasks,completedTasks ],
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

    if (categoryValue === '0' || titleValue === '' || dateValue === '' || statusValue === '0') {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    function getCategoryText(value) {
        switch (value) {
            case '1':
                return 'Académique';
            case '2':
                return 'Extra-academique';
            case '3':
                return 'Distraction';
            default:
                return '';
        }
    }

    function getStatusText(value) {
        switch (value) {
            case '1':
                return 'Nouveau';
            case '2':
                return 'En cours';
            case '3':
                return 'Terminé';
            default:
                return '';
        }
    }

    let category = getCategoryText(categoryValue);
    let status = getStatusText(statusValue);

    const task = {
        category,
        title: titleValue,
        id: t++,
        date: dateValue,
        description: descriptionValue,
        status,
    };

    taskList.push(task);

    Ajouter ()
    categorySelect.value = '0';
    titleInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';
    statusSelect.value = '0';
    setTimeout(function () {
        element.style.display = 'block';
        enregistrement.textContent = "L'enregistrement s'est effectué avec succès.";
    }, 1000);
    setTimeout(function () {
        element.style.display = 'none';
    }, 5000);

    updateLocalStorage();
    updateChart();
});

function showDetails(index) {
    if (index == 1) {
        index++;
    }
    details.style.display = 'block';
    details.innerHTML = `<h1 class="bg-success text-center">Information</h1>
    <p>Date: <strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${taskList[index].date}</strong></p>
    <p>Titre: <strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${taskList[index].title}</strong></p>
    <p>Categorie: <strong>&nbsp&nbsp&nbsp${taskList[index].category}</strong></p>
    <p>Description: <strong>${taskList[index].description}</strong></p>
    <p>Statut: <strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${taskList[index].status}</strong></p>`;
    details.addEventListener('click' , function(){details.style.display = 'none';})
}

function editTask(index) {
    categorySelect.value = taskList[index].category;
    titleInput.value = taskList[index].title;
    dateInput.value = taskList[index].date;
    descriptionInput.value = taskList[index].description;
    statusSelect.value = taskList[index].status;

    taskList.splice(index, 1);
    updateLocalStorage();
    tboby.deleteRow(index);
    details.style.display = 'none';
    updateChart()
}

function deleteTask(index) {
    taskList.splice(index, 1);
    updateLocalStorage();
    details.style.display = 'none';
    Ajouter ()
    updateChart()
}


function showDescription(index) {
   
    information.textContent = taskList[index].description;
}
updateChart();


document.addEventListener('DOMContentLoaded', function () {
    updateLocalStorage()
    Ajouter ();
})

function Ajouter () {
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
