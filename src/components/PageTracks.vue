<template>
  <div class="container">
    <SearchField v-model="searchText" ref="search"></SearchField>
    <div class="row">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Author</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="track in tracks" v-bind:key="track.id" :class="[track.is_bought ? 'bg-primary text-white' : 'bg-light']">
          <td scope="col">{{track.author}}</td>
          <th scope="col">{{track.title}}</th>
          <td scope="col">{{track.price}}</td>
          <td scope="col">
            <a class="card-link" v-if="!track.is_bought" @click.prevent="buyTrack(track, index)" href="#"><i class="fas fa-dollar-sign"></i> Buy</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import MusicService from '@/services/MusicService'
  import SearchField from '@/components/utils/SearchField'
  import Vue from 'vue'

  export default {
    data () {
      return {
        tracks: [],
        searchText: '',
        timer: 0 // setTimeout id
      }
    },
    created () {
      this.updateTrackList()
    },
    methods: {
      updateTrackList () { // update list of tracks
        // start spinner
        this.$refs.search.startLoader()
        MusicService.getTracks(this.searchText).then(data => {
          this.tracks = data
        }).then(this.$refs.search.stopLoader)
      },
      buyTrack (track, index) { // buy selected track
        // start spinner
        this.$refs.search.startLoader()
        MusicService.buyTrack(track.id).then(() => {
          // set new value into album list
          track.is_bought = 1
          Vue.set(this.tracks, index, track)
          // save it in store
          MusicService.saveTrack(track)
        }).then(this.$refs.search.stopLoader)
      }
    },
    watch: {
      searchText: function () {
        // for wait when user stop typing and start search tracks
        clearTimeout(this.timer)
        this.timer = setTimeout(this.updateTrackList, 300)
      }
    },
    components: {
      SearchField
    }
  }
</script>
