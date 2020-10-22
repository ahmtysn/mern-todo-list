const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isComplete: { type: Boolean, default: false },
    isImportant: { type: Boolean, default: false },
  },
  { versionKey: false },
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
