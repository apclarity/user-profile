<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user-store";

const usersStore = useUserStore();
const route = useRoute();

const { dataUserByIdD, descriptionProfile } = storeToRefs(usersStore);

onMounted(async () => {
  const id = route.params.id;
  await usersStore.getUserById(id);
});
</script>
<template>
  <div>
    <div
      class="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden"
    >
      <div class="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <div class="px-5 py-2 flex flex-col gap-3 pb-6">
        <div
          class="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white"
        >
          <img
            :src="dataUserByIdD.avatar"
            class="w-full h-full rounded-full object-center object-cover"
          />
        </div>
        <div class="">
          <h3 class="text-xl text-slate-900 relative font-bold leading-6">
            {{ dataUserByIdD.first_name + " " + dataUserByIdD.last_name }}
          </h3>
          <p class="text-sm text-gray-600">{{ dataUserByIdD.email }}</p>
        </div>

        <h4 class="text-md font-medium leading-3">About</h4>
        <p class="text-sm text-stone-500">
          {{ descriptionProfile.text }}
        </p>
      </div>
    </div>
  </div>
</template>