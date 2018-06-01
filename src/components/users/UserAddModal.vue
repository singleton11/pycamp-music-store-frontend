<template>
  <div>
    <!--Modal dialog to Add new user-->
    <Modal v-show="visible"
           @close="visible = false">
      <template slot="title">
        Add New User
      </template>
      <template slot="body">
        <FormGroup v-model="newUser.username"
                   type="text">Username</FormGroup>
        <FormGroup v-model="newUser.email"
                   type="text">Email address</FormGroup>
        <FormGroup v-model="newUser.firstName"
                   type="text">First Name</FormGroup>
        <FormGroup v-model="newUser.lastName"
                   type="text">Last Name</FormGroup>

        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 v-model="newUser.is_staff"
                 id="defaultCheck1">
          <label class="form-check-label"
                 for="defaultCheck1">
            Staff
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 id="defaultCheck2"
                 v-model="newUser.is_active">
          <label class="form-check-label"
                 for="defaultCheck2">
            Active
          </label>
        </div>
      </template>
      <template slot="buttons">
        <button type="submit"
                class="btn btn-primary"
                @click.prevent="submitAddUser"
                :disabled="usernameInvalid || emailInvalid">Submit</button>
      </template>
    </Modal>

    <!--Modal dialog to confirm addition of a user-->
    <Modal v-show="visibleConfirmation"
           @close="visibleConfirmation=false">
      <template slot="title">
        Confirmation
      </template>
      <template slot="body">
        <h4>Are you sure you want to add user?</h4>
        <p>Username: {{ newUser.username }}</p>
        <p>E-mail: {{ newUser.email }}</p>
      </template>
      <template slot="buttons">
        <button type="button"
                class="btn btn-primary"
                @click.prevent="confirmAddUser">
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
import FormGroup from '../utils/FormGroup.vue';
import Modal from '../utils/Modal.vue';

export default {
  /**
   * Define data model properties available for the component
   *
   * @property {object} newUser - new user to add
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
      newUser: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        is_staff: false,
        is_active: false,
      },
      visible: false,
      visibleConfirmation: false,
    };
  },
  /**
   * Subscribe on event after mount
   */
  mounted() {
    this.$eventHub.$on('add-user', () => {
      this.visible = true;
    });
  },
  /**
   * before destroy unsubscribe from all events
   */
  beforeDestroy() {
    this.$eventHub.$off('add-user');
  },
  computed: {
    ...mapGetters(Object.keys(userGetters)),
    /**
     * Username validation
     * Must be unique and not empty
     */
    usernameInvalid() {
      return this.newUser.username === '' ||
        this.getUsers.find(user => user.username === this.newUser.username);
    },
    /**
     * E-mail validation
     * Must be unique and not empty
     */
    emailInvalid() {
      return this.newUser.email === '' ||
        this.getUsers.find(user => user.email === this.newUser.email);
    },
  },
  methods: {
    ...mapActions(userActions),
    /**
     * Submit addition of a new user and go to confirmation dialog
     */
    submitAddUser() {
      this.visibleConfirmation = true;
    },
    /**
     * Confirm add new user
     */
    confirmAddUser() {
      this.USER_ADD_NEW(this.newUser);
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
  .modal-mask {
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
