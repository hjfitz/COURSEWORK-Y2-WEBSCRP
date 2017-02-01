const btnHideUnhide = document.getElementById("todo-form-show");
const hiddenTodoForm = document.getElementById("todo-add-form");
const btnAddTodo = document.getElementById("todo-add-button");
const todoTitleForm = document.getElementById("todo-title");
const todoDescForm = document.getElementById("todo-desc");
const forms = [todoTitleForm, todoDescForm];
const optionButtons = document.getElementsByClassName("options-button");
const dropdownMenus = document.getElementsByClassName("dropdown-content");
const editForm = document.getElementById("edit-input");

$(document).ready(function() {
  $(".dropdown-button").dropdown();
  btnHideUnhide.addEventListener("click", () => hideElem(hiddenTodoForm));
  btnAddTodo.addEventListener("click", parseTodoForm);
  for (let i=0;i<optionButtons.length;i++) {
    addDropdown(optionButtons[i], dropdownMenus[i], i);
  }
});

function addDropdown(btn, dropdown, count) {
  let newClass = "button" + count;
  let newID = newClass;
  dropdown.setAttribute('id', newID);
  btn.setAttribute('data-activates', newClass);
  //add delete/edit event listeners to dropdown
  enableDeleteEdit(dropdown);
}

function enableDeleteEdit(dropdown) {
  let dropChildren = dropdown.children;
  let buttons = {
     edit: dropChildren[0],
     delete: dropChildren[1]
  };
  buttons.edit.addEventListener('click', (ev) => changeTodo(ev));
  buttons.delete.addEventListener('click', (ev) => changeTodo(ev));
}

function changeTodo(event) {
  let type = event.target.textContent;
  let rowinfo = JSON.parse(event.currentTarget.parentElement.dataset.rowinfo);
  if (type === "Edit") {
    editForm.classList.toggle("hidden");
  }
}

function parseTodoForm() {
  let erroneousForms = [];
  forms.forEach(function(form) {
    //cleanup required
    //add toggle valid, if invalid, toggle that and valid??
    if (form.value.length === 0) {
      erroneousForms.push(form);
      form.classList = "materialize-textarea validate invalid";
    } else {
      form.classList = "materialize-textarea validate valid";
    }
  });
  if (erroneousForms.length === 0) {
    parseSuccess();
  }
}

function parseSuccess() {
  let dbInput = {
    "title": forms[0].value,
    "desc":  forms[1].value
  };

  const url = "http://api.webscrp.dev:8000/add/todo"; //TODO
  $.post(url, dbInput, function(data) {
    console.log(data);
    location.reload();
  });
  // let xhr = new XMLHttpRequest();
  // xhr.open('POST', url, true);
  // xhr.onload = function() {
  //   console.log(JSON.parse(xhr.responseText));
  // }
  // xhr.send();
}
