
---
## Project Title: TODO webapp with node.js and MongoDB

Author: Diana Feng

Last updated: September 11, 2022

The tutorial was originally created by Diogo Pinheiro on https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583

---
### How to open
#### Requirements
This is a web application hosted LOCALLY. In order to use the application, node.js and npm are required. To install node.js and npm, you can follow this tutorial: https://treehouse.github.io/installation-guides/
After both have been installed, this application can be launched by first set the directory to the unzipped folder (i.e., ".../pset1") in the terminal, and then run `npm start`.

Then in a new browser window, type in "localhost:3000" in the address bar to show the webpage.

#### Debugging
1. Please ensure that the 3000 port is not occupied by other applications.

2. If the program still fails to run, try to run the following commands first:
```
npm install --save express mongoose ejs dotenv
npm install --save-dev nodemon
```

#### Demo
In the case in which the application fails to run, [here](https://youtu.be/PNpDHJRFQmA) is a YouTube video that demos the main features of the application.

---
### Limitations
The website is only hosted locally and keeps a continuous list of todos without the ability to track different users.

---
### Functionality
* Add todo items to todo list
* Update existing todo items
* Remove todo items from todo list
* Todo list items are stored on a remote server so can be access anywhere

---
### How to use
Create new todo items by typing into the text box and pressing enter. Existing todo items can be edited by clicking on the gray edit button. Clicking on the red cross will delete the todo item. Note that any edit or removal is permanent and cannot be undone.

---
### Reflection
The key difference between the pure HTML/CSS/js implementation and this one is that this is actually a backend to this implementation. Data is no longer temporarily stored and displayed on the browswer, but saved and maintained in a database in a server. This allows users to continuously keep track of todos, instead of having existing work erased everytime the browswer tab is closed.
