import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import store from '@/store/root/index'

/* eslint-disable */
// import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { Iuser } from './interfaces/user'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    user: Iuser
    isAuth: boolean
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

// createApp(App).use(router).mount('#app')
createApp(App).use(store).use(router).mount('#app')
