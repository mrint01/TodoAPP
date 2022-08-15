const express = require("express");
const router = express.Router();
const jwtAuth = require("../lib/jwtAuth");
const Todo = require("../models/Todo");
const User = require("../models/User");


router.post("/add", jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
    let todo = new Todo({
        user_id: user,
        text: data.text,
    });
    todo
        .save()
        .then(() => {
            res.json({
                message: "Todo Task Added",
            });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});


router.get("/todos", jwtAuth, (req, res) => {
    const user = req.user;
    Todo.find({ user_id: user._id })
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.json({ error: err });
        });
});


router.put("/todos/update", jwtAuth, (req, res) => {
    const data = req.body;
    Todo.findOne({ _id: data._id })
        .then((todo) => {
            todo.completed = !todo.completed
            todo.save()
                .then(() => {
                    res.json({ message: "Todo Updated" })
                })
        })
        .catch((err) => {
            res.json({ error: err });
        });
});



router.delete("/todos/delete", jwtAuth, (req, res) => {
    const data = req.body;
    Todo.findOneAndDelete({ _id: data._id })
        .then(() => {
            res.json({ message: "Task Deleted" })
        })
        .catch((err) => {
            res.json({ error: err });
        });
});






module.exports = router;