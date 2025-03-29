<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TodoItem from './TodoItem.vue';
import { getTodos, Todo } from '../../services/TodoService';

const router = useRouter();
const todos = ref<Todo[]>([]);
const error = ref('');

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
    todos.value = await getTodos(token);
  } catch (err) {
    error.value = 'Failed to load todos: ' + (err as Error).message;
  }
});

defineExpose({ todos });
</script>

<template>
  <div>
    <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
      {{ error }}
    </div>
    <ul v-if="todos.length" class="space-y-3">
      <TodoItem v-for="todo in todos" :key="todo._id" :todo="todo" @edit="handleEdit" @delete="handleDelete" />
    </ul>
    <div v-else class="text-center text-gray-500">
      No todos yet. Add one above!
    </div>
  </div>
</template>