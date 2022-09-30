import { DisplayTodos } from '../index.js'; // eslint-disable-line

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

export default window;
