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

addButton.addEventListener('click', parseTodoForm);
editButton.addEventListener('click', () => { parseTodoForm(PUTTodo) } );

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
  var i = 0;
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

    optContainer.classList = "dropdown-content options-dropdown";
    optContainer.id = "todo" + i;
    optContainer.dataset.todo = JSON.stringify(todo);


    triggerButton.setAttribute('data-activates', optContainer.id);
    triggerButton.classList = "options-button dropdown-button";
    triggerButton.textContent = "⋮";
    triggerButton.href = '#';

    editA.textContent = "Edit";
    editA.addEventListener('click', editTodo);

    delA.textContent = "Delete";

    editBtn.appendChild(editA);
    delBtn.appendChild(delA);

    optContainer.appendChild(editBtn);
    optContainer.appendChild(delBtn);

    titleContainer.classList = 'collapsible-header';
    descContainer.classList = 'collapsible-body';

    titleContainer.textContent = todo.title;
    descText.textContent = todo.desc;

    descText.classList = "todo-desc";

    descText.appendChild(triggerButton);

    descContainer.appendChild(descText);

    todoContainer.appendChild(titleContainer);
    todoContainer.appendChild(descContainer);
    todoList.appendChild(optContainer);
    todoList.appendChild(todoContainer);
    i++;
  });
  mainArea.appendChild(todoList);
}

function parseTodoForm(restFunc) {
  let erroneousForms = [];
  forms.forEach((form) => {
    if (form.value.length === 0) {
      erroneousForms.push(form);
      form.classList = "materialize-textarea validate invalid";
    } else {
      form.classList = "materialize-textarea validate valid";
    }
  });
  if (erroneousForms.length === 0) {
    let newTodo = { "rowid": rowID,
                    "title": titleBox.value,
                    "desc": descBox.value };
    restFunc(newTodo);
  }
}

function POSTTodo() {
  let title = titleBox.value;
  let desc = descBox.value;
  //TOOD
  // $.post()
}

function PUTTodo(todo) {
  $.ajax({
    type:"PUT",
    url: "http://api.webscrp.dev:8000/todos/" + todo.rowid,
    data: todo,
    success: function(data) {
      if (data.code === 200) {
        getTodos();
        $('.collapsible').collapsible();
      }
    }
  });
}

function editTodo(event) {
    editButton.classList = "waves-effect waves-light btn";
    //there *needs* to be a more elegant way of fixing this
    let todoInfo = JSON.parse(event.target.parentElement.parentElement.dataset.todo);
    //put the information in the page
    rowID = todoInfo.rowid;
    titleBox.value = todoInfo.title;
    descBox.textContent = todoInfo.desc;
    console.log(todoInfo);
}



getTodos();
$('.collapsible').collapsible();
