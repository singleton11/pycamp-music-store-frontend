<template>
  <ul :class="ulClass">
    <li :class="liClass"
        v-if="tracks"
        v-for="track in tracks"
        v-bind:key="track.id">
      {{track.author}} - {{track.title}}
    </li>
  </ul>
</template>

<script>
export default {
  /**
   * Define data model properties available for the component
   */
  props: {
    tracks: {
      type: Array,
    },
    ulClass: {
      default: 'list-group list-group-flush',
      type: String,
    },
    liClass: {
      default: 'list-group-item',
      type: String,
    },
  },
};
</script>
