'use client'
import React, { useEffect, useState } from 'react'
import { TodoItem } from '@/app/api/todos/[id]/route';
import axios from 'axios';

interface Props {
  todos: TodoItem[],
  onSaveClick: (todoItem: TodoItem) => void;
  onDeleteClick: (todoItem: TodoItem) => void;
  onAddClick: (todoItem: TodoItem) => void;
}

interface TodoTableRow extends TodoItem {
  isBeingEdited: boolean
}

const TodoItemsList = (props: Props) => {
  const { onAddClick: onAdd } = props;
  
  const [editing, setEditing] = useState<boolean>(false);
  const [todoItemRows, setTodoItemRows] = useState<TodoTableRow[]>([]);
  const { todos, onDeleteClick, onSaveClick } = props; 
  
  useEffect(() => {
    const todoItemRows: TodoTableRow[] = todos.map((todo: TodoItem) => {
      return {
        ...todo,
        isBeingEdited: false
      }
    });

    setTodoItemRows(todoItemRows);
  }, [JSON.stringify(todos)])

  const onSave = (todo: TodoTableRow, ndx: number) => {
    setEditing(false);

    if (todoItemRows) {
      const row = todoItemRows[ndx];
      row.isBeingEdited = false;
      todoItemRows?.splice(ndx, 1, row);
      setTodoItemRows(todoItemRows)
    }
    
    onSaveClick(todo)
  };

  const onTodoItemChange = (e: any, ndx: number) => {
    const oldTodo = todoItemRows[ndx];
    const updatedText = e.target.value;
    const updatedTodoItem = {
      ...oldTodo,
      text: updatedText
    };

    todoItemRows.splice(ndx, 1, updatedTodoItem)

    setTodoItemRows(todoItemRows);
  }

  const onEdit = (todo: TodoTableRow, ndx: number) => {
    setEditing(true);
    if (todoItemRows) {
      const row = todoItemRows[ndx];
      row.isBeingEdited = true;
      todoItemRows?.splice(ndx, 1, row);
      setTodoItemRows(todoItemRows)
    }
  };

  const onAddClick = async () => {    
    const newTodo = {
      text: "",
    };
    const updatedRows = [
      ...todoItemRows,  
      {
        text: "",
        isBeingEdited: false
      }
    ];
    
    onAdd(newTodo);
  }

  return (
    <>
      <table
        className="min-w-full text-left text-sm font-light text-surface dark:text-white">
        <thead
          className="border-b border-neutral-200 font-medium dark:border-white/10">
          <tr className="border-b border-neutral-200 dark:border-white/10 grid-cols-3">
            <th scope="col" className="px-6 py-4">Todo</th>
            <th>
            { editing ? (
              <button type="button"  
                className="cursor-not-allowed float-right mt-3 mr-8 text-white bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            ) : (
              <button type="button"  
                className="float-right mt-3 mr-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={onAddClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            )}
              
            </th>
          </tr>
        </thead>
        <tbody>
          { todoItemRows?.map((todo: TodoTableRow, ndx: number) => {
              return (
                <tr className="border-b border-neutral-200 dark:border-white/10 grid-cols-3" key={ndx}>
                  <td className="whitespace-nowrap px-6 py-4">                  
                    { editing && todoItemRows[ndx].isBeingEdited ? (                        
                        <input type="text" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                          defaultValue={todoItemRows[ndx].text}
                          onChange={(e) => onTodoItemChange(e, ndx)}/>
                      ) : (
                        <p>{ todo.text }</p>
                      )
                    }
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">                  
                    { editing && todoItemRows[ndx].isBeingEdited ? (
                      <button type="button" 
                        onClick={() => { onSave(todoItemRows[ndx], ndx) }}
                        className="float-right text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>                
                      </button>                      
                    ) : (
                      <> 
                        { editing ? <>
                          <button                             
                            type="button" 
                            onClick={() => onDeleteClick(todo)}
                            className="cursor-not-allowed float-right focus:outline-none text-white bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600"
                            disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => onEdit(todo, ndx)}
                            type="button" 
                            className="cursor-not-allowed float-right text-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                          </button>
                        </> : <>
                          <button                             
                            type="button" 
                            onClick={() => onDeleteClick(todo)}
                            className="float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => onEdit(todo, ndx)}
                            type="button" 
                            className="float-right text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                          </button>
                        </>}
                        
                      </>
                    )}                  
                  </td>
                </tr>
              )
            }) 
          }
        </tbody>
      </table>
    </>
  )
}

export default TodoItemsList
