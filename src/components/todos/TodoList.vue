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

defineExpose({ todos });
</script>

<template>
  <div>
     <div v-if="isLoading" class="text-center text-gray-500 py-10">
       Loading todos...
    </div>

    <div v-else-if="error" class="error-box mb-6">
      {{ error }}
    </div>

    <ul v-else-if="todos.length" class="space-y-3">
      <TodoItem
        v-for="todo in todos"
        :key="todo._id"
        :todo="todo"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </ul>

    <div v-else class="text-center text-gray-500 py-10 px-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <p class="text-lg font-medium">No todos yet!</p>
      <p class="text-sm">Add your first task using the form above.</p>
    </div>
  </div>
</template>