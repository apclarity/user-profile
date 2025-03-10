<script setup>
const props = defineProps({
  usersData: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div
    class="bg-white border border-gray-300 rounded-sm shadow-lg flex justify-center"
  >
    <div class="p-5 flex-col flex">
      <img
        class="rounded-full mx-auto w-24 h-24"
        :src="props.usersData.avatar"
        alt="photo profile"
      />
      <div class="mb-2 text-2xl font-bold text-center text-gray-900">
        {{ props.usersData.first_name + " " + props.usersData.last_name }}
      </div>
      <div class="mb-2 text-lg text-center text-gray-900">
        {{ props.usersData.email }}
      </div>
      <router-link
        :to="'/profile/' + props.usersData.id"
        class="bg-gray-800 hover:bg-gray-600 font-bold rounded-lg text-sm px-5 py-2.5 text-white transition text-center"
      >
        Profile
      </router-link>
    </div>
  </div>
</template>