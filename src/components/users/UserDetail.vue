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
        <li class="list-group-item">Staff: {{user.is_staff}}</li>
        <li class="list-group-item">Active: {{user.is_active}}</li>
      </ul>
      <h3 class="card-header">User details</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">First name: {{user.first_name}}</li>
        <li class="list-group-item">Last name: {{user.last_name}}</li>
        <li class="list-group-item">Joined: {{user.date_joined}}</li>
        <li class="list-group-item">Last log in: {{user.last_login}}</li>
      </ul>
      <div class="card-footer">
        <button class="btn btn-primary btn-lg btn-block"
                @click.prevent="edit">
          Edit user info
        </button>
        <button class="btn btn-warning btn-lg btn-block"
                @click.prevent="USER_DELETE_CURRENT">
          Delete user
        </button>
      </div>

      <h3 class="card-header">Balance: {{user.balance}}</h3>
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2">
            <input class="form-control"
                   type="number"
                   placeholder="Amount"
                   v-model.number="changeBalance">
          </div>
          <button class="btn btn-primary mb-2"
                  @click.prevent="USER_EDIT_BALANCE"
                  :disabled="user.balance + changeBalance <= 0">
            Add amount
          </button>
        </form>
      </div>
      <div class="card-footer">
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="USER_DESELECT">
          Close
        </button>
      </div>
    </div>
    <UserEditModal :user="getSelectedUser"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { getters as userGetters, } from '../../store/modules/users';
import {
  users as userActions,
  // common as commonActions,
} from '../../store/types/';
import UserEditModal from './UserEditModal.vue';

export default {
  components: {
    UserEditModal,
  },
  props: [
    'user',
  ],
  computed: {
    ...mapGetters(Object.keys(userGetters)),
    changeBalance: {
      get() {
        return this.getChangeBalance;
      },
      set(amount) {
        this.$store.commit('USER_SET_BALANCE_CHANGE', amount);
      },
    },
  },
  methods: {
    ...mapActions(userActions),
    /**
     *
     */
    edit() {
      this.$eventHub.$emit('edit-user');
    },
  },
};
</script>

<style scoped>

</style>
