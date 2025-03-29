<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasicInput from './BasicInput.vue';
import { postJSON } from '../api-client/api-client';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

async function onSubmit() {
  try {
    const response = await postJSON('/api/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('token', response.token);
    router.push('/todos');
  } catch (err) {
    error.value = 'Invalid email or password';
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
        {{ error }}
      </div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <BasicInput
            id="email"
            type="email"
            label="Email"
            v-model="email"
            autocomplete="email"
          />
        </div>
        <div>
          <BasicInput
            id="password"
            type="password"
            label="Password"
            v-model="password"
            autocomplete="current-password"
            show-toggle
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-blue-600 hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>