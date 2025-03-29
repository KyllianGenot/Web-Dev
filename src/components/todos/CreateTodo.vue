<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import BasicInput from '../BasicInput.vue';
import { createTodo, Todo } from '../../services/TodoService';

const newTodoTitle = ref('');
const newTodoDescription = ref('');
const formError = ref('');
const emit = defineEmits(['created']);

async function onSubmit() {
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
  if (!token) return;
  try {
    const newTodo: Todo = await createTodo(newTodoTitle.value, newTodoDescription.value, token);
    emit('created', newTodo);
    newTodoTitle.value = '';
    newTodoDescription.value = '';
  } catch (err) {
    formError.value = 'Failed to create todo: ' + (err as Error).message;
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="bg-white p-6 rounded-lg shadow-lg mb-6">
    <div v-if="formError" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
      {{ formError }}
    </div>
    <div class="mb-4">
      <BasicInput id="new-todo-title" type="text" label="Title" v-model="newTodoTitle" />
    </div>
    <div class="mb-4">
      <BasicInput id="new-todo-description" type="text" label="Description" v-model="newTodoDescription" />
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
      Add Todo
    </button>
  </form>
</template>