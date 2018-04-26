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
        timer: null // setTimeout id
      }
    },
    mounted () {
      this.updateAlbumList()
    },
    methods: {
      updateAlbumList () { // update list of albums
        // start spinner
        this.$refs.search.startLoader()

        MusicService.getAlbums(this.searchText).then(data => {
          // for each album get their tracks info
          data.forEach(album => {
            let trackIds = album.tracks
            album.tracks = []

            let data = []
            for (let i = 0; i < trackIds.length; i++) {
              data.push(MusicService.getTrack(trackIds[i]))
            }

            // then all info was get, view tracks and stop spinner
            Promise.all(data).then(tracks => {
              album.tracks = tracks
            })
          })

          // if albums not found, stop spinner
          if (!data.length) {
            this.$refs.search.stopLoader()
          }
          this.albums = data
        })
      },
      buyAlbum (album, index) { // buy selected album
        // start spinner
        this.$refs.search.startLoader()

        MusicService.buyAlbum(album.id).then(() => {
          // set new value into album list
          album.is_bought = 1
          Vue.set(this.albums, index, album)
          // save it in store
          MusicService.saveAlbum(album)
        }).then(this.$refs.search.stopLoader)
      }
    },
    watch: {
      searchText: function () {
        // for wait when user stop typing and start search albums
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
