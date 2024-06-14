'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TodoItem } from '../api/todos/[id]/route';
import TodoItemsList from '../components/TodoItemsList/TodoItemsList';

const TodosListPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  
  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('/api/todos');
      setTodos(data);
    };

    fetchTodos();
  }, [])
  
  return (
    <>
      <h1>Todo Items</h1>
      <TodoItemsList 
        onSaveClick={() => {}} 
        onDeleteClick={() => {}} 
        todos={todos}>
      </TodoItemsList>
    </>
  )
}

export default TodosListPage
