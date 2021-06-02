import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Pages
import Root from '@/pages/root/Root.vue' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Root
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
