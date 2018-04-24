<template>
  <div class="album-container" v-bind="$attrs">
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
    'image'
  ]
}
</script>
