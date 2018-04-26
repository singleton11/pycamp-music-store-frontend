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
  created () {
    this.updateTrackList()
    this.updateAlbumList()
  },
  methods: {
    updateTrackList () {
      // update list of bought tracks
      MusicService.getBoughtTracks().then((data) => {
        this.tracks = []

        // get info for each trackId and push to tracks array
        data.forEach(boughtTrack => {
          MusicService.getTrack(boughtTrack.item).then(data => {
            this.tracks.push(data)
          })
        })
      })
    },
    updateAlbumList () {
      // update list of bought albums
      MusicService.getBoughtAlbums().then((data) => {
        this.albums = []

        // get info for each albumId and push to tracks array
        data.forEach(boughtAlbum => {
          MusicService.getAlbum(boughtAlbum.item).then(data => {
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
