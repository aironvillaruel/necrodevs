<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Item, Category, Data } from '../types' // Ensure the types match the structure of the JSON
import Card from './Card.vue'

// Define the component props
const props = defineProps({
  selectedCategory: String,
})

// Correctly define the data type as an object with a categories array
const data = ref<Data | null>(null)
const filteredCategory = ref<Category | null>(null)
const searchedItems = ref<Item[]>([])
const isSorted = ref(false)
const featuredItems = ref<Item[]>([])
const searchQuery = ref('')

// Fetch data from JSON file
const fetchData = async () => {
  try {
    const response = await fetch('/data.json')
    const jsonData: Data = await response.json() // Ensure the response matches the correct type
    data.value = jsonData

    if (data.value && data.value.categories) {
      // Filter featured items
      featuredItems.value = data.value.categories.flatMap((category) =>
        category.items.filter((item) => item.isFeatured === 1),
      )

      // Handle selectedCategory
      if (props.selectedCategory) {
        filteredCategory.value =
          data.value.categories.find((category) => category.name === props.selectedCategory) || null
      }
    } else {
      console.error('Fetched data does not contain categories:', data.value)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Watch for changes in searchQuery and filter items dynamically
watch(searchQuery, (newQuery) => {
  if (data.value && Array.isArray(data.value.categories)) {
    searchedItems.value = data.value.categories.flatMap((category) =>
      category.items.filter((item) => item.name.toLowerCase().includes(newQuery.toLowerCase())),
    )
  }
})

// Toggle sorting of items
const toggleSort = () => {
  isSorted.value = !isSorted.value
  const sortOrder = isSorted.value ? 1 : -1 // 1 for A-Z, -1 for Z-A

  // Define a reusable sorting function
  const sortByName = (a: Item, b: Item) => sortOrder * a.name.localeCompare(b.name)

  if (searchedItems.value.length) {
    // Sort searchedItems if they exist
    searchedItems.value.sort(sortByName)
  } else if (filteredCategory.value && filteredCategory.value.items) {
    // Sort filteredCategory items if filteredCategory exists
    filteredCategory.value.items.sort(sortByName)
  } else if (featuredItems.value) {
    // Sort featuredItems if no category is filtered
    featuredItems.value.sort(sortByName)
  }
}

onMounted(() => {
  fetchData()
})

watch(
  () => props.selectedCategory,
  (newCategory) => {
    if (data.value && data.value.categories) {
      filteredCategory.value =
        data.value.categories.find((category) => category.name === newCategory) || null
      searchedItems.value = []
    }
  },
)
</script>

<template>
  <div
    class="flex-1 pt-20 overflow-auto px-5 flex flex-col items-center gap-5 bg-slate-100 dark:bg-slate-950"
  >
    <div class="flex flex-col gap-2 md:gap-0 md:flex-row justify-between w-full items-center">
      <div class="w-full justify-center md:justify-start md:w-1/4 flex items-center flex-row">
        <button
          @click="toggleSort"
          class="lexend-regular bg-indigo-600 text-xs text-white md:px-4 md:py-2 p-2 md:p-0 rounded hover:bg-indigo-600 focus:outline-none"
        >
          Sort A-Z
        </button>
      </div>

      <h2 class="tilt-warp-regular text-xl md:text-3xl w-1/2 text-center text-indigo-700">
        {{ filteredCategory?.name || 'Featured Website' }}
      </h2>
      <form class="max-w-md md:w-1/4 mx-auto relative" @submit.prevent>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="md:relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-slate-500 dark:text-slate-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="Search..."
          />
        </div>
      </form>
    </div>

    <hr class="border-gray-800 dark:border-white h-2" />

    <!-- Display cards -->
    <div v-if="filteredCategory" class="flex flex-wrap gap-5 justify-center w-full p-2">
      <Card
        v-for="item in searchedItems.length ? searchedItems : filteredCategory.items"
        :key="item.id"
        :name="item.name"
        :description="item.description"
        :link="item.link"
        :image="item.image"
      />
    </div>
    <div v-if="!filteredCategory" class="flex flex-wrap gap-5 justify-center w-full p-2">
      <Card
        v-for="item in searchedItems.length ? searchedItems : featuredItems"
        :key="item.id"
        :name="item.name"
        :description="item.description"
        :link="item.link"
        :image="item.image"
      />
    </div>
  </div>
</template>

<style scoped></style>
