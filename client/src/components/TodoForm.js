import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
    <Grid container spacing={3}>
      <form onSubmit={handleSubmit} className='todo-form'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              placeholder='What will you do ?'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <button onClick={handleSubmit} className='todo-button'>
              Add todo
            </button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default TodoForm;
