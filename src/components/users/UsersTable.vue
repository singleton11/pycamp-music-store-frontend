<template>
  <div>
    <table class="table table-hover"
           v-if="users.length">
      <thead>
      <tr>
        <th scope="col">Username</th>
        <th scope="col">E-mail</th>
        <th scope="col">Balance</th>
        <th scope="col">Is staff member</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users"
          :key="user.id"
          @click.prevent="$emit('select', user)"
          :class="[user.is_staff ? 'table-success' : [user.is_active ? 'table-primary' : 'table-danger']]">
        <td scope="col">{{user.username}}</td>
        <td scope="col">{{user.email}}</td>
        <td scope="col">{{user.balance}}</td>
        <td scope="col">{{user.is_staff}}</td>
      </tr>
      </tbody>
    </table>
    <blockquote class="blockquote text-center"
                v-else>
      <p class="mb-0">Nothing to show</p>
    </blockquote>
  </div>
</template>

<script>
export default {
  /**
   * Define data model properties available for the component
   */
  props: [
    'users',
  ],
};
</script>

<style scoped>

</style>
