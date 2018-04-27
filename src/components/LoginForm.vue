<template>
  <div class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail"
           class="sr-only">Email</label>
    <input type="email"
           id="inputEmail"
           class="form-control"
           placeholder="Email address"
           required
           autofocus
           v-model="user.email">
    <label for="inputPassword"
           class="sr-only">Password</label>
    <input type="password"
           id="inputPassword"
           class="form-control"
           placeholder="Password"
           required
           v-model="user.password">
    <button class="btn btn-lg btn-primary btn-block"
            @click="login">
      Sign in
    </button>
  </div>
</template>

<script>
import { AUTH_LOGIN, } from '../store/types/auth';
import router from '../router/router';
import { NOTIFICATION_SHOW, NOTIFICATION_HIDE, } from '../store/types/common';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    login() {
      this.error = '';
      this.$store.dispatch(AUTH_LOGIN, this.user).then(() => {
        this.$store.dispatch(NOTIFICATION_HIDE);
        router.push({ name: 'payments', });
      }, (error) => {
        this.$store.dispatch(NOTIFICATION_SHOW, error.response.data.detail);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #eee;
  }

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
