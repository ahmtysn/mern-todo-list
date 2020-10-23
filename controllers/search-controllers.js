const Todo = require('../models/Todo');

const searchTodos = async (req, res, next) => {
  let todos;
  try {
    todos = await Todo.find({
      text: { $regex: req.query.q, $options: 'i' },
    }).sort('-isImportant');
  } catch (err) {
    const error = new Error('Fetching todos failed, please try again later.');
    error.status = 500;
    return next(error);
  }
  res.json({
    todos: todos.map(todo => todo.toObject({ getters: true })),
  });
};

exports.searchTodos = searchTodos;
