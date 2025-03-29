<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasicInput from '../components/BasicInput.vue';
import { postJSON } from '../api-client/api-client';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

async function onSubmit() {
   error.value = '';
   isLoading.value = true;
   if (!username.value.trim() || !email.value.trim() || !password.value) {
       error.value = 'Please fill in all fields.';
       isLoading.value = false;
       return;
   }

  try {
    await postJSON('/api/users', {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });
    alert('Sign up successful! Please sign in.');
    router.replace('/signin');
  } catch (err: any) {
     if (err.status === 409 || err.message?.includes('duplicate')) {
         error.value = 'Username or email already exists.';
     } else {
        error.value = 'Sign up failed. Please try again.';
     }
    console.error('Signup error:', err);
  } finally {
      isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex-1 flex items-center justify-center bg-background p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Create Account</h2>
      <div v-if="error" class="error-box mb-6">
        {{ error }}
      </div>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <BasicInput
          id="username"
          type="text"
          label="Username"
          v-model="username"
          autocomplete="username"
          placeholder="Choose a username"
          required
        />
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
          autocomplete="new-password"
          placeholder="Create a password"
          show-toggle
          required
        />
        <button
          type="submit"
          class="btn btn-primary w-full py-2.5"
          :disabled="isLoading"
        >
           {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/signin" class="font-medium text-primary hover:text-primary-dark hover:underline">
            Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>