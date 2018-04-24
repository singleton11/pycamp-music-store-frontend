<template>
  <div class="container">
    <div class="row">
      <div class="col-sm list-tracks">
        <h2>Tracks:</h2>
        <music-track
          v-for="track in tracks"
          v-bind:key="track.id"
          v-bind:title="track.title"
          v-bind:author="track.author"
          v-bind:price="track.price"
        ></music-track>
        <button @click="updateTrackList">Get Tracks</button>
      </div>
      <div class="col-sm list-albums">
        <h2>Albums:</h2>
        <music-album
          v-for="album in albums"
          v-bind:key="album.id"
          v-bind:title="album.title"
          v-bind:author="album.author"
          v-bind:price="album.price"
        ></music-album>
        <button @click="updateAlbumList">Get Albums</button>
      </div>
    </div>
  </div>
</template>

<script>
import MusicTrack from '@/components/MusicTrack'
import MusicAlbum from '@/components/MusicAlbum'
import MusicService from '@/services/MusicService'

export default {
  data () {
    return {
      tracks: [],
      albums: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateTrackList()
      vm.updateAlbumList()
    })
  },
  methods: {
    updateTrackList () {
      MusicService.getTracks().then((data) => {
        this.tracks = data
      })
    },
    updateAlbumList () {
      MusicService.getAlbums().then((data) => {
        this.albums = data
      })
    }
  },
  components: {
    MusicTrack, MusicAlbum
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
