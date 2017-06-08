import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import { store } from './store/store'

import App from './App.vue'
import Todos from './Todos.vue'
import Stats from './Stats.vue'
import Login from './Login.vue'
import Register from './Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/stats', component: Stats},
  { path: '/', component: Todos},
  { path: '/login', component: Login},
  { path: '/register', component: Register}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeMount() {
    if (localStorage.getItem('token')) {
      const self = this
      axios.post('/autoLogin', { token: localStorage.getItem('token')})
        .then((res) => {
          self.$store.commit('setUser', res.data.userData)
        })
        .catch((err) => {
          console.log('Invalid token.')
        })
    } else {
      console.log('no token.')
    }
  }
})
