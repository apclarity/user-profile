<script setup>
import { storeToRefs } from "pinia";
import { useLoadingStore } from "../store/loading-store";

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-md z-50 flex items-center justify-center"
  >
    <div
      class="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg z-50"
    >
      <svg
        class="animate-spin h-16 w-16 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span class="text-xl font-semibold text-gray-700 mt-4">Loading...</span>
    </div>
  </div>
</template>
