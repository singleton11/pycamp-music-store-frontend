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
              Edit user {{ getSelectedUser.username }}
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
                       :placeholder="getSelectedUser.username"
                       v-model="editUser.username">
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input type="email"
                       class="form-control"
                       :placeholder="getSelectedUser.email"
                       v-model="editUser.email">
                <p>{{ editUser.email }}</p>
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input type="text"
                       class="form-control"
                       :placeholder="getSelectedUser.first_name"
                       v-model="editUser.first_name">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text"
                       class="form-control"
                       :placeholder="getSelectedUser.last_name"
                       v-model="editUser.last_name">
              </div>
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       :placeholder="getSelectedUser.is_staff"
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
                       :placeholder="getSelectedUser.is_active"
                       v-model="editUser.is_active"
                       id="defaultCheck2">
                <label class="form-check-label"
                       for="defaultCheck2">
                  Active
                </label>
              </div>
              <button type="submit"
                      class="btn btn-primary"
                      @click="edit"
                      :disabled="usernameInvalid || emailInvalid">
                Submit
              </button>
            </form>
          </div>
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
export default {
  data() {
    return {
      visible: false,
      editUser: { },
    };
  },
  /**
   * Subscribe on event after mount
   */
  mounted() {
    this.$eventHub.$on('edit-user', () => {
      this.visible = true;

      this.editUser.id = this.getSelectedUser.id;
      // this.editUser.username = this.getSelectedUser.username;
      // this.editUser.email = this.getSelectedUser.email;
      // this.editUser.is_staff = this.getSelectedUser.is_staff;
      // this.editUser.is_active = this.getSelectedUser.is_active;
      // this.editUser.first_name = this.getSelectedUser.first_name;
      // this.editUser.last_name = this.getSelectedUser.last_name;
    });
  },
  /**
   * before destroy unsubscribe from all events
   */
  beforeDestroy() {
    this.$eventHub.$off('edit-user');
  },
  props: [
    'user',
  ],
  computed: {
    ...mapGetters(Object.keys(userGetters)),
    usernameInvalid() {
      return this.editUser.username === '' ||
        this.getUsers.find(user => user.username === this.editUser.username);
    },
    emailInvalid() {
      return this.editUser.email === '' ||
        this.getUsers.find(user => user.email === this.editUser.email);
    },
  },
  methods: {
    ...mapActions(userActions),
    /**
     *
     */
    edit() {
      this.USER_EDIT_CURRENT(this.editUser);
      this.visible = false;
    },
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
