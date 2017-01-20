# WEBSCRP Coursework
### Academic year 2016-2017. UP780461

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

## Functions Planned
1. Recipe book, randomly selects recipe from day
  - Aims to show expertise with json, recipe stored in json files
2. Configurable budget
  - Allows for configuration with sliders and job input/loan input
  - Plan everything proportionally
  - Info saved in database. Will be configured during onboarding (?)
3. Emails
  - Readonly?
4. Weather
  - Config options:
    - F/C/K
    - City
    - Attributes
      - temp (max/min)
      - humidity
      - wind speed
      - Clouds?
      - Clear or no?
5. Reader/news parser
  - Inspired by Pocket/Feedly. We'll see how this goes
6. Todolist?
  - Because I can.

## Libraries in Mind
- Express and Handlebars
  - Proved to be very helpful with Lilly Hack
- Materialize cases
  - Who needs to design CSS when this library aready does so eloquently.
- Some sort of onboarding library
  - [intro.js](http://introjs.com/)
  - [shepherd](http://github.hubspot.com/shepherd/docs/welcome/)
- SQLITE/MySQL
  - Depends on the size of the file required.
