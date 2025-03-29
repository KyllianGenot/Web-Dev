<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { RouterLink, useRoute } from 'vue-router'; // Import useRoute
// Import an icon for branding and logout
import { CheckBadgeIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/vue/24/outline';

// Define props to accept authentication status
const props = defineProps<{
  isAuthenticated: boolean
}>();

const emit = defineEmits(['logout']);

const route = useRoute(); // Get the current route object

function handleLogout() {
    // Confirmation is good practice
    if (confirm('Are you sure you want to logout?')) {
        emit('logout');
    }
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm p-4 flex justify-between items-center sticky top-0 z-40">
    <!-- Branding Section -->
    <div class="flex items-center space-x-2">
       <CheckBadgeIcon class="h-7 w-7 text-primary" />
        <!-- Link to todos if authenticated, otherwise just display name -->
       <component :is="isAuthenticated ? RouterLink : 'div'" :to="isAuthenticated ? '/todos' : undefined" class="focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm">
            <h1 class="text-xl font-semibold text-gray-900 hover:text-primary-dark transition-colors">
              Taskify
            </h1>
       </component>
    </div>

    <!-- Actions Section (Conditional) -->
    <div>
      <!-- Show Logout button if authenticated -->
      <button
        v-if="isAuthenticated"
        @click="handleLogout"
        class="btn btn-ghost text-danger hover:bg-danger-lightest flex items-center space-x-1.5 px-3 py-1.5"
        aria-label="Logout"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
        <span>Logout</span>
      </button>

      <!-- Show Sign In / Sign Up links if not authenticated, based on current route -->
      <div v-else class="flex items-center space-x-3">
         <!-- Show Sign In button ONLY if NOT on the signin page -->
         <RouterLink
            v-if="route.path !== '/signin'"
            to="/signin"
            class="btn btn-ghost flex items-center space-x-1.5 px-3 py-1.5 text-gray-700 hover:bg-gray-100"
            active-class="text-primary font-medium"
         >
           <ArrowLeftOnRectangleIcon class="h-5 w-5" />
           <span>Sign In</span>
         </RouterLink>
         <!-- Show Sign Up button ONLY if NOT on the signup page -->
         <RouterLink
            v-if="route.path !== '/signup'"
            to="/signup"
            class="btn btn-primary flex items-center space-x-1.5 px-3 py-1.5"
            active-class="ring-2 ring-offset-1"
         >
            <UserPlusIcon class="h-5 w-5" />
            <span>Sign Up</span>
         </RouterLink>
      </div>
    </div>
  </header>
</template>