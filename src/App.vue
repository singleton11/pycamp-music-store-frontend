<template>
  <div id="app">
    <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div class="container">
        <router-link :to="{name: 'home'}"
                     class="navbar-brand">MusicStore</router-link>
        <button class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarResponsive"
             class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{name: 'home'}"
                           class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'payments'}"
                           class="nav-link">Payments</router-link>
            </li>
          </ul>

          <ul class="nav navbar-nav ml-auto">
            <li v-if="!isAuthenticated"
                class="nav-item">
              <router-link :to="{name: 'login'}"
                           class="nav-link">
                LogIn <i class="fas fa-sign-in-alt"></i>
              </router-link>
            </li>
            <li v-else
                class="nav-item">
              <a class="nav-link"
                 href="#"
                 @click="logout">LogOut <i class="fas fa-sign-out-alt"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                 href="https://bootswatch.com/minty/"
                 target="_blank">Theme</a>
            </li>
          </ul>

        </div>
      </div>
    </div>

    <main role="main">
      <div class="container"
           style="margin-top: 75px;">
        <MessageInTop v-show="getNotificationVisible"
                      @close="NOTIFICATION_HIDE">
          {{getNotificationMessage}}
        </MessageInTop>
        <router-view/>
        <hr>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions, } from 'vuex';
import { getters as authGetters, } from './store/modules/auth';
import { AUTH_LOGOUT, } from './store/types/auth';
import router from './router/router';
import MessageInTop from './components/utils/MessageInTop.vue';
import { NOTIFICATION_HIDE, } from './store/types/common';
import { getters as commonGetters, } from './store/modules/common';

export default {
  name: 'App',
  methods: {
    /**
     * Method for user logout and redirect on home page.
     */
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        router.push({ name: 'home', });
      });
    },
    ...mapActions({
      NOTIFICATION_HIDE,
    }),
  },
  computed: {
    ...mapGetters(Object.keys(authGetters)),
    ...mapGetters(Object.keys(commonGetters)),
  },
  components: {
    MessageInTop,
  },
};
</script>
