<template>
  <div class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Register</h1>

    <div class="form-group">
      <label class="form-control-label"
             for="inputEmail">
        Email</label>
      <input class="form-control"
             id="inputEmail"
             type="text"
             required
             autofocus
             :class="{'is-invalid': errors.email}"
             v-model="user.email">
      <div class="invalid-feedback"
           v-if="errors.email">
        {{ errors.email[0] }}
      </div>
    </div>

    <div class="form-group">
      <label class="form-control-label"
             for="inputPassword1">
        Password</label>
      <input class="form-control"
             id="inputPassword1"
             type="text"
             required
             autofocus
             :class="{'is-invalid': errors.password1}"
             v-model="user.password1">
      <div class="invalid-feedback"
           v-if="errors.password1">
        {{ errors.password1[0] }}
      </div>
    </div>

    <div class="form-group">
      <label class="form-control-label"
             for="inputPassword2">
        Repeat password</label>
      <input class="form-control"
             id="inputPassword2"
             type="text"
             required
             autofocus
             :class="{'is-invalid': errors.password2}"
             v-model="user.password2">
      <div class="invalid-feedback"
           v-if="errors.password2">
        {{ errors.password2[0] }}
      </div>
    </div>

    <div class="form-group">
      <label class="form-control-label"
             for="firstName">
        First name</label>
      <input class="form-control"
             id="firstName"
             type="text"
             required
             autofocus
             :class="{'is-invalid': errors.first_name}"
             v-model="user.firstName">
      <div class="invalid-feedback"
           v-if="errors.first_name">
        {{ errors.first_name[0] }}
      </div>
    </div>

    <div class="form-group">
      <label class="form-control-label"
             for="lastName">
        Last name</label>
      <input class="form-control"
             id="lastName"
             type="text"
             required
             autofocus
             :class="{'is-invalid': errors.last_name}"
             v-model="user.lastName">
      <div class="invalid-feedback"
           v-if="errors.last_name">
        {{ errors.last_name[0] }}
      </div>
    </div>

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

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      user: {
        email: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
      },
      errors: {},
    };
  },
  methods: {
    /**
     * Method register user.
     * If register successful, redirect on login page
     */
    register() {
      this.$store.dispatch(AUTH_REGISTER, this.user).then(() => {
        // hide notification and redirect
        this.$store.dispatch(
          NOTIFICATION_SHOW_SUCCESS,
          'Register successful! Please login'
        );
        router.push({ name: 'login', });
      }, (error) => {
        // show notification about error
        const message = error.response.data.detail;

        this.errors = error.response.data.data;
        this.$store.dispatch(NOTIFICATION_SHOW_DANGER, message);
      });
    },
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
