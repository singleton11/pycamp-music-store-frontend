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
              <router-link :to="{name: 'payments'}"
                           class="nav-link">Payments</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'transactions'}"
                           class="nav-link">Transactions</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'tracks'}"
                           class="nav-link">Tracks</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'albums'}"
                           class="nav-link">Albums</router-link>
            </li>
          </ul>

          <ul class="nav navbar-nav ml-auto">
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <router-link :to="{name: 'login'}"
                             class="nav-link">
                  LogIn <i class="fas fa-sign-in-alt"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'register'}"
                             class="nav-link">
                  Register <i class="fas fa-user-plus"></i>
                </router-link>
              </li>
            </template>
            <li v-else
                class="nav-item dropdown">
              <a class="nav-link dropdown-toggle"
                 data-toggle="dropdown"
                 href="#">
                {{ getEmail }}<span class="caret"></span>
              </a>
              <div class="dropdown-menu">
                <span class="dropdown-item disabled">
                  Balance: {{getBalance}}
                </span>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item"
                   href="#"
                   @click="logout">
                  LogOut <i class="fas fa-sign-out-alt"></i>
                </a>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </div>

    <main role="main">
      <div class="container"
           style="margin-top: 75px;">
        <Notification></Notification>
        <router-view/>
        <hr>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions, } from 'vuex';
import router from './router/router';
import { getters as authGetters, } from './store/modules/auth';
import { getters as commonGetters, } from './store/modules/common';
import { getters as accountGetters, } from './store/modules/account';
import {
  account as accountActions,
  common as commonActions,
  auth as authActions,
} from './store/types/';
import Notification from './components/utils/Notification.vue';

export default {
  name: 'App',
  /**
   * Update info after mounting component
   */
  mounted() {
    this.ACCOUNT_UPDATE_INFO();
  },
  methods: {
    /**
     * Method for user logout and redirect on home page
     */
    logout() {
      this.AUTH_LOGOUT().then(() => {
        this.NOTIFICATION_SHOW_INFO('You are signed out');
        router.push({ name: 'home', });
      });
    },
    ...mapActions(commonActions),
    ...mapActions(authActions),
    ...mapActions(accountActions),
  },
  computed: {
    ...mapGetters(Object.keys(authGetters)),
    ...mapGetters(Object.keys(commonGetters)),
    ...mapGetters(Object.keys(accountGetters)),
  },
  components: {
    Notification,
  },
};
</script>
