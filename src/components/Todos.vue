<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BasicInput from './BasicInput.vue';
import { getJSON, postJSON, putJSON, deleteJSON } from '../api-client/api-client';

// Use a CORS proxy for development (temporary workaround)
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'https://web-dev-backend-ptmz.onrender.com';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const router = useRouter();
const todos = ref<Todo[]>([]);
const newTodoTitle = ref('');
const newTodoDescription = ref('');
const error = ref('');
const formError = ref('');
const selectedTodo = ref<Todo | null>(null); // Track the todo being edited
const isModalOpen = ref(false); // Control modal visibility

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }

  try {
    const data = await getJSON('/api/todos', token);
    todos.value = data as Todo[];
  } catch (err) {
    error.value = 'Failed to load todos: ' + (err as Error).message;
  }
});

async function createTodo() {
  if (!newTodoTitle.value.trim()) {
    formError.value = 'Title is required.';
    return;
  }
  if (!newTodoDescription.value.trim()) {
    formError.value = 'Description is required.';
    return;
  }

  formError.value = '';

  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }

  try {
    const newTodo = await postJSON(
      '/api/todos',
      {
        title: newTodoTitle.value,
        description: newTodoDescription.value,
      },
      token
    );
    todos.value.push(newTodo as Todo);
    newTodoTitle.value = '';
    newTodoDescription.value = '';
  } catch (err) {
    error.value = 'Failed to create todo: ' + (err as Error).message;
  }
}

async function updateTodoStatus(todo: Todo) {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }

  try {
    const updatedTodo = await putJSON(
      `/api/todos/${todo._id}`,
      {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      },
      token
    );
    const index = todos.value.findIndex((t) => t._id === todo._id);
    todos.value[index] = updatedTodo as Todo;
  } catch (err) {
    error.value = 'Failed to update todo status: ' + (err as Error).message;
  }
}

async function updateTodoDetails() {
  const todoToUpdate = selectedTodo.value;
  if (!todoToUpdate) return;

  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }

  try {
    const updatedTodo = await putJSON(
      `/api/todos/${todoToUpdate._id}`,
      {
        title: todoToUpdate.title,
        description: todoToUpdate.description,
        completed: todoToUpdate.completed,
      },
      token
    );
    const index = todos.value.findIndex((t) => t._id === todoToUpdate._id);
    todos.value[index] = updatedTodo as Todo;
    closeModal();
  } catch (err) {
    error.value = 'Failed to update todo details: ' + (err as Error).message;
  }
}

async function deleteTodo(todoId: string) {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }

  try {
    await deleteJSON(`/api/todos/${todoId}`, token);
    todos.value = todos.value.filter((todo) => todo._id !== todoId);
  } catch (err) {
    error.value = 'Failed to delete todo: ' + (err as Error).message;
  }
}

function openModal(todo: Todo) {
  selectedTodo.value = { ...todo }; // Clone the todo to avoid direct mutation
  isModalOpen.value = true;
}

function closeModal() {
  selectedTodo.value = null;
  isModalOpen.value = false;
}

function logout() {
  localStorage.removeItem('token');
  router.push('/signin');
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Todos</h2>
        <button
          @click="logout"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
        {{ error }}
      </div>
      <form @submit.prevent="createTodo" class="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div v-if="formError" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
          {{ formError }}
        </div>
        <div class="mb-4">
          <BasicInput
            id="new-todo-title"
            type="text"
            label="Title"
            v-model="newTodoTitle"
          />
        </div>
        <div class="mb-4">
          <BasicInput
            id="new-todo-description"
            type="text"
            label="Description"
            v-model="newTodoDescription"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Todo
        </button>
      </form>
      <div v-if="todos.length === 0" class="text-center text-gray-500">
        No todos yet. Add one above!
      </div>
      <ul v-else class="space-y-3">
        <li
          v-for="todo in todos"
          :key="todo._id"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow cursor-pointer"
          @click="openModal(todo)"
        >
          <div class="flex items-center space-x-3">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="updateTodoStatus(todo)"
              class="h-5 w-5 text-blue-600"
            />
            <span
              :class="{ 'line-through text-gray-500': todo.completed }"
              class="text-gray-800"
            >
              {{ todo.title }} - {{ todo.description }}
            </span>
          </div>
          <button
            @click.stop="deleteTodo(todo._id)"
            class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>

  <!-- Modal for editing todo -->
  <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div v-if="selectedTodo" class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Edit Todo</h3>
      <form @submit.prevent="updateTodoDetails" class="space-y-4">
        <div>
          <BasicInput
            id="edit-todo-title"
            type="text"
            label="Title"
            v-model="selectedTodo.title"
          />
        </div>
        <div>
          <BasicInput
            id="edit-todo-description"
            type="text"
            label="Description"
            v-model="selectedTodo.description"
          />
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>