<template>

  <div class="container py-3">
    <div class="card">
      <div class="row ">
        <div class="col-md-4">
          <img :src="album.image" class="w-100">
        </div>
        <div class="col-md-8 px-3">
          <div class="card-block px-3">
            <h4 class="card-title">{{album.title}}</h4>
            <music-tracks-list
              v-bind:tracks="album.tracksInfo"
            ></music-tracks-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MusicService from '@/services/MusicService'
  import MusicTracksList from '@/components/utils/MusicTracksList'

  export default {
    data () {
      return {
        album: {}
      }
    },
    mounted () {
      this.update()
    },
    methods: {
      update () {
        // start spinner
        MusicService.getAlbum(this.$route.params.id).then(data => {
          let album = data
          let trackIds = album.tracks
          album.tracksInfo = []

          let items = []
          for (let i = 0; i < trackIds.length; i++) {
            items.push(MusicService.getTrack(trackIds[i]))
          }

          // then all info was get, view tracks and stop spinner
          Promise.all(items).then(tracks => {
            album.tracksInfo = tracks
            this.album = album
          })
        })
      },
      buyAlbum () { // buy selected album
      }
    },
    components: {
      MusicTracksList
    }
  }
</script>
