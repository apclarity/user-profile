<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import FormCreateUser from "../components/FormCreateUser.vue";
import { useUserStore } from "../store/user-store";
import { convertToWIB } from "../helpers/helper";

const userStore = useUserStore();
const { listUser } = storeToRefs(userStore);

const editingUserId = ref(null);

const editingUser = ref({
  name: "",
  job: "",
});

const loadingUserId = ref(null);

const editUser = (user) => {
  editingUserId.value = user.id;
  editingUser.value = { ...user };
};

const updateUser = async () => {
  if (!editingUserId.value) return;

  loadingUserId.value = editingUserId.value;
  const updatedUser = await userStore.editUser(editingUser.value);
  if (updatedUser) {
    editingUserId.value = null;
  }
  loadingUserId.value = null;
};

const deleteUser = async (id) => {
  loadingUserId.value = id;
  await userStore.deleteUser(id);
  loadingUserId.value = null;
};
</script>
<template>
  <div class="max-w-6xl mx-auto px-10 md:px-32">
    <div class="max-w-xl mx-auto">
      <FormCreateUser />
    </div>
    <div
      class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
      v-if="listUser.length > 0"
    >
      <div
        v-for="user in listUser"
        :key="user.id"
        class="card p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg flex flex-col"
      >
        <div v-if="editingUserId === user.id">
          <input
            type="text"
            v-model="editingUser.name"
            class="bg-gray-200 border rounded p-2 w-full mb-2"
          />
          <input
            type="text"
            v-model="editingUser.job"
            class="bg-gray-200 border rounded p-2 w-full mb-2"
          />
        </div>
        <div v-else>
          <h3 class="font-semibold text-xl">{{ user.name }}</h3>
          <p class="text-sm text-black">{{ user.job }}</p>
          <p class="text-xs text-black">ID: {{ user.id }}</p>
          <p class="text-xs text-black">
            Created at: {{ convertToWIB(user.createdAt) }}
          </p>
        </div>
        <div class="mt-auto">
          <button
            v-if="editingUserId !== user.id"
            :class="[
              'bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 mt-3 rounded text-sm mr-2',
              { 'cursor-not-allowed bg-gray-400': loadingUserId !== null },
            ]"
            @click="editUser(user)"
            :disabled="loadingUserId !== null"
          >
            Edit
          </button>
          <button
            v-else
            :class="[
              'bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 mt-3 rounded text-sm mr-2',
              { 'cursor-not-allowed bg-gray-400': loadingUserId !== null },
            ]"
            @click="updateUser"
            :disabled="loadingUserId !== null"
          >
            {{ loadingUserId === user.id ? "Saving..." : "Save" }}
          </button>
          <button
            v-if="editingUserId !== user.id"
            :class="[
              'bg-red-500 hover:bg-red-400 text-white px-4 py-1 mt-3 rounded text-sm',
              { 'cursor-not-allowed bg-red-300': loadingUserId !== null },
            ]"
            @click="deleteUser(user.id)"
            :disabled="loadingUserId !== null"
          >
            {{ loadingUserId === user.id ? "Deleting..." : "Delete" }}
          </button>
          <button
            v-else
            :class="[
              'bg-red-500 hover:bg-red-400 text-white px-4 py-1 mt-3 rounded text-sm',
              { 'cursor-not-allowed bg-red-300': loadingUserId !== null },
            ]"
            @click="editingUserId = null"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 mt-5">No users found.</div>
  </div>
</template>