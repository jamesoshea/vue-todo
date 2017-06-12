<template>
  <div id="app">
    <div id="header">
            <div class="container">
              <h1 class="col"><i class="material-icons" @click="menuToggle">&#xE896;</i></h1>
              <h1 class="col"><router-link to="/stats"><i class="material-icons">&#xE8A6;</i></router-link></h1>
              <h1 class="col" v-if="userId">hello, {{ name }}</h1>
              <h1 class="col" v-else>fully sick todo app</h1>
            </div>
    </div>
    <transition name="fade">
      <template v-if="menuShown">
        <div id="menu">
          <p><router-link to="/">Todos</router-link></p>
          <p><router-link to="/stats">Stats</router-link></p>
          <template v-if="userId == undefined">
            <p><router-link to="/register">Register</router-link></p>
            <p><router-link to="/login">Login </router-link></p>
          </template>
          <template v-else>
            <p><router-link to="/login" @click.native="logout">Logout</router-link></p>
          </template>
        </div>
      </template>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      menuShown: false
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId
    },
    name() {
      return this.$store.getters.name
    }
  },
  methods: {
    logout(event) {
      this.$store.commit('logout')
    },
    menuToggle(event) {
      this.menuShown = !this.menuShown
    }
  }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

#header {
  background-color: #263d36;
  background-image: url("../public/images/header.jpg");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  line-height: 1.2;
  padding: 10vw 2em;
  text-align: center;
}

#header a, #header a:active, #header a:visited, #header a:hover, #header h1 {
  color: #fff;
}

#menu {
  padding-left: 5%;
}


</style>
