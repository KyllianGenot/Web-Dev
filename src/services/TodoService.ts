import { getJSON, postJSON, putJSON, deleteJSON } from '../api-client/api-client';

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export async function getTodos(token: string): Promise<Todo[]> {
  return getJSON('/api/todos', token);
}

export async function createTodo(title: string, description: string, token: string): Promise<Todo> {
  return postJSON('/api/todos', { title, description }, token);
}

export async function updateTodo(id: string, data: Partial<Todo>, token: string): Promise<Todo> {
  return putJSON(`/api/todos/${id}`, data, token);
}

export async function deleteTodo(id: string, token: string): Promise<void> {
  await deleteJSON(`/api/todos/${id}`, token);
}