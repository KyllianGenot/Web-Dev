<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { CheckBadgeIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  isAuthenticated: boolean
}>();

const emit = defineEmits(['logout']);

const route = useRoute();

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        emit('logout');
    }
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm p-4 flex justify-between items-center sticky top-0 z-40">
    <div class="flex items-center space-x-2">
       <CheckBadgeIcon class="h-7 w-7 text-primary" />
       <component :is="isAuthenticated ? RouterLink : 'div'" :to="isAuthenticated ? '/todos' : undefined" class="focus:outline-none focus:ring-2 focus:ring-primary-light rounded-sm">
            <h1 class="text-xl font-semibold text-gray-900 hover:text-primary-dark transition-colors">
              Taskify
            </h1>
       </component>
    </div>

    <div>
      <button
        v-if="isAuthenticated"
        @click="handleLogout"
        class="btn btn-ghost text-danger hover:bg-danger-lightest flex items-center space-x-1.5 px-3 py-1.5"
        aria-label="Logout"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
        <span>Logout</span>
      </button>

      <div v-else class="flex items-center space-x-3">
         <RouterLink
            v-if="route.path !== '/signin'"
            to="/signin"
            class="btn btn-ghost flex items-center space-x-1.5 px-3 py-1.5 text-gray-700 hover:bg-gray-100"
            active-class="text-primary font-medium"
         >
           <ArrowLeftOnRectangleIcon class="h-5 w-5" />
           <span>Sign In</span>
         </RouterLink>
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