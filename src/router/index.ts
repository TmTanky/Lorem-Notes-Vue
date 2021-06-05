import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Pages
import Root from '@/pages/root/Root.vue'
import Login from '@/pages/login/Login.vue'
import Home from '@/pages/home/Home.vue'

import store from '@/store/root/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Root,
    beforeEnter(to, from, next) {
      if (store.state.isAuth) {
        return next('/home')
      }

      return next()
    }
  },
  {
    path: '/login',
    component: Login,
    beforeEnter(to, from, next) {
      if (store.state.isAuth) {
        return next('/home')
      }

      return next()
    }
  },
  {
    path: '/home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
