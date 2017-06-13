<template>
  <div>
    <h4 class="subtitle">login</h4>
    <div class="entry-boxes">
      <input type="text" v-model="email" placeholder="email" @input="reset" autofocus><br>
      <input type="password" v-model="password" placeholder="password" @input="reset"><br>
      <button @click="sendLogin">Login</button><br>
      <p>{{ message }}</p>
    </div>
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
