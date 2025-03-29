<script setup lang="ts">
import { ref, computed } from 'vue';
// Use solid icons for visibility toggle for better clarity
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  id: string;
  type: string;
  label: string;
  modelValue: string;
  placeholder?: string;
  autocomplete?: string;
  showToggle?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isPasswordVisible = ref(false);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emit('update:modelValue', target.value);
  }
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const inputType = computed(() => {
  if (props.type === 'password' && isPasswordVisible.value) {
    return 'text';
  }
  return props.type;
});
</script>

<template>
  <div>
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="relative">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="handleInput"
        class="input"
        :class="{ 'pr-10': showToggle && type === 'password' }"
        :placeholder="placeholder || `Enter ${label.toLowerCase()}`"
        :autocomplete="autocomplete"
      />
      <button
        v-if="showToggle && type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary-light"
        :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
      >
        <!-- Fixed: Use explicit closing tags -->
        <EyeIcon v-if="isPasswordVisible" class="h-5 w-5" aria-hidden="true"></EyeIcon>
        <EyeSlashIcon v-else class="h-5 w-5" aria-hidden="true"></EyeSlashIcon>
      </button>
    </div>
    <!-- Optional: Add space for error messages below input -->
    <!-- <p v-if="error" class="mt-1 text-sm text-danger">{{ error }}</p> -->
  </div>
</template>