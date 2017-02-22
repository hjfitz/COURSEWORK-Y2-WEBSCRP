const wrapper = document.getElementById('todo-wrapper')
const editArea = document.getElementById('edit-area')
const mainArea = document.getElementById('todo-area')
const addArea = document.getElementById('add-area')
const addButton = document.getElementById('todo-add-button')
const titleBox = document.getElementById('todo-title')
const descBoc = document.getElementById('todo-desc')
const forms = [titleBox, descBox];

addButton.addEventListener('click', parseTodoForm);

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

    triggerButton.setAttribute('data-activates', optContainer.id);
    triggerButton.classList = "options-button dropdown-button";
    triggerButton.textContent = "⋮";
    triggerButton.href = '#';

    editA.textContent = "Edit";
    delA.textContent = "Delete";

    editBtn.appendChild(editA);
    delBtn.appendChild(delA);

    optContainer.appendChild(editBtn);
    optContainer.appendChild(delBtn);
    optContainer.dataset.datajson = JSON.stringify(todo);

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

function parseTodoForm() {
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
    POSTTodo()
  }
}

function POSTTodo() {
  let title = titleBox.value;
  let desc = descBox.value;
  //TOOD
  // $.post()
  }

getTodos();
