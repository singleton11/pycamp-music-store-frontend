<template>
  <div class="container">
    <div class="cols">
      <div>Title: {{track.title}}</div>
      <div>Author: {{track.author}}</div>
      <div>Album: {{track.album}}</div>
      <div>Price: {{track.price}}</div>
      <div v-if="track.is_bought">Full content: {{track.content}}</div>
      <div v-else>Free content: {{track.content}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'track'
    ]
  }
</script>
