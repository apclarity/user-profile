<script setup>
import Navbar from "../components/Navbar.vue";
import OverlayLoading from "../components/OverlayLoading.vue";
</script>
<template>
  <Navbar />
  <main class="pt-20">
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div class="loader flex items-center justify-center h-screen"></div>
      </template>
    </Suspense>
  </main>
  <OverlayLoading />
</template>