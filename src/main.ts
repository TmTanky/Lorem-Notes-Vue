/* eslint-disable */
import { Store } from 'vuex'
import { Iuser } from './interfaces/user'
import {ComponentPublicInstance} from 'vue'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    user: Iuser
    isAuth: boolean
    isSecretOpen: string
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }

}

import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store/root/index'

// import { ComponentCustomProperties } from 'vue'


// createApp(App).use(router).mount('#app')
createApp(App).use(store).use(router).mount('#app')
