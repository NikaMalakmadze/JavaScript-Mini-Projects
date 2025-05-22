'use strict';

// helper/utility variables

const chars =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// find and get needed elements

// task related staff
const tasksList = document.querySelector('#task-list');
const noTasks = document.querySelector('#no-tasks');

const taskStats = document.querySelector('#task-stats');

// form and inputs
const form = document.querySelector('#form');
const inputText = document.querySelector('#task-input');
const inputDueDate = document.querySelector('#due-date');

const addTaskBtn = document.querySelector('#add-task-btn');

// theme button
const themeBtn = document.querySelector('#theme-toggle');

// filter buttons
const filterSection = document.querySelector('.filters');
const filterBtns = document.querySelectorAll('.filter');

// app variables and event listeners

let idHash = JSON.parse(localStorage.getItem('idHash')) ?? []; // keep id of every task in hash

let tasks = []; // keep all task objects in a list

let completedCount = JSON.parse(localStorage.getItem('compledetCount')) ?? 0; // variable to track amount of completed tasks

let theme;
if (localStorage.getItem('theme') === 'true') {
  document.querySelector('body').classList.add('dark');
  themeBtn.innerHTML = '🌞';
  theme = true;
} else {
  theme = false;
}

// get tasks from local storage if they are saved in local storage and render them

let filter = localStorage.getItem('filter') ?? 'all';

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => renderTask(task));
}

let editingTask = false; // needed for form to decide whenever it has to add new task or change exsisting one

renderNoTasks();
activeFilterBtn();

tasksList.innerHTML = '';
filterTasks(filter);

form.addEventListener('submit', addTask);

filterSection.addEventListener('click', filterTasks);

themeBtn.addEventListener('click', toggleTheme);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', completedTask);

tasksList.addEventListener('click', editTask);

function addTask(event) {
  if (editingTask) return; // dont add new task if user is editing task

  // cancel page reloading on form submit
  event.preventDefault();

  // get task text
  const taskText = inputText.value;

  // get task due date and convert it to more comfortable format
  const dueDate = new Date(inputDueDate.value);

  // generate unique id
  let taskId = generateId();
  while (taskId in idHash) taskId = generateId();

  idHash.push(taskId); // save it in hash

  // create task object
  const taskItem = {
    id: taskId,
    text: taskText,
    dueDate: dueDate,
    done: false,
  };

  tasks.push(taskItem); // save task object in list

  renderTask(taskItem);

  renderNoTasks();

  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.title !== 'Delete') {
    return;
  }

  // get task id
  const taskElement = event.target.closest('.task-item');
  const taskId = taskElement.dataset.id;

  // get index of task id and task object itself from id hash and tasks list
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  const idIndex = idHash.findIndex(id => id === taskId);

  // if user deletes completed task, update completed task counter
  if (tasks[taskIndex].done) {
    completedCount -= 1;
  }

  // remove task id and task object from app variables
  idHash.splice(idIndex, 1);
  tasks.splice(taskIndex, 1);

  taskElement.remove(); // remove task from page

  taskStats.innerHTML = `Completed: ${completedCount} / ${tasks.length}`; // display stats on page

  renderNoTasks();

  saveToLocalStorage();
}

function completedTask(event) {
  if (event.target.dataset.checkbox !== '') {
    return;
  }

  // get task id
  const taskElement = event.target.closest('.task-item');
  const taskId = taskElement.dataset.id;

  // find task index in tasks list and change task object's done property
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks[taskIndex].done = !tasks[taskIndex].done;

  // get task's dueDate and pick css class depended on time difference between dueDate and today
  const taskDueDateValue = new Date(tasks[taskIndex].dueDate);
  const taskDueDateCssClass = dueDateClass(taskDueDateValue);

  // find and get needed elements
  const taskText = taskElement.querySelector('.task-text');
  const taskDueDate = taskElement.querySelector('.task-date');

  // change css classes of dueDate element
  if (!taskDueDate.classList.contains('done')) {
    taskDueDate.classList = 'task-date';
    taskDueDate.classList.add('done');

    completedCount += 1; // update completed tasks counter
  } else {
    taskDueDate.classList.remove('done');
    taskDueDate.classList.add(taskDueDateCssClass);

    completedCount -= 1; // update completed tasks counter
  }

  taskText.classList.toggle('completed');

  taskStats.innerHTML = `Completed: ${completedCount} / ${tasks.length}`; // display stats on page

  saveToLocalStorage();
}

