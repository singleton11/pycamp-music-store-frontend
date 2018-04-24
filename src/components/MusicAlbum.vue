<template>
  <div class="album-container" v-bind="$attrs">
    <span>
      <span v-if="author">{{author}} - </span>
      <span v-if="title">{{title}}</span>
      <span>(Price {{price}})</span>
    </span>
    <span class="badge badge-primary badge-pill">{{count_tracks}}</span>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      'count_tracks': 5
    }
  },
  props: [
    'author',
    'title',
    'price',
    'image'
  ]
}
</script>
