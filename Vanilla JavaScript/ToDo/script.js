'use strict';

// helper/utility variables

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

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

function addTask(event) {
  // cancel page reloading on form submit
  event.preventDefault();

  // get task text
  const taskText = inputText.value;

  // get task due date and convert it to more comfortable format
  const dueDate = new Date(inputDueDate.value);
  const dueDateMonth = months[dueDate.getMonth()];
  const dueDateDay = dueDate.getDate();
  const dueDateYear = dueDate.getFullYear();

  // create task layout
  const taskLayout = `
          <li class="task-item" data-id="task-id">
          <div class="task-left">
            <input type="checkbox" class="task-check" />
            <span class="task-text">${taskText}</span>
          </div>
          <div class="task-right">
            <span class="task-date warning">Due: ${dueDateMonth} ${dueDateDay} ${dueDateYear}</span>
            <div class="task-actions">
              <button class="edit-btn" title="Edit">✏️</button>
              <button class="delete-btn" title="Delete">🗑️</button>
            </div>
          </div>
        </li>
  `;

  // add individual task at the bottom of task list
  tasksList.insertAdjacentHTML('beforeend', taskLayout);

  taskStats.innerHTML = `Completed: 0 / ${tasksList.children.length}`;

  // hide No-Tasks card if there is at least one task in tasks list
  if (tasksList.children.length >= 1) {
    noTasks.classList.add('hidden');
  }
}

function deleteTask(event) {
  if (event.target.title === 'Delete') {
    const taskItem = event.target.closest('.task-item');
    taskItem.remove();

    taskStats.innerHTML = `Completed: 0 / ${tasksList.children.length}`;
  }
}
