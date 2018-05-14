<template>
  <div class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Register</h1>

    <FormGroup v-model="user.email"
               :errors="errors.email"
               type="text"
               autofocus>Email</FormGroup>

    <FormGroup v-model="user.password"
               :errors="errors.password1"
               type="password">Password</FormGroup>

    <FormGroup v-model="user.passwordConfirmation"
               :errors="errors.password2"
               type="password">Repeat password</FormGroup>

    <FormGroup v-model="user.firstName"
               :errors="errors.first_name"
               type="text">First name</FormGroup>

    <FormGroup v-model="user.lastName"
               :errors="errors.last_name"
               type="text">Last name</FormGroup>

    <button class="btn btn-lg btn-primary btn-block"
            @click="register">
      Register
    </button>
  </div>
</template>

<script>
import { AUTH_REGISTER, } from '../store/types/auth';
import router from '../router/router';
import {
  NOTIFICATION_SHOW_DANGER,
  NOTIFICATION_SHOW_SUCCESS,
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
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
      },
      errors: {},
    };
  },
  methods: {
    /**
     * Method register user
     * If register successful, redirect on login page
     */
    register() {
      this.validate();

      if (Object.keys(this.errors).length) {
        return;
      }

      this.$store.dispatch(AUTH_REGISTER, this.user).then(() => {
        // hide notification and redirect
        this.$store.dispatch(
          NOTIFICATION_SHOW_SUCCESS,
          'Register successful! Please login'
        );
        router.push({ name: 'login', });
      }).catch((error) => {
        // show notification about error
        const message = error.response.data.detail;

        this.errors = error.response.data.data;
        this.$store.dispatch(NOTIFICATION_SHOW_DANGER, message);
      });
    },
    /**
     * Validation of user data
     */
    validate() {
      this.errors = {};

      if (this.user.password.length < 6) {
        this.$set(this.errors, 'password1', [
          'Password must be a minimum of 6 characters.',
        ]);
      }

      if (this.user.password !== this.user.passwordConfirmation) {
        this.$set(this.errors, 'password2', [
          'The two password fields didn\'t match.',
        ]);
      }
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
    max-width: 330px;
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
</style>
