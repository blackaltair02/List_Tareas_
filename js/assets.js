document.addEventListener('DOMContentLoaded', () => {
    renderTasks(); // Llamar a renderTasks para mostrar las tareas guardadas
});

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
    };

    const tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasksToStorage(tasks);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const tasks = getTasksFromStorage();
    taskList.innerHTML = '';

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    if (pendingTasks.length > 0) {
        const pendingHeader = document.createElement('h3');
        pendingHeader.textContent = 'Tareas Pendientes';
        taskList.appendChild(pendingHeader);

        pendingTasks.forEach((task, index) => {
            createTaskElement(task, tasks.indexOf(task), tasks);
        });
    }

    if (completedTasks.length > 0) {
        const completedHeader = document.createElement('h3');
        completedHeader.textContent = 'Tareas Completadas';
        taskList.appendChild(completedHeader);

        completedTasks.forEach((task, index) => {
            createTaskElement(task, tasks.indexOf(task), tasks, true);
        });
    }
}

function createTaskElement(task, index, tasks, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (isCompleted) {
        li.classList.add('completed');
    }

    li.addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasksToStorage(tasks);
        renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasksToStorage(tasks);
        renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
