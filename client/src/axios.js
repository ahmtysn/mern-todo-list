import axios from 'axios';

export default axios.create({
  baseURL: 'https://mernstacktodolist.herokuapp.com/todos',
});

// herokuURL = https://mernstacktodolist.herokuapp.com/todos
// githubURL = http://localhost:5000/todos