function editTask(event) {
  if (event.target.title !== 'Edit') {
    return;
  }

  editingTask = true; // turn on editing mode

  // get task id
  const taskElement = event.target.closest('.task-item');
  const taskId = taskElement.dataset.id;

  // find task object in tasks list by its id
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  const taskObj = tasks[taskIndex];

  // display task text on input element
  inputText.value = taskObj.text;

  let dueDate = taskObj.dueDate; // get dueDate
  // convert dueDate to string if it's Date type
  if (typeof dueDate !== 'string') {
    dueDate = taskObj.dueDate.toISOString();
  }

  // set date input value to the task's dueDate
  inputDueDate.value = dueDate.split('T')[0];

  addTaskBtn.innerHTML = '✏️';

  // when user clicks on sumbit button
  addTaskBtn.addEventListener('click', function () {
    // update object's text and dueDate
    taskObj.text = inputText.value;
    taskObj.dueDate = new Date(inputDueDate.value);

    saveToLocalStorage();

    // reload page and remove click event listener
    location.reload();
    addTaskBtn.removeEventListener('click');
  });
}

function renderNoTasks() {
  // hide No-Tasks card if there is at least one task in tasks list
  if (tasksList.children.length >= 1) {
    noTasks.classList.add('hidden');
  } else {
    noTasks.classList.remove('hidden'); // show it if no tasks
  }
}

function renderTask(task) {
  // get task's dueDate
  const dueDate = new Date(task.dueDate);

  // split date into individual pieces
  const dueDateMonth = months[dueDate.getMonth()];
  const dueDateDay = dueDate.getDate();
  const dueDateYear = dueDate.getFullYear();

  // pick css styles depened on task's done property
  const taskDoneCssClass = task.done ? 'task-text completed' : 'task-text';
  const dueDateCssClass = task.done ? 'done' : dueDateClass(dueDate);

  // create task layout
  const taskLayout = `
          <li class="task-item" data-id="${task.id}">
          <div class="task-left">
            <input type="checkbox" class="task-check" data-checkbox />
            <span class="${taskDoneCssClass}">${task.text}</span>
          </div>
          <div class="task-right">
            <span class="task-date ${dueDateCssClass}">Due: ${dueDateMonth} ${dueDateDay} ${dueDateYear}</span>
            <div class="task-actions">
              <button class="edit-btn" title="Edit">✏️</button>
              <button class="delete-btn" title="Delete">🗑️</button>
            </div>
          </div>
        </li>
  `;

  // add individual task at the bottom of task list
  tasksList.insertAdjacentHTML('beforeend', taskLayout);

  // find and get task's checkbox input
  const taskElement = document.querySelector(
    `.task-item[data-id="${task.id}"]`
  );
  const taskElementCheckbox = taskElement.querySelector('.task-check');

  taskElementCheckbox.checked = task.done; // set checkbox's state depended on task's done property

  taskStats.innerHTML = `Completed: ${completedCount} / ${tasks.length}`; // display stats on page

  saveToLocalStorage();
}

function generateId() {
  // simple function that generates and returns id(10 char string with letters and numbers)
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function dueDateClass(dueDate) {
  // function that will pick css class for dueDate element depended on time diff between dueDate and today

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // calc time difference and convert it to days
  const timeDiff = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

  // pick and return css class
  if (timeDiff <= 0) {
    return 'urgent'; // past due
  } else if (timeDiff <= 2) {
    return 'warning'; // within 2 days
  } else {
    return 'neutral'; // later
  }
}

function saveToLocalStorage() {
  // save app variables in local storage
  localStorage.setItem('filter', filter);
  localStorage.setItem('theme', JSON.stringify(theme));
  localStorage.setItem('idHash', JSON.stringify(idHash));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('compledetCount', JSON.stringify(completedCount));
}

function toggleTheme() {
  if (themeBtn.innerHTML === '🌞') {
    themeBtn.innerHTML = '🌙';
  } else {
    themeBtn.innerHTML = '🌞';
  }

  document.querySelector('body').classList.toggle('dark');

  theme = !theme;
  saveToLocalStorage();
}

function activeFilterBtn() {
  const filterBtn = document.querySelector(`button[data-filter="${filter}"`);
  filterBtn.classList.add('active');

  filterBtns.forEach(filterBtn =>
    filterBtn.addEventListener('click', function () {
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });

      filterBtn.classList.add('active');

      tasksList.innerHTML = '';

      filter = filterBtn.dataset.filter;

      filterTasks(filter);
      renderNoTasks();
      saveToLocalStorage();
    })
  );
}

function filterTasks(currentFilter) {
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.done;
    if (currentFilter === 'completed') return task.done;
    if (currentFilter === 'all') return true; // "all"
  });

  filteredTasks.forEach(filteredTask => renderTask(filteredTask));
}
