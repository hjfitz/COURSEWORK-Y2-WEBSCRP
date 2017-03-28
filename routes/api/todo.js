/* * * * * * * * * *
 * T O D O  A P I *
 * * * * * * * * * */
 const express = require('express')
 const todoRoute = express.Router()
 const helpers = require('../../util/express-helpers')
 const dbUtil = require('../../util/db')
 const sqliteDB = dbUtil.db


// Returns the rows form table 'todos'
todoRoute.get('/', (req, res, next) => {
  sqliteDB.all('select rowid, * from todo', (err, todos) => {
    if (err) {
      console.error(err)
      res.send(err) // TODO make a callback function to handle this
    } else {
      res.json(todos)
    }
  })
})

/*
 * changes a todo based on the ID passed.
 * takes information from the body and changes, using a simple update query
 * TODO validation
 */
todoRoute.patch('/:id', (req, res, next) => {
  // Get information from the request body
  var title = req.body.title;
  var desc  = req.body.desc;
  var id    = req.params.id;
  // First, check that the title and description aren't null
  if (title.length > 1 && desc.length > 1) {
    // Next, we check if the item exists in the database
    console.log('Attempting PATCH on rowid: ' + req.params.id)
    sqliteDB.run('update todo set title =$title, desc= $desc where rowid = $rowid', {
      $title: req.body.title,
      $desc: req.body.desc,
      $rowid: req.params.id
    }, (err) => {
      if (err) {
        helpers.handleError(res, err, "PATCH on /todos")
      } else {
        helpers.handleSuccess(res, "PATCH on /todos")
      }
    })
    //check that the row exists in the database
  } else {
    helpers.handleError(res, err, "PATCH on /todos", "You can't leave the title or description blank")
  }
})

/*
 * Takes the title and description from the body of the request
 * INSERTS them in to the table
 * TODO Validation
 */
todoRoute.post('/', (req, res, next) => {
  sqliteDB.run('INSERT INTO todo (title, desc) VALUES ($title, $desc)', {
    $title: req.body.title,
    $desc: req.body.desc
  }, (err) => {
    if (err) {
      helpers.handleError(res, err, "POST on /todos")
    } else {
      helpers.handleSuccess(res, "POST on /todos")
    }
  })
})

/*
 * Attempt to drop a row, based on the ID
 */
todoRoute.delete('/:id', (req, res, next) => {
  sqliteDB.run('DELETE FROM todo WHERE rowid=$rowid', {
    $rowid: req.params.id
  }, (err) => {
    if (err) {
      helpers.handleError(res, err, "DELETE on /todo")
    } else {
      helpers.handleSuccess(res, "DELETE on /todo")
    }
  })
})

module.exports = todoRoute
