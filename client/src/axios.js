import axios from 'axios';

// const herokuURL = 'https://mernstacktodolist.herokuapp.com/todos';
const githubURL = 'http://localhost:5000/todos';

export default axios.create({
  baseURL: githubURL,
});
