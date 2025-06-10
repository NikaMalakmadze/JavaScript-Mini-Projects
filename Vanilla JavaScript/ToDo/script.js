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

const API_URL = 'https://dummyjson.com/quotes/random';

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
const customCategoriesList = document.querySelector('.custom-categories');
const addCategoryModal = document.querySelector('#categoryModal');
const addCategoryForm = document.querySelector('#addCategoryForm');
const categoryInput = document.querySelector('#category-name');
const categoryWarning = document.querySelector('.category-warning');
const colorInput = document.getElementById('category-color');
const colorPreview = document.querySelector('.color-preview');
const customCategories = document.querySelectorAll('.category-chip');
const customSelect = document.getElementById('customSelect');
const selectOptions = document.getElementById('selectOptions');
const selectedOption = document.getElementById('selectedOption');
const selectedCategoryInput = document.getElementById('selectedCategory');
const quoteTextElement = document.querySelector('.quote-text');
const quoteAuthorElement = document.querySelector('.quote-author');
const quoteCard = document.getElementById('quoteCard');
const quoteSkeleton = document.getElementById('quoteSkeleton');
const leftSidebar = document.querySelector('.sidebar__left');
const rightSidebar = document.querySelector('.sidebar__right');
const leftSidebarToggle = document.getElementById('leftSidebarToggle');
const rightSidebarToggle = document.getElementById('rightSidebarToggle');
const quoteIconElement = document.querySelector('#quoteId');

let idHash = JSON.parse(localStorage.getItem('idHash')) ?? []; // keep id of every task in hash
let filter = sessionStorage.getItem('filter') ?? 'all';

let tasks = []; // keep all task objects in a list
let completedCount = 0; // variable to track amount of completed tasks
let editingTask = false; // needed for form to decide whenever it has to add new task or change exsisting one
let theme;

let categories = [];

let currentQuote = null;

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

  if (localStorage.getItem('categories')) {
    categories = JSON.parse(localStorage.getItem('categories'));
    categories.forEach(category => {
      renderCategory(category);
      updateSelectCategory(category);
    });
  }

  if (localStorage.getItem('currentQuote')) {
    currentQuote = JSON.parse(localStorage.getItem('currentQuote'));
    const currentQuoteDate = currentQuote.date;
    const todayDate = new Date().toISOString().split('T')[0];

    currentQuoteDate !== todayDate ? getQuote() : loadCurrentQuote();
  } else {
    getQuote();
  }

  renderNoCategory();

  tasksList.innerHTML = '';
  activeFilterBtn();
  filterTasks(filter);

  ModalControl(addTaskModal);
  ModalControl(addCategoryModal);

  chooseCategory();
}

function addEvenetListeners() {
  form.addEventListener('submit', addTask);

  customCategoriesList.addEventListener('click', handleCategoryClick);

  addCategoryForm.addEventListener('submit', addCategory);

  themeBtn.addEventListener('click', toggleTheme);

  tasksList.addEventListener('click', handleTaskListClick);

  colorInput.addEventListener('input', () => {
    colorPreview.style.backgroundColor = colorInput.value;
  });

  leftSidebarToggle.addEventListener('click', e => {
    e.stopPropagation();
    leftSidebar.classList.toggle('open');
  });

  rightSidebarToggle.addEventListener('click', e => {
    e.stopPropagation();
    rightSidebar.classList.toggle('open');
  });

  document.addEventListener('click', responsiveSidebars);

  quoteIconElement.addEventListener('click', () => {
    quoteTextElement.classList.toggle('hidden');
    quoteAuthorElement.classList.toggle('hidden');
  });
}

