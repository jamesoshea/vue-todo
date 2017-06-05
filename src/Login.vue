<template>
  <div>
    <input type="text" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <button @click="sendLogin">Login</button>
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
            this.$store.commit('setMessage', res.data.message)
            this.$store.commit('setUser', res.data.userData)
            localStorage.setItem('token', res.data.token)
          })
          .catch((err) => {
            self.$store.commit('setUser', undefined)
            self.$store.commit('setMessage', err.response.data.message[0].msg)
            self.message = self.$store.getters.message
          })
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
