const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');
const auth = require('../middleware/auth');

// @url           POST /todo/addtodo
// @description   add todo item
// @access-mode   private 
router.post('/addtodo', auth, async (req, res) => {
  try {
    const { message } = req.body
    const todo = {
      userID: req.user._id,
      message: message,
      date: new Date()
    }
    const newTodo = new ToDo(todo);
    await newTodo.save();
    res.status(200).send({ status: 'ToDo added', todo: newTodo });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
})

// @url           GET /todo/gettodos
// @description   get incomplete todo items
// @access-mode   private
router.get('/gettodos', auth, async (req, res) => {
  try {
    const todos = await ToDo.find({ userID: req.user._id });
    res.status(200).send({ status: 'Fetched todos', todo: todos });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
})

// @url           PUT /todo/markstatus/:id
// @description   mark todo items status
// @access-mode   private
router.put('/markstatus/:id', auth, async (req, res) => {
  const todoID = req.params.id;
  try {
    const { status } = req.body;
    const todoItem = await ToDo.findByIdAndUpdate({ _id: todoID }, { status: status });
    res.status(200).send({ status: 'change status', item: todoItem });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
})

// @url           PUT /todo/updatetodo/:id
// @description   update todo item
// @access-mode   private
router.put('/updatetodo/:id', auth, async (req, res) => {
  const todoID = req.params.id;
  try {
    const { message } = req.body;
    const todoItem = await ToDo.findOneAndUpdate({ _id: todoID }, { message: message});
    res.status(200).send({ status: 'Todo Updated', updatedTodo: todoItem });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
})

module.exports = router; 