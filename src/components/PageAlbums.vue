<template>
  <div class="container">
    <div class="card-columns">
      <div class="card" v-for="album in albums" v-bind:key="album.id">
        <div class="card-header bg-transparent">{{album.title}}</div>
        <!--img class="card-img-top" :src="album.image" alt="Card image cap" v-if="album.image"-->
        <img class="card-img rounded-0" src="//upload.wikimedia.org/wikipedia/ru/a/af/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%B0%D0%BB%D1%8C%D0%B1%D0%BE%D0%BC%D0%B0_Group_Therapy.jpg" alt="Card image cap" v-if="album.image">
        <ul class="list-group list-group-flush">
          <music-tracks-list
            v-bind:tracks="album.tracks"
          ></music-tracks-list>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MusicService from '@/services/MusicService'
import MusicTracksList from '@/components/MusicTracksList'

export default {
  data () {
    return {
      albums: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateAlbumList()
    })
  },
  methods: {
    updateAlbumList () {
      MusicService.getAlbums().then(data => {
        data.forEach(album => {
          let trackIds = album.tracks
          album.tracks = []
          trackIds.forEach(trackId => {
            MusicService.getTrack(trackId).then(data => {
              album.tracks.push(data)
            })
          })
        })
        this.albums = data
      })
    }
  },
  components: {
    MusicTracksList
  }
}
</script>
