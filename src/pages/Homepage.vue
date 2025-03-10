<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user-store";
import CardUser from "../components/Card.vue";
import Pagination from "./Pagination.vue";

const usersStore = useUserStore();

const { users, currentPage, totalPages } = storeToRefs(usersStore);

onMounted(async () => {
  await usersStore.getUsers(currentPage.value);
});

const changePage = async (page) => {
  await usersStore.getUsers(page);
};
</script>
<template>
  <div class="max-w-6xl mx-auto px-10 md:px-32">
    <h1 class="text-center text-2xl font-bold">Welcome back!</h1>
    <div v-if="Array.isArray(users) && users.length === 0">Users not found</div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 md:gap-4 gap-6 mt-10"
    >
      <div v-for="(user, index) in users" :key="index">
        <CardUser :usersData="user" />
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="changePage"
      />
    </div>
  </div>
</template>