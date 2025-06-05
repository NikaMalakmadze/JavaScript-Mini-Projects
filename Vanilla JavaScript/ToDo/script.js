'use strict';

// helper/utility variables

const CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

const MONTHS = [
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

const tasksList = document.querySelector('#task-list');
const noTasks = document.querySelector('#no-tasks');
const taskStats = document.querySelector('#task-stats');
const form = document.querySelector('#form');
const inputText = document.querySelector('#task-input');
const inputDueDate = document.querySelector('#due-date');
const addTaskBtn = document.querySelector('#add-task-btn');
const themeBtn = document.querySelector('#theme-toggle');
const filterBtns = document.querySelectorAll('.category-btn');
const addTaskModal = document.querySelector('#taskModal');
const addTaskModalContent = document.querySelector('#taskModal-content');
const addTaskModalCloseBtn = document.querySelector('#taskModal-close');
const addTaskModalOpenBtn = document.querySelector('#taskModal-open');

let idHash = JSON.parse(localStorage.getItem('idHash')) ?? []; // keep id of every task in hash
let filter = sessionStorage.getItem('filter') ?? 'all';

let tasks = []; // keep all task objects in a list
let completedCount = 0; // variable to track amount of completed tasks
let editingTask = false; // needed for form to decide whenever it has to add new task or change exsisting one
let theme;

initApp();
addEvenetListeners();

function initApp() {
  if (localStorage.getItem('theme') === 'true') {
    document.querySelector('body').classList.add('dark');
    themeBtn.innerHTML = '🌞';
    theme = true;
  } else {
    theme = false;
  }

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    completedCount = tasks.filter(task => task.done).length;
  }

  tasksList.innerHTML = '';
  activeFilterBtn();
  filterTasks(filter);
}

function addEvenetListeners() {
  form.addEventListener('submit', addTask);

  themeBtn.addEventListener('click', toggleTheme);

  tasksList.addEventListener('click', handleClick);

  addTaskModalOpenBtn.addEventListener('click', addTaskModalControl);
  addTaskModalCloseBtn.addEventListener('click', addTaskModalControl);
  addTaskModal.addEventListener('click', addTaskModalControl);
  addTaskModalContent.addEventListener('click', element =>
    element.stopPropagation()
  );
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && addTaskModal.classList.contains('active')) {
      addTaskModalControl();
    }
  });
}

function handleClick(event) {
  const taskElement = event.target.closest('.task-item');
  if (!taskElement) return;

  if (event.target.title === 'Delete') {
    deleteTask(taskElement);
  } else if (event.target.title === 'Edit') {
    editTask(taskElement);
  } else if (event.target.dataset.checkbox !== undefined) {
    completedTask(taskElement);
  }
}

function addTaskModalControl() {
  addTaskModal.classList.toggle('active');
}

function addTask(event) {
  if (editingTask) return; // dont add new task if user is editing task

  // cancel page reloading on form submit
  event.preventDefault();
  addTaskModalControl();

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

  renderNoTasks();

  tasksList.innerHTML = '';

  filter = 'all';
  activeFilterBtn();
  filterTasks(filter);

  saveToSessionStorage();
  saveToLocalStorage();
}

function deleteTask(taskElement) {
  // get index of task id and task object itself from id hash and tasks list
  const taskIndex = getTaskIndex(taskElement);
  const taskId = taskElement.dataset.id;
  const idIndex = idHash.findIndex(id => id === taskId);

  // if user deletes completed task, update completed task counter
  if (tasks[taskIndex].done) {
    completedCount -= 1;
  }

  // remove task id and task object from app variables
  idHash.splice(idIndex, 1);
  tasks.splice(taskIndex, 1);

  tasksList.removeChild(taskElement);

  updateStats();
  renderNoTasks();

  saveToLocalStorage();
}

function completedTask(taskElement) {
  // find task index in tasks list and change task object's done property
  const taskIndex = getTaskIndex(taskElement);
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

  tasksList.innerHTML = '';
  filterTasks(filter);

  saveToLocalStorage();
}

function editTask(taskElement) {
  editingTask = true; // turn on editing mode

  // find task object in tasks list by its id
  const taskIndex = getTaskIndex(taskElement);
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

  addTaskModalControl();

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
  let noTaskCard = document.querySelector('#no-tasks');
  if (!noTaskCard) {
    noTaskCard = document.createElement('div');
    noTaskCard.setAttribute('id', 'no-tasks');
    noTaskCard.classList.add('empty-card');
    noTaskCard.innerHTML = `
        <div class="empty-illustration">📦</div>
        <h2 class="empty-title">No tasks yet!</h2>
        <p class="empty-text">Add something to organize your day.</p>
        `;
    document
      .querySelector('.container')
      .insertBefore(noTaskCard, document.querySelector('#task-list'));
  }
  let cardEmoji, cardTitle, cardDesc;

  switch (filter) {
    case 'all':
      cardEmoji = '📦';
      cardTitle = 'No Tasks Yet!';
      cardDesc = 'Add something to organize your day.';
      break;
    case 'active':
      cardEmoji = '🧘‍♀️';
      cardTitle = "You're all caught up!";
      cardDesc = 'No active tasks — take a break or add something new.';
      break;
    case 'completed':
      cardEmoji = '💪';
      cardTitle = 'Nothing checked off yet';
      cardDesc = 'Complete a task to see your progress here.';
  }

  noTaskCard.querySelector('.empty-illustration').innerHTML = cardEmoji;
  noTaskCard.querySelector('.empty-title').innerHTML = cardTitle;
  noTaskCard.querySelector('.empty-text').innerHTML = cardDesc;

  tasksList.children.length >= 1
    ? noTaskCard.classList.add('hidden')
    : noTaskCard.classList.remove('hidden');
}

function renderTask(task) {
  // get task's dueDate
  const dueDate = new Date(task.dueDate);
  const formatedDueDate = dueDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
            <span class="task-date ${dueDateCssClass}">Due: ${formatedDueDate}</span>
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

  updateStats();

  saveToLocalStorage();
}

function generateId() {
  // simple function that generates and returns id(10 char string with letters and numbers)
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
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

function updateStats() {
  taskStats.innerHTML = `Completed: ${completedCount} / ${tasks.length}`;
}

function toggleTheme() {
  themeBtn.innerHTML === '🌞'
    ? (themeBtn.innerHTML = '🌙')
    : (themeBtn.innerHTML = '🌞');

  document.querySelector('body').classList.toggle('dark');

  theme = !theme;
  saveToLocalStorage();
}

function getTaskIndex(taskElement) {
  const taskId = taskElement.dataset.id;
  return tasks.findIndex(task => task.id === taskId);
}

function activeFilterBtn() {
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  const filterBtn = document.querySelector(`button[data-filter="${filter}"`);
  filterBtn.classList.add('active');

  filterBtns.forEach(filterBtn =>
    filterBtn.addEventListener('click', function () {
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });

      filterBtn.classList.add('active');
      filter = filterBtn.dataset.filter;

      tasksList.innerHTML = '';

      filterTasks(filter);
      saveToSessionStorage();
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
  renderNoTasks();
  updateStats();
}

function saveToLocalStorage() {
  // save app variables in local storage
  localStorage.setItem('theme', JSON.stringify(theme));
  localStorage.setItem('idHash', JSON.stringify(idHash));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveToSessionStorage() {
  sessionStorage.setItem('filter', filter);
}
