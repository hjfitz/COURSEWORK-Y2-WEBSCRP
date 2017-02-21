# Todo List
### Module for (hopefully) modular WEBSCRP dashboard

## Requirements
- Express
- Handlebars
- API set up on api.webaddress.com

## Setup
- Change the GET query to match your API set up
  - API should return Todos in the following format:
```json
[
  {
    "rowid":1,
    "title":"Ensure hashcode is complete",
    "desc":"Get Matt to sign up"
  },
  {
    "rowid":2,
    "title":"Finish this website",
    "desc":"show it off to inflate your ego"
  }
]
```
- Point your router to render the page, wherever you have stored it:
```handlebars
router.get('/todo', function(req,res,next) {
  res.render('../bower_plugins/todo-780461-webscrp/todoMin', {
    "title": "todo"
  });
});
```
