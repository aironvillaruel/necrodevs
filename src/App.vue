<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Menubar from 'primevue/menubar'
import { ref, onMounted } from 'vue'
import packageJson from '../package.json' // Import package.json to get the version
import Modal from './components/Modal.vue'

const router = useRouter()
const route = useRoute() // Get the current route
const isDarkMode = ref(false)
const supportModal = ref<typeof Modal | null>(null) // Explicitly type the ref
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
  const html = document.documentElement
  if (isDarkMode.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

const openBtnModal = () => {
  if (supportModal.value) {
    // Check if supportModal is not null
    supportModal.value.openModal()
    console.log('test')
  } else {
    console.error('Support modal is not available')
  }
}
// Retrieve dark mode preference on component mount
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})

const navigateWithLoader = async (path: string) => {
  const dropdown = document.getElementById('dropdown-content')
  if (dropdown) {
    dropdown.classList.add('hidden')
  }
  router.push({ path }) // Navigate to the route
}

const navigateToHome = () => navigateWithLoader('/')
const navigateToAbout = () => navigateWithLoader('/about')
const navigateToTools = () => navigateWithLoader('/tools')
const navigateToContact = () => navigateWithLoader('/contact')

const showDropdown = () => {
  const dropdown = document.getElementById('dropdown-content')
  if (dropdown) {
    dropdown.classList.toggle('hidden')
  }
}

const appVersion = packageJson.version // Extract the version
</script>
<template>
  <div class="flex flex-col bg-slate-100 dark:bg-slate-950 dark:text-white">
    <!-- Show the skeleton loader when homeSkeleton is true -->
    <header
      class="hidden md:flex p-2 justify-between bg-white dark:bg-slate-900 shadow-lg fixed top-0 left-0 w-full z-50"
    >
      <div class="flex items-center p-2 w-1/4">
        <img src="/public/logo.png" class="w-10" alt="" />
        <h2 class="text-xl tilt-warp-regular">Necro<span class="text-indigo-600">Devs</span></h2>
      </div>
      <div class="p-2 flex flex-row gap-10 w-1/2 justify-center">
        <button
          @click="navigateToHome"
          :class="{
            'border-b-2 border-indigo-700': route.path === '/',
            'hover:border-b-indigo-700 hover:scale-105 transition-all duration-300': true,
          }"
          class="lexend-regular cursor-pointer"
        >
          Home
        </button>
        <button
          @click="navigateToTools"
          :class="{
            'border-b-2 border-indigo-700': route.path.startsWith('/tools'),
            'hover:border-b-indigo-700 hover:scale-105 transition-all duration-300': true,
          }"
          class="lexend-regular cursor-pointer"
        >
          Tools
        </button>
        <button
          @click="navigateToAbout"
          :class="{
            'border-b-2 border-indigo-700': route.path === '/about',
            'hover:border-b-indigo-700 hover:scale-105 transition-all duration-300': true,
          }"
          class="lexend-regular cursor-pointer"
        >
          About
        </button>
        <button
          @click="navigateToContact"
          :class="{
            'border-b-2 border-indigo-700': route.path === '/contact',
            'hover:border-b-indigo-700 hover:scale-105 transition-all duration-300': true,
          }"
          class="lexend-regular cursor-pointer"
        >
          Contact
        </button>
      </div>
      <div class="p-2 w-1/4 flex items-center justify-end gap-2">
        <h2 class="lexend-regular text-xs">V{{ appVersion }}</h2>
        <button
          @click="toggleDarkMode"
          class="text-sm p-2 bg-gray-200 dark:bg-gray-700 rounded-full h-10 w-10 cursor-pointer hover:scale-105 transtion-all duration-300 flex items-center justify-center"
        >
          <i :class="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'"></i>
        </button>

        <button
          @click="openBtnModal"
          class="cursor-pointer border-slate-700 hover:scale-105 transition-all duration-300 border dark:border-white p-2 rounded-md lexend-regular"
        >
          Support
        </button>
      </div>
    </header>

    <!-- for mobile -->
    <header
      class="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 shadow-lg fixed top-0 left-0 w-full z-50"
    >
      <div class="flex items-center p-2 w-1/4">
        <img src="/public/logo.png" class="w-10" alt="" />
        <h2 class="text-xl tilt-warp-regular">Necro<span class="text-indigo-600">Devs</span></h2>
      </div>
      <div class="p-2">
        <button @click="showDropdown"><i class="pi pi-bars text-2xl text-indigo-700"></i></button>
      </div>
      <div
        id="dropdown-content"
        class="absolute hidden z-50 flex items-center gap-3 bg-indigo-700 p-2 shadow-xl top-14 w-full flex-col"
      >
        <div class="flex flex-col gap-10 w-1/2 justify-center">
          <ul class="flex flex-col gap-5 p-2 items-center">
            <li
              @click="navigateToHome"
              :class="{
                'border-b-2 border-white': route.path === '/',
                'hover:border-b-white text-white hover:scale-105 transition-all duration-300': true,
              }"
              class="lexend-regular cursor-pointer w-16 text-center"
            >
              Home
            </li>
            <li
              @click="navigateToTools"
              :class="{
                'border-b-2 border-white': route.path.startsWith('/tools'),
                'hover:border-b-white hover:scale-105 transition-all duration-300': true,
              }"
              class="lexend-regular cursor-pointer w-16 text-center text-white"
            >
              Tools
            </li>
            <li
              @click="navigateToAbout"
              :class="{
                'border-b-2 border-white': route.path === '/about',
                'hover:border-b-white hover:scale-105 transition-all duration-300': true,
              }"
              class="lexend-regular cursor-pointer w-16 text-center text-white"
            >
              About
            </li>
            <li
              @click="navigateToContact"
              :class="{
                'border-b-2 border-white': route.path === '/contact',
                'hover:border-b-white hover:scale-105 transition-all duration-300': true,
              }"
              class="lexend-regular cursor-pointer w-16 text-center text-white"
            >
              Contact
            </li>
            <li
              @click="toggleDarkMode"
              class="lexend-regular w-40 cursor-pointer text-center text-white"
            >
              <span class="mr-5">Theme: </span>
              <span :class="isDarkMode ? 'Dark' : 'Light'">{{
                isDarkMode ? 'Dark' : 'Light'
              }}</span>
            </li>
          </ul>
        </div>

        <button
          @click="openBtnModal"
          class="cursor-pointer text-white hover:scale-105 transition-all duration-300 border border-white p-2 rounded-md lexend-regular"
        >
          Support
        </button>

        <h2 class="lexend-regular text-xs">V{{ appVersion }}</h2>
      </div>
    </header>

    <Modal ref="supportModal"
      ><h2 class="dark:text-white tilt-warp-regular text-2xl">Join Our Community</h2>
      <p class="font-semibold lexend-regular text-center">
        We invite you to explore our platform and make it your primary resource for web development
        tools. If you have suggestions for tools to add or feedback on our website, please don’t
        hesitate to reach out. Together, we can build a thriving community of developers who are
        equipped with the best resources available.
      </p>
      <p class="lexend-regular text-center">
        Thank you for visiting <span class="text-indigo-600 lexend-regular">NecroDevs</span>. Let’s
        build something great together!
      </p>
      <p class="lexend-regular text-xl">-Tobio-</p>
    </Modal>
    <RouterView />
  </div>
