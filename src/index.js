import './style.css';

const todoListArray = [{
  description: 'SetUp webpack',
  completed: true,
  index: 1,
},
{
  description: 'Code to sections into the app',
  completed: false,
  index: 5,
},
{
  description: 'Take a walk for 45mins',
  completed: true,
  index: 4,
},
{
  description: 'Learn two subtopics each day after classes hours',
  completed: true,
  index: 3,
},
{
  description: 'Read 5 pages of personal development everyday',
  completed: false,
  index: 2,
},
];

todoListArray.sort((a, b) => a.index - b.index);
// console.log(todoListArray);

const todoFormEl = document.querySelector('.todo__form');
todoListArray.forEach((each) => {
  todoFormEl.innerHTML += `
  <div class="todo__form__list">
    <input class="todo__item" type="checkbox">
    <label for="input1" class="todo__label">${each.description}</label>
    <i class="fa-solid fa-ellipsis"></i>
  </div><hr>
  `;
});
