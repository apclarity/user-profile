<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const signOut = async () => {
  await authStore.signOut();
  router.push("/");
};
</script>
<template>
  <nav
    class="fixed w-full z-20 top-0 start-0 border-b border-gray-200 bg-white shadow-lg transition-all"
  >
    <div class="block sm:hidden max-w-screen-xl items-center mx-auto p-4">
      <button
        @click="toggleMenu"
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-blue-600 hover:border-blue-600 cursor-pointer"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
    <div
      :class="isMenuOpen ? 'block' : 'hidden'"
      class="w-full md:flex md:justify-center md:items-center md:w-auto"
    >
      <div
        class="text-sm text-center sm:flex-grow p-4 sm:hover:bg-transparent transition"
      >
        <router-link
          to="/home"
          class="no-underline block sm:inline-block hover:text-blue-600 mr-4 font-bold transition"
          active-class="text-blue-600"
        >
          Home
        </router-link>
        <router-link
          to="/playground"
          class="no-underline block sm:inline-block hover:text-blue-600 mr-4 font-bold transition"
          active-class="text-blue-600"
        >
          Playground
        </router-link>
      </div>
    </div>
    <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
      <button
        @click="signOut"
        class="bg-gray-800 hover:bg-gray-600 rounded-lg text-sm px-3 py-1.5 text-white transition cursor-pointer"
      >
        Sign out
      </button>
    </div>
  </nav>
</template>