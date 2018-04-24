<template>
  <div class="list-group">
    <music-album
      v-for="album in albums"
      v-bind:key="album.id"
      v-bind:title="album.title"
      v-bind:author="album.author"
      v-bind:price="album.price"
      class="list-group-item list-group-item-action"
    ></music-album>
  </div>
</template>

<script>
import MusicAlbum from '@/components/MusicAlbum'
export default {
  props: [
    'albums'
  ],
  components: {
    MusicAlbum
  }
}
</script>
