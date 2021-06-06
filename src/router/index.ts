import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Pages
import Root from '@/pages/root/Root.vue'
import Login from '@/pages/login/Login.vue'
import Home from '@/pages/home/Home.vue'
import Pincode from '@/pages/pincode/Pincode.vue'
import Secrets from '@/pages/secrets/Secrets.vue'

import store from '@/store/root/index'
import {Status} from '@/interfaces/status'

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
  },
  {
    path: '/security',
    component: Pincode,
    beforeEnter(to, from, next) {
      if (store.state.isSecretOpen === Status.authorized) {
        return next('/secrets')
      }

      if (store.state.isSecretOpen === Status.denied) {
        return next('/')
      }

      if (store.state.isSecretOpen === Status.pending) {
        return next()
      }
    }
  },
  {
    path: '/secrets',
    component: Secrets,
    beforeEnter(to, from, next) {
      if (store.state.isSecretOpen === Status.authorized) {
        return next()
      }

      return next('/')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
