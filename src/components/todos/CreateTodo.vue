<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import BasicInput from '../BasicInput.vue';
import { createTodo, Todo } from '../../services/TodoService';
// Use UnoCSS icon preset directly: i-{collection}-{icon-name}
// Example: i-heroicons-plus-20-solid (check available icons/syntax)
// Or keep using the component if preferred, UnoCSS preset should style it via `presetIcons` config
import { PlusIcon } from '@heroicons/vue/20/solid'; // Using solid variant for filled look in button

const newTodoTitle = ref('');
const newTodoDescription = ref('');
const formError = ref('');
const emit = defineEmits(['created']);

async function onSubmit() {
  // Trim values before checking
  const title = newTodoTitle.value.trim();
  const description = newTodoDescription.value.trim();

  if (!title) {
    formError.value = 'Title is required.';
    return;
  }
  if (!description) {
    formError.value = 'Description is required.';
    return;
  }
  formError.value = ''; // Clear error on successful validation

  const token = localStorage.getItem('token');
  if (!token) {
      formError.value = 'Authentication error. Please sign in again.';
      // Optionally redirect to login
      return;
  }

  try {
    // Pass trimmed values
    const newTodo: Todo = await createTodo(title, description, token);
    emit('created', newTodo);
    // Clear fields after successful creation
    newTodoTitle.value = '';
    newTodoDescription.value = '';
  } catch (err) {
    formError.value = 'Failed to create todo: ' + ((err as Error).message || 'Unknown error');
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="card mb-6">
    <div v-if="formError" class="error-box mb-4">
      {{ formError }}
    </div>
    <div class="space-y-4">
       <div>
         <BasicInput
           id="new-todo-title"
           type="text"
           label="Title"
           v-model="newTodoTitle"
           placeholder="What needs to be done?"
         />
       </div>
       <div>
         <BasicInput
           id="new-todo-description"
           type="text"
           label="Description"
           v-model="newTodoDescription"
           placeholder="Add more details..."
         />
       </div>
    </div>
    <button type="submit" class="btn-primary w-full mt-5">
      <!-- Ensure icon color is handled correctly by button text color -->
      <PlusIcon class="h-5 w-5 mr-2" aria-hidden="true" />
      <span>Add Todo</span>
    </button>
  </form>
</template>