<script setup lang="ts">
import { ref } from 'vue';
// ... other imports remain the same
import TodoList from '../components/todos/TodoList.vue';
import CreateTodo from '../components/todos/CreateTodo.vue';
import EditTodoModal from '../components/todos/EditTodoModal.vue';
import { Todo } from '../services/TodoService';
import { Bars3Icon } from '@heroicons/vue/24/outline';

// ... script logic remains the same
const todoListRef = ref<{ todos: Todo[] } | null>(null);
const selectedTodo = ref<Todo | null>(null);
const isModalOpen = ref(false);
const isSidebarOpen = ref(false);

function addTodo(newTodo: Todo) {
  if (todoListRef.value) todoListRef.value.todos.unshift(newTodo);
}

function removeTodo(todoId: string) {
  if (todoListRef.value) {
    todoListRef.value.todos = todoListRef.value.todos.filter((t: Todo) => t._id !== todoId);
  }
}

function updateTodo(updatedTodo: Todo) {
  if (todoListRef.value) {
    const index = todoListRef.value.todos.findIndex((t: Todo) => t._id === updatedTodo._id);
    if (index !== -1) {
         todoListRef.value.todos[index] = { ...todoListRef.value.todos[index], ...updatedTodo };
    }
  }
}

function openEditModal(todo: Todo) {
  selectedTodo.value = { ...todo };
  isModalOpen.value = true;
  isSidebarOpen.value = false;
}

function closeModal() {
  isModalOpen.value = false;
  selectedTodo.value = null;
}

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar() {
    isSidebarOpen.value = false;
}

</script>

<template>
  <!-- Cette div racine flex-1 prend toute la hauteur disponible du parent -->
  <div class="flex flex-1">
    <!-- Desktop Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 p-4 hidden md:block flex-shrink-0">
      <div class="h-full flex flex-col">
        <div class="mb-6 mt-2">
          <h2 class="text-lg font-semibold text-gray-900">Navigation</h2>
        </div>
        <nav class="space-y-1">
          <router-link
            to="/todos"
            class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
            active-class="bg-primary-lightest text-primary font-medium"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 flex-shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span>My Todos</span>
          </router-link>
          <!-- Add other navigation links here if needed -->
        </nav>
        <div class="mt-auto text-xs text-gray-400 p-2">
            App Version 1.0.0
        </div>
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay & Sidebar (position: fixed, height is handled differently) -->
    <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out"></div>
    <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
    >
        <aside v-if="isSidebarOpen" class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4 flex flex-col z-50 md:hidden">
            <!-- Mobile Sidebar Content... -->
            <div class="mb-6 mt-2">
              <h2 class="text-lg font-semibold text-gray-900">Navigation</h2>
            </div>
            <nav class="space-y-1">
                <router-link
                    to="/todos"
                    class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
                    active-class="bg-primary-lightest text-primary font-medium"
                    @click="closeSidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 flex-shrink-0">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span>My Todos</span>
                </router-link>
            </nav>
             <div class="mt-auto text-xs text-gray-400 p-2">
                App Version 1.0.0
            </div>
        </aside>
    </transition>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 overflow-y-auto">
      <div class="max-w-3xl mx-auto">
        <!-- Mobile Menu Button -->
        <button
          class="md:hidden mb-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          @click="toggleSidebar"
          aria-label="Open menu"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>

        <h2 class="text-2xl font-semibold text-gray-900 mb-6">My Todos</h2>
        <CreateTodo @created="addTodo" />

        <div class="mt-8">
           <TodoList ref="todoListRef" @edit="openEditModal" @delete="removeTodo" />
        </div>

      </div>
    </main>
  </div>

  <!-- Edit Modal -->
  <EditTodoModal
      v-if="isModalOpen && selectedTodo"
      :todo="selectedTodo"
      @updated="updateTodo"
      @close="closeModal"
  />
</template>