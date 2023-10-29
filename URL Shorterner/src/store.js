import Vue from 'vue'
import Vuex from 'vuex'
import axios from './utils/axios'
import { randomString } from './utils/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: [],
    shorts: [],
    loading: true
  },
  mutations: {
    addNotification (state, config) {
      state.notifications.push({
        id: config.id,
        timestamp: +new Date(),
        type: config.type || 'success',
        title: config.title || 'Hi!',
        text: config.text || 'This is a Notification'
      })
    },
    removeNotification (state, id) {
      state.notifications.splice(state.notifications.findIndex(val => val.id === id), 1)
    },
    addShort (state, short) {
      let i = state.shorts.findIndex(val => val.hash === short.hash)
      if (i >= 0) {
        state.shorts[i] = short
      } else {
        state.shorts.push(short)
      }
    },
    isLoading (state, val) {
      state.loading = val
    }
  },
  actions: {
    notify (context, config) {
      config.id = randomString(10)
      context.commit('addNotification', config)
      setTimeout(() => {
        context.commit('removeNotification', config.id)
      }, config.time || 2000)
    },
    async fetchShorts (context) {
      return axios.get('/shorts').then(result => {
        for (let short of result.data) {
          context.commit('addShort', short)
        }
      })
    }
  },
  getters: {
    shortsInOrder: state => state.shorts.sort((a, b) => +new Date(a.createdAt) < +new Date(b.createdAt))
  }
})
