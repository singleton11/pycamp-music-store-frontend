<template>
  <div class="container"
       v-if="user">
    <div class="card mb-3">
      <img class="card-img rounded-0"
           :src="user.avatar"
           alt="Card image cap"
           v-if="user.avatar">

      <h3 class="card-header">Main Info</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Username: {{user.username}}</li>
        <li class="list-group-item">E-mail: {{user.email}}</li>
        <li class="list-group-item">Balance: {{user.email}}</li>
        <li class="list-group-item">Is staff: {{user.is_staff}}</li>
      </ul>
      <h3 class="card-header">User details</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">First name: {{user.first_name}}</li>
        <li class="list-group-item">Last name: {{user.last_name}}</li>
        <li class="list-group-item">Joined: {{user.date_joined}}</li>
        <li class="list-group-item">Last log in: {{user.last_login}}</li>
      </ul>

      <div class="card-footer">
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="USER_DESELECT">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, } from 'vuex';
import {
  users as userActions,
  // common as commonActions,
} from '../../store/types/';

export default {
  props: [
    'user',
  ],
  methods: {
    ...mapActions(userActions),
  },
};
</script>

<style scoped>

</style>
