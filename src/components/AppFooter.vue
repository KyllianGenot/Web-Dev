<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm mt-12">
    <p>© {{ currentYear }} Taskify. All rights reserved.</p>
    <p class="mt-1">
      Built by Kyllian |
      <a
        href="https://github.com/KyllianGenot"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:text-primary-dark hover:underline"
      >
        GitHub
      </a>
    </p>
  </footer>
</template>