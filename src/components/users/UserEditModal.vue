<template>
  <div>
    <!--Modal dialog to Add new user-->
    <Modal v-show="visible"
           @close="visible = false">
      <template slot="title">
        Edit {{ getSelectedUser.username }}
      </template>
      <template slot="body">
        <FormGroup v-model="editUser.username"
                   :placeholder="getSelectedUser.username"
                   type="text">Username</FormGroup>
        <FormGroup v-model="editUser.email"
                   :placeholder="getSelectedUser.email"
                   type="text">Email address</FormGroup>
        <FormGroup v-model="editUser.firstName"
                   :placeholder="getSelectedUser.first_name"
                   type="text">First Name</FormGroup>
        <FormGroup v-model="editUser.lastName"
                   :placeholder="getSelectedUser.last_name"
                   type="text">Last Name</FormGroup>

        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 v-model="editUser.is_staff"
                 id="defaultCheck1">
          <label class="form-check-label"
                 for="defaultCheck1">Staff</label>
        </div>
        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 id="defaultCheck2"
                 v-model="editUser.is_active">
          <label class="form-check-label"
                 for="defaultCheck2">Active</label>
        </div>
      </template>
      <template slot="buttons">
        <button type="submit"
                class="btn btn-primary"
                @click.prevent="submit"
                :disabled="usernameInvalid || emailInvalid">Submit</button>
      </template>
    </Modal>

    <!--Modal dialog to confirm modification of a user-->
    <Modal v-show="visibleConfirmation"
           @close="visibleConfirmation=false">
      <template slot="title">
        Confirmation
      </template>
      <template slot="body">
        <h4>Are you sure you want to confirm changes?</h4>
      </template>
      <template slot="buttons">
        <button type="button"
                class="btn btn-primary"
                @click.prevent="confirmEditUser">
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
import Modal from '../utils/Modal.vue';
import FormGroup from '../utils/FormGroup.vue';

export default {
  /**
   * Define data model properties available for the component
   *
   * @property {object} editUser - new user to add
   *   @property {string} username - new user's username. Required
   *   @property {string} email - new user's e-mail address. Required
   *   @property {string} first_name - new user's first name
   *   @property {string} last_name - new user's last name
   *   @property {boolean} is_staff - if new user is staff or not
   *   @property {boolean} is_active - if new user is active or not
   *
   * @property {boolean} visible - visibility mark for modal for add user
   * @property {boolean} visibleConfirmation - visibility mark for confirmation
   */
  data() {
    return {
      editUser: { },
      visible: false,
      visibleConfirmation: false,
    };
  },
  /**
   * Subscribe on event after mount
   */
  mounted() {
    this.$eventHub.$on('edit-user', () => {
      this.visible = true;
      this.editUser.id = this.getSelectedUser.id;
    });
  },
  /**
   * before destroy unsubscribe from all events
   */
  beforeDestroy() {
    this.$eventHub.$off('edit-user');
  },
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(Object.keys(userGetters)),
    /**
     * Username validation
     * Must be unique and not empty
     */
    usernameInvalid() {
      return this.editUser.username === '' ||
        this.getUsers.find(user => user.username === this.editUser.username);
    },
    /**
     * E-mail validation
     * Must be unique and not empty
     */
    emailInvalid() {
      return this.editUser.email === '' ||
        this.getUsers.find(user => user.email === this.editUser.email);
    },
  },
  methods: {
    ...mapActions(userActions),
    /**
     * Submit edition of selected user
     */
    submit() {
      this.visibleConfirmation = true;
    },
    /**
     * Confirm edition of selected user
     */
    confirmEditUser() {
      this.USER_EDIT_CURRENT(this.editUser);
      this.visibleConfirmation = false;
      this.visible = false;
    },
  },
  components: {
    Modal,
    FormGroup,
  },
};
</script>

<style scoped>
  .modal-mask{
    transition: opacity .3s ease;
  }
  .modal-container {
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
