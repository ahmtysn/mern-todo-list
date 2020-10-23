import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TodoForm from './TodoForm';
import Todo from './Todo';
import HeaderSearch from './HeaderSearch';
import NotExist from './NotExist';
import Grid from '@material-ui/core/Grid';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchedTodos, setSearchedTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const response = await axios.get('/');
      const todos = await response.data;
      if (searchedTodos.length) {
        setTodos(searchedTodos);
      } else {
        setTodos(todos);
      }
    };
    getTodos();
  }, [searchedTodos, searchValue]);

  // search todos with firs input
  const getSearchedTodos = async todo => {
    const {
      data: { todos },
    } = await axios.get(`/search?q=${todo}`);
    setSearchValue(todo);

    setSearchedTodos(todos);
  };

  const addTodo = async todo => {
    if (!todo.text || !todo.text.trim()) {
      return;
    }

    // send data to backend
    const {
      data: { todo: newTodo },
    } = await axios.post('/', { text: todo.text });
    // update list
    setTodos(existingTodos => [newTodo, ...existingTodos]);
  };

  const doImportant = async (id, isImportant) => {
    const {
      data: { updatedTodo },
    } = await axios.patch(`/${id}`, { isImportant: !isImportant });
    // update the list
    setTodos(todos =>
      todos
        .map(item => (item.id === id ? updatedTodo : item))
        .sort((a, b) => (a.isImportant ? -1 : 1)),
    );
  };

  const updateTodo = async (todoId, todoForUpdate) => {
    if (!todoForUpdate.text || !todoForUpdate.text.trim()) {
      return;
    }

    // update with the backend
    const {
      data: { updatedTodo },
    } = await axios.patch(`/${todoId}`, { text: todoForUpdate.text });
    // update the list
    setTodos(todos =>
      todos.map(item => (item.id === todoId ? updatedTodo : item)),
    );
  };

  const removeTodo = async id => {
    // delete from the backend
    await axios.delete(`/${id}`);

    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completeTodo = async (id, isComplete) => {
    // update with the backend
    const {
      data: { updatedTodo },
    } = await axios.patch(`/${id}`, {
      isComplete: !isComplete,
    });
    // update the list
    setTodos(todos => todos.map(item => (item.id === id ? updatedTodo : item)));
    console.log(todos.filter(todo => todo.id === id));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <HeaderSearch searchTodos={getSearchedTodos} />
      </Grid>
      <Grid item xs={12} justify='center'>
        <TodoForm onSubmit={addTodo} />
      </Grid>
      <Grid item xs={12}>
        {(searchValue && searchedTodos.length === 0) || todos.length === 0 ? (
          <NotExist />
        ) : (
          <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            doImportant={doImportant}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default TodoList;
