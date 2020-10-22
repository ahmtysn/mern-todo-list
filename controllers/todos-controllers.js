const Todo = require('../models/Todo');

const getAllTodos = async (req, res, next) => {
  let todos;
  try {
    todos = await Todo.find().sort('-isImportant');
  } catch (err) {
    const error = new Error('Something went wrong, could not find todos!');
    error.status = 500;
    return next(error);
  }

  if (todos.length > 0) {
    const modifiedTodos = todos.map(todo => todo.toObject({ getters: true }));
    res.status(200).json(modifiedTodos);
  } else {
    const error = new Error({ msg: 'Could not find any todos!' });
    error.status = 404;
    return next(error);
  }
};

const createTodo = async (req, res, next) => {
  const todo = new Todo({
    text: req.body.text,
  });

  try {
    await todo.save();
  } catch (err) {
    const error = new Error(
      'Failed to create new todo, make sure to fill in all the fields correctly!',
    );
    error.status = 500;
    return next(error);
  }

  res.status(201).json({ todo: todo.toObject({ getters: true }) });
};

const updateTodo = async (req, res, next) => {
  const { text, isComplete, isImportant } = req.body;
  const todoId = req.params.id;

  let todo;
  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    const error = new Error('Something went wrong, could not update todo!');
    error.status = 500;
    return next(error);
  }

  if (text) todo.text = text;
  if (typeof isComplete !== 'undefined') todo.isComplete = isComplete;
  if (typeof isImportant !== 'undefined') todo.isImportant = isImportant;

  try {
    await todo.save();
  } catch (err) {
    const error = new Error('Something went wrong, could not update todo!');
    error.status = 500;
    return next(error);
  }

  res.status(200).json({ updatedTodo: todo.toObject({ getters: true }) });
};

const deleteTodo = async (req, res, next) => {
  const todoId = req.params.id;

  let todo;
  try {
    todo = await Todo.findById(todoId);
    todo.remove();
  } catch (err) {
    const error = new Error('Something went wrong, could not delete todo!');
    error.status = 500;
    return next(error);
  }

  res.status(200).json({ msg: 'Todo successfully deleted!' });
};

exports.getAllTodos = getAllTodos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
