<script setup lang="ts">
import Button from 'primevue/button'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import SkeletonHomeVue from './SkeletonHome.vue'

const router = useRouter() // Initialize the router instance
const homeSkeleton = ref(true) // Initially show the skeleton loader

const navigateToTools = async () => {
  router.push({ path: '/tools' }) // Navigate to /tools
}

// Hide the skeleton loader after 3 seconds when the page loads

onMounted(() => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  let delay = 3000 // Default delay

  if (connection) {
    // Adjust delay based on effective type
    switch (connection.effectiveType) {
      case '4g':
        delay = 1000 // Faster network, shorter delay
        break
      case '3g':
        delay = 2000
        break
      case '2g':
        delay = 4000 // Slower network, longer delay
        break
      default:
        delay = 3000 // Fallback to default
    }
  }

  console.log(`Setting skeleton loader delay to: ${delay}ms`)
  setTimeout(() => {
    homeSkeleton.value = false
  }, delay)
})
</script>

<template>
  <div class="bg-poly">
    <!-- Show the skeleton loader when homeSkeleton is true -->
    <SkeletonHomeVue v-if="homeSkeleton" ref="homeSkeleton" />

    <div v-if="!homeSkeleton" class="h-screen flex flex-col items-center justify-center gap-5">
      <h2 class="tilt-warp-regular text-3xl md:text-5xl text-center">
        Unleashing the <span class="text-indigo-700">Power</span> of Web
      </h2>
      <h3 class="lexend-regular text-xl md:text-2xl text-center">
        Perfect for developers, designers, and anyone looking to streamline their creative process!
      </h3>
      <button
        @click="navigateToTools"
        type="button"
        class="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer lexend-regular"
      >
        Get Started
      </button>
    </div>
  </div>
</template>

<style scoped></style>
