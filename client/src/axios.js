import axios from 'axios';

export default axios.create({
  baseURL: `https://mernstacktodolist.herokuapp.com/todos`,
});
// https://mernstacktodolist.herokuapp.com/
