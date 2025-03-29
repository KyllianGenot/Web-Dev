<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, RouterView, useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

const router = useRouter();
const route = useRoute();

const isAuthenticated = computed(() => {
    const currentPath = route.path;
    console.log("Checking auth status for path:", currentPath);
    if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem('token');
        return !!token;
    }
    return false;
});

const useSidebarLayout = computed(() => {
    return route.path.startsWith('/todos');
});

function logout() {
  if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      router.replace('/signin');
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background font-sans">
    <AppHeader :is-authenticated="isAuthenticated" @logout="logout" />

    <main class="flex-1 flex flex-col" :class="{ 'overflow-hidden': useSidebarLayout }">
      <RouterView class="flex-1 flex flex-col" />
    </main>

    <AppFooter />
  </div>
</template>