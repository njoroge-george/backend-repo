// controllers/todoController.js
import Todo from '../models/todo.js';
import { Op } from 'sequelize';

const getTodos = async (req, res) => {
  try {
    const where = {};
    const { status, priority, q } = req.query;

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (q) where.title = { [Op.like]: `%${q}%` };

    const todos = await Todo.findAll({
      where,
      order: [['created_at', 'DESC']],
    });

    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    console.error('Error fetching todo:', err);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, details, priority, due_date, status } = req.body;
    const newTodo = await Todo.create({
      title,
      details,
      priority: priority || 'medium',
      due_date: due_date || null,
      status: status || 'pending',
    });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const { title, details, priority, due_date, status } = req.body;
    todo.title = title ?? todo.title;
    todo.details = details ?? todo.details;
    todo.priority = priority ?? todo.priority;
    todo.due_date = due_date ?? todo.due_date;
    todo.status = status ?? todo.status;

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};