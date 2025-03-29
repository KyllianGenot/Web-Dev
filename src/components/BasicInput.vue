<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  id: string;
  type: string;
  label: string;
  modelValue: string;
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
  <div class="relative">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="inputType"
      :value="modelValue"
      @input="handleInput"
      class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      :placeholder="`Enter ${label.toLowerCase()}`"
    />
    <button
      v-if="showToggle && type === 'password'"
      type="button"
      @click="togglePasswordVisibility"
      class="absolute right-2 top-9 text-gray-500"
    >
      {{ isPasswordVisible ? 'Hide' : 'Show' }}
    </button>
  </div>
</template>