<template>
  <div>
    <table class="table table-hover"
           v-if="albums.length">
      <thead>
      <tr>
        <th scope="col">Author</th>
        <th scope="col">Title</th>
        <th scope="col">Count tracks</th>
        <th scope="col">Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="album in albums"
          v-bind:key="album.id"
          @click.prevent="$emit('select', album)"
          :class="[album.is_bought ? 'table-success' : 'table-primary']">
        <td scope="col">{{album.author}}</td>
        <th scope="col">{{album.title}}</th>
        <th scope="col">{{album.tracks.length}}</th>
        <td scope="col">{{album.price}}</td>
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
    'albums',
  ],
};
</script>
