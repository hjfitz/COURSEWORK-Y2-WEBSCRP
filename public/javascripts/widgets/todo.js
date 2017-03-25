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
  for (const todo of todos) {
    const li = document.createElement('li')
    li.classList = 'collection-item'
    li.textContent = todo.title
    ul.appendChild(li)
  }
  todoContainer.appendChild(ul)
}

getTodos(putTodosInCard)
