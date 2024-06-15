import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { deleteTodo, retrieveTodoById, updateTodo } from "@/app/services/TodoService";

export interface TodoItem {
  id?: number,
  text: string,
  completed: boolean,
}

export const GET = async (request: NextRequest, 
  { params }: { params: { id: string } }) => {
  const foundTodoItem = retrieveTodoById(params.id)

  if (!foundTodoItem) {
    return NextResponse.json(
      { error: "Todo item not found" }, 
      { status: 404 }
    )
  } 

  return NextResponse.json(foundTodoItem);
}

export const PUT = async (request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  const validation = schema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const todoToUpdate = await retrieveTodoById(params.id)
  
  if (!todoToUpdate) {
    return NextResponse.json(
      { error: "Todo item not found" },
      { status: 404 }
    )
  }

  const updatedTodo = await updateTodo({
    ...todoToUpdate,
    text: body.text,
    completed: body.completed
  });
  
  return NextResponse.json(updatedTodo);
};

export const DELETE = async (request: NextRequest, 
  { params }: { params: { id: string } }) => {
  const todoForId = await retrieveTodoById(params.id);
  
  if (!todoForId) {
    return NextResponse.json(
      { error: "Todo item not found" },
      { status: 404 }
    );
  }

  await deleteTodo(params.id);

  return NextResponse.json({}, { status: 200 });
}