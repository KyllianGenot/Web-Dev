<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { updateTodo, deleteTodo, Todo } from '../../services/TodoService';

const props = defineProps<{
  todo: Todo;
}>();
const emit = defineEmits(['edit', 'delete']);

async function toggleStatus() {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    await updateTodo(props.todo._id, { completed: !props.todo.completed }, token);
    props.todo.completed = !props.todo.completed;
  } catch (err) {
    console.error('Failed to update todo status:', err);
  }
}

async function removeTodo() {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    await deleteTodo(props.todo._id, token);
    emit('delete', props.todo._id);
  } catch (err) {
    console.error('Failed to delete todo:', err);
  }
}

function openEditModal() {
  emit('edit', props.todo);
}
</script>

<template>
  <li class="flex items-center justify-between bg-white p-4 rounded-lg shadow cursor-pointer" @click="openEditModal">
    <div class="flex items-center space-x-3">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleStatus"
        class="h-5 w-5 text-blue-600"
        @click.stop
      />
      <span :class="{ 'line-through text-gray-500': todo.completed }" class="text-gray-800">
        {{ todo.title }} - {{ todo.description }}
      </span>
    </div>
    <button
      @click.stop="removeTodo"
      class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
    >
      Delete
    </button>
  </li>
</template>