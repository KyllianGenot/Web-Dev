<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasicInput from '../components/BasicInput.vue';
import { postJSON } from '../api-client/api-client';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

async function onSubmit() {
  error.value = '';
  isLoading.value = true;
  try {
    const response = await postJSON('/api/login', { email: email.value, password: password.value });
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      router.replace('/todos');
    } else {
      error.value = 'Login failed. Please check your credentials.';
    }
  } catch (err: any) {
    if (err.status === 401 || err.data?.message?.includes('Invalid email or password')) {
      error.value = 'Invalid email or password.';
    } else if (err.status === 400) {
      error.value = 'Invalid request. Please check your input.';
    } else {
      error.value = 'Login failed due to a server error. Please try again later.';
    }
    console.error('Login error:', err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex-1 flex items-center justify-center bg-background p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Sign In</h2>
      <div v-if="error" class="error-box mb-6">
        {{ error }}
      </div>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <BasicInput
          id="email"
          type="email"
          label="Email"
          v-model="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
        />
        <BasicInput
          id="password"
          type="password"
          label="Password"
          v-model="password"
          autocomplete="current-password"
          placeholder="Your password"
          show-toggle
          required
        />
        <button
          type="submit"
          class="btn btn-primary w-full py-2.5"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        <router-link to="/signup" class="font-medium text-primary hover:text-primary-dark hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>