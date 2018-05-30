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
                @click.prevent="submitUserDeletion">
          Delete {{ user.username }}
        </button>
      </div>

      <h3 class="card-header">Balance: {{user.balance}}</h3>
      <div class="card-body">
        <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2">
            <input class="form-control"
                   type="number"
                   placeholder="0"
                   v-model.number="changeBalance">
          </div>
          <button class="btn btn-primary mb-2"
                  @click.prevent="editBalance"
                  :disabled="invalidEditedBalance || changeBalance == 0">
            <div v-if="changeBalance > 0">Add {{changeBalance}}</div>
            <div v-else-if="changeBalance < 0">Take {{changeBalance * (-1)}}</div>
            <div v-else>Change</div>
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

    <!--Modal dialog to confirm change of user balance-->
    <Modal v-if="visibleEditBalanceConfirmation"
           @close="visibleEditBalanceConfirmation=false">
      <template slot="title">
        Confirmation
      </template>
      <template slot="body">
        <h4>Are you sure you want edit user balance?</h4>
        <p>Balance before: {{ user.balance }}</p>
        <p>Balance after: {{ user.balance + changeBalance }}</p>
      </template>
      <template slot="buttons">
        <button type="button"
                class="btn btn-primary"
                @click.prevent="confirmChangeBalance">
          Confirm
        </button>
      </template>
    </Modal>

    <!--Modal dialog to confirm deletion of user-->
    <Modal v-if="visibleDeletionConfirmation"
           @close="visibleDeletionConfirmation=false">
      <template slot="title">
        Confirmation
      </template>
      <template slot="body">
        <h4>Are you sure you want to Delete user?</h4>
        <p>Username: {{ getSelectedUser.username }}</p>
        <p>E-mail: {{ getSelectedUser.email }}</p>
      </template>
      <template slot="buttons">
        <button type="button"
                class="btn btn-primary"
                @click.prevent="confirmUserDeletion">
          Confirm
        </button>
      </template>
    </Modal>

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
import Modal from '../utils/Modal.vue';

export default {
  data() {
    return {
      visibleEditBalanceConfirmation: false,
      visibleDeletionConfirmation: false,
    };
  },
  props: [
    'user',
  ],
  computed: {
    ...mapGetters(Object.keys(userGetters)),
    /**
     * Non positive balance after change is invalid
     */
    invalidEditedBalance() {
      return (this.getSelectedUser.balance + this.changeBalance) < 0;
    },
    changeBalance: {
      /**
       * Get value to add to current balance
       */
      get() {
        return this.getChangeBalance;
      },
      /**
       * Set value to add to current balance
       */
      set(amount) {
        this.$store.commit('USER_SET_BALANCE_CHANGE', amount);
      },
    },
  },
  methods: {
    ...mapActions(userActions),
    /**
     * Call the modal to edit current user
     */
    edit() {
      this.$eventHub.$emit('edit-user');
    },
    /**
     * Go to confirmation of change user balance
     */
    editBalance() {
      this.visibleEditBalanceConfirmation = true;
    },
    /**
     * Confirm change of user balance
     */
    confirmChangeBalance() {
      this.USER_EDIT_BALANCE();
      this.visibleEditBalanceConfirmation = false;
    },
    /**
     * Go to confirmation of delete current user
     */
    submitUserDeletion() {
      this.visibleDeletionConfirmation = true;
    },
    /**
     * Confirm user deletion
     */
    confirmUserDeletion() {
      this.USER_DELETE_CURRENT();
      this.visibleDeletionConfirmation = false;
    },
  },
  components: {
    UserEditModal,
    Modal,
  },
};
</script>

<style scoped>

</style>
