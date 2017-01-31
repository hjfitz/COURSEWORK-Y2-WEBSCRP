const sqlite3 = require('sqlite3').verbose();
const config = require('./config.json');
const db = new sqlite3.Database(config.dbFile);

//check if the program's been run before
function init()  {
  db.all("SELECT * FROM todo", function(err, row) {
    if (err) initDatabase();
  });
}

// if the program hasn't been run, we need to initialise the datbase!
function initDatabase() {
  //serialize because I want to create more than one table (and maybe populate)
  db.serialize(function() {
    //sqlite is awesome and doesn't have a boolean type, 1 or 0 will have to do
    //will add later when i know that the db works
    db.run("CREATE TABLE todo (title TEXT, desc TEXT)");
  });
}

//shouldn't need to keep this for the final submission
//TODO
function initTodo() {
  db.serialize(function() {
    db.run("INSERT INTO todo VALUES ($title, $desc)", {
      $title: "dbtest1",
      $desc: "dbtest1text"
    });
    db.run("INSERT INTO todo VALUES ($title, $desc)", {
      $title: "dbtest2",
      $desc: "dbtest2text"
    })
  });
}

module.exports = {
  "init": init,
  "db": db,
  "initTodo": initTodo
};
