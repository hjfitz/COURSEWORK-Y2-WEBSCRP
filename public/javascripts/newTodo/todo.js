const wrapper = document.getElementById('todo-wrapper')
const editArea = document.getElementById('edit-area')
const mainArea = document.getElementById('todo-area')
const addArea = document.getElementById('add-area')

console.log("todos loaded");

function getTodos () {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.webscrp.dev:8000/todos', true);
  xhr.onload = function () {
    console.log(JSON.parse(xhr.responseText));
  }
  xhr.send();
}


getTodos();
