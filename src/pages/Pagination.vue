<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits();

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-changed", page);
  }
};
</script>

<template>
  <div class="flex justify-center mt-6">
    <button
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      class="px-2 py-2 text-sm font-bold bg-white border text-black rounded-lg mr-2 disabled:opacity-50"
    >
      Previous
    </button>
    <span class="px-2 py-2 text-sm">
      {{ currentPage }} / {{ totalPages }}
    </span>
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      class="px-2 py-2 text-sm font-bold bg-white border text-black rounded-lg ml-2 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
