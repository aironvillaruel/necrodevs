<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

interface Item {
  name: string
  description: string
}

interface Category {
  id: string
  name: string
  icon: string
  items: Item[]
}

const categories = ref<Category[]>([]) // Type the categories as an array of Category objects
const searchItem = ref<Item[]>([]) // Type the search items as an array of Item objects
const searchQuery = ref('')

const router = useRouter()

// Fetch the data from the external JSON file
onMounted(async () => {
  try {
    const response = await fetch('/data.json')
    const jsonData = await response.json()
    categories.value = jsonData.categories
    searchItem.value = jsonData.categories.flatMap((category: Category) => category.items)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})

// Filter items based on the search query (only items, not categories)
const searchItems = () => {
  const query = searchQuery.value.toLowerCase()

  searchItem.value = categories.value.flatMap((category) =>
    category.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
    ),
  )
}

// Emit the selected category or filtered results to the parent component
const emit = defineEmits(['selectCategory', 'updateFilteredCategories', 'updateSearchedItem'])
const selectCategory = (categoryName: string) => {
  closeSidebar()
  emit('selectCategory', categoryName)
}

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar')
  if (sidebar) {
    sidebar.classList.remove('hidden')
  }
}

const closeSidebar = () => {
  const sidebar = document.getElementById('sidebar')
  if (sidebar) {
    sidebar.classList.add('hidden')
  }
}

watch(searchQuery, () => {
  searchItems()
  emit('updateSearchedItem', searchItem.value)
})
</script>

<template>
  <button
    @click="toggleSidebar"
    class="bg-indigo-700 block md:hidden text-white lexend-regular fixed top-20 writing-mode-vertical-lr p-1 w-20 rounded-r-lg"
  >
    Open
  </button>
  <div
    id="sidebar"
    class="bg-white absolute md:static hidden md:flex dark:bg-slate-900 shadow-xl w-full z-10 md:w-1/6 p-2 pt-10 flex-col gap-10 border border-slate-200 dark:border-slate-700"
  >
    <ul class="p-2 flex flex-col gap-2 overflow-y-auto no-scrollbar">
      <div class="w-full flex justify-end items-center p-2">
        <button @click="closeSidebar" class="md:hidden block dark:text-white lexend-regular">
          <i class="pi pi-times"></i>
        </button>
      </div>
      <li v-for="category in categories" :key="category.id" class="p-2">
        <a
          href="#"
          class="hover:text-slate-500 lexend-regular flex items-center gap-2"
          @click.prevent="selectCategory(category.name)"
        >
          <i :class="`pi ${category.icon}`"></i>{{ category.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Hide scrollbar but allow scrolling */
.no-scrollbar {
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}
</style>
