import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue' // Ensure Landing.vue is properly typed
import ToolView from '../views/ToolView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolView,
    },
    {
      path: '/tools/search', // Use query parameters for search
      name: 'tools-search',
      component: ToolView,
      props: (route) => ({ searchQuery: route.query.query || '' }), // Pass query as a prop
    },
    {
      path: '/tools/category/:category', // Dynamic route for categories
      name: 'tool-category',
      component: ToolView,
      props: true, // Pass route params as props to the component
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,

      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
  ],
})

export default router
