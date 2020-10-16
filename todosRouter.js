const express = require('express');

const todosRouter = express.Router();

const { getAllTodos } = require('./todos-controllers');
const { createTodo } = require('./todos-controllers');
const { updateTodo } = require('./todos-controllers');
const { deleteTodo } = require('./todos-controllers');

todosRouter.get('/', getAllTodos);
todosRouter.post('/', createTodo);
todosRouter.route('/:id').patch(updateTodo).delete(deleteTodo);

module.exports = todosRouter;
