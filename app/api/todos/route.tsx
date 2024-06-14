import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from './schema';

export const GET = async (request: NextRequest) => {
  const items = await prisma.todo.findMany();
  return NextResponse.json(items);
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newTodoItem = await prisma.todo.create({ 
    data: {
      text: body.text
    }
  });

  return NextResponse.json({ 
    id: newTodoItem.id, 
    text: newTodoItem.text 
  });
};