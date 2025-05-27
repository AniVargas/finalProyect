import { createRouter, createWebHistory } from 'vue-router'
import authetication from '../views/authetication.vue'
import dashboard from '../views/dashboard.vue'
import register from '../views/register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: authetication,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/todo',
      name: 'todo',
      component: dashboard,
    },
 
  ],
})

export default router
