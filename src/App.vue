<template>
  <div id="app">

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">Music Store</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
             <router-link :to="{name: 'Login'}" class="nav-link">LogIn</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Dashboard'}" class="nav-link">Tracks</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main">
      <div class="container">
        <router-view/>
        <hr>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      token: '',
      api_url: 'http://0.0.0.0:8000/api/v1/'
    }
  },
  provide: {
    token: this.token,
    api_url: 'http://0.0.0.0:8000/api/v1/'
  },
  methods: {
    authenticated: function (token) {
      this.token = token
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
