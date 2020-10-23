import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

function TodoForm(props) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      text: input,
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <TextField
        placeholder='What will you do ?'
        value={input}
        onChange={handleChange}
        name='text'
        className='todo-input'
      />
      <button onClick={handleSubmit} className='todo-button'>
        Add todo
      </button>
    </form>
  );
}

export default TodoForm;
