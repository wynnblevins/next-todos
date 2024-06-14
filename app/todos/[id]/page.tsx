'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TodoItem } from '@/app/api/todos/[id]/route';

interface Props {
  params: { id: number }
}

const TodoDetailPage = ({ params: { id } }: Props) => {
  const [todoItem, setTodoItem] = useState<TodoItem>();
  
  useEffect(() => {
    const fetchTodoItem = async () => {
      const todoItem: TodoItem = await axios.get(`/api/todos/${id}`);
      setTodoItem(todoItem);
    };

    fetchTodoItem();
  }, [])
  
  return (
    <div>
      <h1>Todo Item</h1>
      <p>{ todoItem?.text }</p>
    </div>
  )
}

export default TodoDetailPage
