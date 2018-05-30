<template>
  <transition name="modal"
              v-if="visible">
    <div class="modal modal-mask"
         style="display: block">
      <div class="modal-dialog"
           role="document">
        <div class="modal-container modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="title">
                Title
              </slot>
            </h5>
            <button type="button"
                    class="close"
                    aria-label="Close"
                    @click="visible = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Username</label>
                <input type="text"
                       class="form-control"
                       placeholder="Username"
                       v-model="editUser.username">
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input type="email"
                       class="form-control"
                       placeholder="Enter email"
                       v-model="editUser.email">
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input type="text"
                       class="form-control"
                       placeholder="First Name"
                       v-model="editUser.firstName">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text"
                       class="form-control"
                       placeholder="Last Name"
                       v-model="editUser.lastName">
              </div>
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       v-model="editUser.is_staff"
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
                       v-model="editUser.is_active">
                <label class="form-check-label"
                       for="defaultCheck2">
                  Active
                </label>
              </div>
              <button type="submit"
                      class="btn btn-primary"
                      @click.prevent="submitAddUser"
                      :disabled="usernameInvalid || emailInvalid">
                Submit
              </button>
            </form>
          </div>

          <!--Modal dialog to confirm addition of a user-->
          <Modal v-if="visibleConfirmation"
                 @close="visibleConfirmation=false">
            <template slot="title">
              Confirmation
            </template>
            <template slot="body">
              <h4>Are you sure you want to add user?</h4>
              <p>Username: {{ editUser.username }}</p>
              <p>E-mail: {{ editUser.email }}</p>
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
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { getters as userGetters, } from '../../store/modules/users';
import {
  users as userActions,
  // common as commonActions,
} from '../../store/types/';
import Modal from '../utils/Modal.vue';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      editUser: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        is_staff: false,
        is_active: false,
        notifications: {},
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
     * Submit addition of a new user and go to confirmation dialog
     */
    submitAddUser() {
      this.visibleConfirmation = true;
    },
    /**
     * Confirm add new user
     */
    confirmAddUser() {
      this.USER_ADD_NEW(this.editUser);
      this.visibleConfirmation = false;
      this.visible = false;
    },
  },
  components: {
    Modal,
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
