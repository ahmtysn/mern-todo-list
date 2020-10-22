import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/todos',
});

// herokuURL = https://mernstacktodolist.herokuapp.com/todos
// githubURL = http://localhost:5000/todos
