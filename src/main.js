import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from './store/store';

import App from './App.vue'
import Home from './Home.vue'
import Stats from './Stats.vue'
import Login from './Login.vue'
import Register from './Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/stats', component: Stats},
  { path: '/', component: Home},
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
  render: h => h(App)
})