function handleTaskListClick(event) {
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

function handleCategoryClick(event) {
  if (event.target.title === 'Delete-Category') {
    deleteCategory(event.target.closest('.category-chip'));
  } else if (event.target.classList.contains('category-chip')) {
    customFilterTasks(event.target.dataset.category);
  }
}

function deleteCategory(categoryElement) {
  const categoryName = categoryElement.dataset.category;
  const categoryIndex = categories.indexOf(
    category => category.name === categoryName
  );
  categories.splice(categoryIndex, 1);

  customCategoriesList.removeChild(categoryElement);
  const selectCategoryElement = customSelect.querySelector(
    `[data-value="${categoryName}"]`
  );
  selectOptions.removeChild(selectCategoryElement);

  if (selectedOption.textContent.toLocaleLowerCase() === categoryName) {
    selectedOption.textContent = 'Choose category';
  }

  const categoryTasks = tasks.filter(task => task.category === categoryName);
  categoryTasks.forEach(task => {
    deleteTask(document.querySelector(`[data-id="${task.id}"]`));
  });

  renderNoCategory();
  saveToLocalStorage();
}

function responsiveSidebars(event) {
  const isLeftOpen = leftSidebar.classList.contains('open');
  const isRightOpen = rightSidebar.classList.contains('open');

  const clickedInsideLeft = leftSidebar.contains(event.target);
  const clickedInsideRight = rightSidebar.contains(event.target);

  // If left sidebar is open and user clicked outside it
  if (isLeftOpen && !clickedInsideLeft) {
    leftSidebar.classList.remove('open');
  }

  // If right sidebar is open and user clicked outside it
  if (isRightOpen && !clickedInsideRight) {
    rightSidebar.classList.remove('open');
  }
}

function ModalControl(modal) {
  const modalId = modal.id;
  const openBtn = document.getElementById(`${modalId}-open`);
  const closeBtn = document.getElementById(`${modalId}-close`);
  const modalContent = document.getElementById(`${modalId}-content`);

  modal.addEventListener('click', () => toggleModal(modalId));
  openBtn.addEventListener('click', () => toggleModal(modalId));
  closeBtn.addEventListener('click', () => toggleModal(modalId));
  modalContent.addEventListener('click', element => element.stopPropagation());

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      toggleModal(modalId);
    }
  });
}

function toggleModal(modalId) {
  document.getElementById(modalId).classList.toggle('active');
}

function chooseCategory() {
  customSelect.addEventListener('click', () => {
    selectOptions.classList.toggle('hidden');
  });

  selectOptions.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      selectedOption.textContent = e.target.textContent;
      selectedCategoryInput.value = e.target.dataset.value;
      selectOptions.classList.add('hidden');
    }
  });

  document.querySelector('#taskModal-content').addEventListener('click', e => {
    if (e.target !== customSelect) {
      selectOptions.classList.add('hidden');
    }
  });

  document
    .querySelector('#taskModal')
    .addEventListener('click', () => selectOptions.classList.add('hidden'));
}

function customFilterTasks(category) {
  tasksList.innerHTML = '';
  const filteredTasksByStatus = tasks.filter(task => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    if (filter === 'all') return true; // "all"
  });
  const filteredByCategory = filteredTasksByStatus.filter(
    task => task.category === category
  );
  renderTasks(filteredByCategory);
}

function addCategory(event) {
  // cancel page reloading on form submit
  event.preventDefault();

  const categoryName = categoryInput.value.trim().toLowerCase();
  if (categories.includes(categoryName)) {
    categoryWarning.textContent = `Category "${categoryName}" already exists.`;
    categoryWarning.classList.remove('hidden');
    return;
  } else {
    categoryWarning.textContent = '';
    categoryWarning.style.display = 'none';
  }

  const categoryColor = colorInput.value;

  toggleModal(addCategoryModal.id);

  const categoryItem = {
    name: categoryName,
    color: categoryColor,
  };

  categories.push(categoryItem);

  updateSelectCategory(categoryItem);
  renderCategory(categoryItem);
  renderNoCategory();

  saveToLocalStorage();
}

function updateSelectCategory(categoryItem) {
  const selectCategoryLayout = `
    <li data-value="${categoryItem.name}">${capitalize(categoryItem.name)}</li>
  `;

  selectOptions.insertAdjacentHTML('beforeend', selectCategoryLayout);
}

function renderCategory(category) {
  const categoryLayout = `
    <div class="category-chip" data-category="${
      category.name
    }" style="background-color: ${category.color}75">
      ${capitalize(category.name)}
      <span class="delete-category" title="Delete-Category">✕</span>
    </div>`;

  customCategoriesList.insertAdjacentHTML('beforeend', categoryLayout);
}

