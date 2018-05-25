<template>
  <div class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Sign in as Admin</h1>

    <FormGroup v-model="user.email"
               :errors="errors.email"
               type="text"
               autofocus>Email</FormGroup>

    <FormGroup v-model="user.password"
               :errors="errors.password"
               type="password">Password</FormGroup>

    <button class="btn btn-lg btn-primary btn-block"
            @click="login">Go to User Management</button>
  </div>
</template>

<script>
import { AUTH_LOGIN, } from '../store/types/auth';
import { ACCOUNT_UPDATE_INFO, } from '../store/types/account';
import router from '../router/router';
import {
  NOTIFICATION_SHOW_DANGER,
  NOTIFICATION_HIDE,
} from '../store/types/common';
import FormGroup from './utils/FormGroup.vue';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      errors: {},
    };
  },
  methods: {
    /**
     * Method for user login and redirect on payments page
     * If an error occurs during authorization, it is displayed
     */
    login() {
      this.$store.dispatch(AUTH_LOGIN, this.user).then(() => {
        // hide notification and redirect
        this.$store.dispatch(NOTIFICATION_HIDE);
        this.$store.dispatch(ACCOUNT_UPDATE_INFO);

        const endpoint = 'edit-users';
        console.log(endpoint);

        router.push({ name: endpoint, });
      }).catch((error) => {
        // show notification about error
        const message = error.response.data.detail;

        this.errors = error.response.data.data;
        this.$store.dispatch(NOTIFICATION_SHOW_DANGER, message);
      });
    },
  },
  components: {
    FormGroup,
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #eee;
  }

  .form-signin {
    max-width: 400px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin,
  .form-signin {
    margin-bottom: 10px;
  }

  .form-signin {
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
