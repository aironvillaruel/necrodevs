<script setup lang="ts">
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'

const successEmail = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'lightgreen',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  Toast.fire({
    icon: 'success',
    title: message,
  })
}

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const sendEmail = () => {
  console.log('Form Data:', form)

  const templateParams = {
    name: form.name,
    email: form.email,
    message: form.message,
  }

  emailjs
    .send('service_0n6c7pq', 'template_t0by1zd', templateParams, 'mdbqDVc1h-uThkSvL')
    .then((response) => {
      console.log('Success:', response.status, response.text)
      successEmail('Your message has been sent successfully!')
    })
    .catch((error) => {
      // statusMessage.value = "There was an error sending your message.";
      console.error('Error:', error)
    })

  // Clear the form
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
<template>
  <div class="flex flex-col justify-center md:gap-5 items-center h-screen">
    <h2 class="text-2xl md:text-4xl tilt-warp-regular text-indigo-700">Contact</h2>
    <div
      class="flex flex-col md:flex-row justify-center md:justify-between w-3/4 shadow-xl rounded-lg"
    >
      <div
        class="hidden p-8 w-full md:w-1/2 md:flex flex-col justify-between gap-5 items-center bg-white dark:bg-slate-900"
      >
        <img src="/public/contact.svg" class="w-full" alt="" />
        <div class="w-full md:w-3/4 p-2 flex flex-col gap-3">
          <div class="flex flex-row gap-2 md:gap-3 items-center">
            <div
              class="border-2 border-indigo-600 md:w-7 md:h-7 p-1 md:p-0 rounded-full flex justify-center items-center"
            >
              <i class="pi pi-envelope" style="color: #4338ca"></i>
            </div>
            <h3 class="text-sm md:text-lg lexend-regular">aironvillaruel123@gmail.com</h3>
          </div>
          <div class="flex flex-row gap-2 md:gap-3 items-center">
            <div
              class="border-2 border-indigo-600 w-7 h-7 rounded-full flex justify-center items-center"
            >
              <i class="pi pi-discord" style="color: #4338ca"></i>
            </div>
            <h3 class="text-md md:text-lg lexend-regular">hangin_</h3>
          </div>
          <div class="flex flex-row gap-2 md:gap-3 items-center">
            <div
              class="border-2 border-indigo-600 w-7 h-7 rounded-full flex justify-center items-center"
            >
              <i class="pi pi-github" style="color: #4338ca"></i>
            </div>
            <h3 class="text-md md:text-lg lexend-regular">Tobio</h3>
          </div>
        </div>
      </div>
      <div class="bg-indigo-700 rounded-lg md:rounded-r-lg p-2 w-full md:w-1/2 flex flex-col gap-2">
        <h2 class="lexend-regular text-xl text-white">Get in Touch</h2>

        <form @submit.prevent="sendEmail">
          <div class="w-full p-5 flex flex-col gap-2">
            <label
              for="input-group-1"
              class="block mb-2 text-sm font-medium text-white lexend-regular"
              >Email</label
            >
            <div class="relative mb-6">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-indigo-500 dark:text-indigo-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path
                    d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                  />
                  <path
                    d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 lexend-regular"
                placeholder="johndoe123@gmail.com"
                v-model="form.email"
                required
              />
            </div>
            <label
              for="website-admin"
              class="block mb-2 text-sm font-medium text-white lexend-regular"
              >Name:</label
            >
            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md"
              >
                <svg
                  class="w-4 h-4 text-indigo-500 dark:text-indigo-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="website-admin"
                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 lexend-regular"
                placeholder="John Doe"
                v-model="form.name"
                required
              />
            </div>
            <label class="block mb-2 text-sm font-medium text-white lexend-regular">Message</label>
            <textarea
              name=""
              class="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 lexend-regular"
              rows="5"
              cols="5"
              id=""
              placeholder="Message..."
              v-model="form.message"
              required
            ></textarea>
            <button
              type="submit"
              class="text-indigo-700 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer lexend-regular"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-wave {
  background-image: url('/public/bg-contact.svg');
  background-size: cover; /* Ensure background covers the div */
  background-position: center; /* Center the background */
  background-repeat: no-repeat; /* Avoid repeating the background */
}
</style>
