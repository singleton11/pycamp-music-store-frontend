<template>
  <div class="container">
    <SearchField v-model="searchText" ref="search"></SearchField>
    <div class="row">
      <div class="card-columns">
        <div class="card" v-for="(album, index) in albums" v-bind:key="album.id">
          <div class="card-header text-white" v-bind:class="[album.is_bought ? 'bg-primary' : 'bg-danger']">
            {{album.title}}
          </div>
          <img class="card-img rounded-0" :src="album.image" alt="Card image cap" v-if="album.image">
          <ul class="list-group list-group-flush">
            <music-tracks-list
              v-bind:tracks="album.tracks"
            ></music-tracks-list>
          </ul>
          <div class="card-body" v-if="!album.is_bought">
            <a class="card-link" @click.prevent="buyAlbum(album, index)" href="#">Buy album for {{album.price}} <i
              class="fas fa-dollar-sign"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MusicService from '@/services/MusicService'
  import MusicTracksList from '@/components/utils/MusicTracksList'
  import SearchField from '@/components/utils/SearchField'
  import Vue from 'vue'

  export default {
    data () {
      return {
        albums: [],
        searchText: '',
        timer: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.updateAlbumList()
      })
    },
    methods: {
      updateAlbumList () {
        this.$refs.search.startLoader()
        MusicService.getAlbums(this.searchText).then(data => {
          data.forEach(album => {
            let trackIds = album.tracks
            album.tracks = []
            let data = []
            for (let i = 0; i < trackIds.length; i++) {
              data.push(MusicService.getTrack(trackIds[i]))
            }
            Promise.all(data).then(tracks => {
              album.tracks = tracks
            }).then(this.$refs.search.stopLoader)
          })
          if (!data.length) {
            this.$refs.search.stopLoader()
          }
          this.albums = data
        })
      },
      buyAlbum (album, index) {
        this.$refs.search.startLoader()
        MusicService.buyAlbum(album.id).then(() => {
          album.is_bought = 1
          Vue.set(this.albums, index, album)
          MusicService.saveAlbum(album)
        }, error => {
          console.log(error.response.data.message)
        }).then(this.$refs.search.stopLoader)
      }
    },
    watch: {
      searchText: function () {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.updateAlbumList, 300)
      }
    },
    components: {
      MusicTracksList,
      SearchField
    }
  }
</script>
