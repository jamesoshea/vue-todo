import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from './store';

import App from './App.vue'
import Home from './Home.vue'
import Stats from './Stats.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/stats', component: Stats},
  { path: '/', component: Home}
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
