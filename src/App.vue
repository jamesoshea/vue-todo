<template>
  <div id="app">
    <h1>fully sick todo app</h1>
    <router-link to="/">Todos</router-link>
    <router-link to="/stats">Stats</router-link>
    <router-link v-if="userId == undefined" to="/register">Register</router-link>
    <router-link v-if="userId == undefined" to="/login">Login </router-link>
    <router-link v-else to="/login" @click.native="logout">Logout</router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      message: ''
    }
  }
  computed: {
    userId() {
      return this.$store.getters.userId
    }
  },
  methods: {
    logout(event) {
      localStorage.removeItem('token')
      this.$store.commit('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
