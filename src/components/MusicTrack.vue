<template>
  <div class="track-container">
    <span v-if="author">{{author}} - </span>
    <span v-if="title">{{title}}</span>
    <span>(Price {{price}})</span>
  </div>
</template>

<script>
export default {
  props: [
    'author',
    'title',
    'price',
    'album_id',
    'content'
  ]
}
</script>
