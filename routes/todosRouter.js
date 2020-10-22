const express = require('express');

const todosRouter = express.Router();

const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos-controllers');

todosRouter.get('/', getAllTodos);
todosRouter.post('/', createTodo);
todosRouter.route('/:id').patch(updateTodo).delete(deleteTodo);

module.exports = todosRouter;
