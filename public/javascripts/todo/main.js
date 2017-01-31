const btnHideUnhide = document.getElementById("todo-form-show");
const hiddenTodoForm = document.getElementById("todo-add-form");
const btnAddTodo = document.getElementById("todo-add-button");
const todoTitleForm = document.getElementById("todo-title");
const todoDescForm = document.getElementById("todo-desc");
const forms = [todoTitleForm, todoDescForm];

btnHideUnhide.addEventListener("click", () => hideElem(hiddenTodoForm));

btnAddTodo.addEventListener("click", parseTodoForm);

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
  let dbInput =
    {
      "title": forms[0].value,
      "desc":  forms[1].value
    };

  const url = "http://api.webscrp.dev:8000/add/todo"; //TODO
  $.post(url, dbInput, (data) => console.log(data) );
  // let xhr = new XMLHttpRequest();
  // xhr.open('POST', url, true);
  // xhr.onload = function() {
  //   console.log(JSON.parse(xhr.responseText));
  // }
  // xhr.send();
}
