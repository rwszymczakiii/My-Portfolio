// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    //  remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // create text node and append to the li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class to a 
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-trash"></i>';
        // append the link to the li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class to a 
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-trash"></i>';
    // append the link to the li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    // CLear input 
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
    // taskList.innerHTML ='';

    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from LS
    clearTasksFromLocalStorage();
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}