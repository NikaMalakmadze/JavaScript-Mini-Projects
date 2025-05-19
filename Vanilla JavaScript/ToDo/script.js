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
const tasksList = document.querySelector('#task-list');
const noTasks = document.querySelector('#no-tasks');

const form = document.querySelector('#form');
const inputText = document.querySelector('#task-input');
const inputDueDate = document.querySelector('#due-date');

form.addEventListener('submit', function (event) {
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

  if (tasksList.children.length > 1) {
    noTasks.classList.add('hidden');
  }
});
