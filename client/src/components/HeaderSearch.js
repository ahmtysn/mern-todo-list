import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function HeaderSearch({ searchTodos }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchTodos(search);
  }, [search]);

  return (
    <Grid className='header' container>
      <Grid item xs={12} sm={8}>
        <h1>What is your today's plan?</h1>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          placeholder='Find your todos...'
          value={search}
          onChange={handleChange}
          name='text'
          className='todo-input'
        />
      </Grid>
    </Grid>
  );
}

export default HeaderSearch;
