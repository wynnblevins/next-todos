import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../prisma/client';
import schema from "../schema";

export const GET = async (request: NextRequest, 
  { params }: { params: { id: string } }) => {
  const foundTodoItem = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) }
  });

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

  const todoToUpdate = await prisma.todo.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });

  if (!todoToUpdate) {
    return NextResponse.json(
      { error: "Todo item not found" },
      { status: 404 }
    )
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: parseInt(params.id) },
    data: {
      text: body.text
    }
  });

  return NextResponse.json(updatedTodo);
};

export const DELETE = async (request: NextRequest, 
  { params }: { params: { id: string } }) => {
  const todoForId = await prisma.todo.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })
  
  if (!todoForId) {
    return NextResponse.json(
      { error: "Todo item not found" },
      { status: 404 }
    );
  }

  await prisma.todo.delete({
    where: { id: parseInt(params.id) }
  });

  return NextResponse.json({}, { status: 200 });
}