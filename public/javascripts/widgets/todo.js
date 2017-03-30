const todoContainer = document.getElementById('todo-content')
const todoAPI = '/api/todos'

function getTodos(callback) {
  Util.getJSON(todoAPI, data => {
    callback(data)
  })
}

function putTodosInCard(todos) {
  const ul = document.createElement('ul')
  ul.classList = 'collection'
  ul.id = "todo-list"
  const list = document.getElementById('todo-list')
  if (list !== null) {
    list.parentElement.removeChild(list)
  }
  for (const todo of todos) {
    const li = document.createElement('li')
    li.classList = 'collection-item not-dark'
    li.textContent = todo.title
    ul.appendChild(li)
  }
  todoContainer.appendChild(ul)
}

getTodos(putTodosInCard)
