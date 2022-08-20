const express = require("express");
const router = express.Router();
const jwtAuth = require("../lib/jwtAuth");
const Todo = require("../models/Todo");
const User = require("../models/User");


router.post("/add", (req, res) => {
    const data = req.body;

    let todo = new Todo({
        user_id: data.user.user,
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

router.get("/todos/get/:id", (req, res) => {
    const data = req.params;
    Todo.find({ user_id: data.id })
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

router.put("/todos/update/:id", (req, res) => {
    const data = req.body;
    const id = req.params;
    Todo.findOne({ _id: id.id })
        .then((todo) => {
            todo.completed =! data.completed
            todo.save()
                .then(() => {
                    res.json({ message: "Todo Updated" })
                })
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

router.delete("/todos/delete/:id", (req, res) => {
    const id  = req.params
    Todo.findOneAndDelete({ _id: id.id })
        .then(() => {
            res.json({ message: "Task Deleted" })
        })
        .catch((err) => {
            res.json({ error: err });
        });
});






module.exports = router;