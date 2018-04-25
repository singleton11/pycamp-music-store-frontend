<template>
  <div id="app">
    <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div class="container">
        <router-link :to="{name: 'home'}" class="navbar-brand">MusicStore</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'dashboard'}" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'albums'}" class="nav-link">Albums</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'tracks'}" class="nav-link">Tracks</router-link>
            </li>
          </ul>

          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" v-if="!auth">
              <router-link :to="{name: 'login'}" class="nav-link">LogIn <i class="fas fa-sign-in-alt"></i></router-link>
            </li>
            <li class="nav-item" v-else>
              <a @click="logout" class="nav-link" href="#">LogOut <i class="fas fa-sign-out-alt"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://bootswatch.com/minty/" target="_blank">Theme</a>
            </li>
          </ul>

        </div>
      </div>
    </div>

    <main role="main">
      <div class="container" style="margin-top: 75px;">
        <router-view/>
        <hr>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AuthService from '@/services/AuthService'
import {AUTHENTICATED_GETTER} from '@/store/getter-types'

export default {
  name: 'App',
  methods: {
    logout () {
      AuthService.logout()
    }
  },
  computed: {
    ...mapGetters({ auth: AUTHENTICATED_GETTER })
  }
}
</script>

<style>
  .loader-in-input-parent{
    position: relative;
  }
  .loader-in-input {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #78c2ad; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
