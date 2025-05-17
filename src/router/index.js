import { createRouter, createWebHistory } from 'vue-router'
import authentication from '../views/authetication.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: authentication,
    },
 
  ],
})

export default router
