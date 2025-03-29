<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import BasicInput from '../BasicInput.vue';
import { updateTodo, Todo } from '../../services/TodoService';

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits(['updated', 'close']);

const editedTitle = ref(props.todo.title);
const editedDescription = ref(props.todo.description);

async function onSubmit() {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const updatedTodo = await updateTodo(props.todo._id, {
      title: editedTitle.value,
      description: editedDescription.value,
    }, token);
    emit('updated', updatedTodo);
    emit('close');
  } catch (err) {
    console.error('Failed to update todo:', err);
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Edit Todo</h3>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <BasicInput id="edit-todo-title" type="text" label="Title" v-model="editedTitle" />
        <BasicInput id="edit-todo-description" type="text" label="Description" v-model="editedDescription" />
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
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