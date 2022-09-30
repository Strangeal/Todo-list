// import { endsWith } from 'lodash';
import './style.css';

let todos = JSON.parse(localStorage.getItem('localStore')) || [];
function DisplayTodos() {
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
    const inputEl = content.querySelector('input');
    input.addEventListener('change', (e) => {
      todo.completed = e.target.checked;
      localStorage.setItem('localStore', JSON.stringify(todos));

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

window.addEventListener('load', () => {
  const todos = JSON.parse(localStorage.getItem('localStore')) || [];
  const newTodoForm = document.querySelector('#new-todo-form');

  newTodoForm.addEventListener('submit', (e) => {
    // e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      completed: false,
    };

    todos.push(todo);
    localStorage.setItem('localStore', JSON.stringify(todos));

    // Reset the form
    e.target.reset();
    DisplayTodos();
  });

  DisplayTodos();
});