const wrapper = document.getElementById('todo-wrapper')
const editArea = document.getElementById('edit-area')
const mainArea = document.getElementById('todo-area')
const addArea = document.getElementById('add-area')
const addButton = document.getElementById('todo-add-button')
const titleBox = document.getElementById('todo-title')
const descBox = document.getElementById('todo-desc')
const editButton = document.getElementById('todo-edit-button')
const forms = [titleBox, descBox];
var rowID = -1;

addButton.addEventListener('click', () => { parseTodoForm(POSTTodo) } );
editButton.addEventListener('click', () => { parseTodoForm(PATCHTodo) } );

function getTodos () {
  let xhr = new XMLHttpRequest();
  // xhr.open('GET', 'http://api.webscrp.dev:8000/todos', true);
  xhr.open('GET', '/api/todos', true)
  xhr.onload = function () {
    let todos = JSON.parse(xhr.responseText);
    putTodosInPage(todos);
  }
  xhr.send();
}

function putTodosInPage (todos) {
  mainArea.innerHTML = '';
  let todoList = document.createElement('ul');
  todoList.classList = 'collapsible not-dark';
  todoList.dataset.collapsible = 'accordion';
  let i = 0;
  todos.forEach((todo) => {
    //create the main todo elements
    let todoContainer  = document.createElement('li')
    let titleContainer = document.createElement('div')
    let descContainer  = document.createElement('div')
    let descText       = document.createElement('p')
    //create the edit and delete buttons
    let editButton     = document.createElement('a')
    let delButton      = document.createElement('a')

    editButton.dataset.todo = JSON.stringify(todo);
    delButton.dataset.todo = JSON.stringify(todo);

    editButton.textContent = 'edit' //✎'
    delButton.textContent = 'delete  '//✔'

    editButton.classList = 'right restbutton'
    delButton.classList = 'right restbutton'

    editButton.addEventListener('click', editTodo)
    delButton.addEventListener('click', delTodo)

    titleContainer.classList = 'collapsible-header';
    descContainer.classList = 'collapsible-body';

    titleContainer.textContent = todo.title;
    descText.textContent = todo.desc;

    descText.classList = 'todo-desc';

    descContainer.appendChild(descText);
    descContainer.appendChild(delButton);
    descContainer.appendChild(editButton);

    todoContainer.appendChild(titleContainer);
    todoContainer.appendChild(descContainer);
    todoList.appendChild(todoContainer);
    i++;
  });
  mainArea.appendChild(todoList);
  $('.collapsible').collapsible();
}

function parseTodoForm(restFunc) {
  let erroneousForms = [];
  forms.forEach((form) => {
    if (form.value.length === 0) {
      erroneousForms.push(form);
      form.classList = 'materialize-textarea validate invalid';
    } else {
      form.classList = 'materialize-textarea validate valid';
    }
  });
  if (erroneousForms.length === 0) {
    let newTodo = {
      'rowid': rowID,
      'title': titleBox.value,
      'desc': descBox.value
    };
    restFunc(newTodo);
    getTodos();
    clearForms();
  }
}

function POSTTodo(todo) {
  // $.post('http://api.webscrp.dev:8000/todos', {
  $.post('/api/todos', {
    'title': todo.title,
    'desc': todo.desc
  });
}

function PATCHTodo(todo) {
  $.ajax({
    type:'PATCH',
    // url: 'http://api.webscrp.dev:8000/todos/' + todo.rowid,
    url: '/api/todos/' + todo.rowid,
    data: todo
  });
  addButton.classList.toggle('hidden'); //obviously this is a bit hacky and won't work every time (assume oyu press edit on multiple todos)
}

function delTodo(e) {
  let rowid = JSON.parse(e.target.dataset.todo).rowid;
  $.ajax({
    type:'DELETE',
    // url: 'http://api.webscrp.dev:8000/todos/' + rowid
    url: '/api/todos/' + rowid
  });
  getTodos();
}

function clearForms() {
  forms.forEach( (form) => {
    form.value = '';
  });
}

function editTodo(event) {
    addButton.classList.toggle('hidden');
    editButton.classList = 'waves-effect waves-light btn';
    //there *needs* to be a more elegant way of fixing this
    let todoInfo = JSON.parse(event.target.dataset.todo);
    //put the information in the page
    rowID = todoInfo.rowid;
    titleBox.value = todoInfo.title;
    descBox.value = todoInfo.desc;
}


getTodos();
  // $('.collapsible').collapsible();
