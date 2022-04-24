'use strict';

// let dataBase = [
//   { task: 'Estudar JS', status: '' },
//   { task: 'Estudar HTML', status: 'checked' },
//   { task: 'Estudar CSS', status: '' },
// ];

const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setDatabase = (dataBase) =>
  localStorage.setItem('todoList', JSON.stringify(dataBase));

const createItem = (task, status = '', index) => {
  const item = document.createElement('label');
  item.classList.add('todo_item');
  item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <div>${task}</div>
    <input type="button" value="X" data-index=${index}>
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
  const dataBase = getDatabase();
  dataBase.forEach((item, index) => createItem(item.task, item.status, index));
};

const addItem = (event) => {
  const keyPressed = event.key;
  const text = event.target.value;
  if (keyPressed === 'Enter') {
    const dataBase = getDatabase();
    dataBase.push({ task: text, status: '' });
    setDatabase(dataBase);
    updateScreen();
    event.target.value = '';
  }
};

const removeItem = (index) => {
  const dataBase = getDatabase();
  dataBase.splice(index, 1);
  setDatabase(dataBase);
  updateScreen();
};

const updateItem = (index) => {
  const dataBase = getDatabase();
  dataBase[index].status = dataBase[index].status === '' ? 'checked' : '';
  setDatabase(dataBase);
  updateScreen();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === 'button') {
    const index = element.dataset.index;
    removeItem(index);
  } else if (element.type === 'checkbox') {
    const index = element.dataset.index;
    updateItem(index);
  }
};

document.querySelector('#newItem').addEventListener('keypress', addItem);
document.querySelector('#todoList').addEventListener('click', clickItem);

updateScreen();
