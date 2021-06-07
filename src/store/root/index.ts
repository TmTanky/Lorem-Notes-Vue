import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Interfaces 
import {Iuser} from '../../interfaces/user'
import { Istate } from './state'

export default createStore({
    plugins: [createPersistedState()],
    state: {
        user: {} as Iuser,
        isAuth: false,
        isSecretOpen: 'false'
    } as Istate ,
    mutations: {
        loginUser(state, payload) {
            state.user = payload
        },
        authUser(state) {
            state.isAuth = true
        },
        logoutUser(state) {
            state.user = {} as Iuser
            state.isAuth = false
        },
        authSecret(state, payload) {
            state.isSecretOpen = payload
        }
    },
    actions: {
        loginUser(context, payload) {
            context.commit('loginUser', payload)
        },
        authUser(context) {
            context.commit('authUser')
        },
        logoutUser(context) {
            context.commit('logoutUser')
        },
        authSecret(context, payload) {
            context.commit('authSecret', payload)
        }
    }
})