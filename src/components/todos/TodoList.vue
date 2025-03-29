<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import TodoItem from './TodoItem.vue';
import { getTodos, Todo } from '../../services/TodoService';

const router = useRouter();
const todos = ref<Todo[]>([]);
const error = ref('');
const isLoading = ref(true);

const emit = defineEmits<{
  (e: 'edit', todo: Todo): void;
  (e: 'delete', todoId: string): void;
}>();

function handleEdit(todo: Todo) {
  emit('edit', todo);
}

function handleDelete(todoId: string) {
  // Find index before emitting might be useful if parent needs it,
  // but parent already handles filtering by ID.
  emit('delete', todoId);
}

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }
  try {
    isLoading.value = true;
    error.value = '';
    todos.value = await getTodos(token);
  } catch (err) {
    error.value = 'Failed to load todos: ' + ((err as Error).message || 'Network error');
  } finally {
      isLoading.value = false;
  }
});

// Expose todos ref for parent component (TodosView) to modify
defineExpose({ todos });
</script>

<template>
  <div>
    <!-- Loading State -->
     <div v-if="isLoading" class="text-center text-gray-500 py-10">
       Loading todos...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-box mb-6">
      {{ error }}
    </div>

    <!-- Todos List -->
    <ul v-else-if="todos.length" class="space-y-3">
      <TodoItem
        v-for="todo in todos"
        :key="todo._id"
        :todo="todo"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </ul>

    <!-- Empty State -->
    <div v-else class="text-center text-gray-500 py-10 px-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <p class="text-lg font-medium">No todos yet!</p>
      <p class="text-sm">Add your first task using the form above.</p>
    </div>
  </div>
</template>