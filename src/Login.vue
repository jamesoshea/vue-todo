<template>
  <div>
    <input type="text" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <button @click="sendLogin">Login</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      sendLogin() {
        const self = this
        axios.post('/loginUser', {
          email: this.email,
          password: this.password
        })
          .then((res) => {
            this.$store.commit('setUser', res.data.userData)
            this.$store.commit('setMessage', res.data.message)
            localStorage.setItem('token', res.data.token)
            this.email = this.password = ''
          })
          .catch((err) => {
            self.$store.commit('setUser', undefined)
            self.$store.commit('setMessage', err.response.data.message[0].msg)
          })
      }
    },
    computed: {
      message() {
        return this.$store.state.message
      }
    }
  }
</script>

<style scoped>

</style>
