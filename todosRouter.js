const express = require('express');

const todosRouter = express.Router();

const {
  getAllTodos,
  createTodo,
  updateTodo,
  searchTodos,
  deleteTodo,
} = require('./todos-controllers');

todosRouter.get('/', getAllTodos);
todosRouter.post('/', createTodo);
todosRouter.get('/search', searchTodos);
todosRouter.route('/:id').patch(updateTodo).delete(deleteTodo);

module.exports = todosRouter;
