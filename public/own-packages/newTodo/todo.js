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
  todoList.classList = 'collapsible';
  todoList.dataset.collapsible = 'accordion';
  let i = 0;
  todos.forEach( (todo) => {
    //create the main todo elements
    let todoContainer = document.createElement('li');
    let titleContainer = document.createElement('div');
    let descContainer = document.createElement('div');
    let descText = document.createElement('p');
    //create the edit and delete buttons
    let optContainer = document.createElement('ul');
    let editBtn = document.createElement('li');
    let delBtn = document.createElement('li');

    let delA = document.createElement('a');
    let editA = document.createElement('a');

    let triggerButton = document.createElement('a');

    optContainer.classList = 'dropdown-content options-dropdown';
    optContainer.id = 'todo' + i;
    optContainer.dataset.todo = JSON.stringify(todo);


    triggerButton.setAttribute('data-activates', optContainer.id);
    triggerButton.classList = 'options-button dropdown-button';
    triggerButton.textContent = '⋮';
    triggerButton.href = '#';

    editA.textContent = 'Edit';
    editA.addEventListener('click', editTodo);

    delA.textContent = 'Delete';
    delA.addEventListener('click', delTodo);

    editBtn.appendChild(editA);
    delBtn.appendChild(delA);

    optContainer.appendChild(editBtn);
    optContainer.appendChild(delBtn);

    titleContainer.classList = 'collapsible-header';
    descContainer.classList = 'collapsible-body';

    titleContainer.textContent = todo.title;
    descText.textContent = todo.desc;

    descText.classList = 'todo-desc';

    descText.appendChild(triggerButton);

    descContainer.appendChild(descText);

    todoContainer.appendChild(titleContainer);
    todoContainer.appendChild(descContainer);
    todoList.appendChild(optContainer);
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
  console.log('POST invoked');
  // $.post('http://api.webscrp.dev:8000/todos', {
  $.post('/api/todos', {
    'title': todo.title,
    'desc': todo.desc
  });
}

function PATCHTodo(todo) {
  console.log('PATCH invoked');
  $.ajax({
    type:'PATCH',
    // url: 'http://api.webscrp.dev:8000/todos/' + todo.rowid,
    url: '/api/todos' + todo.rowid,
    data: todo
  });
  addButton.classList.toggle('hidden'); //obviously this is a bit hacky and won't work every time (assume oyu press edit on multiple todos)
}

function delTodo(event) {
  let rowid = JSON.parse(event.target.parentElement.parentElement.dataset.todo).rowid;
  console.log(rowID);
  $.ajax({
    type:'DELETE',
    // url: 'http://api.webscrp.dev:8000/todos/' + rowid
    url: '/api/todos' + rowid
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
    let todoInfo = JSON.parse(event.target.parentElement.parentElement.dataset.todo);
    //put the information in the page
    rowID = todoInfo.rowid;
    titleBox.value = todoInfo.title;
    descBox.textContent = todoInfo.desc;
    console.log(todoInfo);
}


getTodos();
  // $('.collapsible').collapsible();
