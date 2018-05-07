<template>
  <div>
    <table class="table table-hover"
           v-if="tracks.length">
      <thead>
      <tr>
        <th scope="col">Author</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="track in tracks"
          :key="track.id"
          @click.prevent="$emit('select', track)"
          :class="[track.is_bought ? 'table-success' : 'table-primary']">
        <td scope="col">{{track.author}}</td>
        <th scope="col">
            {{track.title}}
        </th>
        <td scope="col">{{track.price}}</td>
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
    'tracks',
  ],
};
</script>
