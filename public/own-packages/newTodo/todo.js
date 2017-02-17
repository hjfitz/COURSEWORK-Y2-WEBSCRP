const wrapper = document.getElementById('todo-wrapper')
const editArea = document.getElementById('edit-area')
const mainArea = document.getElementById('todo-area')
const addArea = document.getElementById('add-area')

function getTodos () {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.webscrp.dev:8000/todos', true);
  xhr.onload = function () {
    let todos = JSON.parse(xhr.responseText);
    putTodosInPage(todos);
  }
  xhr.send();
}

function putTodosInPage (todos) {
  mainArea.innerHTML = '';
  let todoList = document.createElement('ul');
  todoList.classList = 'collapsible';
  todoList.dataset.collapsible = 'accordion';
  todos.forEach( (todo) => {
    let todoContainer = document.createElement('li');
    let titleContainer = document.createElement('div');
    let descContainer = document.createElement('div');

    titleContainer.classList = 'collapsible-header';
    descContainer.classList = 'collapsible-body';

    titleContainer.textContent = todo.title;
    descContainer.textContent = todo.desc;

    todoContainer.appendChild(titleContainer);
    todoContainer.appendChild(descContainer);
    todoList.appendChild(todoContainer);
  });
  mainArea.appendChild(todoList);
}


getTodos();
