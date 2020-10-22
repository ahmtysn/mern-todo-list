import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';
import Checkbox from '@material-ui/core/Checkbox';

const Todo = ({ todos, completeTodo, doImportant, updateTodo, removeTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map(todo => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={todo.id}
    >
      <Checkbox
        checked={todo.isComplete}
        onChange={() => completeTodo(todo.id, todo.isComplete)}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <div
        key={todo.id}
        onClick={() => setEdit({ id: todo.id, value: todo.text })}
      >
        {todo.text}
      </div>
      <div className='icons'>
        <FaStar
          className={todo.isImportant ? 'star-icon important' : 'star-icon'}
          onClickCapture={() => doImportant(todo.id, todo.isImportant)}
        />
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        {/* <TiEdit className='edit-icon' /> */}
      </div>
    </div>
  ));
};

export default Todo;
