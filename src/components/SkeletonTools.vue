<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <!-- Full-screen overlay to disable interaction -->
  <div class="fixed z-50 w-full h-full top-0 left-0 bg-slate-100 dark:bg-slate-950 dark:text-white">
    <div
      class="p-2 animate-pulse h-16 items-center z-50 w-full bg-gray-200 dark:bg-slate-900 flex justify-between"
    >
      <div class="h-10 w-40 bg-gray-300 dark:bg-slate-800 rounded-full"></div>
      <div class="h-10 w-80 bg-gray-300 dark:bg-slate-800 rounded-full hidden md:block"></div>
      <div class="h-10 w-10 md:w-40 bg-gray-300 dark:bg-slate-800 rounded-full"></div>
    </div>
    <div class="flex flex-row w-full">
      <div
        class="animate-pulse h-8 w-20 block md:hidden fixed z-10 bg-gray-300 dark:bg-slate-800 rounded-full"
      ></div>

      <div
        class="h-screen bg-gray-200 hidden md:block dark:bg-slate-900 shadow-xl w-1/6 p-2 pt-12 flex-col gap-10 animate-pulse"
      >
        <div class="w-full p-2 flex gap-4 flex-col">
          <div class="h-10 w-full bg-gray-300 dark:bg-slate-800 rounded-md"></div>
          <div class="h-10 w-full bg-gray-300 dark:bg-slate-800 rounded-md"></div>
          <div class="h-10 w-full bg-gray-300 dark:bg-slate-800 rounded-md"></div>
          <div class="h-10 w-full bg-gray-300 dark:bg-slate-800 rounded-md"></div>
          <div class="h-10 w-full bg-gray-300 dark:bg-slate-800 rounded-md"></div>
          <div class="h-10 w-full bg-gray-300 dark:bg-slate-800 rounded-md"></div>
        </div>
      </div>
      <div class="flex-1 pt-4 justify-center px-5 flex flex-col gap-5 animate-pulse">
        <div class="w-full flex flex-col items-center gap-5 justify-center p-2">
          <div class="h-10 w-1/4 bg-gray-200 dark:bg-slate-800 rounded-md"></div>
          <div class="h-10 w-1/2 bg-gray-200 dark:bg-slate-800 rounded-full"></div>
          <div class="h-10 w-3/4 bg-gray-200 dark:bg-slate-800 rounded-md"></div>
        </div>
        <div class="w-full flex flex-col md:flex-row gap-2 justify-between p-2">
          <div class="h-80 md:w-1/4 max-w-sm bg-gray-300 dark:bg-slate-800 rounded-xl"></div>
          <div class="h-80 md:w-1/4 max-w-sm bg-gray-300 dark:bg-slate-800 rounded-xl"></div>
          <div class="h-80 md:w-1/4 max-w-sm bg-gray-300 dark:bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prevent scrolling when the loader is active */
body {
  overflow: hidden;
}
</style>
