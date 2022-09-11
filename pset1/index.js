// Diana Feng for CS279R HW1
// original tutorail found at https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583
// by Diogo Pinheiro

// include express dependency
const express = require("express")
const app = express();

// configure MongoDB connection
const dotenv = require("dotenv")
dotenv.config()

// connect to mongoDB with mongoose
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask"); // model
mongoose.connect("mongodb+srv://todoApp:DisMuXeJsKBiFzEx@cs279r-todo.iwhec5g.mongodb.net/?retryWrites=true&w=majority").then(
    () => app.listen(3000, () => console.log("Server Up and running"))).catch(
        err => console.log(err)) // connect with url, host website on local server if successful, otherwise log error

// include the static stylesheet
app.use("/static", express.static("public")) //note to self: alternative: app.use(express.static(__dirname + '/public')) and href="/stylesheets/style.css"

// allow the form info to be extracted
app.use(express.urlencoded({extended: true}));

// include HTML template as ejs
app.set("view engine", "ejs")

// retrieving the dynamic DOM using GET
app.get('/', (req,res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
})

// posting form updates through POST
app.post('/', async(req, res) => {
    console.log("adding...")
    const todoTask = new TodoTask({
        content: req.body.content
        });
    try {
        await todoTask.save();
        res.redirect("/");
        console.log("added")
    } catch (err) {
        res.redirect("/");
    }
});

// updating the database the the displayed list by listening to the edit method in todoEdit.ejs
app
    .route("/edit/:id")
    .get((req, res) => {
        console.log("updating...")
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id }); // after updating, render 
        });
    })
    .post((req, res) => {
        console.log("updated")
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

// deleting todo items by listening to the remove method in todoEdit.ejs
app.route("/remove/:id")
    .get((req, res) => {
        console.log("deleting...")
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
            console.log("deleted");
        });
    });