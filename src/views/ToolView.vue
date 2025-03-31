<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Tools from '../components/Tools.vue'
import SkeletonTools from '../components/SkeletonTools.vue'

const route = useRoute()
const router = useRouter()
const selectedCategory = ref(route.params.category || null) // Get category from route params
const toolSkeleton = ref(true) // Initially show the skeleton loader
const searchQuery = ref(route.params.search || '') // Get searchQuery from route params
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
    selectedCategory.value = newParams.category || null
    searchQuery.value = newParams.searchQuery || ''
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
    toolSkeleton.value = false
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
