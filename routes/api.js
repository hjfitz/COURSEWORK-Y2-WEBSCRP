const express = require('express')
const api = express.Router()
const dbUtil = require('../util/db')
// const sqlite3 = require('sqlite3')
const sqliteDB = dbUtil.db
const config = require('../util/config.json')

/**
 * MAIN API
 * Maybe something to do with documentation in future?
 */
api.get('/', function (req, res, next) {
  res.send('Welcome to APIv1!')
})

/**
 * CONFIGURATION RESPONSES
 * Allows the user to view and change their configuration
 */
api.get('/config', function (req, res, next) {
  res.json(config.client)
})

// change the config
api.put('/config', function (req, res, next) {
  console.log(req.body)
})


/* * * * * * * * * *
 * T O D O  A P I *
 * * * * * * * * * */

// Returns the rows form table 'todos'
api.get('/todos', (req, res, next) => {
  sqliteDB.all('select rowid, * from todo', (err, todos) => {
    if (err) {
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
api.patch('/todos/:id', function (req, res, next) {
  // Get information from the request body
  var title = req.body.title;
  var desc  = req.body.desc;
  var id    = req.params.id;
  // First, check that the title and description aren't null
  if (title.length > 1 && desc.length > 1) {
    //check that the row exists in the database
  } else {
    handleError(res, err, "PATCH on /todos", "You can't leave the title or description blank")
  }
  // Next, we check if the item exists in the database
  console.log('Attempting PATCH on rowid: ' + req.params.id)
  sqliteDB.run('update todo set title =$title, desc= $desc where rowid = $rowid', {
    $title: req.body.title,
    $desc: req.body.desc,
    $rowid: req.params.id
  }, (err) => {
    if (err) {
      handleError(res, err, "PATCH on /todos")
    } else {
      handleSuccess(res, "PATCH on /todos")
    }
  })
})

/*
 * Takes the title and description from the body of the request
 * INSERTS them in to the table
 * TODO Validation
 */
api.post('/todos', function (req, res, next) {
  sqliteDB.run('INSERT INTO todo (title, desc) VALUES ($title, $desc)', {
    $title: req.body.title,
    $desc: req.body.desc
  }, (err) => {
    if (err) {
      handleError(res, err, "POST on /todos")
    } else {
      handleSuccess(res, "POST on /todos")
    }
  })
})

/*
 * Attempt to drop a row, based on the ID
 */
api.delete('/todos/:id', function (req, res, next) {
  sqliteDB.run('DELETE FROM todo WHERE rowid=$rowid', {
    $rowid: req.params.id
  }, (err) => {
    if (err) {
      handleError(res, err, "DELETE on /todo")
    } else {
      handleSuccess(res, "DELETE on /todo")
    }
  })
})

function checkExistsByRow (rowid) {
  sqliteDB.run('SELECT * FROM todo WHERE rowid=$rowid', {
    $rowid: rowid
  }, (err, rows) => {
    if (err) {
      return -1
    } else {
      if (rows.length != 0) {
        return 1
      } else {
        return 0
      }
    }
  })
}

/**
 * given an error, the response callback an additional information
 * send an error to the user
 * @param res the response callback function
 * @param err the error that we catch (log and send it)
 * @param method Possible extra information to output
 **/
function handleError (res, err, method, issue) {
  var msg = '';
  if (method !== null) {
    msg = 'Error with ' + method + ', error: ';
  }
  msg += err
  console.error('\n' + msg + '\n')
  var ret = {
    code: 500,
    errors: err,
    issue: issue
  }
  res.json(ret)
}

/**
 * Given a success message, response callback and any additional information:
 * let the user know that they have been successful with whatever call
 * @param res response callback
 * @param msg message to send/log
 * @param extra any additional information to send
 **/
function handleSuccess (res, msg, extra) {
  console.log('success with ' + msg)
  res.json({
    code:200,
    text: msg,
    additionalInfo: extra
  })
}

module.exports = api
