<template>
  <div>
    <input type="text" v-model="name" placeholder="name">
    <input type="text" v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <input type="password" v-model="password2" placeholder="confirm password">
    <button type="button" @click="submit">SUBMIT</button>
    <p id="message">{{ message }}</p>
    <router-link v-if="success == true" to="/login">You can now log in</router-link>
  </div>
</template>

<script>
  import axios from 'axios'
  const self = this
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password2: '',
        message: '',
        success: false
      }
    },
    methods: {
      submit() {
        const self = this
        axios.post('/registerUser', {
          name: this.name,
          email: this.email,
          password: this.password,
          password2: this.password2,
          todos: this.$store.getters.allTodos,
          completed: this.$store.getters.completedTodos
        })
          .then((res) => {
              this.success = true
              this.message = res.data.message
              this.name = this.email = this.password = this.password2 = ''
          })
          .catch(function (error) {
            self.message = error.response.data.message[0].msg
            self.success = false
          });
      }
    }
  }
</script>

<style scoped>

#message {
  margin-bottom: 0;
}

</style>
