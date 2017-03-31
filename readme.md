# WEBSCRP Coursework
### Academic year 2016-2017. UP780461

## General Notes, Prior to use.
- There are two main pages. `/` and `/todos`. todos is meant to be accessed from the mobile, whereas the `/` is meant to be accessed from the main page.
- If there are any issues with the page on loading, pressing `f5` should iron all of them out.
- You should run `npm run install-deps` before running `npm run dashboard`. I use this custom script because I used bower to manage my frontend utilities.
- If sqlite3 fails to build (as it did on the day of submission), please run `npm install --save sqlite3`. This shouldn't happen, but it did to me, and I'm a panicked student writing a readme.md a few minutes before the deadline!

## Notes Pertaining to the Marking Scheme

### Functionality
- The dashboard functions well. Everything on page load works, and there are no console errors. there is the odd quirk where the widgets don't animate until 'save' is pressed.
- There are 5 main functions of the code:
  - todo
    - has a local API which stores TODOs in a sqlite database, allowing for maximum portability. the todo page is accessible through a mobile phone (responsive design!), and the todo widget periodically checks for new todos. See reflection for more information
  - weather
    - Weather is a highly configurable portion of the page. It uses google maps api to bring a map on page, where the user can click their area and save their location like that. They can also pick other options they wish to view from the page.
  - image
    - This widget utilises the reddit API. The user can pick from a list of pre-defined subreddits to get an image from, but they can also enter their own custom one, if they so desire.
  - news
    - This widget utilises newapi. There is a list of predefined new sources, where the user can click their option.
  - clock
    - A basic clock and date widget. has basic config options, such as 'day/date', 'month name/month number'.

### Maintainability
- since ES6 was released, and adopted by chrome, I've been striving to write using that and only that. In the future, this means that the code is more recognisable.
- I've also strived to keep every function in their own file, and separate the different parts of the API in their own file - using Express routes.
- As would be expected, I've used camelCase for the name of the variables, and dashes on the main page.

### Usability
- The dashboard initialises with a basic card on sceen, describing to the user what they can do. There is a heavy use of simple icons on screen, which make it easy for the user to navigate.
- The page is filled with 'tiles', which the user is allows to pick their area for the widget with. There are menus tucked out of the way.
- Each card has the option 'resize:both', which gives a familiar resizable point at the bottom left of the card

### Accessibility
- The dashboard uses material design for everything. The layout is clear, and intuitive. This is a familiar UI for most users, because they will be used to material design from their android phones. There is a FAB with an edit icon that should look familiar.
- an aim of this coursework for me was to remove almost every occurance of text, and replace with a similar image where applicable for better visual grepping.

### Reflection
- It's a great idea to move different parts to different routes.
  - I have a main route for rendering the pages
  - I have enother route for the api  
    - This has two further routes, one for configuration and one for todos.
- Node handles files weirdly. When I was working on the config part of the UI, I noticed that I couldn't write to `../../util/userconfig.json`. This is because referencing to files in node works two different ways:
  - Your 'requires' are relative to the file that you are requiring from.
  - Writing and interfacing with another file must be done in relation to the directory that the program is _being run from_.
- Light colorschemes are much better for coding.
- Services like Trello help incredible for organisation.
- Moving a number of methods to classes improved my workflow. Moving the cards to their own class that generates them allows me to just create an object with some parameters, rather than referring to the materializecss documentation.
- although jQuery doesn't feel like proper javascript, I really enjoyed the $.ajax method that it provided. I felt as though it made the code cleaner. I toyed with rewriting it for myself, but jquery was a dependency of Materialize. While I wrote my own getJson method, I felt it better to use the jQuery options, because I didn't have any extra code to maintain.
- There were a number of features that I would have *loved* to implement. I had written a few functions that still exist in the code, but are not utilised.
  - I wrote a night mode toggle option, but I didn't have time to implement this with the Weather class (there's a code stub commented out).
  - NASA has an Astronomy Picture of the Day - with an API. I had attempted to use this, but because the reddit api got a bit more complex, I didn't have time to finish adding it.

### Invention
- The initial layout of the system is something that I've not seen anywhere else. Taking inspiration from creating a table in MS Word, my way of placing cards (widgets) on the page uses something from that. It allows the user to select an area to configure the layout of their dashboard.
- When creating the card for 'time', I found that depending on the size of the card, there was little I could do to change the size of it. There was no event listener for _container_ resize, which meant that I couldn't use that. I had to therefore come up with my own event listener. I firsly made a <span> that sat in the bottom right of the card, where the resize icon sits. This was positioned absolutely. I attached an event listener on 'mousedown' which attached two more event listeners (defined in that scope).
  - There was a 'mousemove' event listener and a 'mouseup' event listener. The mousemove event listener changed the size of the container, but it also changed the font size. the mouseup event listener removed both the mouseup and mousemove event listeners.
- Each widget is a [card](https://material.io/guidelines/components/cards.html). These are not created statically; there exists a class to create these in the project, which the user can then call a method to place it on the page. The user can also call an 'addsettings' method to create a small cog at the top right of the display, with the parameter passed to addsettings as the function called by the event listener that's been put on.
  - I've considered publishing this to bower/yarn to complement Materialize - the framework that this project uses heavy parts of. However, with a single class, there isn't much point.

  ## Coursework Spec

  Your challenge is to create a Configurable Dashboard.

  You are to specify and construct this configurable dashboard using a combination of HTML, CSS, JavaScript and (optionally) PHP, and any backing store you desire (e.g. a database).

  Example use cases include:
   - in the home (perhaps for helping a family see what the weather will be like, their upcoming schedule, the latest tweets from their friends, etc.), updated at appropriate intervals.
   - in an office (such as the BK first floor, where we have a flat panel for displaying information to staff and visitors).  A combination of live data from the web and various databases, stories from various sources, images and video may all need to be displayed.

  Configuration of your dashboard may be achieved by editing config files, or through a Dashboard Editor created as part of your deliverable artifact – this is your choice.

  Your task is to show (through your work) the extent to which you have met the learning outcomes for the unit.

  The learning outcomes (as defined in the Unit Spec.) are:
  1. Identify industry best practices in web application design (e.g. client, server and API layers).
  2. Design a contemporary web application using industry best practices.
  3. Critically evaluate the design and implementation of web applications.

  [source](https://docs.google.com/document/d/1YL-uOZZdTNC2h732EVLKYnk2VgowFtR6tGRPS_qzuJg/edit)
