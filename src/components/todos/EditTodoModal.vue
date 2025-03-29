<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import BasicInput from '../BasicInput.vue';
import { updateTodo, Todo } from '../../services/TodoService';
// If using UnoCSS icons: import 'virtual:uno.css' and use i-* classes if needed
// Or keep heroicons component import:
// import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits(['updated', 'close']);

const editedTitle = ref(props.todo.title);
const editedDescription = ref(props.todo.description);
const error = ref('');

// Focus the first input when the modal opens
const titleInputRef = ref<InstanceType<typeof BasicInput> | null>(null);
onMounted(() => {
  // BasicInput doesn't expose its input element directly,
  // focus might need to be handled inside BasicInput or use a standard input.
  // For now, we assume BasicInput might have a focus method or we skip auto-focus.
  // titleInputRef.value?.focus(); // If BasicInput had a focus method
});


async function onSubmit() {
  const title = editedTitle.value.trim();
  const description = editedDescription.value.trim();

  if (!title || !description) {
    error.value = 'Title and Description cannot be empty.';
    return;
  }
  error.value = ''; // Clear error

  const token = localStorage.getItem('token');
  if (!token) {
    error.value = 'Authentication error.';
    return;
  }

  try {
    const updatedTodo = await updateTodo(props.todo._id, {
      title: title, // Use trimmed values
      description: description,
    }, token);
    emit('updated', updatedTodo);
    emit('close'); // Close modal on success
  } catch (err) {
    console.error('Failed to update todo:', err);
    error.value = 'Failed to save changes: ' + ((err as Error).message || 'Unknown error');
  }
}

function handleClose() {
    emit('close');
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
    <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-900">Edit Todo</h3>
         <button @click="handleClose" class="btn-icon text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:ring-gray-300" aria-label="Close modal">
            <!-- Use XMarkIcon or UnoCSS equivalent -->
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
         </button>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
         <div v-if="error" class="error-box">
           {{ error }}
         </div>
        <BasicInput
          id="edit-todo-title"
          type="text"
          label="Title"
          v-model="editedTitle"
          ref="titleInputRef"
        />
        <BasicInput
          id="edit-todo-description"
          type="text"
          label="Description"
          v-model="editedDescription"
        />
        <!-- Actions separated visually -->
        <div class="flex justify-end space-x-3 pt-5 mt-6 border-t border-gray-200">
          <button
            type="button"
            @click="handleClose"
            class="btn-outline-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn-primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>