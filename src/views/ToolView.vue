<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Tools from '../components/Tools.vue'
import SkeletonTools from '../components/SkeletonTools.vue'

const route = useRoute()
const router = useRouter()

// Define types for category and search
const selectedCategory = ref<string | undefined>(route.params.category as string | undefined)

const searchQuery = ref<string>(
  route.params.search
    ? Array.isArray(route.params.search)
      ? route.params.search[0]
      : route.params.search
    : '',
) // Handle string[] or null cases

// Declare toolSkeleton as a ref to control visibility of the SkeletonTools component
const toolSkeleton = ref<boolean>(true) // Initially true to show the skeleton loader

console.log(searchQuery)

// Handle category selection from the Sidebar
const handleCategorySelection = (categoryName: string) => {
  selectedCategory.value = categoryName
  router.push(`/tools/category/${categoryName}`) // Update the route dynamically
}

// Handle search from Sidebar (or search input)
const handleSearch = (query: string) => {
  searchQuery.value = query
  console.log('Search query updated to:', searchQuery.value)

  router.push(`/tools/search/${query}`) // Update the route dynamically with the search query
}

// Watch for route changes to update the selected category and search query
watch(
  () => route.params,
  (newParams) => {
    // Assign undefined instead of null to match the type string | undefined
    selectedCategory.value = newParams.category ? (newParams.category as string) : undefined
    searchQuery.value = newParams.searchQuery ? (newParams.searchQuery as string) : '' // Ensure it's a string or empty string
  },
)

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
    toolSkeleton.value = false // After the delay, hide the skeleton loader
  }, delay)
})
</script>

<template>
  <div class="flex flex-row pt-10 h-screen">
    <!-- Sidebar -->
    <SkeletonTools v-if="toolSkeleton" ref="toolSkeleton" />

    <Sidebar
      @selectCategory="handleCategorySelection"
      @search="handleSearch"
      :selectedCategory="selectedCategory"
    />

    <!-- Tools -->
    <Tools :selectedCategory="selectedCategory" :searchQuery="searchQuery" />
  </div>
</template>
