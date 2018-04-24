<template>
  <div>
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>

    <button class="btn btn-lg btn-primary btn-block" @click="sendRequest">Sign in</button>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    sendRequest () {
      AuthService.login(this.email, this.password)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
