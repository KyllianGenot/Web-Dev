<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { updateTodo, deleteTodo, Todo } from '../../services/TodoService';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits(['edit', 'delete']);

async function toggleStatus() {
  const token = localStorage.getItem('token');
  if (!token) {
      console.error('Authentication token not found.');
      return;
  }
  try {
    const originalStatus = props.todo.completed;
    props.todo.completed = !props.todo.completed;

    await updateTodo(props.todo._id, { completed: props.todo.completed }, token);
  } catch (err) {
    console.error('Failed to update todo status:', err);
    props.todo.completed = !props.todo.completed;
  }
}

async function removeTodo() {
  if (!confirm(`Are you sure you want to delete "${props.todo.title}"?`)) {
      return;
  }

  const token = localStorage.getItem('token');
   if (!token) {
      console.error('Authentication token not found.');
      return;
  }
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
  <li class="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-primary-lighter transition-all duration-200 ease-in-out group">
    <div class="flex items-center space-x-3 flex-1 min-w-0">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleStatus"
        :id="'todo-check-' + todo._id"
        class="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary-light focus:ring-offset-0 cursor-pointer flex-shrink-0"
      />
      <label :for="'todo-check-' + todo._id" class="flex-1 min-w-0 cursor-pointer">
        <span
          :class="{ 'line-through text-gray-400': todo.completed, 'text-gray-800 font-medium': !todo.completed }"
          class="block text-base truncate"
          :title="todo.title"
         >
          {{ todo.title }}
        </span>
         <span
          :class="{ 'line-through text-gray-400': todo.completed, 'text-gray-500': !todo.completed }"
          class="block text-sm truncate"
          :title="todo.description"
         >
          {{ todo.description }}
        </span>
      </label>
    </div>
    <div class="flex space-x-1 flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
      <button @click="openEditModal" class="btn-icon-secondary" aria-label="Edit todo">
        <PencilSquareIcon class="h-5 w-5" />
      </button>
      <button @click="removeTodo" class="btn-icon-danger" aria-label="Delete todo">
        <TrashIcon class="h-5 w-5" />
      </button>
    </div>
  </li>
</template>