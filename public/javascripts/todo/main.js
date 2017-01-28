const btnHideUnhide = document.getElementById("todo-form-show");
const hiddenTodoForm = document.getElementById("todo-add-form");
const btnAddTodo = document.getElementById("todo-add-button");
const todoTitleForm = document.getElementById("todo-title");
const todoDescForm = document.getElementById("todo-desc");
const forms = [todoTitleForm, todoDescForm];

btnHideUnhide.addEventListener("click", hideElem(hiddenTodoForm));

btnAddTodo.addEventListener("click", parseTodoForm);

function parseTodoForm() {
  let erroneousForms = [];
  forms.forEach(function(form) {
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

// function parseError(inputForms) {
//   inputForms.forEach( (form) => form.classList. += "invalid");
//   console.log("error innit");
// }

function parseSuccess() {
  let dbInput =
  { "title": forms[0].value,
    "desc": forms[1].value };


  console.log(dbInput);
}
