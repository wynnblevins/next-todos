import prisma from '../../prisma/client';
import { TodoItem } from '../api/todos/[id]/route';

export const createTodo = async (text: string) => {
  const newTodoItem = await prisma.todo.create({ 
    data: {
      text: text
    }
  });
  return newTodoItem;
};

export const retrieveTodos = async () => {
  const items = await prisma.todo.findMany();
  return items;
};

export const retrieveTodoById = async (id: string) => {
  const foundTodoItem = await prisma.todo.findUnique({
    where: { id: parseInt(id) }
  });
  return foundTodoItem;
};

export const updateTodo = async (todo: TodoItem) => {
  const updatedTodo = await prisma.todo.update({
    where: { id: todo.id },
    data: {
      text: todo.text
    }
  });
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({
    where: { id: parseInt(id) }
  });
};