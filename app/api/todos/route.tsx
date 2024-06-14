import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import { createTodo, retrieveTodos } from "@/app/services/TodoService";

export const GET = async (request: NextRequest) => {
  const todos = await retrieveTodos();
  return NextResponse.json(todos);
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newTodo = await createTodo(body.text)  

  return NextResponse.json({ 
    id: newTodo.id, 
    text: newTodo.text 
  });
};