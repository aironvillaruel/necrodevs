<script setup lang="ts">
defineProps({
  name: String,
  description: String,
  link: String,
  image: String,
})
</script>

<template>
  <div
    class="md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-slate-800 dark:border-slate-700 p-4"
  >
    <a :href="link" target="_blank">
      <img class="rounded-t-lg w-full h-1/2" :src="`/${image}`" :alt="name" />
    </a>
    <div class="p-5 flex flex-col gap-1 md:gap-3">
      <a :href="link" target="_blank">
        <h5
          class="mb-2 text-xl md:text-2xl lexend-regular font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ name }}
        </h5>
      </a>
      <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
        {{ description }}
      </p>
      <a
        :href="link"
        target="_blank"
        class="flex items-center lexend-regular justify-center px-3 py-1 md:py-2 w-20 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        style="margin-top: auto"
      >
        Visit
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Add padding to the container to ensure spacing */
div {
  padding: 1rem;
}
</style>
