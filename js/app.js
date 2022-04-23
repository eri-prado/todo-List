'use strict';

let dataBase = [
  { task: 'Estudar JS', status: '' },
  { task: 'Estudar HTML', status: 'checked' },
];

const createItem = (task, status = '') => {
  const item = document.createElement('label');
  item.classList.add('todo_item');
  item.innerHTML = `
    <input type="checkbox" ${status}>
    <div>${task}</div>
    <input type="button" value="X">
  `;
  document.querySelector('#todoList').appendChild(item);
};

const cleanTask = () => {
  const todoList = document.querySelector('#todoList');
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const updateScreen = () => {
  cleanTask();
  dataBase.forEach((item) => createItem(item.task, item.status));
};

const addItem = (event) => {
  const keyPressed = event.key;
  const text = event.target.value;
  if (keyPressed === 'Enter') {
    dataBase.push({ task: text, status: '' });
    updateScreen();
    event.target.value = '';
  }
};

document.querySelector('#newItem').addEventListener('keypress', addItem);

updateScreen();
