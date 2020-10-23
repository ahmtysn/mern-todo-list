import React from 'react';
import Grid from '@material-ui/core/Grid';

function NotExist() {
  return (
    <Grid container justify='center'>
      <Grid item xs={10} sm={8} md={6} lg={4} className='no-search'>
        <h3>No todos...</h3>
        <br />
        <p>Do you want to add one?</p>
      </Grid>
    </Grid>
  );
}

export default NotExist;
