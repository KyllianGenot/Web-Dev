<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TodoList from './todos/TodoList.vue';
import CreateTodo from './todos/CreateTodo.vue';
import EditTodoModal from './todos/EditTodoModal.vue';
import { Todo } from '../services/TodoService';

const router = useRouter();
const todoListRef = ref<InstanceType<typeof TodoList> | null>(null);
const selectedTodo = ref<Todo | null>(null);
const isModalOpen = ref(false);

function addTodo(newTodo: Todo) {
  if (todoListRef.value) todoListRef.value.todos.push(newTodo);
}

function removeTodo(todoId: string) {
  if (todoListRef.value) {
    todoListRef.value.todos = todoListRef.value.todos.filter((t: Todo) => t._id !== todoId);
  }
}

function updateTodo(updatedTodo: Todo) {
  if (todoListRef.value) {
    const index = todoListRef.value.todos.findIndex((t: Todo) => t._id === updatedTodo._id);
    if (index !== -1) todoListRef.value.todos[index] = updatedTodo;
  }
}

function openEditModal(todo: Todo) {
  selectedTodo.value = { ...todo };
  isModalOpen.value = true;
}

function closeModal() {
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
      <CreateTodo @created="addTodo" />
      <TodoList ref="todoListRef" @edit="openEditModal" @delete="removeTodo" />
      <EditTodoModal v-if="isModalOpen && selectedTodo" :todo="selectedTodo" @updated="updateTodo" @close="closeModal" />
    </div>
  </div>
</template>