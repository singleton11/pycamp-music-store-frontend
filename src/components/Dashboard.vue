<template>
  <div class="container">
    <div class="row">
      <div class="col-sm list-tracks">
        <h2>Albums:</h2>
        <ul class="list-group">
          <music-album
            v-for="album in albums"
            v-bind:key="album.id"
            v-bind:title="album.title"
            v-bind:author="album.author"
            v-bind:price="album.price"
            class="list-group-item d-flex justify-content-between align-items-center"
          ></music-album>
        </ul>
        <button @click="updateAlbumList" class="btn btn-primary btn-lg btn-block">Update Albums</button>
      </div>
      <div class="col-sm list-albums">
        <h2>Tracks:</h2>
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
        <button @click="updateTrackList" class="btn btn-primary btn-lg btn-block">Update Tracks</button>
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
