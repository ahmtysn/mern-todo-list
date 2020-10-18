import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import SearchBar from './SearchBar';
import axios from '../axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
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
  }, [searchedTodos]);

  // search todos with firs input
  const getSearchedTodos = async todo => {
    const {
      data: { todos },
    } = await axios.get(`/search?q=${todo}`);
    setSearchedTodos(todos);
    console.log({ searchedTodos });
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
    } = await axios.patch(`/${id}`, { isComplete: !isComplete });
    // update the list
    setTodos(todos => todos.map(item => (item.id === id ? updatedTodo : item)));
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <SearchBar searchTodos={getSearchedTodos} />
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
