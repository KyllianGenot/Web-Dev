<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

const isAuthenticated = !!localStorage.getItem('token');
</script>

<template>
  <div>
    <AppHeader />
    <main class="container mx-auto p-4">
      <nav class="mb-4">
        <RouterLink
          v-if="!isAuthenticated"
          to="/signin"
          class="text-blue-600 hover:underline mr-4"
        >
          Sign In
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/signup"
          class="text-blue-600 hover:underline mr-4"
        >
          Sign Up
        </RouterLink>
        <RouterLink
          v-if="isAuthenticated"
          to="/todos"
          class="text-blue-600 hover:underline"
        >
          Todos
        </RouterLink>
      </nav>
      <RouterView />
    </main>
  </div>
</template>