</template>

<style>
.bg-poly {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1129%26quot%3b)' fill='none'%3e%3cpath d='M123.06 -137.62L274.62 -50.12L274.62 124.88L123.06 212.38L-28.5 124.88L-28.5 -50.12zM426.18 387.38L577.74 474.88L577.74 649.88L426.18 737.38L274.62 649.88L274.62 474.88zM880.85 124.88L1032.41 212.38L1032.41 387.38L880.85 474.88L729.3 387.38L729.3 212.38zM1183.97 124.88L1335.53 212.38L1335.53 387.38L1183.97 474.88L1032.41 387.38L1032.41 212.38zM1032.41 387.38L1183.97 474.88L1183.97 649.88L1032.41 737.38L880.85 649.88L880.85 474.88zM1335.53 -137.62L1487.09 -50.12L1487.09 124.88L1335.53 212.38L1183.97 124.88L1183.97 -50.12zM1335.53 387.38L1487.09 474.88L1487.09 649.88L1335.53 737.38L1183.97 649.88L1183.97 474.88z' stroke='rgba(67%2c 56%2c 202%2c 0.46)' stroke-width='2'%3e%3c/path%3e%3cpath d='M105.56 -137.62 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM257.12 -50.12 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM257.12 124.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM105.56 212.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM-46 124.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM-46 -50.12 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM408.68 387.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM560.24 474.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM560.24 649.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM408.68 737.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM257.12 649.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM257.12 474.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM863.35 124.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1014.91 212.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1014.91 387.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM863.35 474.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM711.8 387.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM711.8 212.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1166.47 124.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1318.03 212.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1318.03 387.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1166.47 474.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1166.47 649.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1014.91 737.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM863.35 649.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1318.03 -137.62 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1469.59 -50.12 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1469.59 124.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1166.47 -50.12 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1469.59 474.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1469.59 649.88 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0zM1318.03 737.38 a17.5 17.5 0 1 0 35 0 a17.5 17.5 0 1 0 -35 0z' fill='rgba(67%2c 56%2c 202%2c 0.46)'%3e%3c/path%3e%3cpath d='M130.55 57.48L202.43 98.98L202.43 181.98L130.55 223.48L58.67 181.98L58.67 98.98zM202.43 181.98L274.32 223.48L274.32 306.48L202.43 347.98L130.55 306.48L130.55 223.48zM418.08 306.48L489.96 347.98L489.96 430.98L418.08 472.48L346.2 430.98L346.2 347.98zM489.96 430.98L561.85 472.48L561.85 555.48L489.96 596.98L418.08 555.48L418.08 472.48zM705.61 57.48L777.49 98.98L777.49 181.98L705.61 223.48L633.73 181.98L633.73 98.98zM705.61 306.48L777.49 347.98L777.49 430.98L705.61 472.48L633.73 430.98L633.73 347.98zM849.37 306.48L921.26 347.98L921.26 430.98L849.37 472.48L777.49 430.98L777.49 347.98zM1065.02 -67.02L1136.9 -25.52L1136.9 57.48L1065.02 98.98L993.14 57.48L993.14 -25.52zM1136.9 306.48L1208.78 347.98L1208.78 430.98L1136.9 472.48L1065.02 430.98L1065.02 347.98zM1352.55 430.98L1424.43 472.48L1424.43 555.48L1352.55 596.98L1280.67 555.48L1280.67 472.48z' stroke='rgba(99%2c 102%2c 241%2c 0.36)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1129'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: cover; /* Ensure background covers the div */
  background-position: center; /* Center the background */
  background-repeat: no-repeat; /* Avoid repeating the background */
}
</style>
