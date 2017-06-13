<template>
  <div id="app">
    <div id="header">
            <div class="col" id="switch">
              <span @click="menuToggle">menu</span>
            </div>
            <div class="col container" id="toplinks">
              <h1 v-if="userId"><router-link to="/">{{ name }}&nbsp;</router-link></h1>
              <h1><router-link to="/stats">{{ total }}</router-link></h1>
            </div>
    </div>
    <transition name="fade">
      <template v-if="menuShown">
        <div id="menu">
          <p @click="hideMenu"><router-link to="/"><strong>{{ total }}</strong> todos</router-link></p>
          <p @click="hideMenu"><router-link to="/stats">Stats</router-link></p>
          <template v-if="userId == undefined">
            <p @click="hideMenu"><router-link to="/register">Register</router-link></p>
            <p @click="hideMenu"><router-link to="/login">Login </router-link></p>
          </template>
          <template v-else>
            <p @click="hideMenu"><router-link to="/login" @click.native="logout">Logout</router-link></p>
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
    },
    total() {
      return this.$store.getters.total
    }
  },
  methods: {
    logout(event) {
      this.$store.commit('logout')
    },
    menuToggle(event) {
      this.menuShown = !this.menuShown
    },
    hideMenu(event) {
      this.menuShown = false
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
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  line-height: 1.2;
  padding: 0 2em;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}

#header a, #header a:active, #header a:visited, #header a:hover, #header h1 {
  color: #fff;
}

#switch {
  color: #fff;
  padding-top: 2vw;
  text-align: left;
  -webkit-align-self: flex-start;
  align-self: flex-start;

}

#toplinks {
  padding: 10vw 0;
  margin-left: auto;
}

#menu {
  padding-left: 5%;
}

#todos-link-container {
  justify-content: flex-start;
}


</style>
