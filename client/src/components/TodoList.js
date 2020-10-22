import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TodoForm from './TodoForm';
import Todo from './Todo';
import SearchBar from './SearchBar';
import NotExist from './NotExist';

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
    setTodos(todos => todos.map(item => (item.id === id ? updatedTodo : item)));
    console.log(todos.filter(todo => todo.id === id));
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

  const completeTodo = async (id, isComplete, isImportant) => {
    // update with the backend
    const {
      data: { updatedTodo },
    } = await axios.patch(`/${id}`, {
      isComplete: !isComplete,
      isImportant: false,
    });
    // update the list
    setTodos(todos => todos.map(item => (item.id === id ? updatedTodo : item)));
    console.log(todos.filter(todo => todo.id === id));
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <SearchBar searchTodos={getSearchedTodos} />
      <TodoForm onSubmit={addTodo} />
      {searchValue && searchedTodos.length === 0 ? (
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
    </>
  );
}

export default TodoList;
