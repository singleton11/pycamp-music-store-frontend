<template>
  <div class="container"
       v-if="album">
    <div class="card mb-3">
      <h3 class="card-header">{{album.title}}</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Author: {{album.author}}</li>
        <li class="list-group-item">Price: {{album.price}}</li>
        <li class="list-group-item">Bought: {{album.is_bought}}</li>
      </ul>

      <img class="card-img rounded-0"
           :src="album.image"
           alt="Card image cap"
           v-if="album.image">

      <TrackList :tracks="album.tracksInfo"></TrackList>

      <div class="card-footer">
        <button v-if="!album.is_bought"
                type="button"
                class="btn btn-primary btn-lg btn-block"
                @click.prevent="$emit('buy', album)">
          Buy for {{album.price}} <i class="fas fa-dollar-sign"></i>
        </button>
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TrackList from '../track/TracksList.vue';
import { ALBUM_GET_TRACKS, } from '../../store/types/album';
import store from '../../store';

export default {
  props: [
    'album',
  ],
  /**
   * update tracks of album after mount component
   */
  mounted() {
    this.updateInfo();
  },
  methods: {
    updateInfo: () => store.dispatch(ALBUM_GET_TRACKS),
  },
  watch: {
    /**
     * follow the change of the album
     */
    album() {
      this.updateInfo();
    },
  },
  components: {
    TrackList,
  },
};
</script>
