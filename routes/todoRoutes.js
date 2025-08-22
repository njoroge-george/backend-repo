// routes/todoRoutes.js
import express from 'express';
const router = express.Router();
import todoController from '../controllers/todoController.js';

router.get('/', todoController.getTodos);        // GET /api/todos?status=&priority=&q=
router.get('/:id', todoController.getTodoById); // GET /api/todos/:id
router.post('/', todoController.createTodo);    // POST /api/todos
router.put('/:id', todoController.updateTodo);  // PUT /api/todos/:id
router.delete('/:id', todoController.deleteTodo);// DELETE /api/todos/:id

export default router;
