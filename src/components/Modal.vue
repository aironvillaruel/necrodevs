<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const isVisible = ref(false)

const openModal = () => {
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
}

defineExpose({
  openModal,
})
</script>
<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-zinc-900/60 p-4 md:p-0 z-50"
  >
    <div
      class="bg-white dark:bg-slate-900 border dark:border-white shadow-2xl p-6 rounded-lg relative scale-up-center md:w-1/2 flex justify-center flex-col items-center gap-5"
    >
      <!-- Modal content goes here -->
      <slot></slot>

      <!-- Close Button -->
      <p
        class="absolute top-1 right-2 p-2 hover:scale-125 transition-all duration-300 cursor-pointer"
        @click="closeModal"
      >
        <i class="pi pi-times"></i>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
