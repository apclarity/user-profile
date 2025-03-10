<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user-store";

const userStore = useUserStore();

const formCreate = ref({
  name: "",
  job: "",
});

const isLoading = ref(false);

const createNewUser = async () => {
  isLoading.value = true;

  const addUser = {
    name: formCreate.value.name,
    job: formCreate.value.job,
  };
  const createdUser = await userStore.createUser(addUser);
  if (createdUser) {
    isLoading.value = false;
  } else {
    isLoading.value = false;
  }
};
</script>
<template>
  <form @submit.prevent="createNewUser">
    <label class="block text-sm font-medium mb-1">Name</label>
    <input
      type="text"
      class="bg-gray-200 border-0 rounded-lg p-2.5 text-sm w-full"
      v-model="formCreate.name"
      required
    />
    <label class="block text-sm font-medium mb-1 mt-2">Job</label>
    <input
      type="text"
      class="bg-gray-200 border-0 rounded-lg p-2.5 text-sm w-full"
      v-model="formCreate.job"
      required
    />
    <button
      type="submit"
      :disabled="isLoading"
      v-if="!isLoading"
      class="bg-gray-800 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-white transition mt-5"
    >
      Add user
    </button>
    <button
      v-if="isLoading"
      disabled
      class="bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-white transition mt-5"
    >
      <span class="loader"></span>
    </button>
  </form>
</template>