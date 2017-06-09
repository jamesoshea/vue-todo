<template>
  <div>
    <h4>login</h4>
    <input type="text" v-model="email" placeholder="email" @input="reset" autofocus>
    <input type="password" v-model="password" placeholder="password" @input="reset">
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
            this.$router.push('/')
            this.$store.commit('setMessage', res.data.message)
            localStorage.setItem('token', res.data.token)
            this.email = this.password = ''
          })
          .catch((err) => {
            self.$store.commit('setUser', undefined)
            self.$store.commit('setMessage', err.response.data.message[0].msg)
          })
      },
      reset() {
        this.$store.commit('setMessage', '')
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
