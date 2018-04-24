<template>
  <div class="album-container" v-bind="$attrs">
    <div data-toggle="collapse" v-bind:data-target="'#demo-'+id">
      <span class="badge badge-primary badge-pill">{{tracks.length}}</span>
      <span>
        <span v-if="author">{{author}} - </span>
        <span v-if="title">{{title}}</span>
        <span>(Price {{price}})</span>
      </span>
    </div>
    <div v-bind:id="'demo-'+id" class="collapse">
      <button @click="buyAlbum" type="button" class="btn btn-info btn-lg btn-block">buy for {{price}} <i class="fas fa-dollar-sign"></i></button>
    </div>
  </div>

</template>

<script>
import MusicService from '@/services/MusicService'
export default {
  props: [
    'id',
    'author',
    'title',
    'price',
    'image',
    'tracks'
  ],
  methods: {
    buyAlbum () {
      MusicService.buyAlbum(this.id).thin((data) => {
        console.log(data)
      })
    }
  }
}
</script>
