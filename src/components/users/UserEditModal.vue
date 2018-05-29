<template>
  <transition name="modal"
              v-if="getEditingUser">
    <div class="modal modal-mask"
         style="display: block">
      <div class="modal-dialog"
           role="document">
        <div class="modal-container modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">
              Edit user {{ user.username }}
            </h5>
            <button type="button"
                    class="close"
                    aria-label="Close"
                    @click="USER_EDIT_CURRENT">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Username</label>
                <input type="text"
                       class="form-control"
                       :placeholder="user.username">
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input type="email"
                       class="form-control"
                       :placeholder="user.email">
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input type="text"
                       class="form-control"
                       :placeholder="user.first_name">
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text"
                       class="form-control"
                       :placeholder="user.last_name">
              </div>
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       :value="user.is_staff"
                       id="defaultCheck1">
                <label class="form-check-label"
                       for="defaultCheck1">
                  Staff
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       :value="user.active"
                       id="defaultCheck2">
                <label class="form-check-label"
                       for="defaultCheck2">
                  Active
                </label>
              </div>
              <button type="submit"
                      class="btn btn-primary">
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
      editUser: {
        username: '',
        email: '',
        staff: false,
        active: false,
        firstName: '',
        lastName: '',
      },
    };
  },
  props: [
    'user',
  ],
  computed: {
    ...mapGetters(Object.keys(userGetters)),
  },
  methods: {
    ...mapActions(userActions),
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
