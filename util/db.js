const sqlite3 = require('sqlite3').verbose();
const config = require('./config.json');
const db = new sqlite3.Database(config.dbFile);

//check if the program's been run before
function init()  {
  db.get("SELECT * FROM userpref", function(err, row) {
    if (err) initDatabase();
  });
}


// if the program hasn't been run, we need to initialise the datbase!
function initDatabase() {
  db.serialize(function() {
    db.run("CREATE TABLE userpref");
    //insert some stuff here
  });
}
