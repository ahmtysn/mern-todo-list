import React, { useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { RiCloseCircleLine } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';
import Checkbox from '@material-ui/core/Checkbox';

const Todo = ({ todos, completeTodo, doImportant, updateTodo, removeTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });
  const formSubmit = e => {
    e.preventDefault();
    updateTodo(edit.id, { text: edit.value });
    setEdit({ id: null, value: '' });
    console.log('deneme');
  };

  return todos.map(todo => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={todo.id}
    >
      <Checkbox
        checked={todo.isComplete}
        onChange={() =>
          completeTodo(todo.id, todo.isComplete, todo.isImportant)
        }
        color='default'
      />
      <div
        key={todo.id}
        onClick={() => setEdit({ id: todo.id, value: todo.text })}
      >
        {edit.id === todo.id ? (
          <form onSubmit={formSubmit}>
            <input
              value={edit.value}
              onChange={e => setEdit({ id: todo.id, value: e.target.value })}
              className='edit-input'
            />
          </form>
        ) : (
          todo.text
        )}
      </div>

      <div className='icons'>
        {edit.id !== todo.id ? (
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className='delete-icon'
          />
        ) : (
          <ImCheckmark
            onClick={() => {
              updateTodo(todo.id, { text: edit.value });
              setEdit({ id: null, value: '' });
            }}
            className='success-icon'
          />
        )}
        <FaStar
          className={todo.isImportant ? 'star-icon important' : 'star-icon'}
          onClickCapture={() => doImportant(todo.id, todo.isImportant)}
        />
      </div>
    </div>
  ));
};

export default Todo;
