// import { endsWith } from 'lodash';
import * as window from './modules/save_localStoreage.js'; // eslint-disable-line
import './style.css';

let todos = JSON.parse(localStorage.getItem('localStore')) || [];
export default function DisplayTodos() {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-regular');
    trashIcon.classList.add('fa-trash-can');

    input.type = 'checkbox';
    input.checked = todo.completed;

    content.classList.add('todo-content');
    actions.classList.add('actions');

    content.innerHTML = `<input class="edit" type="text" value="${todo.content}" readonly>`;

    label.appendChild(input);
    actions.appendChild(trashIcon);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    if (todo.completed) {
      todoItem.classList.add('done');
    }
    // Update user input on change
    const inputEl = content.querySelector('input');
    input.addEventListener('change', (e) => {
      todo.completed = e.target.checked;
      localStorage.setItem('localStore', JSON.stringify(todos));

      // Add lineThrough class on box checked
      if (todo.completed) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }
      DisplayTodos();
    });

    // Content edit
    inputEl.addEventListener('click', () => {
      inputEl.removeAttribute('readonly');
      inputEl.focus();
      inputEl.style.background = 'transparent';

      // Save edited content by clicking away
      inputEl.addEventListener('blur', (e) => {
        inputEl.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('localStore', JSON.stringify(todos));
        DisplayTodos();
      });
    });

    // click to delete
    trashIcon.addEventListener('click', () => {
      todos = todos.filter((t) => t !== todo);
      localStorage.setItem('localStore', JSON.stringify(todos));
      DisplayTodos();
    });

    // delete all marked todos
    const allDone = document.querySelector('.todo__clear');
    allDone.addEventListener('click', () => {
      if (todo.completed === true) {
        todos = todos.filter((n) => n !== todo);
        localStorage.setItem('localStore', JSON.stringify(todos));
        DisplayTodos();
      }
    });
  });
}
