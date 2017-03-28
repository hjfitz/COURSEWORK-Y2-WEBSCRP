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

module.exports = {
  'handleSuccess': handleSuccess,
  'handleError': handleError,
  'checkExistsByRow': checkExistsByRow
}
