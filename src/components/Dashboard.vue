<template>
  <div class="container">
    <div class="row">
      <div class="col-sm list-tracks">
        <h2>Bought Albums:</h2>
        <music-albums-list
          v-bind:albums="albums"
        ></music-albums-list>
        <button @click="updateAlbumList" class="btn btn-primary btn-lg btn-block">Update list</button>
      </div>
      <div class="col-sm list-albums">
        <h2>Bought Tracks:</h2>

        <music-tracks-list
          v-bind:tracks="tracks"
          ></music-tracks-list>
        <button @click="updateTrackList" class="btn btn-primary btn-lg btn-block">Update list</button>
      </div>
    </div>
  </div>
</template>

<script>
import MusicTracksList from '@/components/utils/MusicTracksList'
import MusicAlbumsList from '@/components/utils/MusicAlbumsList'
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
      MusicService.getBoughtTracks().then((data) => {
        this.tracks = []
        data.forEach(boughtTrack => {
          let trackId = boughtTrack.item
          MusicService.getTrack(trackId).then(data => {
            this.tracks.push(data)
          })
        })
      })
    },
    updateAlbumList () {
      MusicService.getBoughtAlbums().then((data) => {
        this.albums = []
        data.forEach(boughtAlbum => {
          let albumId = boughtAlbum.item
          MusicService.getAlbum(albumId).then(data => {
            data.is_bought = true
            this.albums.push(data)
          })
        })
      })
    }
  },
  components: {
    MusicTracksList,
    MusicAlbumsList
  }
}
</script>
