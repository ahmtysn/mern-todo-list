import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BsStar } from 'react-icons/bs';

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
      <div key={todo.id} onClick={() => completeTodo(todo.id, todo.isComplete)}>
        {todo.text}
      </div>
      <div className='icons'>
        <BsStar
          className={todo.isImportant ? 'star-icon important' : 'star-icon'}
          onClickCapture={() => doImportant(todo.id, todo.isImportant)}
        />
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
