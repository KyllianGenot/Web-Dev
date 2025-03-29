<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, RouterView, useRoute } from 'vue-router'; // Import useRoute
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

const router = useRouter();
const route = useRoute(); // Get the current route

// Calculate authentication status based on token presence
// *** MODIFIED: Add route.path as a dependency to force re-evaluation on navigation ***
const isAuthenticated = computed(() => {
    // Reading route.path makes this computed reactive to route changes
    const currentPath = route.path;
    console.log("Checking auth status for path:", currentPath); // Debug log
    // Check if running in a browser environment before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem('token');
        console.log("Token found:", !!token); // Debug log
        return !!token;
    }
    return false; // Default to false if localStorage is not available (SSR etc.)
});

// Determine if the current route uses the sidebar layout
const useSidebarLayout = computed(() => {
    // Add any other routes that use the sidebar here
    return route.path.startsWith('/todos');
});

function logout() {
  if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      // Use router.replace for logout to avoid adding login page to history stack
      router.replace('/signin');
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background font-sans">
    <!-- Header is always rendered, receives reactive auth status as prop -->
    <AppHeader :is-authenticated="isAuthenticated" @logout="logout" />

    <!-- Main content section that prend toute la hauteur disponible entre header et footer -->
    <main class="flex-1 flex flex-col" :class="{ 'overflow-hidden': useSidebarLayout }">
      <RouterView class="flex-1 flex flex-col" />
    </main>

    <AppFooter />
  </div>
</template>