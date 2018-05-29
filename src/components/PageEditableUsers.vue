<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2 align="center">List of Users</h2>
        <users-table :users="getUsers"
                     @select="USER_SELECT"></users-table>
      </div>

      <div class="col"
           v-if="getSelectedUser">
        <h2 align="center">User Info</h2>
        <UserDetail :user="getSelectedUser"></UserDetail>
      </div>
    </div>
    <div class="row">
      <button type="button"
              class="btn btn-primary btn-lg"
              @click.prevent="USER_ADD_NEW">
        Add New User
      </button>
    </div>
    <UserAddModal/>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { users as userActions, } from '../store/types/';
import { getters as userGetters, } from '../store/modules/users';
import UsersTable from './users/UsersTable.vue';
import UserDetail from './users/UserDetail.vue';
import UserAddModal from './users/UserAddModal.vue';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      count: 0,
    };
  },
  /**
   * update user list after mount component
   */
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(Object.keys(userGetters)),
  },
  methods: {
    ...mapActions(userActions),
    /**
     * Get list of albums on this page
     */
    getList() {
      this.USER_LIST()
        .then((data) => {
          this.count = data;
        });
    },
  },
  components: {
    UsersTable,
    UserDetail,
    UserAddModal,
  },
};
</script>

<style scoped>
  button{
    margin:auto;
    display:block;
    width:330px;
  }
</style>
