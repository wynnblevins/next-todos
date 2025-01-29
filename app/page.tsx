'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TodoItem } from './api/todos/[id]/route';
import TodoItemsList from './components/TodoItemsList/TodoItemsList';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';

const TodosListPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('/api/todos');
      setTodos(data);
      setDataLoaded(true);
    };

    fetchTodos();
  }, [])

  const onDeleteClick = async (todoItem: TodoItem) => {
    axios.delete(`/api/todos/${todoItem.id}`).then(async () => {
      const { data: updatedTodosList } = await axios.get(`/api/todos`);
      setTodos(updatedTodosList)
    });
  };

  const onSaveClick = async (todoItem: TodoItem) => {
    await axios.put(`/api/todos/${todoItem.id}`, todoItem);
    const { data: updatedTodoItems } = await axios.get(`/api/todos`);
    setTodos(updatedTodoItems);
  };

  const onAddClick = async (todoItem: TodoItem) => {
    await axios.post(`/api/todos`, todoItem);
    const { data: newTodos } = await axios.get(`/api/todos`);
    setTodos(newTodos)
  };

  return (
    <>
      { dataLoaded ? <>
        <TodoItemsList 
          onSaveClick={(todoItem) => { onSaveClick(todoItem) }} 
          onAddClick={(todoItem) => { onAddClick(todoItem) }}
          onDeleteClick={(todoItem) => { onDeleteClick(todoItem) }} 
          todos={todos}>
        </TodoItemsList>
      </> : <>
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner></LoadingSpinner>
        </div>
      </>}      
    </>
  )
}

export default TodosListPage
