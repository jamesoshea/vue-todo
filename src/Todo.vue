<template>
  <div>
    <h1>Users Overview</h1>
    <button @click="goHome">Go Home</button>
  </div>
</template>

<script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  }
</script>

<style>

</style>
