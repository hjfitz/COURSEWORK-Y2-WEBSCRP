const todoContainer = document.getElementById('todo-content')
const todoAPI = '/api/todos'


function getTodos(callback) {
  Util.getJSON(todoAPI, data => {
    callback(data)
  })
}

function putTodosInCard(todos) {
  //create an unordered list and stick it on the page.
  const ul = document.createElement('ul')
  ul.classList = 'collection'
  ul.id = "todo-list"
  //if we've created a todo list before, remove it
  const list = document.getElementById('todo-list')
  if (list !== null) {
    list.parentElement.removeChild(list)
  }
  //loop through the todos, create list items and add them to the ul
  for (const todo of todos) {
    const li = document.createElement('li')
    li.classList = 'collection-item not-dark'
    li.textContent = todo.title
    ul.appendChild(li)
  }
  todoContainer.appendChild(ul)
}

//get the todos from the server and put them in the card
getTodos(putTodosInCard)
