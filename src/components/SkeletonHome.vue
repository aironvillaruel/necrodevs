<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <!-- Full-screen overlay to disable interaction -->
  <div
    class="absolute z-50 w-full h-full top-0 left-0 bg-slate-100 dark:bg-slate-950 dark:text-white"
  >
    <div
      class="p-2 h-16 animate-pulse absolute items-center z-50 w-full bg-gray-200 dark:bg-slate-900 flex justify-between"
    >
      <div class="h-10 w-40 bg-gray-300 dark:bg-slate-800 rounded-full"></div>
      <div class="h-10 w-80 bg-gray-300 dark:bg-slate-800 rounded-full hidden md:block"></div>
      <div class="h-10 w-40 bg-gray-300 dark:bg-slate-800 rounded-full"></div>
    </div>
    <div class="h-screen flex flex-col items-center justify-center gap-5">
      <h2
        class="tilt-warp-regular text-5xl h-12 w-1/2 flex bg-gray-300 dark:bg-slate-800 animate-pulse rounded-full"
      >
        <!-- Fueling Your Web <span class="text-indigo-700">Development</span> Success -->
      </h2>
      <h3
        class="lexend-regular text-2xl h-10 w-3/4 bg-gray-300 dark:bg-slate-800 animate-pulse rounded-full"
      ></h3>
      <button
        type="button"
        class="text-white h-10 bg-gray-300 dark:bg-slate-800 p-2 w-40 animate-pulse rounded-md"
      ></button>
    </div>
  </div>
</template>

<style scoped>
/* Prevent scrolling when the loader is active */
body {
  overflow: hidden;
}
</style>