function renderNoCategory() {
  let noCategoryCard = document.querySelector('#no-custom-categories');
  if (!noCategoryCard) {
    noCategoryCard = document.createElement('div');
    noCategoryCard.setAttribute('id', 'no-custom-categories');
    noCategoryCard.classList.add('empty-card');
    noCategoryCard.innerHTML = `
        <div class="empty-illustration">🗂️</div>
        <h2 class="empty-title">No custom categories</h2>
        <p class="empty-text">Create your own to organize tasks the way you want.</p>
        `;
    document
      .querySelector('.sidebar__left')
      .insertBefore(
        noCategoryCard,
        document.querySelector('.custom-categories')
      );
  }

  customCategoriesList.children.length >= 1
    ? noCategoryCard.classList.add('hidden')
    : noCategoryCard.classList.remove('hidden');
}

function capitalize(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

function addTask(event) {
  if (editingTask) return; // dont add new task if user is editing task

  // cancel page reloading on form submit
  event.preventDefault();
  toggleModal(addTaskModal.id);

  // get task text
  const taskText = inputText.value;

  // get task due date and convert it to more comfortable format
  const dueDate = new Date(inputDueDate.value);

  let taskCategory = selectedCategoryInput.value;
  let taskColor;
  if (!taskCategory || taskCategory === 'None') {
    taskCategory = 'default';
  } else {
    const categoryIndex = categories.findIndex(
      category => category.name === taskCategory
    );
    taskColor = categories[categoryIndex].color;
  }

  // generate unique id
  let taskId = generateId();
  while (taskId in idHash) taskId = generateId();

  idHash.push(taskId); // save it in hash

  // create task object
  const taskItem = {
    id: taskId,
    text: taskText,
    category: taskCategory,
    dueDate: dueDate,
    color: taskColor,
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

  toggleModal(addTaskModal.id);

  // when user clicks on sumbit button
  addTaskBtn.addEventListener('click', function () {
    // update object's text and dueDate
    taskObj.text = inputText.value;
    taskObj.dueDate = new Date(inputDueDate.value);
    let taskCategory = selectedCategoryInput.value;
    if (!taskCategory || taskCategory === 'None') {
      taskCategory = 'default';
      taskObj.category = taskCategory;
      delete taskObj.color;
    } else {
      const categoryIndex = categories.findIndex(
        category => category.name === selectedCategoryInput.value
      );
      taskObj.color = categories[categoryIndex].color;
    }

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
          <li class="task-item" data-id="${task.id}" 
          ${task.color ? `style="background-color: ${task.color}75"` : ''}>
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

function renderTasks(filteredTasks) {
  filteredTasks.forEach(filteredTask => renderTask(filteredTask));
  renderNoTasks();
  updateStats();
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
  renderTasks(filteredTasks);
}

function loadCurrentQuote() {
  quoteTextElement.textContent = `"${currentQuote.text}"`;
  quoteAuthorElement.textContent = `– ${currentQuote.author}`;
  quoteSkeleton.style.display = 'none';
  quoteCard.style.display = 'flex';
}

async function getQuote() {
  quoteSkeleton.style.display = 'flex';
  quoteCard.style.display = 'none';

  async function fetchQuote() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }

  let newQuote = await fetchQuote();

  if (currentQuote !== null) {
    while (currentQuote.id === newQuote.id) {
      newQuote = await fetchQuote();
    }
  }

  const { id: quoteId, author: quoteAuthor, quote: quoteText } = newQuote;
  const currentQuoteDate = new Date().toISOString().split('T')[0];

  quoteTextElement.textContent = `"${quoteText}"`;
  quoteAuthorElement.textContent = `– ${quoteAuthor}`;

  currentQuote = {
    id: quoteId,
    author: quoteAuthor,
    text: quoteText,
    date: currentQuoteDate,
  };

  quoteSkeleton.style.display = 'none';
  quoteCard.style.display = 'flex';

  saveToLocalStorage();
}

function saveToLocalStorage() {
  // save app variables in local storage
  localStorage.setItem('theme', JSON.stringify(theme));
  localStorage.setItem('idHash', JSON.stringify(idHash));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('currentQuote', JSON.stringify(currentQuote));
}

function saveToSessionStorage() {
  sessionStorage.setItem('filter', filter);
}
