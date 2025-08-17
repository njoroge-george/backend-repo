// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodos);        // GET /api/todos?status=&priority=&q=
router.get('/:id', todoController.getTodoById); // GET /api/todos/:id
router.post('/', todoController.createTodo);    // POST /api/todos
router.put('/:id', todoController.updateTodo);  // PUT /api/todos/:id
router.delete('/:id', todoController.deleteTodo);// DELETE /api/todos/:id

module.exports = router;
