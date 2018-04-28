<template>
<div class="list-group">
  <music-track
    v-for="track in tracks"
    v-bind:key="track.id"
    v-bind:title="track.title"
    v-bind:author="track.author"
    v-bind:price="track.price"
    class="list-group-item list-group-item-action"
  ></music-track>
</div>
</template>

<script>
import MusicTrack from '@/components/MusicTrack'
export default {
  props: [
    'tracks'
  ],
  components: {
    MusicTrack
  }
}
</script>
